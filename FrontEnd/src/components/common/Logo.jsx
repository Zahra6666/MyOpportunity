import { Compass } from "lucide-react";
import { Link } from "react-router-dom";

function Logo({ light = false }) {
  return (
    <Link
      to="/"
      className={`brand-logo ${
        light ? "brand-logo-light" : ""
      }`}
      aria-label="MyOpportunity"
    >
      <span className="brand-icon">
        <Compass
          size={18}
          strokeWidth={2.3}
        />
      </span>

      <span className="brand-name">
        فرصتي
      </span>
    </Link>
  );
}

export default Logo;