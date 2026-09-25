import {
  Bookmark,
  Trash2,
  Search,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

import PageContainer from "../../components/layout/PageContainer";
import { opportunities } from "../../data/opportunities";

import "./SavedOpportunities.css";

function SavedOpportunities() {
  const savedOpportunities =
    opportunities?.slice(0, 4) || [];

  return (
    <PageContainer className="saved-page">

      <div className="container">

        <div className="saved-header">

          <div>
            <div className="saved-breadcrumb">
              الرئيسية
              <span>/</span>
              الفرص المحفوظة
            </div>

            <h1>
              الفرص المحفوظة
            </h1>

            <p>
              الفرص التي حفظتها حتى ترجع لها
              وتقدم عليها لاحقاً.
            </p>
          </div>

          <div className="saved-count">
            <Bookmark size={16} />
            {savedOpportunities.length} الفرص المحفوظة
          </div>

        </div>


        <div className="saved-toolbar">

          <div className="saved-search">
            <Search size={16} />

            <input
              type="text"
              placeholder="ابحث ضمن الفرص المحفوظة..."
            />
          </div>

          <select defaultValue="all">
            <option value="all">
              جميع الفرص
            </option>

            <option value="job">
              وظائف
            </option>

            <option value="training">
              تدريب
            </option>

            <option value="scholarship">
              منح
            </option>
          </select>

        </div>


        {savedOpportunities.length > 0 ? (

          <div className="saved-grid">

            {savedOpportunities.map((opportunity) => (

              <article
                className="saved-card"
                key={opportunity.id}
              >

                <div className="saved-card-top">

                  <div className="saved-company-icon">
                    <Bookmark size={18} />
                  </div>

                  <button
                    type="button"
                    className="remove-saved"
                    aria-label="إزالة من المحفوظات"
                  >
                    <Trash2 size={16} />
                  </button>

                </div>


                <span className="saved-type">
                  {opportunity.type || "فرصة"}
                </span>


                <h2>
                  {opportunity.title}
                </h2>


                <p className="saved-company">
                  {opportunity.company}
                </p>


                <div className="saved-meta">

                  <span>
                    {opportunity.location}
                  </span>

                  <span>
                    {opportunity.mode}
                  </span>

                </div>


                <div className="saved-bottom">

                  <div className="saved-match">
                    <strong>
                      {opportunity.match || 90}%
                    </strong>

                    <span>
                      توافق
                    </span>
                  </div>

                  <Link
                    to={`/opportunities/${opportunity.id}`}
                  >
                    عرض الفرصة
                    <ArrowLeft size={15} />
                  </Link>

                </div>

              </article>

            ))}

          </div>

        ) : (

          <div className="saved-empty">

            <div>
              <Bookmark size={25} />
            </div>

            <h2>
              ما عندك فرص محفوظة حالياً
            </h2>

            <p>
              احفظ الفرص اللي تهمك حتى ترجع لها
              بسهولة.
            </p>

            <Link to="/opportunities">
              استكشاف الفرص
            </Link>

          </div>

        )}

      </div>

    </PageContainer>
  );
}

export default SavedOpportunities;