import { ArrowLeft, CheckCircle2, Compass, Target, Users } from "lucide-react";
import { Link } from "react-router-dom";
import "./About.css";

function About() {
  return (
    <main className="about-page" dir="rtl">
      <section className="about-hero">
        <div className="about-container about-hero-grid">
          <div className="about-hero-content">
            <span className="about-eyebrow">منصة فرصتي</span>

            <h1>
              فرصتك تبدأ
              <br />
              <span>من هنا</span>
            </h1>

            <p>
              منصة فرصتي تجمع لك الوظائف، المنح الدراسية، برامج التدريب،
              المسابقات والكورسات في مكان واحد، وتساعدك على الوصول إلى الفرص
              الأقرب إلى مهاراتك وطموحاتك.
            </p>

            <Link to="/opportunities" className="about-primary-button">
              استكشف الفرص
              <ArrowLeft size={18} />
            </Link>
          </div>

          <div className="about-feature-card">
            <div className="about-feature-icon">
              <Compass size={34} />
            </div>

            <span className="about-card-label">فرصتك أقرب مما تتوقع</span>

            <h2>مكان واحد لاكتشاف فرصك القادمة</h2>

            <p>
              نرتب الفرص بطريقة واضحة ومنظمة حتى يكون البحث أسهل وتقدر تركز على
              الفرص التي تناسبك.
            </p>

            <div className="about-card-line">
              <CheckCircle2 size={18} />
              <span>فرص متنوعة في مكان واحد</span>
            </div>

            <div className="about-card-line">
              <CheckCircle2 size={18} />
              <span>بحث وتصنيف سهل</span>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="about-container">
          <div className="about-section-heading">
            <span>من نحن</span>

            <h2>نخلي الوصول إلى الفرص أسهل</h2>

            <p>
              فرصتي هي منصة عراقية تهدف إلى جمع الفرص التعليمية والمهنية في مكان
              واحد، وتقديم تجربة بسيطة ومنظمة تساعد المستخدم على اكتشاف الفرصة
              المناسبة له.
            </p>
          </div>

          <div className="about-values">
            <article className="about-value-card">
              <div className="about-value-icon">
                <Target size={23} />
              </div>

              <h3>هدفنا</h3>

              <p>
                تسهيل وصول المستخدمين إلى الفرص التي تتناسب مع مهاراتهم
                واهتماماتهم وطموحاتهم.
              </p>
            </article>

            <article className="about-value-card">
              <div className="about-value-icon">
                <Users size={23} />
              </div>

              <h3>لمن صُممت فرصتي؟</h3>

              <p>
                للطلاب والخريجين والباحثين عن عمل وكل شخص يريد تطوير مهاراته
                واكتشاف فرص جديدة.
              </p>
            </article>

            <article className="about-value-card">
              <div className="about-value-icon">
                <CheckCircle2 size={23} />
              </div>

              <h3>تجربة منظمة</h3>

              <p>
                نعرض المعلومات بطريقة واضحة حتى تقدر تبحث وتقارن وتحفظ الفرص
                المهمة وترجع لها بسهولة.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="about-mission">
        <div className="about-container">
          <div className="about-mission-box">
            <div>
              <span>رسالتنا</span>

              <h2>
                نساعدك تكتشف الفرصة،
                <br />
                والخطوة التالية تبدأ منك.
              </h2>

              <p>
                نعمل على توفير تجربة واضحة ومريحة تساعد المستخدم على الانتقال من
                البحث عن الفرصة إلى اتخاذ الخطوة التالية بثقة.
              </p>
            </div>

            <Link to="/opportunities" className="about-mission-button">
              تصفح الفرص
              <ArrowLeft size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="about-final">
        <div className="about-container">
          <span>ابدأ الآن</span>

          <h2>اكتشف الفرصة المناسبة لك</h2>

          <p>استكشف الفرص المتاحة وابدأ خطوتك القادمة مع فرصتي.</p>

          <Link to="/opportunities" className="about-primary-button">
            استكشف الفرص
            <ArrowLeft size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}

export default About;
