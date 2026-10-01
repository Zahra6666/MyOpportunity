import { Bookmark, Trash2, Search, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import PageContainer from "../../components/layout/PageContainer";
import {
  getSavedOpportunities,
  unsaveOpportunity,
} from "../../services/opportunityService";

import "./SavedOpportunities.css";

function extractSavedOpportunities(response) {
  if (Array.isArray(response)) {
    return response;
  }

  if (Array.isArray(response?.opportunities)) {
    return response.opportunities;
  }

  if (Array.isArray(response?.savedOpportunities)) {
    return response.savedOpportunities;
  }

  if (Array.isArray(response?.data)) {
    return response.data;
  }

  if (Array.isArray(response?.results)) {
    return response.results;
  }

  return [];
}

function normalizeOpportunity(opportunity) {
  return {
    id: opportunity?.id ?? opportunity?._id,

    title: opportunity?.title || opportunity?.name || "فرصة",

    company:
      opportunity?.company_name ||
      opportunity?.companyName ||
      opportunity?.company?.name ||
      opportunity?.company ||
      "—",

    type:
      opportunity?.type_name ||
      opportunity?.type ||
      opportunity?.opportunity_type ||
      "فرصة",

    location: opportunity?.location || "—",

    mode:
      opportunity?.mode ||
      opportunity?.work_mode ||
      opportunity?.workMode ||
      "—",

    match:
      opportunity?.match ??
      opportunity?.match_percentage ??
      opportunity?.matchPercentage ??
      null,
  };
}

function SavedOpportunities() {
  const [opportunities, setOpportunities] = useState([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [removingId, setRemovingId] = useState(null);

  useEffect(() => {
    loadSavedOpportunities();
  }, []);

  async function loadSavedOpportunities() {
    setLoading(true);
    setError("");

    try {
      const response = await getSavedOpportunities();

      const savedList = extractSavedOpportunities(response);

      setOpportunities(savedList.map(normalizeOpportunity));
    } catch (requestError) {
      setError(requestError?.message || "تعذر تحميل الفرص المحفوظة.");
    } finally {
      setLoading(false);
    }
  }

  async function handleRemove(opportunity) {
    if (!opportunity?.id) {
      return;
    }

    setRemovingId(opportunity.id);
    setError("");

    try {
      await unsaveOpportunity(opportunity.id);

      setOpportunities((currentOpportunities) =>
        currentOpportunities.filter(
          (currentOpportunity) => currentOpportunity.id !== opportunity.id,
        ),
      );
    } catch (requestError) {
      setError(requestError?.message || "تعذر إزالة الفرصة من المحفوظات.");
    } finally {
      setRemovingId(null);
    }
  }

  const filteredOpportunities = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return opportunities.filter((opportunity) => {
      const title = String(opportunity.title).toLowerCase();
      const company = String(opportunity.company).toLowerCase();
      const type = String(opportunity.type).toLowerCase();

      const matchesSearch =
        !searchValue ||
        title.includes(searchValue) ||
        company.includes(searchValue) ||
        type.includes(searchValue);

      const normalizedType = type.toLowerCase();

      let matchesType = true;

      if (typeFilter === "job") {
        matchesType =
          normalizedType.includes("وظيف") || normalizedType.includes("job");
      }

      if (typeFilter === "training") {
        matchesType =
          normalizedType.includes("تدريب") ||
          normalizedType.includes("training");
      }

      if (typeFilter === "scholarship") {
        matchesType =
          normalizedType.includes("منح") ||
          normalizedType.includes("scholarship");
      }

      return matchesSearch && matchesType;
    });
  }, [opportunities, search, typeFilter]);

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

            <h1>الفرص المحفوظة</h1>

            <p>الفرص التي حفظتها حتى ترجع لها وتقدم عليها لاحقاً.</p>
          </div>

          <div className="saved-count">
            <Bookmark size={16} />
            {opportunities.length} الفرص المحفوظة
          </div>
        </div>

        {error && <div className="saved-error">{error}</div>}

        <div className="saved-toolbar">
          <div className="saved-search">
            <Search size={16} />

            <input
              type="text"
              placeholder="ابحث ضمن الفرص المحفوظة..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <select
            value={typeFilter}
            onChange={(event) => setTypeFilter(event.target.value)}
          >
            <option value="all">جميع الفرص</option>

            <option value="job">وظائف</option>

            <option value="training">تدريب</option>

            <option value="scholarship">منح</option>
          </select>
        </div>

        {loading ? (
          <div className="saved-empty">
            <div>
              <Bookmark size={25} />
            </div>

            <h2>جارٍ تحميل الفرص المحفوظة...</h2>

            <p>يتم جلب الفرص المحفوظة من الخادم.</p>
          </div>
        ) : filteredOpportunities.length > 0 ? (
          <div className="saved-grid">
            {filteredOpportunities.map((opportunity) => (
              <article className="saved-card" key={opportunity.id}>
                <div className="saved-card-top">
                  <div className="saved-company-icon">
                    <Bookmark size={18} />
                  </div>

                  <button
                    type="button"
                    className="remove-saved"
                    aria-label="إزالة من المحفوظات"
                    disabled={removingId === opportunity.id}
                    onClick={() => handleRemove(opportunity)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <span className="saved-type">{opportunity.type || "فرصة"}</span>

                <h2>{opportunity.title}</h2>

                <p className="saved-company">{opportunity.company}</p>

                <div className="saved-meta">
                  <span>{opportunity.location}</span>
                  <span>{opportunity.mode}</span>
                </div>

                <div className="saved-bottom">
                  <div className="saved-match">
                    <strong>
                      {opportunity.match ?? "—"}
                      {opportunity.match !== null &&
                      opportunity.match !== undefined
                        ? "%"
                        : ""}
                    </strong>

                    <span>توافق</span>
                  </div>

                  <Link to={`/opportunities/${opportunity.id}`}>
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
              {opportunities.length > 0
                ? "لا توجد فرص مطابقة"
                : "ما عندك فرص محفوظة حالياً"}
            </h2>

            <p>
              {opportunities.length > 0
                ? "جرّب تغيير البحث أو الفلتر."
                : "احفظ الفرص اللي تهمك حتى ترجع لها بسهولة."}
            </p>

            {opportunities.length === 0 && (
              <Link to="/opportunities">استكشاف الفرص</Link>
            )}
          </div>
        )}
      </div>
    </PageContainer>
  );
}

export default SavedOpportunities;
