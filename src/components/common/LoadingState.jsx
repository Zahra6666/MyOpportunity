import { LoaderCircle } from "lucide-react";

function LoadingState({
  message = "جاري تحميل البيانات...",
}) {
  return (
    <div className="state-container state-loading">
      <div className="state-icon">
        <LoaderCircle
          size={28}
          className="state-spinner"
        />
      </div>

      <h3>لحظة واحدة</h3>

      <p>{message}</p>
    </div>
  );
}

export default LoadingState;