import { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";
import NotificationPanel from "./NotificationPanel";
import "./notifications.css";
function NotificationBell() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <div
      className="notification-wrapper"
      ref={wrapperRef}
    >
      <button
        type="button"
        className={`notification-button ${
          open ? "notification-button-active" : ""
        }`}
        aria-label="الإشعارات"
        onClick={() => setOpen((value) => !value)}
      >
        <Bell size={19} />

        <span className="notification-dot" />
      </button>

      {open && (
        <NotificationPanel
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}

export default NotificationBell;