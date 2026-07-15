const DEFAULT_TIMEOUT_MS = 30000;
const COMMENT_MAX_LENGTH = 2000;

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

  const messageId = String(req.query?.message_id || "").trim();
  if (!messageId) {
    return res.status(400).json({ error: "message_id is required" });
  }

  let payload = req.body || {};
  if (typeof payload === "string") {
    try {
      payload = JSON.parse(payload);
    } catch {
      payload = {};
    }
  }

  const rating = payload.rating;
  const comment = payload.comment == null ? null : String(payload.comment);

  if (rating !== "up" && rating !== "down") {
    return res.status(400).json({ error: "rating must be up or down" });
  }

  if (comment && comment.length > COMMENT_MAX_LENGTH) {
    return res.status(400).json({
      error: `comment must be ${COMMENT_MAX_LENGTH} characters or fewer`,
    });
  }

  const timeoutMs = Number(
    process.env.CHATBOT_BACKEND_TIMEOUT_MS || DEFAULT_TIMEOUT_MS
  );
  const authHeaderName =
    process.env.CHATBOT_BACKEND_AUTH_HEADER || "Authorization";
  const authToken = process.env.CHATBOT_BACKEND_AUTH_TOKEN;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const feedbackUrl = new URL(
      `/api/chat/messages/${encodeURIComponent(messageId)}/feedback`,
      backendUrl
    );
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    if (authToken) {
      headers[authHeaderName] = authToken;
    }

    const upstreamResponse = await fetch(feedbackUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({ rating, comment }),
      signal: controller.signal,
    });

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
          "Upstream feedback request failed.",
      });
    }

    return res.status(200).json(upstreamData);
  } catch (error) {
    const isTimeout = error?.name === "AbortError";
    return res.status(isTimeout ? 504 : 500).json({
      error: isTimeout
        ? "Feedback request timed out."
        : "Failed to reach chatbot backend.",
    });
  } finally {
    clearTimeout(timeout);
  }
};
