import {
  Search,
  SlidersHorizontal,
  MapPin,
  BriefcaseBusiness,
  ChevronDown,
  RotateCcw,
  Bookmark,
  Clock3,
  ArrowLeft,
  Building2,
  Plus,
} from "lucide-react";

import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import PageContainer from "../../components/layout/PageContainer";
import Badge from "../../components/common/Badge";
import {
  getOpportunities,
  getSavedOpportunities,
  saveOpportunity,
  unsaveOpportunity,
} from "../../services/opportunityService";

import "./Opportunities.css";

function getCurrentUserRole() {
  try {
    const storedUser =
      localStorage.getItem("user") ||
      localStorage.getItem("currentUser") ||
      localStorage.getItem("authUser");

    if (storedUser) {
      const user = JSON.parse(storedUser);

      if (user?.role) {
        return String(user.role).toLowerCase();
      }

      if (user?.role_name) {
        return String(user.role_name).toLowerCase();
      }
    }
  } catch {
    // Ignore invalid stored user data.
  }

  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    return String(
      payload?.role || payload?.role_name || payload?.user?.role || "",
    ).toLowerCase();
  } catch {
    return null;
  }
}

function Opportunities() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [location, setLocation] = useState("all");
  const [mode, setMode] = useState("all");
  const [minMatch, setMinMatch] = useState(0);
  const [sort, setSort] = useState("match");
  const [mobileFilters, setMobileFilters] = useState(false);
  const [opportunities, setOpportunities] = useState([]);
  const [savedIds, setSavedIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userRole = getCurrentUserRole();
  const canPostOpportunity = userRole === "admin" || userRole === "company";

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getOpportunities();

        setOpportunities(Array.isArray(response?.data) ? response.data : []);

        try {
          const savedResponse = await getSavedOpportunities();

          const savedList = extractSavedOpportunities(savedResponse);

          setSavedIds(
            new Set(
              savedList
                .map((item) => item?.id ?? item?._id)
                .filter((savedId) => savedId !== null && savedId !== undefined)
                .map(String),
            ),
          );
        } catch {
          setSavedIds(new Set());
        }
      } catch (error) {
        setError(error.message || "فشل تحميل الفرص.");
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, []);

  const handleSaveChange = (id, saved) => {
    setSavedIds((current) => {
      const next = new Set(current);

      if (saved) {
        next.add(String(id));
      } else {
        next.delete(String(id));
      }

      return next;
    });
  };

  const filteredOpportunities = useMemo(() => {
    let result = [...opportunities];

    if (search.trim()) {
      const query = search.trim().toLowerCase();

      result = result.filter((item) => {
        const searchableValues = [
          item.title,
          item.titleEn,
          item.company,
          item.company_name,
          item.location,
          item.description,
          item.type,
          item.type_name,
          item.category,
          item.category_name,
          item.mode,
          ...(Array.isArray(item.skills) ? item.skills : []),
        ];

        return searchableValues
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(query));
      });
    }

    if (category !== "all") {
      result = result.filter((item) => {
        const value = item.type || item.category || item.category_name || "";

        return String(value).toLowerCase().includes(category.toLowerCase());
      });
    }

    if (location !== "all") {
      result = result.filter((item) =>
        String(item.location || "")
          .toLowerCase()
          .includes(location.toLowerCase()),
      );
    }

    if (mode !== "all") {
      result = result.filter((item) =>
        String(item.mode || item.work_mode || item.work_type || "")
          .toLowerCase()
          .includes(mode.toLowerCase()),
      );
    }

    result = result.filter((item) => {
      const match = Number(item.match ?? item.match_percentage ?? 0);

      return match >= minMatch;
    });

    if (sort === "match") {
      result.sort(
        (a, b) =>
          Number(b.match ?? b.match_percentage ?? 0) -
          Number(a.match ?? a.match_percentage ?? 0),
      );
    }

    if (sort === "latest") {
      result.sort((a, b) => {
        const dateA = new Date(
          a.posted_at || a.posted || a.created_at || 0,
        ).getTime();

        const dateB = new Date(
          b.posted_at || b.posted || b.created_at || 0,
        ).getTime();

        return dateB - dateA;
      });
    }

    return result;
  }, [opportunities, search, category, location, mode, minMatch, sort]);

  const resetFilters = () => {
    setSearch("");
    setCategory("all");
    setLocation("all");
    setMode("all");
    setMinMatch(0);
    setSort("match");
  };

  return (
    <PageContainer className="opportunities-page">
      <section className="opportunities-header">
        <div className="container">
          <div className="opportunities-breadcrumb">
            <Link to="/">الرئيسية</Link>

            <span>/</span>

            <strong>استكشف الفرص</strong>
          </div>

          <div className="opportunities-heading">
            <div className="opportunities-heading-content">
              <span className="opportunities-overline">فرص مهنية وتعليمية</span>

              <h1>استكشف الفرص المتاحة</h1>

              <p>
                ابحث بين الوظائف والمنح والتدريبات والمسابقات والكورسات التي
                تناسبك.
              </p>
            </div>

            <div className="opportunities-heading-actions">
              {canPostOpportunity && (
                <Link
                  to="/opportunities/create"
                  className="post-opportunity-button"
                >
                  <Plus size={17} />
                  نشر فرصة
                </Link>
              )}

              <div className="results-count">
                <strong>{filteredOpportunities.length}</strong>

                <span>فرصة متاحة</span>
              </div>
            </div>
          </div>

          <div className="opportunities-search">
            <div className="main-search">
              <Search size={19} />

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="ابحث عن فرصة، شركة، مهارة..."
              />
            </div>

            <div className="search-location">
              <MapPin size={17} />

              <select
                value={location}
                onChange={(event) => setLocation(event.target.value)}
              >
                <option value="all">كل المحافظات</option>
                <option value="بغداد">بغداد</option>
                <option value="البصرة">البصرة</option>
                <option value="أربيل">أربيل</option>
                <option value="النجف">النجف</option>
                <option value="السليمانية">السليمانية</option>
              </select>

              <ChevronDown size={14} />
            </div>

            <button
              type="button"
              className="opportunities-search-button"
              onClick={() => {}}
            >
              بحث
              <Search size={16} />
            </button>
          </div>
        </div>
      </section>

      <section className="opportunities-content">
        <div className="container opportunities-layout">
          <aside
            className={`opportunities-filters ${
              mobileFilters ? "opportunities-filters-open" : ""
            }`}
          >
            <div className="filters-header">
              <div>
                <SlidersHorizontal size={17} />
                <h2>تصفية النتائج</h2>
              </div>

              <button type="button" onClick={resetFilters}>
                <RotateCcw size={14} />
                إعادة ضبط
              </button>
            </div>

            <div className="filter-section">
              <label>نوع الفرصة</label>

              <div className="filter-options">
                {[
                  ["all", "جميع الفرص"],
                  ["وظيفة", "وظائف"],
                  ["منحة", "منح دراسية"],
                  ["تدريب", "تدريب"],
                  ["مسابقة", "مسابقات"],
                  ["كورس", "كورسات"],
                ].map(([value, label]) => (
                  <label className="filter-radio" key={value}>
                    <input
                      type="radio"
                      name="category"
                      value={value}
                      checked={category === value}
                      onChange={(event) => setCategory(event.target.value)}
                    />

                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-divider" />

            <div className="filter-section">
              <label>مكان الفرصة</label>

              <div className="filter-select">
                <MapPin size={15} />

                <select
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                >
                  <option value="all">كل المحافظات</option>
                  <option value="بغداد">بغداد</option>
                  <option value="البصرة">البصرة</option>
                  <option value="أربيل">أربيل</option>
                  <option value="النجف">النجف</option>
                  <option value="السليمانية">السليمانية</option>
                </select>

                <ChevronDown size={14} />
              </div>
            </div>

            <div className="filter-divider" />

            <div className="filter-section">
              <label>نوع العمل</label>

              <div className="filter-options">
                {[
                  ["all", "كل الأنواع"],
                  ["دوام كامل", "دوام كامل"],
                  ["دوام جزئي", "دوام جزئي"],
                  ["عن بعد", "عن بعد"],
                  ["تدريب", "تدريب"],
                ].map(([value, label]) => (
                  <label className="filter-radio" key={value}>
                    <input
                      type="radio"
                      name="mode"
                      value={value}
                      checked={mode === value}
                      onChange={(event) => setMode(event.target.value)}
                    />

                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-divider" />

            <div className="filter-section">
              <label>الحد الأدنى للتوافق</label>

              <div className="match-filter-value">{minMatch}%</div>

              <input
                className="match-range"
                type="range"
                min="0"
                max="100"
                step="5"
                value={minMatch}
                onChange={(event) => setMinMatch(Number(event.target.value))}
              />

              <div className="range-labels">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>

            <div className="filter-profile-box">
              <BriefcaseBusiness size={18} />

              <div>
                <strong>حسّن نتائجك</strong>

                <p>أضف سيرتك الذاتية للحصول على نتائج أكثر ملاءمة لملفك.</p>

                <Link to="/cv/upload">إضافة السيرة الذاتية</Link>
              </div>
            </div>
          </aside>

          <div className="opportunities-results">
            <div className="mobile-filter-row">
              <button
                type="button"
                onClick={() => setMobileFilters(!mobileFilters)}
              >
                <SlidersHorizontal size={16} />
                الفلاتر
              </button>

              <span>{filteredOpportunities.length} نتائج</span>
            </div>

            <div className="results-toolbar">
              <div>
                <strong>الفرص المتاحة</strong>

                <span>{filteredOpportunities.length} فرصة</span>
              </div>

              <div className="sort-select">
                <span>ترتيب حسب</span>

                <select
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                >
                  <option value="match">الأكثر توافقاً</option>

                  <option value="latest">الأحدث</option>
                </select>

                <ChevronDown size={14} />
              </div>
            </div>

            {loading ? (
              <div className="opportunities-empty">
                <div className="empty-icon">
                  <Search size={25} />
                </div>

                <h3>جاري تحميل الفرص...</h3>
              </div>
            ) : error ? (
              <div className="opportunities-empty">
                <div className="empty-icon">
                  <Search size={25} />
                </div>

                <h3>{error}</h3>
              </div>
            ) : filteredOpportunities.length > 0 ? (
              <div className="explorer-grid">
                {filteredOpportunities.map((opportunity, index) => (
                  <ExplorerCard
                    key={opportunity.id ?? opportunity._id ?? index}
                    opportunity={opportunity}
                    index={index}
                    isSaved={savedIds.has(
                      String(opportunity.id ?? opportunity._id),
                    )}
                    onSaveChange={handleSaveChange}
                  />
                ))}
              </div>
            ) : (
              <div className="opportunities-empty">
                <div className="empty-icon">
                  <Search size={25} />
                </div>

                <h3>لم نعثر على فرص مطابقة</h3>

                <p>جرّب تغيير البحث أو إزالة بعض الفلاتر.</p>

                <button type="button" onClick={resetFilters}>
                  إعادة ضبط الفلاتر
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </PageContainer>
  );
}

function ExplorerCard({ opportunity, index, isSaved, onSaveChange }) {
  const [saving, setSaving] = useState(false);

  const id = opportunity.id ?? opportunity._id ?? index;

  const title = opportunity.title || opportunity.name || "فرصة متاحة";

  const company =
    opportunity.company ||
    opportunity.company_name ||
    opportunity.company?.name ||
    "جهة ناشرة";

  const location = opportunity.location || "العراق";

  const type = getOpportunityType(opportunity);

  const category = getOpportunityCategory(opportunity);

  const match = opportunity.match ?? opportunity.match_percentage ?? 0;

  // Use this opportunity's own deadline directly from the backend.
  const deadline =
    opportunity.deadline || opportunity.application_deadline || "Not specified";

  const description =
    opportunity.description || "اكتشف تفاصيل هذه الفرصة والمتطلبات الخاصة بها.";

  const skills = Array.isArray(opportunity.skills) ? opportunity.skills : [];

  const handleSave = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    try {
      setSaving(true);

      if (isSaved) {
        await unsaveOpportunity(id);
        onSaveChange(id, false);
      } else {
        await saveOpportunity(id);
        onSaveChange(id, true);
      }
    } catch (error) {
      console.error("SAVE OPPORTUNITY ERROR:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <article
      className="explorer-card"
      style={{
        "--card-index": index,
      }}
    >
      <div className="explorer-card-top">
        <div className="explorer-company-logo">
          {opportunity.company_logo || opportunity.company?.logo ? (
            <img
              src={opportunity.company_logo || opportunity.company?.logo}
              alt={company}
            />
          ) : (
            <Building2 size={21} />
          )}
        </div>

        <div className="explorer-card-title">
          <Badge variant="type">{type}</Badge>

          <h3>{title}</h3>
        </div>

        <button
          type="button"
          className={`explorer-save ${isSaved ? "explorer-save-active" : ""}`}
          aria-label={isSaved ? "إزالة من المحفوظات" : "حفظ الفرصة"}
          onClick={handleSave}
          disabled={saving}
        >
          <Bookmark size={17} fill={isSaved ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="explorer-company">
        <span>
          <BriefcaseBusiness size={14} />
          {company}
        </span>

        <span>
          <MapPin size={14} />
          {location}
        </span>
      </div>

      <div className="explorer-details">
        <span>
          <BriefcaseBusiness size={14} />
          التصنيف: {category}
        </span>

        <span>
          <Clock3 size={14} />
          Due date: {formatOpportunityDate(deadline)}
        </span>
      </div>

      <p className="explorer-description">{description}</p>

      {skills.length > 0 && (
        <div className="explorer-skills">
          {skills.slice(0, 4).map((skill, skillIndex) => (
            <span key={`${skill}-${skillIndex}`}>{skill}</span>
          ))}
        </div>
      )}

      <div className="explorer-match">
        <div>
          <strong>{match}%</strong>
          <span>نسبة التوافق</span>
        </div>

        <div className="explorer-match-bar">
          <span
            style={{
              width: `${Math.min(Math.max(Number(match), 0), 100)}%`,
            }}
          />
        </div>
      </div>

      <div className="explorer-footer">
        <span className="explorer-opportunity-label">فرصة مناسبة لك</span>

        <Link to={`/opportunities/${id}`}>
          عرض التفاصيل
          <ArrowLeft size={16} />
        </Link>
      </div>
    </article>
  );
}

function getOpportunityType(opportunity) {
  const directType =
    opportunity.type_name ||
    opportunity.typeName ||
    opportunity.opportunity_type ||
    opportunity.opportunityType;

  if (directType) {
    return translateOpportunityType(directType);
  }

  if (typeof opportunity.type === "string") {
    return translateOpportunityType(opportunity.type);
  }

  if (opportunity.type && typeof opportunity.type === "object") {
    const nestedType =
      opportunity.type.name ||
      opportunity.type.type_name ||
      opportunity.type.label;

    if (nestedType) {
      return translateOpportunityType(nestedType);
    }
  }

  if (opportunity.type_id !== undefined && opportunity.type_id !== null) {
    const typeTranslations = {
      1: "وظيفة",
      2: "تدريب",
      3: "دورة تدريبية",
      4: "تدريب",
    };

    return typeTranslations[Number(opportunity.type_id)] || "غير محدد";
  }

  return "غير محدد";
}

function translateOpportunityType(value) {
  const normalized = String(value).trim().toLowerCase();

  const translations = {
    job: "وظيفة",
    jobs: "وظيفة",
    internship: "تدريب",
    internships: "تدريب",
    course: "دورة تدريبية",
    courses: "دورة تدريبية",
    training: "تدريب",
    "full-time": "وظيفة",
    "part-time": "وظيفة",
  };

  return translations[normalized] || value;
}

function getOpportunityCategory(opportunity) {
  const directCategory = opportunity.category_name || opportunity.categoryName;

  if (directCategory) {
    return translateOpportunityCategory(directCategory);
  }

  if (typeof opportunity.category === "string") {
    return translateOpportunityCategory(opportunity.category);
  }

  if (opportunity.category && typeof opportunity.category === "object") {
    const nestedCategory =
      opportunity.category.name ||
      opportunity.category.category_name ||
      opportunity.category.label;

    if (nestedCategory) {
      return translateOpportunityCategory(nestedCategory);
    }
  }

  if (
    opportunity.category_id !== undefined &&
    opportunity.category_id !== null
  ) {
    const categoryTranslations = {
      10: "التكنولوجيا",
      11: "الهندسة",
      12: "الطب",
      13: "الأعمال",
      14: "الفنون والتصميم",
      15: "العلوم",
      16: "التعليم",
      17: "الإعلام",
      18: "القانون",
      19: "المالية",
    };

    return categoryTranslations[Number(opportunity.category_id)] || "غير محدد";
  }

  return "غير محدد";
}

function translateOpportunityCategory(value) {
  const normalized = String(value).trim().toLowerCase().replace(/\s+/g, " ");

  const translations = {
    technology: "التكنولوجيا",
    engineering: "الهندسة",
    medicine: "الطب",
    business: "الأعمال",
    art: "الفنون والتصميم",
    "arts and design": "الفنون والتصميم",
    science: "العلوم",
    education: "التعليم",
    media: "الإعلام",
    law: "القانون",
    finance: "المالية",
  };

  return translations[normalized] || value;
}

function formatOpportunityDate(value) {
  if (!value) {
    return "Not specified";
  }

  const stringValue = String(value).trim();

  const dateOnlyMatch = stringValue.match(/^(\d{4})-(\d{2})-(\d{2})/);

  if (dateOnlyMatch) {
    const [, year, month, day] = dateOnlyMatch;

    const date = new Date(Number(year), Number(month) - 1, Number(day));

    if (!Number.isNaN(date.getTime())) {
      return date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return stringValue;
  }

  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function extractSavedOpportunities(response) {
  if (Array.isArray(response)) {
    return response;
  }

  if (Array.isArray(response?.data)) {
    return response.data;
  }

  if (Array.isArray(response?.opportunities)) {
    return response.opportunities;
  }

  if (Array.isArray(response?.savedOpportunities)) {
    return response.savedOpportunities;
  }

  if (Array.isArray(response?.results)) {
    return response.results;
  }

  return [];
}

export default Opportunities;
