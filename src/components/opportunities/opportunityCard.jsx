import {
  Bookmark,
  Building2,
  CalendarDays,
  CheckCircle2,
  MapPin,
  ArrowLeft,
} from "lucide-react";

import { Link } from "react-router-dom";

import Badge from "../common/Badge";

function OpportunityCard({
  opportunity,
}) {
  const {
    id,
    title,
    titleEn,
    company,
    location,
    type,
    mode,
    salary,
    match,
    description,
    skills,
    deadline,
  } = opportunity;

  return (
    <article className="opportunity-card">

      <div className="opportunity-card-top">

        <div className="company-logo">
          <Building2 size={22} />
        </div>

        <div className="opportunity-main">

          <div className="opportunity-title-row">

            <div>

              <Badge variant="type">
                {type}
              </Badge>

              <h3>
                {title}
              </h3>

              <p className="opportunity-en-title">
                {titleEn}
              </p>

            </div>

            <div className="match-score">
              <span>
                {match}%
              </span>

              <small>
                تطابق ذكي
              </small>
            </div>

          </div>

          <div className="opportunity-company">

            <span>
              <Building2 size={15} />
              {company}
            </span>

            <span>
              <MapPin size={15} />
              {location}
            </span>

            <span>
              <CheckCircle2 size={15} />
              {mode}
            </span>

          </div>

        </div>

      </div>

      <p className="opportunity-description">
        {description}
      </p>

      <div className="opportunity-skills">

        {skills?.map((skill) => (
          <span key={skill}>
            {skill}
          </span>
        ))}

      </div>

      <div className="opportunity-divider" />

      <div className="opportunity-footer">

        <div className="opportunity-meta">

          <span>
            <CalendarDays size={16} />
            {deadline}
          </span>

          <strong>
            {salary}
          </strong>

        </div>

        <div className="opportunity-actions">

          <button
            type="button"
            className="save-opportunity"
            aria-label="حفظ الفرصة"
          >
            <Bookmark size={19} />
          </button>

          <Link
            to={`/opportunities/${id}`}
            className="btn btn-primary"
          >
            عرض التفاصيل
            <ArrowLeft size={17} />
          </Link>

        </div>

      </div>

    </article>
  );
}

export default OpportunityCard;