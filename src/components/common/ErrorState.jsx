import { AlertCircle, RefreshCw } from "lucide-react";

function ErrorState({
  title = "حدث خطأ",
  message = "تعذر تحميل البيانات. حاول مرة ثانية.",
  onRetry,
}) {
  return (
    <div className="state-container state-error">
      <div className="state-icon">
        <AlertCircle size={27} />
      </div>

      <h3>{title}</h3>

      <p>{message}</p>

      {onRetry && (
        <button
          type="button"
          className="state-retry"
          onClick={onRetry}
        >
          <RefreshCw size={15} />
          إعادة المحاولة
        </button>
      )}
    </div>
  );
}

export default ErrorState;