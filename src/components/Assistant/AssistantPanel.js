import React, { useEffect, useRef, useState } from "react";
import { AiOutlineMessage, AiOutlineSend } from "react-icons/ai";
import { ASSISTANT_PROMPTS } from "./assistantPrompts";

const WELCOME_MESSAGE = {
  id: "welcome",
  role: "assistant",
  content:
    "AI assistant online. Ask about my projects, experience, or how I build AI systems.",
};

function AssistantPanel({
  title = "Talk to Thabang AI",
  subtitle = "Ask about my work, projects, systems thinking, or how I approach production AI.",
  promptSuggestions = ASSISTANT_PROMPTS,
  showPromptSuggestions = true,
}) {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const submitMessage = async (rawText) => {
    const text = String(rawText || "").trim();
    if (!text || isLoading) return;

    const nextUserMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
    };

    setInput("");
    setIsLoading(true);
    setMessages((prev) => [...prev, nextUserMessage]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          session_id: sessionId,
        }),
      });

      let reply = "I could not generate a response right now.";

      if (response.ok) {
        const data = await response.json();
        reply = data.reply || reply;
        if (data.session_id) {
          setSessionId(data.session_id);
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        reply = errorData.error || "Chat service is unavailable right now.";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: reply,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-error-${Date.now()}`,
          role: "assistant",
          content: "Network error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submitMessage(input);
    }
  };

  return (
    <div className="assistant-panel assistant-panel-page">
      <div className="assistant-panel-header">
        <div>
          <strong>{title}</strong>
          <div className="assistant-panel-subtitle">{subtitle}</div>
        </div>
      </div>

      {showPromptSuggestions && promptSuggestions.length > 0 ? (
        <div className="assistant-suggestions" aria-label="Suggested prompts">
          {promptSuggestions.map((prompt) => (
            <button
              key={prompt}
              type="button"
              className="assistant-suggestion"
              onClick={() => submitMessage(prompt)}
              disabled={isLoading}
            >
              {prompt}
            </button>
          ))}
        </div>
      ) : null}

      <div className="assistant-messages" aria-live="polite">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`assistant-message ${
              message.role === "user" ? "assistant-message-user" : "assistant-message-assistant"
            }`}
          >
            {message.content}
          </div>
        ))}
        {isLoading ? (
          <div className="assistant-message assistant-message-assistant">Thinking...</div>
        ) : null}
        <div ref={messagesEndRef} />
      </div>

      <div className="assistant-composer">
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything about my work..."
          rows={2}
          className="assistant-textarea"
          aria-label="Assistant message input"
        />
        <button
          type="button"
          onClick={() => submitMessage(input)}
          disabled={isLoading || !input.trim()}
          className="assistant-send-btn"
          aria-label="Send message"
        >
          <AiOutlineSend />
        </button>
      </div>

      <div className="assistant-note">
        <AiOutlineMessage />
        AI representation. Responses are based on Tumelo's public work and writing.
      </div>
    </div>
  );
}

export default AssistantPanel;
