import React, { useEffect, useRef, useState } from "react";
import {
  AiOutlineDislike,
  AiOutlineLike,
  AiOutlineMessage,
  AiOutlineSend,
} from "react-icons/ai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ASSISTANT_PROMPTS } from "./assistantPrompts";

const WELCOME_MESSAGE = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi, I'm Tumelo. Ask me about my projects, experience, or how I design and ship AI systems.",
};

const COMMENT_MAX_LENGTH = 2000;

function createFeedbackState() {
  return {
    rating: null,
    comment: "",
    isCommentOpen: false,
    status: "idle",
    error: null,
  };
}

function AssistantPanel({
  title = "Talk to My AI Twin",
  subtitle = "Ask about my work, projects, engineering approach, and how I build production AI systems.",
  promptSuggestions = ASSISTANT_PROMPTS,
  showPromptSuggestions = true,
}) {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const messagesEndRef = useRef(null);

  const updateMessageFeedback = (messageId, updates) => {
    setMessages((prev) =>
      prev.map((message) =>
        message.id === messageId
          ? {
              ...message,
              feedback: {
                ...message.feedback,
                ...updates,
              },
            }
          : message
      )
    );
  };

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
          ...(conversationId ? { conversation_id: conversationId } : {}),
        }),
      });

      let reply = "I could not generate a response right now.";
      let responseDataMessageId = null;

      if (response.ok) {
        const data = await response.json();
        reply = data.reply || reply;
        responseDataMessageId = data.message_id || data.raw?.message_id || null;
        if (data.conversation_id) {
          setConversationId(data.conversation_id);
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
          messageId: response.ok ? responseDataMessageId : null,
          feedback: response.ok && responseDataMessageId
            ? createFeedbackState()
            : undefined,
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

  const submitFeedback = async (message, rating, comment) => {
    const normalizedComment = comment.trim() || null;

    updateMessageFeedback(message.id, {
      rating,
      comment,
      status: "submitting",
      error: null,
    });

    try {
      const response = await fetch(
        `/api/chat/messages/${encodeURIComponent(message.messageId)}/feedback`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ rating, comment: normalizedComment }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Could not save feedback.");
      }

      const feedback = await response.json();
      updateMessageFeedback(message.id, {
        rating: feedback.rating || rating,
        comment: feedback.comment || "",
        isCommentOpen: false,
        status: "success",
        error: null,
      });
    } catch (error) {
      updateMessageFeedback(message.id, {
        status: "error",
        error: error.message || "Could not save feedback.",
      });
    }
  };

  const selectRating = (message, rating) => {
    if (message.feedback.status === "submitting") return;

    if (rating === "down") {
      updateMessageFeedback(message.id, {
        rating,
        isCommentOpen: true,
        status: "idle",
        error: null,
      });
      return;
    }

    submitFeedback(message, rating, "");
  };

  const renderFeedbackControls = (message) => {
    if (message.role !== "assistant" || !message.messageId || !message.feedback) {
      return null;
    }

    const { rating, comment, isCommentOpen, status, error } = message.feedback;
    const isSubmitting = status === "submitting";

    return (
      <div className="assistant-feedback">
        <div
          className="assistant-feedback-actions"
          role="group"
          aria-label="Rate this answer"
        >
          <button
            type="button"
            className={`assistant-feedback-button ${rating === "up" ? "is-selected" : ""}`}
            onClick={() => selectRating(message, "up")}
            disabled={isSubmitting}
            aria-label="Thumbs up"
            aria-pressed={rating === "up"}
          >
            <AiOutlineLike aria-hidden="true" />
          </button>
          <button
            type="button"
            className={`assistant-feedback-button ${rating === "down" ? "is-selected" : ""}`}
            onClick={() => selectRating(message, "down")}
            disabled={isSubmitting}
            aria-label="Thumbs down"
            aria-pressed={rating === "down"}
          >
            <AiOutlineDislike aria-hidden="true" />
          </button>
          {isSubmitting ? (
            <span className="assistant-feedback-status" aria-live="polite">
              Saving...
            </span>
          ) : null}
          {status === "success" ? (
            <span className="assistant-feedback-status is-success" aria-live="polite">
              Feedback saved
            </span>
          ) : null}
        </div>

        {isCommentOpen ? (
          <div className="assistant-feedback-comment">
            <label htmlFor={`feedback-comment-${message.id}`}>
              How could this answer be improved? <span>(optional)</span>
            </label>
            <textarea
              id={`feedback-comment-${message.id}`}
              value={comment}
              onChange={(event) =>
                updateMessageFeedback(message.id, {
                  comment: event.target.value,
                  status: "idle",
                  error: null,
                })
              }
              maxLength={COMMENT_MAX_LENGTH}
              rows={3}
              disabled={isSubmitting}
            />
            <div className="assistant-feedback-comment-footer">
              <span>{comment.length}/{COMMENT_MAX_LENGTH}</span>
              <div>
                <button
                  type="button"
                  className="assistant-feedback-text-button"
                  onClick={() => submitFeedback(message, "down", "")}
                  disabled={isSubmitting}
                >
                  Skip
                </button>
                <button
                  type="button"
                  className="assistant-feedback-submit"
                  onClick={() => submitFeedback(message, "down", comment)}
                  disabled={isSubmitting}
                >
                  Submit feedback
                </button>
              </div>
            </div>
          </div>
        ) : null}

        {status === "error" ? (
          <div className="assistant-feedback-error" role="alert">
            <span>{error}</span>
            <button
              type="button"
              onClick={() => submitFeedback(message, rating, comment)}
            >
              Retry
            </button>
          </div>
        ) : null}
      </div>
    );
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submitMessage(input);
    }
  };

  const renderMessageContent = (message) => {
    if (message.role === "user") {
      return message.content;
    }

    return (
      <ReactMarkdown
        className="assistant-message-markdown"
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ children, ...props }) => (
            <a {...props} target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
        }}
      >
        {message.content}
      </ReactMarkdown>
    );
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
            {renderMessageContent(message)}
            {renderFeedbackControls(message)}
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
