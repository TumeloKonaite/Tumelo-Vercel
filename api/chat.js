const DEFAULT_TIMEOUT_MS = 30000;

function extractReply(data) {
  if (!data) return "";
  if (typeof data === "string") return data;
  if (typeof data.response === "string") return data.response;
  if (typeof data.reply === "string") return data.reply;
  if (typeof data.message === "string") return data.message;
  if (typeof data.output === "string") return data.output;
  if (typeof data.content === "string") return data.content;

  const choice = data.choices?.[0];
  if (typeof choice?.message?.content === "string") {
    return choice.message.content;
  }
  if (typeof choice?.text === "string") {
    return choice.text;
  }

  return "";
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const backendUrl = process.env.CHATBOT_BACKEND_URL;
  if (!backendUrl) {
    return res.status(500).json({
      error: "Server not configured. Missing CHATBOT_BACKEND_URL.",
    });
  }

  const timeoutMs = Number(process.env.CHATBOT_BACKEND_TIMEOUT_MS || DEFAULT_TIMEOUT_MS);
  const authHeaderName = process.env.CHATBOT_BACKEND_AUTH_HEADER || "Authorization";
  const authToken = process.env.CHATBOT_BACKEND_AUTH_TOKEN;

  let payload = req.body || {};
  if (typeof payload === "string") {
    try {
      payload = JSON.parse(payload);
    } catch {
      payload = {};
    }
  }

  const { message = "", session_id = null } = payload;
  const userMessage = String(message || "").trim();

  if (!userMessage) {
    return res.status(400).json({ error: "message is required" });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    if (authToken) {
      headers[authHeaderName] = authToken;
    }

    const upstreamResponse = await fetch(backendUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({
        message: userMessage,
        session_id,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    const contentType = upstreamResponse.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");
    const upstreamData = isJson
      ? await upstreamResponse.json()
      : await upstreamResponse.text();

    if (!upstreamResponse.ok) {
      return res.status(upstreamResponse.status).json({
        error:
          (typeof upstreamData === "object" && upstreamData?.error) ||
          (typeof upstreamData === "object" && upstreamData?.detail) ||
          "Upstream chatbot request failed.",
      });
    }

    const reply = extractReply(upstreamData) || "I could not generate a response right now.";
    const resolvedSessionId =
      typeof upstreamData === "object" && upstreamData?.session_id
        ? upstreamData.session_id
        : session_id;

    return res.status(200).json({
      reply,
      session_id: resolvedSessionId || null,
      raw: upstreamData,
    });
  } catch (error) {
    const isTimeout = error?.name === "AbortError";
    return res.status(isTimeout ? 504 : 500).json({
      error: isTimeout
        ? "Chat request timed out."
        : "Failed to reach chatbot backend.",
    });
  } finally {
    clearTimeout(timeout);
  }
};
