import { Link } from "react-router-dom";
import { ArrowRight, Compass } from "lucide-react";
import PageContainer from "../components/layout/PageContainer";

function NotFound() {
  return (
    <PageContainer className="not-found-page">
      <div className="container">
        <div className="not-found-content">

          <div className="not-found-icon">
            <Compass size={36} />
          </div>

          <span>404</span>

          <h1>
            الصفحة غير موجودة
          </h1>

          <p>
            يبدو أن الصفحة التي تبحث عنها غير موجودة
            أو تم تغيير رابطها.
          </p>

          <Link to="/" className="not-found-button">
            <ArrowRight size={17} />
            العودة للرئيسية
          </Link>

        </div>
      </div>
    </PageContainer>
  );
}

export default NotFound;