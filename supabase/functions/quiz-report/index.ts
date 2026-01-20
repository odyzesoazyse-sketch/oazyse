import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const systemPrompt = `Ты — опытный гипнотерапевт и психолог с эмпатичным и поддерживающим подходом.

На основе ответов клиента создай персонализированный анализ и рекомендации.

Структура отчёта:
1. **Приветствие** — обратись по имени, создай тёплую атмосферу
2. **Общая картина** — кратко опиши текущее состояние клиента на основе ответов
3. **Сильные стороны** — выдели позитивные аспекты, на которые можно опираться
4. **Области для работы** — мягко обозначь направления, где гипнотерапия может помочь
5. **Персональные рекомендации** — 3-5 конкретных техник или практик
6. **Следующие шаги** — что клиент может сделать прямо сейчас
7. **Заключение** — вдохновляющее послание с верой в потенциал клиента

Тон: тёплый, профессиональный, поддерживающий. Без осуждения.
Объём: 800-1200 слов.
Язык: русский, обращение на "вы".`;

// Input validation
function validateSessionId(sessionId: unknown): boolean {
  if (typeof sessionId !== 'string') return false;
  // UUID format validation
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(sessionId);
}

function sanitizeAnswers(answers: unknown): Record<string, unknown> {
  if (!answers || typeof answers !== 'object' || Array.isArray(answers)) {
    throw new Error('Invalid answers format');
  }
  
  const sanitized: Record<string, unknown> = {};
  const maxKeys = 300; // Max quiz questions
  const maxValueLength = 5000;
  
  let keyCount = 0;
  for (const [key, value] of Object.entries(answers as Record<string, unknown>)) {
    if (keyCount >= maxKeys) break;
    
    // Sanitize key
    const sanitizedKey = String(key).slice(0, 100);
    
    // Sanitize value based on type
    if (typeof value === 'string') {
      sanitized[sanitizedKey] = value.slice(0, maxValueLength);
    } else if (typeof value === 'number' || typeof value === 'boolean' || value === null) {
      sanitized[sanitizedKey] = value;
    } else if (Array.isArray(value)) {
      sanitized[sanitizedKey] = value.slice(0, 50).map(v => 
        typeof v === 'string' ? v.slice(0, 500) : v
      );
    }
    // Skip other types for security
    
    keyCount++;
  }
  
  return sanitized;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    
    // Validate sessionId
    if (!validateSessionId(body.sessionId)) {
      return new Response(
        JSON.stringify({ error: 'Неверный формат ID сессии' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    const sessionId = body.sessionId as string;
    
    // Sanitize answers
    let answers: Record<string, unknown>;
    try {
      answers = sanitizeAnswers(body.answers);
    } catch {
      return new Response(
        JSON.stringify({ error: 'Неверный формат ответов' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Use service role to access quiz_responses (RLS blocks public access)
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Verify session exists
    const { data: session, error: sessionError } = await supabaseAdmin
      .from('quiz_responses')
      .select('session_id, completed')
      .eq('session_id', sessionId)
      .single();

    if (sessionError || !session) {
      console.error('Session not found:', sessionId);
      return new Response(
        JSON.stringify({ error: 'Сессия не найдена' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // Format answers for the prompt
    const formattedAnswers = Object.entries(answers)
      .filter(([_, value]) => value !== null && value !== undefined && value !== '')
      .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
      .join('\n');

    // Limit total prompt size
    const truncatedAnswers = formattedAnswers.slice(0, 50000);

    const userPrompt = `Вот ответы клиента на вопросы анкеты:

${truncatedAnswers}

Создай персонализированный отчёт с рекомендациями по гипнотерапии согласно структуре.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Превышен лимит запросов. Попробуйте позже.' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'Требуется пополнение баланса.' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const report = data.choices?.[0]?.message?.content || 'Ошибка генерации отчёта';

    // Save report to database using service role
    await supabaseAdmin
      .from('quiz_responses')
      .update({ ai_report: report, completed: true })
      .eq('session_id', sessionId);

    return new Response(JSON.stringify({ report }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Quiz report error:', error);
    return new Response(
      JSON.stringify({ error: 'Ошибка генерации отчёта' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
