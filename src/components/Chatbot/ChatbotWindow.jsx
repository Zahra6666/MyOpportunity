import {
  Bot,
  Send,
  X,
  User,
  BriefcaseBusiness,
  FileText,
} from "lucide-react";
import { useState } from "react";

function ChatbotWindow({ onClose }) {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "أهلا شلون أگدر أساعدك اليوم؟",
    },
  ]);

  const suggestions = [
    {
      icon: BriefcaseBusiness,
      text: "أريد فرص مناسبة إلي",
    },
    {
      icon: FileText,
      text: "أريد أراجع سيرتي الذاتية",
    },
  ];

  const sendMessage = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) return;

    setMessages((current) => [
      ...current,
      {
        id: Date.now(),
        sender: "user",
        text: trimmedMessage,
      },
      {
        id: Date.now() + 1,
        sender: "bot",
        text: "أستلمت رسالتك. حالياً المساعد يعمل بالواجهة التجريبية، وبالمرحلة القادمة راح نربطه بالـBackend.",
      },
    ]);

    setMessage("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const handleSuggestion = (text) => {
    setMessage(text);
  };

  return (
    <div className="chatbot-window">
      <div className="chatbot-header">
        <div className="chatbot-header-info">
          <div className="chatbot-avatar">
            <Bot size={21} />
          </div>

          <div>
            <h3>مساعد فرصتي</h3>
            <span>متواجد لمساعدتك</span>
          </div>
        </div>

        <button
          type="button"
          className="chatbot-close"
          onClick={onClose}
          aria-label="إغلاق"
        >
          <X size={19} />
        </button>
      </div>

      <div className="chatbot-messages">
        {messages.map((item) => (
          <div
            key={item.id}
            className={`chatbot-message-row ${
              item.sender === "user"
                ? "chatbot-message-user"
                : "chatbot-message-bot"
            }`}
          >
            {item.sender === "bot" && (
              <div className="chatbot-small-avatar">
                <Bot size={15} />
              </div>
            )}

            <div className="chatbot-message">
              {item.text}
            </div>

            {item.sender === "user" && (
              <div className="chatbot-small-avatar chatbot-user-avatar">
                <User size={15} />
              </div>
            )}
          </div>
        ))}

        {messages.length === 1 && (
          <div className="chatbot-suggestions">
            {suggestions.map((suggestion) => {
              const Icon = suggestion.icon;

              return (
                <button
                  key={suggestion.text}
                  type="button"
                  onClick={() =>
                    handleSuggestion(suggestion.text)
                  }
                >
                  <Icon size={16} />
                  {suggestion.text}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="chatbot-input-area">
        <div className="chatbot-input-wrapper">
          <input
            type="text"
            value={message}
            onChange={(event) =>
              setMessage(event.target.value)
            }
            onKeyDown={handleKeyDown}
            placeholder="اكتب رسالتك هنا..."
          />

          <button
            type="button"
            onClick={sendMessage}
            disabled={!message.trim()}
            aria-label="إرسال"
          >
            <Send size={17} />
          </button>
        </div>

        <p>مساعد فرصتي — نسخة تجريبية</p>
      </div>
    </div>
  );
}

export default ChatbotWindow;