import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { answers, sessionId } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // Format answers for the prompt
    const formattedAnswers = Object.entries(answers)
      .filter(([_, value]) => value !== null && value !== undefined && value !== '')
      .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
      .join('\n');

    const userPrompt = `Вот ответы клиента на вопросы анкеты:

${formattedAnswers}

ID сессии: ${sessionId}

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

    return new Response(JSON.stringify({ report }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Quiz report error:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
