const DEFAULT_TIMEOUT_MS = 30000;

function getErrorMessage(data, fallback) {
  if (!data) return fallback;
  if (typeof data === "string") return data;
  if (typeof data.error === "string") return data.error;
  if (typeof data.detail === "string") return data.detail;
  if (typeof data.message === "string") return data.message;
  return fallback;
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const backendUrl = process.env.CONTACT_BACKEND_URL;
  if (!backendUrl) {
    return res.status(500).json({
      error: "Server not configured. Missing CONTACT_BACKEND_URL.",
    });
  }

  let payload = req.body || {};
  if (typeof payload === "string") {
    try {
      payload = JSON.parse(payload);
    } catch {
      payload = {};
    }
  }

  const normalizedPayload = {
    first_name: String(payload.first_name || "").trim(),
    last_name: String(payload.last_name || "").trim(),
    email: String(payload.email || "").trim(),
    phone: String(payload.phone || "").trim(),
    subject: String(payload.subject || "").trim(),
    message: String(payload.message || "").trim(),
  };

  if (
    !normalizedPayload.first_name ||
    !normalizedPayload.last_name ||
    !normalizedPayload.email ||
    !normalizedPayload.phone ||
    !normalizedPayload.message
  ) {
    return res.status(400).json({
      error: "first_name, last_name, email, phone, and message are required.",
    });
  }

  const timeoutMs = Number(process.env.CONTACT_BACKEND_TIMEOUT_MS || DEFAULT_TIMEOUT_MS);
  const authHeaderName = process.env.CONTACT_BACKEND_AUTH_HEADER || "Authorization";
  const authToken = process.env.CONTACT_BACKEND_AUTH_TOKEN;

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
      body: JSON.stringify(normalizedPayload),
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
        error: getErrorMessage(upstreamData, "Upstream contact request failed."),
      });
    }

    return res.status(200).json({
      message: getErrorMessage(upstreamData, "Your message has been sent successfully."),
      raw: upstreamData,
    });
  } catch (error) {
    const isTimeout = error?.name === "AbortError";
    return res.status(isTimeout ? 504 : 500).json({
      error: isTimeout
        ? "Contact request timed out."
        : "Failed to reach contact backend.",
    });
  } finally {
    clearTimeout(timeout);
  }
};
