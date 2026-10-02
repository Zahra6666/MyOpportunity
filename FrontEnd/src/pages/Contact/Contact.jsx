import { Mail, MapPin, MessageSquare, Phone, Send } from "lucide-react";
import { useState } from "react";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <main className="contact-page" dir="rtl">
      <section className="contact-hero">
        <div className="contact-container">
          <span>تواصل معنا</span>

          <h1>
            عندك سؤال؟
            <br />
            <strong>إحنا هنا نساعدك.</strong>
          </h1>

          <p>
            إذا عندك استفسار أو اقتراح أو تحتاج مساعدة باستخدام منصة فرصتي، تقدر
            تتواصل ويانا من خلال النموذج أو معلومات التواصل.
          </p>
        </div>
      </section>

      <section className="contact-section">
        <div className="contact-container contact-grid">
          <div className="contact-info">
            <div className="contact-heading">
              <span>تواصل ويانا</span>

              <h2>خلينا نسمع منك</h2>

              <p>
                ملاحظاتك وأسئلتك تساعدنا على تحسين تجربة فرصتي وتقديم خدمة أفضل
                للمستخدمين.
              </p>
            </div>

            <div className="contact-info-list">
              <div className="contact-info-card">
                <div className="contact-info-icon">
                  <Mail size={21} />
                </div>

                <div>
                  <span>البريد الإلكتروني</span>
                  <a href="mailto:info@forsati.com">info@forsati.com</a>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="contact-info-icon">
                  <Phone size={21} />
                </div>

                <div>
                  <span>الهاتف</span>
                  <a href="tel:+9640000000000">+964 000 000 0000</a>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="contact-info-icon">
                  <MapPin size={21} />
                </div>

                <div>
                  <span>الموقع</span>
                  <p>العراق</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-card">
            <div className="contact-form-header">
              <div className="contact-form-icon">
                <MessageSquare size={22} />
              </div>

              <div>
                <h2>أرسل لنا رسالة</h2>
                <p>سنكون سعداء بسماع رأيك.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="contact-form-row">
                <div className="contact-field">
                  <label htmlFor="name">الاسم</label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="اكتب اسمك"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="email">البريد الإلكتروني</label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="contact-field">
                <label htmlFor="subject">الموضوع</label>

                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="موضوع الرسالة"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact-field">
                <label htmlFor="message">الرسالة</label>

                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  placeholder="اكتب رسالتك هنا..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="contact-submit">
                إرسال الرسالة
                <Send size={17} />
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;
