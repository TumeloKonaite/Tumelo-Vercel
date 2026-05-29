import React, { useState } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import AssistantPanel from "./Assistant/AssistantPanel";

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="chat-widget-root" aria-live="polite">
      {isOpen && (
        <div className="chat-widget-panel">
          <AssistantPanel
            variant="widget"
            title="Talk to Tumelo AI"
            subtitle="Text or voice, right from the portfolio."
            showPromptSuggestions={false}
            onClose={() => setIsOpen(false)}
          />
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
