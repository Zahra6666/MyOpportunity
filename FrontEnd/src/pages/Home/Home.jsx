import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowDown,
  BriefcaseBusiness,
  GraduationCap,
  Trophy,
  BookOpen,
  Search,
  MapPin,
  FileText,
  Target,
  CheckCircle2,
  Users,
  Building2,
  Award,
  ChevronLeft,
} from "lucide-react";

import { Link } from "react-router-dom";

import PageContainer from "../../components/layout/PageContainer";
import OpportunityGrid from "../../components/opportunities/OpportunityGrid";

import "./Home.css";

function Home() {
  const [opportunities, setOpportunities] = useState([]);
  const [loadingOpportunities, setLoadingOpportunities] = useState(true);
  const [opportunitiesError, setOpportunitiesError] = useState(false);

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        setLoadingOpportunities(true);
        setOpportunitiesError(false);

        const response = await fetch("/api/opportunities");

        if (!response.ok) {
          throw new Error("Failed to fetch opportunities");
        }

        const data = await response.json();

        const fetchedOpportunities = Array.isArray(data)
          ? data
          : data?.opportunities || data?.data || [];

        setOpportunities(fetchedOpportunities);
      } catch (error) {
        console.error("Failed to load opportunities:", error);
        setOpportunitiesError(true);
        setOpportunities([]);
      } finally {
        setLoadingOpportunities(false);
      }
    };

    fetchOpportunities();
  }, []);

  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
        }
      });
    };

    const observerOptions = {
      threshold: 0.15,
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    const elements = document.querySelectorAll(".reveal-on-scroll");

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const featuredOpportunities = opportunities.slice(0, 3);
  const featuredOpportunity = opportunities[0];

  const categories = [
    {
      icon: BriefcaseBusiness,
      title: "الوظائف المهنية",
      description: "فرص وظيفية من شركات ومؤسسات داخل العراق وخارجه.",
    },
    {
      icon: GraduationCap,
      title: "المنح الأكاديمية",
      description: "منح دراسية وبرامج تعليمية للطلبة والخريجين.",
    },
    {
      icon: Users,
      title: "التدريب والتمكين",
      description: "برامج تدريبية تساعدك على تطوير مهاراتك وبناء خبرتك.",
    },
    {
      icon: Trophy,
      title: "المسابقات والهاكاثون",
      description: "شارك في تحديات ومسابقات واكتسب خبرة جديدة.",
    },
    {
      icon: BookOpen,
      title: "الكورسات المتخصصة",
      description: "تعلم مهارات جديدة من خلال دورات مختارة ومفيدة.",
    },
  ];

  const steps = [
    {
      number: "01",
      icon: FileText,
      title: "ارفع سيرتك الذاتية",
      description:
        "أضف سيرتك الذاتية ومعلوماتك الأساسية حتى نتمكن من فهم ملفك المهني.",
    },
    {
      number: "02",
      icon: Target,
      title: "نحلل مهاراتك",
      description: "نستخرج المهارات والخبرات والتعليم ونقارنها بمتطلبات الفرص.",
    },
    {
      number: "03",
      icon: CheckCircle2,
      title: "نعرض الفرص المناسبة",
      description: "تشوف نسبة التوافق وأسباب ملاءمة كل فرصة لملفك.",
    },
  ];

  const stats = [
    {
      value: opportunities.length > 0 ? `${opportunities.length}+` : "—",
      label: "فرصة متاحة حالياً",
      icon: BriefcaseBusiness,
    },
    {
      value: "متاح",
      label: "فرص من شركات مختلفة",
      icon: Building2,
    },
    {
      value: "متاح",
      label: "فرص مهنية وتعليمية",
      icon: Award,
    },
    {
      value: "AI",
      label: "مطابقة ذكية للسيرة الذاتية",
      icon: Users,
    },
  ];

  const getOpportunityTitle = (opportunity) =>
    opportunity?.title ||
    opportunity?.name ||
    opportunity?.opportunity_title ||
    "فرصة متاحة";

  const getOpportunityCompany = (opportunity) =>
    opportunity?.company_name ||
    opportunity?.company?.name ||
    opportunity?.companyName ||
    "جهة معلنة";

  const getOpportunityLocation = (opportunity) =>
    opportunity?.location ||
    opportunity?.city ||
    opportunity?.governorate ||
    "العراق";

  const getOpportunityType = (opportunity) =>
    opportunity?.type_name ||
    opportunity?.type?.name ||
    opportunity?.type ||
    "فرصة مهنية";

  const getOpportunityId = (opportunity) => opportunity?.id;

  return (
    <PageContainer className="home-page">
      {/* HERO */}
      <section className="forsati-hero">
        <div className="container forsati-hero-inner">
          <div className="hero-copy">
            <div className="hero-mini-label">
              المنصة العراقية للفرص المهنية والتعليمية
            </div>

            <h1>
              بوابتك الموحدة لأفضل الفرص <span>في العراق</span>
            </h1>

            <p>
              منصة فرصتي تجمع لك الوظائف، المنح الدراسية، برامج التدريب،
              المسابقات والكورسات في مكان واحد، وتساعدك على الوصول إلى الفرص
              الأقرب إلى مهاراتك.
            </p>

            <div className="hero-buttons">
              <Link to="/opportunities" className="btn btn-primary">
                استكشف الفرص <ArrowLeft size={17} />
              </Link>

              <Link to="/cv/upload" className="btn hero-outline-button">
                أنشئ ملفك المهني <FileText size={17} />
              </Link>
            </div>

            <div className="hero-search-box">
              <div className="hero-search-input">
                <Search size={18} />

                <input
                  type="text"
                  placeholder="ابحث عن وظيفة، تدريب، منحة..."
                />
              </div>

              <div className="hero-search-location">
                <MapPin size={17} />

                <select defaultValue="">
                  <option value="" disabled>
                    المحافظة
                  </option>
                  <option value="baghdad">بغداد</option>
                  <option value="basra">البصرة</option>
                  <option value="erbil">أربيل</option>
                  <option value="najaf">النجف</option>
                  <option value="sulaymaniyah">السليمانية</option>
                </select>
              </div>

              <Link to="/opportunities" className="hero-search-button">
                بحث <Search size={16} />
              </Link>
            </div>
          </div>

          <div className="hero-opportunity-preview">
            {featuredOpportunity ? (
              <div className="preview-card">
                <div className="preview-top">
                  <div className="preview-company-logo">
                    <Building2 size={22} />
                  </div>

                  <div className="preview-title">
                    <span>فرصة متاحة الآن</span>

                    <h3>{getOpportunityTitle(featuredOpportunity)}</h3>

                    <p>{getOpportunityCompany(featuredOpportunity)}</p>
                  </div>

                  <div className="preview-bookmark">
                    <Award size={17} />
                  </div>
                </div>

                <div className="preview-meta">
                  <span>
                    <MapPin size={14} />
                    {getOpportunityLocation(featuredOpportunity)}
                  </span>

                  <span>
                    <BriefcaseBusiness size={14} />
                    {getOpportunityType(featuredOpportunity)}
                  </span>
                </div>

                <div className="preview-match">
                  <div className="match-ring">
                    <strong>AI</strong>
                    <span>مطابقة</span>
                  </div>

                  <div className="match-content">
                    <strong>اكتشف مدى توافقك مع الفرصة</strong>

                    <p>ارفع سيرتك الذاتية لتحصل على تحليل ذكي لنسبة التوافق.</p>

                    <div className="match-progress">
                      <span />
                    </div>
                  </div>
                </div>

                <div className="preview-skills">
                  <span>تحليل السيرة</span>
                  <span>مطابقة ذكية</span>
                  <span>فرص حقيقية</span>
                </div>

                <div className="preview-footer">
                  <span>فرصة من قاعدة بيانات فرصتي</span>

                  <Link
                    to={
                      getOpportunityId(featuredOpportunity)
                        ? `/opportunities/${getOpportunityId(
                            featuredOpportunity,
                          )}`
                        : "/opportunities"
                    }
                  >
                    عرض الفرصة <ArrowLeft size={15} />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="preview-card preview-loading-card">
                <div className="preview-company-logo">
                  <Building2 size={22} />
                </div>

                <div className="preview-loading-content">
                  <strong>
                    {loadingOpportunities
                      ? "جاري تحميل الفرص..."
                      : "استكشف الفرص المتاحة"}
                  </strong>

                  <span>
                    {loadingOpportunities
                      ? "نبحث عن أحدث الفرص في قاعدة البيانات."
                      : "تصفح جميع الفرص المتاحة على منصة فرصتي."}
                  </span>

                  {!loadingOpportunities && (
                    <Link to="/opportunities">
                      استكشف الفرص <ArrowLeft size={15} />
                    </Link>
                  )}
                </div>
              </div>
            )}

            <div className="preview-floating-card">
              <CheckCircle2 size={18} />

              <div>
                <strong>فرص حقيقية</strong>
                <span>من قاعدة بيانات المنصة</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-scroll-indicator">
          <span>اكتشف فرصتك</span>
          <ArrowDown size={16} />
        </div>
      </section>

      {/* STATS */}
      <section className="forsati-stats">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div className="stat-box reveal-on-scroll" key={stat.label}>
                  <div className="stat-icon">
                    <Icon size={19} />
                  </div>

                  <div>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="home-final-cta home-cta-early">
        <div className="container">
          <div className="final-cta-box reveal-on-scroll">
            <div className="final-cta-content">
              <span className="final-cta-label">خطوتك الأولى تبدأ من هنا</span>

              <h2>خلّي فرصتي تساعدك تلاقي الفرصة المناسبة إلك</h2>

              <p>
                أنشئ حسابك، ارفع سيرتك الذاتية، وخلي نظام المطابقة الذكي يساعدك
                على اكتشاف الفرص الأقرب لمهاراتك.
              </p>
            </div>

            <div className="final-cta-buttons">
              <Link to="/register" className="btn final-primary-button">
                إنشاء حساب <ArrowLeft size={17} />
              </Link>

              <Link to="/opportunities" className="btn final-secondary-button">
                تصفح بدون حساب
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="home-section categories-section">
        <div className="container">
          <div className="section-heading reveal-on-scroll">
            <div>
              <span className="section-overline">تصفح حسب المجالات</span>

              <h2>اكتشف مسارك عبر فئات الفرص</h2>

              <p>
                مجموعة متنوعة من الفرص المهنية والتعليمية لمساعدتك على بناء
                مستقبلك.
              </p>
            </div>

            <Link to="/opportunities" className="section-link">
              عرض كل الفرص <ChevronLeft size={17} />
            </Link>
          </div>

          <div className="categories-grid">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <Link
                  key={category.title}
                  to="/opportunities"
                  className="category-card reveal-on-scroll"
                >
                  <div className="category-icon">
                    <Icon size={22} />
                  </div>

                  <h3>{category.title}</h3>

                  <p>{category.description}</p>

                  <div className="category-bottom">
                    <span>استكشف الفرص</span>
                    <ArrowLeft size={16} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="home-section matching-section">
        <div className="container">
          <div className="section-heading centered reveal-on-scroll">
            <span className="section-overline">كيف تعمل المنصة؟</span>

            <h2>كيف تضمن مطابقة أفضل لفرصتك القادمة؟</h2>

            <p>
              ثلاث خطوات بسيطة تبدأ من سيرتك الذاتية وتنتهي بفرص أقرب إلى
              مهاراتك واهتماماتك.
            </p>
          </div>

          <div className="steps-grid">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div className="step-card reveal-on-scroll" key={step.number}>
                  <div className="step-card-number">{step.number}</div>

                  <div className="step-card-icon">
                    <Icon size={23} />
                  </div>

                  <h3>{step.title}</h3>

                  <p>{step.description}</p>

                  {index !== steps.length - 1 && (
                    <div className="step-connector" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="home-section featured-section">
        <div className="container">
          <div className="section-heading reveal-on-scroll">
            <div>
              <span className="section-overline">فرص متاحة الآن</span>

              <h2>اكتشف فرصاً حقيقية</h2>

              <p>هذه الفرص مأخوذة مباشرة من قاعدة بيانات منصة فرصتي.</p>
            </div>

            <Link to="/opportunities" className="section-link">
              جميع الفرص <ChevronLeft size={17} />
            </Link>
          </div>

          <div className="reveal-on-scroll">
            {loadingOpportunities ? (
              <div className="home-empty">جاري تحميل الفرص المتاحة...</div>
            ) : opportunitiesError ? (
              <div className="home-empty home-error">
                تعذر تحميل الفرص حالياً. يمكنك تصفح صفحة الفرص مباشرة.
                <Link to="/opportunities">تصفح الفرص</Link>
              </div>
            ) : featuredOpportunities.length > 0 ? (
              <OpportunityGrid opportunities={featuredOpportunities} />
            ) : (
              <div className="home-empty">لا توجد فرص متاحة حالياً.</div>
            )}
          </div>
        </div>
      </section>
    </PageContainer>
  );
}

export default Home;
