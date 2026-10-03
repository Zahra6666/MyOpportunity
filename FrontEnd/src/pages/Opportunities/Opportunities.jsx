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
  getOpportunityMatch,
  getOpportunityMatches,
  getCategories,
  getTypes,
} from "../../services/opportunityService";
import { getMyCV } from "../../services/cvService";

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
  const [type, setType] = useState("all");
  const [location, setLocation] = useState("all");
  const [minMatch, setMinMatch] = useState(0);
  const [sort, setSort] = useState("match");
  const [mobileFilters, setMobileFilters] = useState(false);

  const [opportunities, setOpportunities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [savedIds, setSavedIds] = useState(new Set());

  const [cvStatus, setCvStatus] = useState("loading");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userRole = getCurrentUserRole();
  const canPostOpportunity = userRole === "admin" || userRole === "company";

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        setLoading(true);
        setError("");

        const opportunitiesResponse = await getOpportunities();

        const opportunitiesData = Array.isArray(opportunitiesResponse?.data)
          ? opportunitiesResponse.data
          : [];

        setOpportunities(opportunitiesData);

        try {
          const [categoriesResponse, typesResponse] = await Promise.all([
            getCategories(),
            getTypes(),
          ]);

          setCategories(
            Array.isArray(categoriesResponse?.data)
              ? categoriesResponse.data
              : [],
          );

          setTypes(
            Array.isArray(typesResponse?.data) ? typesResponse.data : [],
          );
        } catch (filterError) {
          console.error("Failed to load categories or types:", filterError);

          setCategories([]);
          setTypes([]);
        }

        const token = localStorage.getItem("token");

        if (token) {
          try {
            const cvResponse = await getMyCV();

            const cvData =
              cvResponse?.data ??
              cvResponse?.cv ??
              cvResponse?.userCv ??
              cvResponse;

            const hasCV =
              cvData &&
              typeof cvData === "object" &&
              Object.keys(cvData).length > 0;

            setCvStatus(hasCV ? "has-cv" : "missing");
          } catch (cvError) {
            console.error("Failed to check user's CV:", cvError);

            setCvStatus("error");
          }
        } else {
          setCvStatus("missing");
        }

        if (token && opportunitiesData.length > 0) {
          try {
            let matches = [];

            try {
              const matchesResponse = await getOpportunityMatches();

              if (Array.isArray(matchesResponse?.data)) {
                matches = matchesResponse.data;
              }
            } catch (allMatchesError) {
              console.error(
                "Failed to load all opportunity matches:",
                allMatchesError,
              );
            }

            const existingMatchIds = new Set(
              matches
                .map(
                  (match) =>
                    match?.opportunity_id ?? match?.opportunityId ?? match?.id,
                )
                .filter((id) => id !== undefined && id !== null)
                .map(String),
            );

            const missingMatchOpportunities = opportunitiesData.filter(
              (opportunity) => {
                const opportunityId = opportunity.id ?? opportunity._id;

                return (
                  opportunityId !== undefined &&
                  opportunityId !== null &&
                  !existingMatchIds.has(String(opportunityId))
                );
              },
            );

            if (missingMatchOpportunities.length > 0) {
              const individualMatchResults = await Promise.allSettled(
                missingMatchOpportunities.map(async (opportunity) => {
                  const opportunityId = opportunity.id ?? opportunity._id;

                  const response = await getOpportunityMatch(opportunityId);

                  if (!response?.data) {
                    return null;
                  }

                  return {
                    opportunity_id: opportunityId,
                    ...response.data,
                  };
                }),
              );

              const individualMatches = individualMatchResults
                .filter(
                  (result) =>
                    result.status === "fulfilled" && result.value !== null,
                )
                .map((result) => result.value);

              matches = [...matches, ...individualMatches];
            }

            const matchesMap = new Map();

            matches.forEach((match) => {
              const opportunityId =
                match?.opportunity_id ?? match?.opportunityId ?? match?.id;

              if (opportunityId !== undefined && opportunityId !== null) {
                matchesMap.set(String(opportunityId), match);
              }
            });

            const mergedOpportunities = opportunitiesData.map((opportunity) => {
              const opportunityId = opportunity.id ?? opportunity._id;

              const match = matchesMap.get(String(opportunityId));

              if (!match) {
                return opportunity;
              }

              const rawMatchPercentage =
                match.match_percentage ?? match.matchPercentage ?? match.match;

              const matchPercentage = Number(rawMatchPercentage);

              return {
                ...opportunity,

                match_percentage: Number.isFinite(matchPercentage)
                  ? matchPercentage
                  : null,

                match: Number.isFinite(matchPercentage)
                  ? matchPercentage
                  : null,

                matching_skills:
                  match.matched_skills || match.matching_skills || [],

                matchingSkills:
                  match.matched_skills || match.matching_skills || [],

                missing_skills: match.missing_skills || [],

                missingSkills: match.missing_skills || [],

                experience_match: match.experience_match,

                education_match: match.education_match,

                match_reason: match.reason || match.match_reason || "",

                matchReason: match.reason || match.match_reason || "",
              };
            });

            const missingOpportunities = matches
              .filter((match) => {
                const matchId =
                  match?.opportunity_id ?? match?.opportunityId ?? match?.id;

                return (
                  matchId !== undefined &&
                  matchId !== null &&
                  !opportunitiesData.some(
                    (opportunity) =>
                      String(opportunity.id ?? opportunity._id) ===
                      String(matchId),
                  )
                );
              })
              .map((match) => {
                const rawMatchPercentage =
                  match.match_percentage ??
                  match.matchPercentage ??
                  match.match;

                const matchPercentage = Number(rawMatchPercentage);

                return {
                  id: match.opportunity_id ?? match.opportunityId ?? match.id,

                  title: match.title || "فرصة متاحة",

                  company_name:
                    match.company_name || match.companyName || "جهة ناشرة",

                  match_percentage: Number.isFinite(matchPercentage)
                    ? matchPercentage
                    : null,

                  match: Number.isFinite(matchPercentage)
                    ? matchPercentage
                    : null,

                  matching_skills:
                    match.matched_skills || match.matching_skills || [],

                  missing_skills: match.missing_skills || [],

                  experience_match: match.experience_match,

                  education_match: match.education_match,

                  match_reason: match.reason || match.match_reason || "",

                  matchReason: match.reason || match.match_reason || "",
                };
              });

            if (missingOpportunities.length > 0) {
              mergedOpportunities.push(...missingOpportunities);
            }

            setOpportunities(mergedOpportunities);
          } catch (matchError) {
            console.error("Failed to load opportunity matches:", matchError);
          }
        }

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

  const lowestMatch = useMemo(() => {
    const validMatches = opportunities
      .map((item) => {
        const value = Number(item.match ?? item.match_percentage);

        return Number.isFinite(value) && value >= 0 && value <= 100
          ? value
          : null;
      })
      .filter((value) => value !== null);

    if (validMatches.length === 0) {
      return 0;
    }

    return Math.min(...validMatches);
  }, [opportunities]);

  useEffect(() => {
    if (minMatch < lowestMatch) {
      setMinMatch(lowestMatch);
    }
  }, [lowestMatch, minMatch]);

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
          ...(Array.isArray(item.skills) ? item.skills : []),
        ];

        return searchableValues
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(query));
      });
    }

    if (type !== "all") {
      result = result.filter((item) => {
        const value =
          item.type_name ||
          item.typeName ||
          item.type ||
          item.opportunity_type ||
          item.opportunityType ||
          "";

        return String(value).toLowerCase().includes(type.toLowerCase());
      });
    }

    if (category !== "all") {
      result = result.filter((item) => {
        const value =
          item.category_name || item.categoryName || item.category || "";

        return String(value).toLowerCase().includes(category.toLowerCase());
      });
    }

    if (location !== "all") {
      result = result.filter((item) =>
        normalizeLocation(item.location).includes(normalizeLocation(location)),
      );
    }

    result = result.filter((item) => {
      const rawMatch = item.match ?? item.match_percentage;

      const match = Number(rawMatch);

      if (!Number.isFinite(match)) {
        return minMatch <= 0;
      }

      return match >= minMatch;
    });

    if (sort === "match") {
      result.sort((a, b) => {
        const matchA = Number(a.match ?? a.match_percentage);

        const matchB = Number(b.match ?? b.match_percentage);

        const safeA = Number.isFinite(matchA) ? matchA : -1;

        const safeB = Number.isFinite(matchB) ? matchB : -1;

        return safeB - safeA;
      });
    }

    if (sort === "lowest-match") {
      result.sort((a, b) => {
        const matchA = Number(a.match ?? a.match_percentage);

        const matchB = Number(b.match ?? b.match_percentage);

        const safeA = Number.isFinite(matchA) ? matchA : 101;

        const safeB = Number.isFinite(matchB) ? matchB : 101;

        return safeA - safeB;
      });
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
  }, [opportunities, search, category, type, location, minMatch, sort]);

  const resetFilters = () => {
    setSearch("");
    setCategory("all");
    setType("all");
    setLocation("all");
    setMinMatch(lowestMatch);
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

          <div className="main-search">
            <Search size={19} />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="ابحث عن فرصة، شركة، مهارة..."
              aria-label="البحث عن فرصة"
            />

            {search && (
              <button
                type="button"
                className="search-clear"
                onClick={() => setSearch("")}
                aria-label="مسح البحث"
              >
                ×
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="opportunities-content">
        <div className="container opportunities-layout">
          <aside
            className={`opportunities-filters ${mobileFilters ? "opportunities-filters-open" : ""
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
                <label className="filter-radio">
                  <input
                    type="radio"
                    name="type"
                    value="all"
                    checked={type === "all"}
                    onChange={(event) => setType(event.target.value)}
                  />

                  <span>جميع الفرص</span>
                </label>

                {types.map((item) => {
                  const value = item.id ?? item.name ?? item.type_name;

                  const label = item.name ?? item.type_name ?? item.label;

                  if (value === undefined || value === null || !label) {
                    return null;
                  }

                  return (
                    <label className="filter-radio" key={String(value)}>
                      <input
                        type="radio"
                        name="type"
                        value={String(label)}
                        checked={type === String(label)}
                        onChange={(event) => setType(event.target.value)}
                      />

                      <span>{translateOpportunityType(label)}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="filter-divider" />

            <div className="filter-section">
              <label>التصنيف</label>

              <div className="filter-options">
                <label className="filter-radio">
                  <input
                    type="radio"
                    name="category"
                    value="all"
                    checked={category === "all"}
                    onChange={(event) => setCategory(event.target.value)}
                  />

                  <span>جميع التصنيفات</span>
                </label>

                {categories.map((item) => {
                  const value = item.id ?? item.name ?? item.category_name;

                  const label = item.name ?? item.category_name ?? item.label;

                  if (value === undefined || value === null || !label) {
                    return null;
                  }

                  return (
                    <label className="filter-radio" key={String(value)}>
                      <input
                        type="radio"
                        name="category"
                        value={String(label)}
                        checked={category === String(label)}
                        onChange={(event) => setCategory(event.target.value)}
                      />

                      <span>{translateOpportunityCategory(label)}</span>
                    </label>
                  );
                })}
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
              <label>الحد الأدنى للتوافق</label>

              <div className="match-filter-value">{minMatch}%</div>

              <input
                className="match-range"
                type="range"
                min={lowestMatch}
                max="100"
                step="5"
                value={Math.max(minMatch, lowestMatch)}
                onChange={(event) =>
                  setMinMatch(Math.max(Number(event.target.value), lowestMatch))
                }
              />

              <div className="range-labels">
                <span>{lowestMatch}%</span>

                <span>100%</span>
              </div>
            </div>

            {cvStatus === "missing" && (
              <div className="filter-profile-box">
                <BriefcaseBusiness size={18} />

                <div>
                  <strong>حسّن نتائجك</strong>

                  <p>أضف سيرتك الذاتية للحصول على نتائج أكثر ملاءمة لملفك.</p>

                  <Link to="/cv/upload">إضافة السيرة الذاتية</Link>
                </div>
              </div>
            )}
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

                  <option value="lowest-match">الأقل توافقاً</option>

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

  const rawMatch = opportunity.match ?? opportunity.match_percentage;

  const match = Number(rawMatch);

  const hasMatch = Number.isFinite(match);

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
          <Building2 size={21} />
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
          <strong>{hasMatch ? `${match}%` : "—"}</strong>

          <span>نسبة التوافق</span>
        </div>

        <div className="explorer-match-bar">
          <span
            style={{
              width: hasMatch ? `${Math.min(Math.max(match, 0), 100)}%` : "0%",
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
      2: "منحة",
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
    course: "كورس",
    courses: "كورس",
    training: "برنامج تدريبي",
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

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const monthName = monthNames[Number(month) - 1];

    if (monthName) {
      return `${monthName} ${Number(day)}, ${year}`;
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



function normalizeLocation(value) {
  const names = {
    baghdad: "بغداد",
    basra: "البصرة",
    basrah: "البصرة",
    erbil: "أربيل",
    najaf: "النجف",
    sulaymaniyah: "السليمانية",
    sulaimani: "السليمانية",
  };

  let result = String(value || "").toLowerCase();

  Object.entries(names).forEach(([english, arabic]) => {
    result = result.replaceAll(english, arabic);
  });

  return result;
}