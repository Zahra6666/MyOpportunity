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
import { opportunities } from "../../data/opportunities";

import "./Home.css";

function Home() {
  const featuredOpportunities = opportunities?.slice(0, 3) || [];

  const categories = [
    {
      icon: BriefcaseBusiness,
      title: "الوظائف المهنية",
      description:
        "فرص وظيفية من شركات ومؤسسات داخل العراق وخارجه.",
      count: "+4,200 فرصة",
    },
    {
      icon: GraduationCap,
      title: "المنح الأكاديمية",
      description:
        "منح دراسية وبرامج تعليمية للطلبة والخريجين.",
      count: "+650 منحة",
    },
    {
      icon: Users,
      title: "التدريب والتمكين",
      description:
        "برامج تدريبية تساعدك على تطوير مهاراتك وبناء خبرتك.",
      count: "+1,950 تدريب",
    },
    {
      icon: Trophy,
      title: "المسابقات والهاكاثون",
      description:
        "شارك في تحديات ومسابقات واكتسب خبرة جديدة.",
      count: "+210 مسابقة",
    },
    {
      icon: BookOpen,
      title: "الكورسات المتخصصة",
      description:
        "تعلم مهارات جديدة من خلال دورات مختارة ومفيدة.",
      count: "+3,600 كورس",
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
      description:
        "نستخرج المهارات والخبرات والتعليم ونقارنها بمتطلبات الفرص.",
    },
    {
      number: "03",
      icon: CheckCircle2,
      title: "نعرض الفرص المناسبة",
      description:
        "تشوف نسبة التوافق وأسباب ملاءمة كل فرصة لملفك.",
    },
  ];

  const stats = [
    {
      value: "15,000+",
      label: "فرصة متاحة",
      icon: BriefcaseBusiness,
    },
    {
      value: "450+",
      label: "شركة في العراق",
      icon: Building2,
    },
    {
      value: "120+",
      label: "جهة ومنظمة",
      icon: Award,
    },
    {
      value: "88%",
      label: "نسبة رضا المستخدمين",
      icon: Users,
    },
  ];

  return (
    <PageContainer className="home-page">

      {/* ==============================
          HERO
      ============================== */}

      <section className="forsati-hero">

        <div className="container forsati-hero-inner">

          <div className="hero-copy">

            <div className="hero-mini-label">
              المنصة العراقية للفرص المهنية والتعليمية
            </div>

            <h1>
              بوابتك الموحدة لأفضل الفرص
              <span>في العراق</span>
            </h1>

            <p>
              منصة فرصتي تجمع لك الوظائف، المنح الدراسية،
              برامج التدريب، المسابقات والكورسات في مكان واحد،
              وتساعدك على الوصول إلى الفرص الأقرب إلى مهاراتك.
            </p>

            <div className="hero-buttons">

              <Link
                to="/opportunities"
                className="btn btn-primary"
              >
                استكشف الفرص
                <ArrowLeft size={17} />
              </Link>

              <Link
                to="/cv/upload"
                className="btn hero-outline-button"
              >
                أنشئ ملفك المهني
                <FileText size={17} />
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
                  <option value="sulaymaniyah">
                    السليمانية
                  </option>
                </select>
              </div>

              <Link
                to="/opportunities"
                className="hero-search-button"
              >
                بحث
                <Search size={16} />
              </Link>

            </div>

          </div>


          {/* بطاقة الفرصة في الهيرو */}

          <div className="hero-opportunity-preview">

            <div className="preview-card">

              <div className="preview-top">

                <div className="preview-company-logo">
                  <Building2 size={22} />
                </div>

                <div className="preview-title">
                  <span>فرصة موصى بها</span>
                  <h3>مهندس واجهات أمامية</h3>
                  <p>شركة تقنية في العراق</p>
                </div>

                <button
                  type="button"
                  className="preview-bookmark"
                >
                  <Award size={17} />
                </button>

              </div>


              <div className="preview-meta">

                <span>
                  <MapPin size={14} />
                  بغداد
                </span>

                <span>
                  <BriefcaseBusiness size={14} />
                  دوام كامل
                </span>

              </div>


              <div className="preview-match">

                <div className="match-ring">
                  <strong>92%</strong>
                  <span>تطابق</span>
                </div>

                <div className="match-content">

                  <strong>
                    نسبة توافق عالية مع ملفك
                  </strong>

                  <p>
                    لديك معظم المهارات المطلوبة لهذه الفرصة.
                  </p>

                  <div className="match-progress">
                    <span />
                  </div>

                </div>

              </div>


              <div className="preview-skills">

                <span>React</span>
                <span>TypeScript</span>
                <span>JavaScript</span>
                <span>CSS</span>

              </div>


              <div className="preview-footer">

                <span>
                  آخر موعد للتقديم: 30 سبتمبر
                </span>

                <Link to="/opportunities/1">
                  عرض الفرصة
                  <ArrowLeft size={15} />
                </Link>

              </div>

            </div>


            <div className="preview-floating-card">

              <CheckCircle2 size={18} />

              <div>
                <strong>فرصة جديدة</strong>
                <span>تناسب مهاراتك</span>
              </div>

            </div>

          </div>

        </div>


        <div className="hero-scroll-indicator">
          <span>اكتشف فرصتك</span>
          <ArrowDown size={16} />
        </div>

      </section>


      {/* ==============================
          STATS
      ============================== */}

      <section className="forsati-stats">

        <div className="container">

          <div className="stats-grid">

            {stats.map((stat) => {

              const Icon = stat.icon;

              return (
                <div
                  className="stat-box"
                  key={stat.label}
                >

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


      {/* ==============================
          CATEGORIES
      ============================== */}

      <section className="home-section categories-section">

        <div className="container">

          <div className="section-heading">

            <div>

              <span className="section-overline">
                تصفح حسب المجالات
              </span>

              <h2>
                اكتشف مسارك عبر فئات الفرص
              </h2>

              <p>
                مجموعة متنوعة من الفرص المهنية والتعليمية
                لمساعدتك على بناء مستقبلك.
              </p>

            </div>

            <Link
              to="/opportunities"
              className="section-link"
            >
              عرض كل الفرص
              <ChevronLeft size={17} />
            </Link>

          </div>


          <div className="categories-grid">

            {categories.map((category) => {

              const Icon = category.icon;

              return (
                <Link
                  key={category.title}
                  to="/opportunities"
                  className="category-card"
                >

                  <div className="category-icon">
                    <Icon size={22} />
                  </div>

                  <h3>{category.title}</h3>

                  <p>
                    {category.description}
                  </p>

                  <div className="category-bottom">

                    <span>
                      {category.count}
                    </span>

                    <ArrowLeft size={16} />

                  </div>

                </Link>
              );
            })}

          </div>

        </div>

      </section>


      {/* ==============================
          HOW IT WORKS
      ============================== */}

      <section className="home-section matching-section">

        <div className="container">

          <div className="section-heading centered">

            <span className="section-overline">
              كيف تعمل المنصة؟
            </span>

            <h2>
              كيف تضمن مطابقة أفضل لفرصتك القادمة؟
            </h2>

            <p>
              ثلاث خطوات بسيطة تبدأ من سيرتك الذاتية وتنتهي
              بفرص أقرب إلى مهاراتك واهتماماتك.
            </p>

          </div>


          <div className="steps-grid">

            {steps.map((step, index) => {

              const Icon = step.icon;

              return (
                <div
                  className="step-card"
                  key={step.number}
                >

                  <div className="step-card-number">
                    {step.number}
                  </div>

                  <div className="step-card-icon">
                    <Icon size={23} />
                  </div>

                  <h3>
                    {step.title}
                  </h3>

                  <p>
                    {step.description}
                  </p>

                  {index !== steps.length - 1 && (
                    <div className="step-connector" />
                  )}

                </div>
              );
            })}

          </div>

        </div>

      </section>


      {/* ==============================
          FEATURED OPPORTUNITIES
      ============================== */}

      <section className="home-section featured-section">

        <div className="container">

          <div className="section-heading">

            <div>

              <span className="section-overline">
                فرص مختارة لك
              </span>

              <h2>
                فرص قد تناسب ملفك
              </h2>

              <p>
                استكشف بعض الفرص المتاحة حالياً على منصة فرصتي.
              </p>

            </div>

            <Link
              to="/opportunities"
              className="section-link"
            >
              جميع الفرص
              <ChevronLeft size={17} />
            </Link>

          </div>

          {featuredOpportunities.length > 0 ? (
            <OpportunityGrid
              opportunities={featuredOpportunities}
            />
          ) : (
            <div className="home-empty">
              لا توجد فرص متاحة حالياً.
            </div>
          )}

        </div>

      </section>


      {/* ==============================
          FINAL CTA
      ============================== */}

      <section className="home-final-cta">

        <div className="container">

          <div className="final-cta-box">

            <div>

              <span>
                ابدأ رحلتك المهنية اليوم
              </span>

              <h2>
                فرصتك القادمة قد تكون أقرب مما تتوقع
              </h2>

              <p>
                أنشئ ملفك المهني واستكشف آلاف الفرص
                المتاحة في مكان واحد.
              </p>

            </div>

            <div className="final-cta-buttons">

              <Link
                to="/register"
                className="btn final-primary-button"
              >
                إنشاء حساب
                <ArrowLeft size={17} />
              </Link>

              <Link
                to="/opportunities"
                className="btn final-secondary-button"
              >
                استكشف الفرص
              </Link>

            </div>

          </div>

        </div>

      </section>

    </PageContainer>
  );
}

export default Home;