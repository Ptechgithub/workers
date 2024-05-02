
// User info bot
const telegramAuthToken = `12345:XXXX`; //Token
const webhookEndpoint = "/endpoint";

addEventListener("fetch", event => {
  event.respondWith(handleIncomingRequest(event));
});

function handleIncomingRequest(event) {
  const url = new URL(event.request.url);
  const path = url.pathname;
  const method = event.request.method;
  const workerUrl = `${url.protocol}//${url.host}`;

  if (method === "POST" && path === webhookEndpoint) {
    return event.request.json().then(update => {
      event.waitUntil(processUpdate(update));
      return new Response("Ok");
    });
  } else if (method === "GET" && path === "/configure-webhook") {
    return fetch(`https://api.telegram.org/bot${telegramAuthToken}/setWebhook?url=${workerUrl}${webhookEndpoint}`).then(response => {
      return new Response(response.ok ? "Webhook set successfully" : "Failed to set webhook", { status: response.status });
    });
  } else {
    return new Response("Not found", { status: 404 });
  }
}

function processUpdate(update) {
  if ("message" in update) {
    const chatId = update.message.chat.id;
    const userId = update.message.from.id;
    const firstName = update.message.from.first_name;
    const lastName = update.message.from.last_name || "";
    const username = update.message.from.username || "";
    const languageCode = update.message.from.language_code || "";

    const userInfo = `Username: @${username}\nUser 🆔️: ${userId}\nFirst Name: ${firstName}\nLast Name: ${lastName}\nLanguage: ${languageCode}`;
    
    const userInfoMessageUrl = `https://api.telegram.org/bot${telegramAuthToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(userInfo)}`;
    
    return fetch(userInfoMessageUrl);
  }
}
