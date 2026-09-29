import {
  ArrowLeft,
  FileText,
  Image,
  Sparkles,
  UploadCloud,
  X,
  CheckCircle2,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useRef, useState } from "react";

import PageContainer from "../../components/layout/PageContainer";
import Button from "../../components/common/Button";

function CVUploadPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;

    setFile(selectedFile);
  };

  const handleInputChange = (event) => {
    handleFile(event.target.files?.[0]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);

    handleFile(
      event.dataTransfer.files?.[0]
    );
  };

  const removeFile = () => {
    setFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const analyzeCV = () => {
    if (!file) return;

    navigate("/cv/analysis");
  };

  return (
    <PageContainer className="cv-page">

      <section className="cv-hero">

        <div className="container cv-container">

          <div className="cv-heading">

            <div className="cv-title-icon">
              <Sparkles size={24} />
            </div>

            <span className="section-kicker">
              AI CV Builder
            </span>

            <h1>
              خلّي الذكاء الاصطناعي
              <span>
                يفهم سيرتك
              </span>
            </h1>

            <p>
             ارفع سيرتك الذاتية بأي صيغة
              وخلي فرصتي تستخرج مهاراتك وخبراتك
              وتساعدك تكتشف الفرص الأقرب إلك.
            </p>

          </div>

          <div className="cv-upload-card">

            {!file ? (
              <div
                className={`upload-dropzone ${
                  dragging
                    ? "upload-dragging"
                    : ""
                }`}
                onDragOver={(event) => {
                  event.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() =>
                  setDragging(false)
                }
                onDrop={handleDrop}
                onClick={() =>
                  fileInputRef.current?.click()
                }
              >

                <div className="upload-icon">
                  <UploadCloud size={30} />
                </div>

                <h2>
                  ارفع سيرتك الذاتية هنا
                </h2>

                <p>
                  اسحب الملف هنا أو اضغط
                  لاختيار ملف من جهازك
                </p>

                <div className="upload-types">

                  <span>
                    <FileText size={15} />
                    PDF
                  </span>

                  <span>
                    <Image size={15} />
                    JPG / PNG
                  </span>

                  <span>
                    DOC / DOCX
                  </span>

                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  hidden
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={handleInputChange}
                />

              </div>
            ) : (
              <div className="selected-file">

                <div className="selected-file-icon">
                  <FileText size={25} />
                </div>

                <div className="selected-file-info">

                  <strong>
                    {file.name}
                  </strong>

                  <span>
                    {(file.size / 1024 / 1024).toFixed(2)}
                    {" "}
                    MB
                  </span>

                </div>

                <CheckCircle2
                  className="file-success"
                  size={22}
                />

                <button
                  type="button"
                  onClick={removeFile}
                  className="remove-file"
                  aria-label="حذف الملف"
                >
                  <X size={18} />
                </button>

              </div>
            )}

            <div className="cv-upload-actions">

              <Link
                to="/dashboard"
                className="btn btn-secondary"
              >
                إلغاء
              </Link>

              <Button
                onClick={analyzeCV}
                disabled={!file}
              >
                تحليل السيرة
                <ArrowLeft size={17} />
              </Button>

            </div>

          </div>

          <div className="cv-steps">

            <div className="cv-step active">
              <span>1</span>
              <div>
                <strong>
                  رفع السيرة
                </strong>
                <small>
                  PDF أو صورة أو مستند
                </small>
              </div>
            </div>

            <div className="cv-step">
              <span>2</span>
              <div>
                <strong>
                  تحليل البيانات
                </strong>
                <small>
                  استخراج المهارات والخبرات
                </small>
              </div>
            </div>

            <div className="cv-step">
              <span>3</span>
              <div>
                <strong>
                  مطابقة الفرص
                </strong>
                <small>
                  إيجاد الفرص المناسبة
                </small>
              </div>
            </div>

          </div>

        </div>

      </section>

    </PageContainer>
  );
}

export default CVUploadPage;