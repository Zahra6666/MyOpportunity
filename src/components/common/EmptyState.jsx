import { Inbox } from "lucide-react";

function EmptyState({
  title = "لاتوجد بيانات حالياً",
  message = "لاتوجدأي نتائج لعرضها.",
  action = null,
}) {
  return (
    <div className="state-container state-empty">
      <div className="state-icon">
        <Inbox size={27} />
      </div>

      <h3>{title}</h3>

      <p>{message}</p>

      {action}
    </div>
  );
}

export default EmptyState;