import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose, AiOutlineMessage, AiOutlineSend } from "react-icons/ai";

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi. Ask me anything and I will help.",
    },
  ]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const sendMessage = async () => {
    const text = input.trim();
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
      sendMessage();
    }
  };

  return (
    <div className="chat-widget-root" aria-live="polite">
      {isOpen && (
        <div className="chat-widget-panel">
          <div className="chat-widget-header">
            <div>
              <strong>AI Assistant</strong>
              <div className="chat-widget-subtitle">Powered by your chatbot backend</div>
            </div>
            <button
              type="button"
              className="chat-widget-icon-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <AiOutlineClose />
            </button>
          </div>

          <div className="chat-widget-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`chat-widget-message ${
                  message.role === "user" ? "chat-widget-message-user" : "chat-widget-message-assistant"
                }`}
              >
                {message.content}
              </div>
            ))}
            {isLoading && (
              <div className="chat-widget-message chat-widget-message-assistant">
                Thinking...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-widget-input-wrap">
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              rows={2}
              className="chat-widget-input"
              aria-label="Message input"
            />
            <button
              type="button"
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="chat-widget-send-btn"
              aria-label="Send message"
            >
              <AiOutlineSend />
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        className="chat-widget-toggle"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        <AiOutlineMessage />
      </button>
    </div>
  );
}

export default ChatWidget;
