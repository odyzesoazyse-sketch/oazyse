import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Input validation
function validateSessionId(sessionId: unknown): boolean {
  if (typeof sessionId !== 'string') return false;
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(sessionId);
}

function sanitizeAnswers(answers: unknown): Record<string, unknown> {
  if (!answers || typeof answers !== 'object' || Array.isArray(answers)) {
    return {};
  }
  
  const sanitized: Record<string, unknown> = {};
  const allowedFields = [
    'code_name', 'age', 'current_country', 'current_profession', 'email', 'telegram',
    'completed', 'ai_report'
  ];
  
  for (const [key, value] of Object.entries(answers as Record<string, unknown>)) {
    if (!allowedFields.includes(key)) continue;
    
    if (typeof value === 'string') {
      sanitized[key] = value.slice(0, 5000);
    } else if (typeof value === 'number' || typeof value === 'boolean' || value === null) {
      sanitized[key] = value;
    }
  }
  
  return sanitized;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const action = body.action;

    // Use service role for all quiz operations
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Action: Create new quiz session
    if (action === 'create') {
      const { data, error } = await supabaseAdmin
        .from('quiz_responses')
        .insert({})
        .select('session_id')
        .single();

      if (error) throw error;

      return new Response(
        JSON.stringify({ session_id: data.session_id }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Action: Update quiz progress
    if (action === 'update') {
      const sessionId = body.session_id;
      
      if (!validateSessionId(sessionId)) {
        return new Response(
          JSON.stringify({ error: 'Неверный формат ID сессии' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const sanitizedData = sanitizeAnswers(body.data);
      
      if (Object.keys(sanitizedData).length === 0) {
        return new Response(
          JSON.stringify({ success: true }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const { error } = await supabaseAdmin
        .from('quiz_responses')
        .update(sanitizedData)
        .eq('session_id', sessionId);

      if (error) throw error;

      return new Response(
        JSON.stringify({ success: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Action: Complete quiz
    if (action === 'complete') {
      const sessionId = body.session_id;
      
      if (!validateSessionId(sessionId)) {
        return new Response(
          JSON.stringify({ error: 'Неверный формат ID сессии' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const { error } = await supabaseAdmin
        .from('quiz_responses')
        .update({ completed: true })
        .eq('session_id', sessionId);

      if (error) throw error;

      return new Response(
        JSON.stringify({ success: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Неизвестное действие' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Quiz operations error:', error);
    return new Response(
      JSON.stringify({ error: 'Ошибка операции' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
