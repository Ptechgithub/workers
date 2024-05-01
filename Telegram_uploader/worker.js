
// Telegram Uploader bot
const telegramAuthToken = `12345`; //Add your TOKEN
const webhookEndpoint = "/endpoint";

addEventListener("fetch", event => {
  event.respondWith(handleIncomingRequest(event));
});

async function handleIncomingRequest(event) {
  let url = new URL(event.request.url);
  let path = url.pathname;
  let method = event.request.method;
  let workerUrl = `${url.protocol}//${url.host}`;

  if (method === "POST" && path === webhookEndpoint) {
    const update = await event.request.json();
    event.waitUntil(processUpdate(update));
    return new Response("Ok");
  } else if (method === "GET" && path === "/configure-webhook") { // add "/configure-webhook" after worker url and run to set webhook(example: https://a.b.workers.dev/configure-webhook)
    const url = `https://api.telegram.org/bot${telegramAuthToken}/setWebhook?url=${workerUrl}${webhookEndpoint}`;

    const response = await fetch(url);

    if (response.ok) {
      return new Response("Webhook set successfully", { status: 200 });
    } else {
      return new Response("Failed to set webhook", { status: response.status });
    }
  } else {
    return new Response("Not found", { status: 404 });
  }
}

async function processUpdate(update) {
  if ("message" in update) {
    const chatId = update.message.chat.id;
    const userText = update.message.text;

    // Check if the user sent /start command
    if (userText === '/start') {
      const welcomeMessage = "به ربات اپلودر خوش امدید. جهت دریافت فایل ، لینک مورد نظر را ارسال نمایید. حداکثر حجم فایل قابل دریافت 50 مگابایت است.\n\nWelcome to Uploader bot. To receive a file, please send the link. Maximum file size for upload is 50 MB.\n\nدر کانال ما عضو شوید \n@P_Tech2024";
      const welcomeUrl = `https://api.telegram.org/bot${telegramAuthToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(welcomeMessage)}&parse_mode=HTML`;

      await fetch(welcomeUrl);
    } else if (isValidUrl(userText)) {
      // Process other messages with URLs
      const url = new URL(userText);
      const fileName = url.pathname.split('/').pop();

      const fileResponse = await fetch(userText);
      const fileSize = fileResponse.headers.get('content-length');
      const fileSizeInMB = fileSize / (1024 * 1024); // Convert to MB

      if (fileSizeInMB > 49.9) {
        const responseText = "حجم فایل بیشتر از 49.9 مگابایت است و قابل ارسال نمی‌باشد.\n\nThe file size exceeds 49.9 MB and cannot be sent.";
        const invalidFileSizeMessageUrl = `https://api.telegram.org/bot${telegramAuthToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(responseText)}`;

        await fetch(invalidFileSizeMessageUrl);
      } else {
        const fileBlob = await fileResponse.blob();
        const formData = new FormData();
        formData.append("chat_id", chatId);
        formData.append("document", fileBlob, fileName);
        const sendDocumentUrl = `https://api.telegram.org/bot${telegramAuthToken}/sendDocument`;

        await fetch(sendDocumentUrl, {
          method: "POST",
          body: formData
        });
      }
    } else {
      const responseText = "آدرس وارد شده معتبر نیست!\n\nInvalid URL!";
      const invalidUrlMessageUrl = `https://api.telegram.org/bot${telegramAuthToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(responseText)}`;

      await fetch(invalidUrlMessageUrl);
    }
  }
}

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}
