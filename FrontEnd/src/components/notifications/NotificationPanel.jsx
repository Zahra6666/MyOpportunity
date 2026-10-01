import {
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  X,
} from "lucide-react";

import { Link } from "react-router-dom";

const notifications = [
  {
    id: 1,
    type: "application",
    title: "تم تحديث حالة طلبك",
    description:
      "تم نقل طلب Frontend Developer إلى مرحلة المقابلة التقنية.",
    time: "منذ ساعة",
    unread: true,
  },
  {
    id: 2,
    type: "deadline",
    title: "فرصة قريبة من الإغلاق",
    description:
      "فرصة Junior React Developer تنتهي خلال 5 أيام.",
    time: "منذ 3 ساعات",
    unread: true,
  },
  {
    id: 3,
    type: "match",
    title: "وجدنا فرصة مناسبة إلك",
    description:
      "توجد فرصة جديدة بنسبة تطابق 94% مع مهاراتك.",
    time: "أمس",
    unread: false,
  },
  {
    id: 4,
    type: "cv",
    title: "تحديث السيرة الذاتية",
    description:
      "ملفك الشخصي يحتاج بعض المعلومات حتى يكتمل.",
    time: "أمس",
    unread: false,
  },
];

const notificationIcons = {
  application: BriefcaseBusiness,
  deadline: Clock3,
  match: CheckCircle2,
  cv: FileText,
};

function NotificationPanel({ onClose }) {
  const unreadCount = notifications.filter(
    (notification) => notification.unread
  ).length;

  return (
    <div className="notification-panel" dir="rtl">

      <div className="notification-panel-header">
        <div>
          <h3>الإشعارات</h3>

          {unreadCount > 0 && (
            <span>
              {unreadCount} إشعارات جديدة
            </span>
          )}
        </div>

        <button
          type="button"
          className="notification-close"
          onClick={onClose}
          aria-label="إغلاق"
        >
          <X size={17} />
        </button>
      </div>

      <div className="notification-actions">
        <button type="button">
          تحديد الكل كمقروء
        </button>

        <Link to="/notifications" onClick={onClose}>
          عرض كل الإشعارات
        </Link>
      </div>

      <div className="notification-list">
        {notifications.map((notification) => {
          const Icon =
            notificationIcons[notification.type];

          return (
            <button
              type="button"
              className={`notification-item ${
                notification.unread
                  ? "notification-item-unread"
                  : ""
              }`}
              key={notification.id}
            >
              <span
                className={`notification-icon notification-icon-${notification.type}`}
              >
                <Icon size={17} />
              </span>

              <span className="notification-content">
                <strong>
                  {notification.title}
                </strong>

                <span>
                  {notification.description}
                </span>

                <small>
                  <CalendarDays size={12} />
                  {notification.time}
                </small>
              </span>

              {notification.unread && (
                <span className="notification-unread-dot" />
              )}
            </button>
          );
        })}
      </div>

      <div className="notification-panel-footer">
        <Link to="/notifications" onClick={onClose}>
          فتح مركز الإشعارات
        </Link>
      </div>
    </div>
  );
}

export default NotificationPanel;