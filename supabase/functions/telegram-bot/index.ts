import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const MINIAPP_URL = "https://oazyse.lovable.app/";
const ADMIN_IDS = [5877042684];

const textPack: Record<string, { start: string; appBtn: string; chooseLang: string }> = {
  en: {
    start: "open",
    appBtn: "oazyse°",
    chooseLang: "choose language"
  },
  ru: {
    start: "открыть",
    appBtn: "oazyse°",
    chooseLang: "выберите язык"
  },
  zh: {
    start: "打开",
    appBtn: "oazyse°",
    chooseLang: "选择语言"
  }
};

function detectLang(code: string | undefined): string {
  if (!code) return "en";
  if (code.startsWith("ru")) return "ru";
  if (code.startsWith("zh")) return "zh";
  return "en";
}

function getAppUrl(lang: string): string {
  return `${MINIAPP_URL}?lang=${lang}`;
}

function getMainKeyboard(lang: string) {
  const t = textPack[lang] || textPack.en;
  return {
    inline_keyboard: [
      [{ text: t.appBtn, web_app: { url: getAppUrl(lang) } }],
      [{ text: "🌐", callback_data: "show_languages" }]
    ]
  };
}

function getLangKeyboard() {
  return {
    inline_keyboard: [
      [
        { text: "en", callback_data: "lang_en" },
        { text: "ру", callback_data: "lang_ru" },
        { text: "中文", callback_data: "lang_zh" }
      ],
      [{ text: "←", callback_data: "back_to_main" }]
    ]
  };
}

async function sendTelegramRequest(method: string, body: Record<string, unknown>, token: string) {
  const response = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return response.json();
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const TELEGRAM_BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN");
    if (!TELEGRAM_BOT_TOKEN) {
      throw new Error("TELEGRAM_BOT_TOKEN is not configured");
    }

    const url = new URL(req.url);
    
    // Handle webhook setup via GET request
    if (req.method === "GET" && url.searchParams.get("setup") === "webhook") {
      const webhookUrl = `${Deno.env.get("SUPABASE_URL")}/functions/v1/telegram-bot`;
      const result = await sendTelegramRequest("setWebhook", {
        url: webhookUrl,
      }, TELEGRAM_BOT_TOKEN);
      
      return new Response(JSON.stringify({ 
        message: "Webhook setup attempted",
        webhook_url: webhookUrl,
        telegram_response: result 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Handle webhook info check
    if (req.method === "GET" && url.searchParams.get("check") === "webhook") {
      const result = await sendTelegramRequest("getWebhookInfo", {}, TELEGRAM_BOT_TOKEN);
      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const update = await req.json();
    console.log("Received update:", JSON.stringify(update));

    // Handle /start command
    if (update.message?.text?.startsWith("/start")) {
      const chatId = update.message.chat.id;
      const languageCode = update.message.from?.language_code;
      const lang = detectLang(languageCode);

      // Upsert user to database
      await supabase
        .from("telegram_bot_users")
        .upsert(
          { chat_id: chatId, language: lang },
          { onConflict: "chat_id" }
        );

      await sendTelegramRequest("sendMessage", {
        chat_id: chatId,
        text: textPack[lang]?.start || textPack.en.start,
        reply_markup: getMainKeyboard(lang),
      }, TELEGRAM_BOT_TOKEN);
    }

    // Handle /users command (admin only)
    if (update.message?.text === "/users") {
      const chatId = update.message.chat.id;
      
      if (ADMIN_IDS.includes(chatId)) {
        const { data: users, count } = await supabase
          .from("telegram_bot_users")
          .select("chat_id", { count: "exact" });

        const userList = users?.map(u => u.chat_id).join("\n") || "Список пуст";
        await sendTelegramRequest("sendMessage", {
          chat_id: chatId,
          text: `Всего участников: ${count}\n\nСписок ID:\n${userList}`,
        }, TELEGRAM_BOT_TOKEN);
      }
    }

    // Handle /broadcast command (admin only)
    if (update.message?.text?.startsWith("/broadcast ")) {
      const chatId = update.message.chat.id;
      
      if (ADMIN_IDS.includes(chatId)) {
        const text = update.message.text.replace("/broadcast ", "");
        
        const { data: users } = await supabase
          .from("telegram_bot_users")
          .select("chat_id");

        let sent = 0;
        for (const user of users || []) {
          try {
            await sendTelegramRequest("sendMessage", {
              chat_id: user.chat_id,
              text: text,
            }, TELEGRAM_BOT_TOKEN);
            sent++;
          } catch (err) {
            console.error(`Failed to send to ${user.chat_id}:`, err);
          }
        }

        await sendTelegramRequest("sendMessage", {
          chat_id: chatId,
          text: `Рассылка завершена. Отправлено: ${sent}/${users?.length || 0}`,
        }, TELEGRAM_BOT_TOKEN);
      }
    }

    // Handle callback queries
    if (update.callback_query) {
      const query = update.callback_query;
      const chatId = query.message.chat.id;
      const messageId = query.message.message_id;
      const data = query.data;

      // Get user's language from database
      const { data: userData } = await supabase
        .from("telegram_bot_users")
        .select("language")
        .eq("chat_id", chatId)
        .single();

      const currentLang = userData?.language || "en";

      if (data === "show_languages") {
        await sendTelegramRequest("editMessageReplyMarkup", {
          chat_id: chatId,
          message_id: messageId,
          reply_markup: getLangKeyboard(),
        }, TELEGRAM_BOT_TOKEN);
      }

      if (data === "back_to_main") {
        await sendTelegramRequest("editMessageReplyMarkup", {
          chat_id: chatId,
          message_id: messageId,
          reply_markup: getMainKeyboard(currentLang),
        }, TELEGRAM_BOT_TOKEN);
      }

      if (data.startsWith("lang_")) {
        const newLang = data.replace("lang_", "");
        
        // Update language in database
        await supabase
          .from("telegram_bot_users")
          .update({ language: newLang })
          .eq("chat_id", chatId);

        await sendTelegramRequest("editMessageText", {
          chat_id: chatId,
          message_id: messageId,
          text: textPack[newLang]?.start || textPack.en.start,
          reply_markup: getMainKeyboard(newLang),
        }, TELEGRAM_BOT_TOKEN);
      }

      // Answer callback query
      await sendTelegramRequest("answerCallbackQuery", {
        callback_query_id: query.id,
      }, TELEGRAM_BOT_TOKEN);
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Telegram bot error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
