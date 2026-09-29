import { MessageCircle } from "lucide-react";
import { useState } from "react";
import ChatbotWindow from "./ChatbotWindow";
import "./chatbot.css";

function ChatbotButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={`chatbot-floating-button ${
          open ? "chatbot-floating-button-open" : ""
        }`}
        onClick={() => setOpen((value) => !value)}
        aria-label="فتح المساعد"
      >
        <MessageCircle size={23} />
      </button>

      {open && (
        <ChatbotWindow onClose={() => setOpen(false)} />
      )}
    </>
  );
}

export default ChatbotButton;