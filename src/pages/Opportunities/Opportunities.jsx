import {
  Search,
  SlidersHorizontal,
  MapPin,
  BriefcaseBusiness,
  ChevronDown,
  RotateCcw,
  Bookmark,
  Clock3,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import PageContainer from "../../components/layout/PageContainer";
import Badge from "../../components/common/Badge";
import { opportunities } from "../../data/opportunities";

import "./Opportunities.css";

function Opportunities() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [location, setLocation] = useState("all");
  const [mode, setMode] = useState("all");
  const [minMatch, setMinMatch] = useState(0);
  const [sort, setSort] = useState("match");
  const [mobileFilters, setMobileFilters] = useState(false);

  const filteredOpportunities = useMemo(() => {
    let result = [...(opportunities || [])];

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter((item) =>
        [
          item.title,
          item.titleEn,
          item.company,
          item.location,
          item.description,
          ...(item.skills || []),
        ]
          .filter(Boolean)
          .some((value) =>
            String(value).toLowerCase().includes(query)
          )
      );
    }

    if (category !== "all") {
      result = result.filter(
        (item) =>
          String(item.type || "").toLowerCase() ===
          category.toLowerCase()
      );
    }

    if (location !== "all") {
      result = result.filter((item) =>
        String(item.location || "")
          .toLowerCase()
          .includes(location.toLowerCase())
      );
    }

    if (mode !== "all") {
      result = result.filter((item) =>
        String(item.mode || "")
          .toLowerCase()
          .includes(mode.toLowerCase())
      );
    }

    result = result.filter(
      (item) => Number(item.match || 0) >= minMatch
    );

    if (sort === "match") {
      result.sort(
        (a, b) => Number(b.match || 0) - Number(a.match || 0)
      );
    }

    if (sort === "latest") {
      result.reverse();
    }

    return result;
  }, [
    search,
    category,
    location,
    mode,
    minMatch,
    sort,
  ]);

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

      {/* =================================
          PAGE HEADER
      ================================= */}

      <section className="opportunities-header">

        <div className="container">

          <div className="opportunities-breadcrumb">
            <Link to="/">الرئيسية</Link>
            <span>/</span>
            <strong>استكشف الفرص</strong>
          </div>

          <div className="opportunities-heading">

            <div>
              <span className="opportunities-overline">
                فرص مهنية وتعليمية
              </span>

              <h1>
                استكشف الفرص المتاحة
              </h1>

              <p>
                ابحث بين الوظائف والمنح والتدريبات
                والمسابقات والكورسات التي تناسبك.
              </p>
            </div>

            <div className="results-count">
              <strong>
                {filteredOpportunities.length}
              </strong>

              <span>فرصة متاحة</span>
            </div>

          </div>


          {/* Search */}

          <div className="opportunities-search">

            <div className="main-search">

              <Search size={19} />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ابحث عن مسمى وظيفي، شركة، مهارة..."
              />

            </div>


            <div className="search-location">

              <MapPin size={17} />

              <select
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value)
                }
              >
                <option value="all">
                  كل المحافظات
                </option>

                <option value="بغداد">
                  بغداد
                </option>

                <option value="البصرة">
                  البصرة
                </option>

                <option value="أربيل">
                  أربيل
                </option>

                <option value="النجف">
                  النجف
                </option>

                <option value="السليمانية">
                  السليمانية
                </option>
              </select>

            </div>


            <button
              type="button"
              className="opportunities-search-button"
            >
              بحث
              <Search size={16} />
            </button>

          </div>

        </div>

      </section>


      {/* =================================
          CONTENT
      ================================= */}

      <section className="opportunities-content">

        <div className="container opportunities-layout">


          {/* =================================
              FILTERS
          ================================= */}

          <aside
            className={`opportunities-filters ${
              mobileFilters
                ? "opportunities-filters-open"
                : ""
            }`}
          >

            <div className="filters-header">

              <div>
                <SlidersHorizontal size={17} />
                <h2>تصفية النتائج</h2>
              </div>

              <button
                type="button"
                onClick={resetFilters}
              >
                <RotateCcw size={14} />
                إعادة ضبط
              </button>

            </div>


            <div className="filter-section">

              <label>
                نوع الفرصة
              </label>

              <div className="filter-options">

                {[
                  ["all", "جميع الفرص"],
                  ["وظيفة", "وظائف"],
                  ["منحة", "منح دراسية"],
                  ["تدريب", "تدريب"],
                  ["مسابقة", "مسابقات"],
                  ["كورس", "كورسات"],
                ].map(([value, label]) => (

                  <label
                    className="filter-radio"
                    key={value}
                  >

                    <input
                      type="radio"
                      name="category"
                      value={value}
                      checked={category === value}
                      onChange={(e) =>
                        setCategory(e.target.value)
                      }
                    />

                    <span>{label}</span>

                  </label>

                ))}

              </div>

            </div>


            <div className="filter-divider" />


            <div className="filter-section">

              <label>
                مكان الفرصة
              </label>

              <div className="filter-select">

                <MapPin size={15} />

                <select
                  value={location}
                  onChange={(e) =>
                    setLocation(e.target.value)
                  }
                >
                  <option value="all">
                    كل المحافظات
                  </option>

                  <option value="بغداد">
                    بغداد
                  </option>

                  <option value="البصرة">
                    البصرة
                  </option>

                  <option value="أربيل">
                    أربيل
                  </option>

                  <option value="النجف">
                    النجف
                  </option>
                </select>

                <ChevronDown size={14} />

              </div>

            </div>


            <div className="filter-divider" />


            <div className="filter-section">

              <label>
                نوع العمل
              </label>

              <div className="filter-options">

                {[
                  ["all", "كل الأنواع"],
                  ["دوام كامل", "دوام كامل"],
                  ["دوام جزئي", "دوام جزئي"],
                  ["عن بعد", "عن بعد"],
                  ["تدريب", "تدريب"],
                ].map(([value, label]) => (

                  <label
                    className="filter-radio"
                    key={value}
                  >

                    <input
                      type="radio"
                      name="mode"
                      value={value}
                      checked={mode === value}
                      onChange={(e) =>
                        setMode(e.target.value)
                      }
                    />

                    <span>{label}</span>

                  </label>

                ))}

              </div>

            </div>


            <div className="filter-divider" />


            <div className="filter-section">

              <label>
                الحد الأدنى للتوافق
              </label>

              <div className="match-filter-value">
                {minMatch}%
              </div>

              <input
                className="match-range"
                type="range"
                min="0"
                max="100"
                step="5"
                value={minMatch}
                onChange={(e) =>
                  setMinMatch(Number(e.target.value))
                }
              />

              <div className="range-labels">
                <span>0%</span>
                <span>100%</span>
              </div>

            </div>


            <div className="filter-profile-box">

              <BriefcaseBusiness size={18} />

              <div>

                <strong>
                  حسّن نتائجك
                </strong>

                <p>
                  أضف سيرتك الذاتية للحصول على
                  نتائج أكثر ملاءمة لملفك.
                </p>

                <Link to="/cv/upload">
                  إضافة السيرة الذاتية
                </Link>

              </div>

            </div>

          </aside>


          {/* =================================
              RESULTS
          ================================= */}

          <div className="opportunities-results">

            <div className="mobile-filter-row">

              <button
                type="button"
                onClick={() =>
                  setMobileFilters(!mobileFilters)
                }
              >
                <SlidersHorizontal size={16} />
                الفلاتر
              </button>

              <span>
                {filteredOpportunities.length} نتائج
              </span>

            </div>


            <div className="results-toolbar">

              <div>

                <strong>
                  الفرص المتاحة
                </strong>

                <span>
                  {filteredOpportunities.length} فرصة
                </span>

              </div>

              <div className="sort-select">

                <span>ترتيب حسب</span>

                <select
                  value={sort}
                  onChange={(e) =>
                    setSort(e.target.value)
                  }
                >
                  <option value="match">
                    الأكثر توافقاً
                  </option>

                  <option value="latest">
                    الأحدث
                  </option>
                </select>

                <ChevronDown size={14} />

              </div>

            </div>


            {filteredOpportunities.length > 0 ? (

              <div className="explorer-grid">

                {filteredOpportunities.map(
                  (opportunity) => (

                    <ExplorerCard
                      key={opportunity.id}
                      opportunity={opportunity}
                    />

                  )
                )}

              </div>

            ) : (

              <div className="opportunities-empty">

                <div className="empty-icon">
                  <Search size={25} />
                </div>

                <h3>
                  ما لقينا فرص مطابقة
                </h3>

                <p>
                  جرّب تغيير البحث أو إزالة بعض الفلاتر.
                </p>

                <button
                  type="button"
                  onClick={resetFilters}
                >
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


/* =========================================
   EXPLORER CARD
========================================= */

function ExplorerCard({ opportunity }) {
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
    skills = [],
    deadline,
  } = opportunity;

  return (
    <article className="explorer-card">

      <div className="explorer-card-top">

        <div className="explorer-company-logo">
          <BriefcaseBusiness size={20} />
        </div>

        <div className="explorer-card-title">

          <Badge variant="type">
            {type || "فرصة"}
          </Badge>

          <h3>{title}</h3>

          {titleEn && (
            <span>{titleEn}</span>
          )}

        </div>

        <button
          type="button"
          className="explorer-save"
          aria-label="حفظ الفرصة"
        >
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
          {deadline}
        </span>

      </div>


      <p className="explorer-description">
        {description}
      </p>


      <div className="explorer-skills">

        {skills.slice(0, 4).map((skill) => (
          <span key={skill}>
            {skill}
          </span>
        ))}

      </div>


      <div className="explorer-match">

        <div>

          <strong>
            {match || 0}%
          </strong>

          <span>
            نسبة التوافق
          </span>

        </div>

        <div className="explorer-match-bar">
          <span
            style={{
              width: `${match || 0}%`,
            }}
          />
        </div>

      </div>


      <div className="explorer-footer">

        <strong>
          {salary}
        </strong>

        <Link to={`/opportunities/${id}`}>
          عرض التفاصيل
          <span>←</span>
        </Link>

      </div>

    </article>
  );
}

export default Opportunities;