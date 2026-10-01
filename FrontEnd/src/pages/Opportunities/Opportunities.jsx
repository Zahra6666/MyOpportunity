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
} from "lucide-react";

import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import PageContainer from "../../components/layout/PageContainer";
import Badge from "../../components/common/Badge";
import { getOpportunities } from "../../services/opportunityService";

import "./Opportunities.css";

function Opportunities() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [location, setLocation] = useState("all");
  const [mode, setMode] = useState("all");
  const [minMatch, setMinMatch] = useState(0);
  const [sort, setSort] = useState("match");
  const [mobileFilters, setMobileFilters] = useState(false);
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  console.log("API opportunities:", opportunities);

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getOpportunities();

        setOpportunities(Array.isArray(response?.data) ? response.data : []);
      } catch (error) {
        setError(error.message || "فشل تحميل الفرص.");
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, []);

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
            <div>
              <span className="opportunities-overline">فرص مهنية وتعليمية</span>

              <h1>استكشف الفرص المتاحة</h1>

              <p>
                ابحث بين الوظائف والمنح والتدريبات والمسابقات والكورسات التي
                تناسبك.
              </p>
            </div>

            <div className="results-count">
              <strong>{filteredOpportunities.length}</strong>

              <span>فرصة متاحة</span>
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

            {filteredOpportunities.length > 0 ? (
              <div className="explorer-grid">
                {filteredOpportunities.map((opportunity, index) => (
                  <ExplorerCard
                    key={opportunity.id ?? opportunity._id ?? index}
                    opportunity={opportunity}
                    index={index}
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

function ExplorerCard({ opportunity, index }) {
  const id = opportunity.id ?? opportunity._id ?? index;

  const title = opportunity.title || opportunity.name || "فرصة متاحة";

  const company =
    opportunity.company ||
    opportunity.company_name ||
    opportunity.company?.name ||
    "جهة ناشرة";

  const location = opportunity.location || "العراق";

  const type =
    opportunity.type ||
    opportunity.category ||
    opportunity.category_name ||
    "فرصة";

  const mode =
    opportunity.mode ||
    opportunity.work_mode ||
    opportunity.work_type ||
    "غير محدد";

  const match = opportunity.match ?? opportunity.match_percentage ?? 0;

  const deadline =
    opportunity.deadline || opportunity.application_deadline || "غير محدد";

  const description =
    opportunity.description || "اكتشف تفاصيل هذه الفرصة والمتطلبات الخاصة بها.";

  const skills = Array.isArray(opportunity.skills) ? opportunity.skills : [];

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

        <button type="button" className="explorer-save" aria-label="حفظ الفرصة">
          <Bookmark size={17} />
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
          {mode}
        </span>

        <span>
          <Clock3 size={14} />
          آخر موعد: {deadline}
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

export default Opportunities;
