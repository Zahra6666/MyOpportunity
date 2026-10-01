import { Mail, MapPin, ShieldCheck, ArrowLeft } from "lucide-react";

import Logo from "../common/Logo";
import "./Footer.css";
function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo light />

          <p className="footer-description">
            منصة فرصتي تجمع الفرص المهنية والتعليمية في العراق في مكان واحد،
            وتساعدك على اكتشاف الفرصة المناسبة لك باستخدام الذكاء الاصطناعي.
          </p>

          <div className="footer-security">
            <ShieldCheck size={17} />
            <span>بياناتك محمية وآمنة</span>
          </div>
        </div>

        <div className="footer-column">
          <h3>روابط الاستكشاف</h3>

          <a href="/opportunities">
            جميع الفرص
            <ArrowLeft size={14} />
          </a>

          <a href="/opportunities">
            الوظائف
            <ArrowLeft size={14} />
          </a>

          <a href="/opportunities?category=scholarship">
            المنح الدراسية
            <ArrowLeft size={14} />
          </a>

          <a href="/opportunities?category=training">
            التدريب والتوظيف
            <ArrowLeft size={14} />
          </a>
        </div>

        <div className="footer-column">
          <h3>السياسات والشروط</h3>

          <a href="/">شروط الاستخدام</a>
          <a href="/">سياسة الخصوصية</a>
          <a href="/">سياسة حماية بيانات المستخدم</a>
          <a href="/">الأسئلة الشائعة</a>
        </div>

        <div className="footer-column">
          <h3>مكاتب الابتكار والربط</h3>

          <a href="/">الجامعات والمؤسسات</a>
          <a href="/">الشركات وأصحاب العمل</a>
          <a href="/">الشراكات والابتكار</a>

          <div className="footer-contact">
            <MapPin size={16} />
            <span>العراق</span>
          </div>

          <a className="footer-contact" href="mailto:info@myopportunity.iq">
            <Mail size={16} />
            <span>info@myopportunity.iq</span>
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <span>© 2026 MyOpportunity</span>
          <span>جميع الحقوق محفوظة.</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
