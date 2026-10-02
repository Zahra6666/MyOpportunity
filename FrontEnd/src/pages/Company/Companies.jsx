import { useEffect, useState } from "react";
import { ArrowRight, Building2, MapPin, Search, Plus } from "lucide-react";
import { Link } from "react-router-dom";

import PageContainer from "../../components/layout/PageContainer";
import { useAuthContext } from "../../context/AuthContext";
import { getCompanies } from "../../services/companyService";

import "./Companies.css";

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { isAuthenticated, user } = useAuthContext();

  const userRole = user?.role || user?.roleName;

  const canCreateCompany = isAuthenticated && userRole !== "company";

  useEffect(() => {
    loadCompanies();
  }, []);

  useEffect(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      setFilteredCompanies(companies);
      return;
    }

    const filtered = companies.filter((company) => {
      const name = company.company_name || company.name || "";
      const location = company.location || "";

      return (
        name.toLowerCase().includes(query) ||
        location.toLowerCase().includes(query)
      );
    });

    setFilteredCompanies(filtered);
  }, [search, companies]);

  const loadCompanies = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getCompanies();

      const data =
        response?.companies ||
        response?.data ||
        response?.results ||
        response ||
        [];

      setCompanies(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load companies:", err);
      setError("حدث خطأ أثناء تحميل الشركات.");
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="companies-page">
      <PageContainer>
        <section className="companies-hero">
          <div className="companies-hero-shape companies-hero-shape-one" />
          <div className="companies-hero-shape companies-hero-shape-two" />

          <div className="companies-hero-content">
            <div className="companies-eyebrow">
              <Building2 size={18} />
              <span>الشركات</span>
            </div>

            <h1>اكتشف الشركات والفرص المتاحة</h1>

            <p>
              تعرّف على الشركات الموجودة على منصتنا واستكشف الفرص التي تقدمها
              للطلاب والباحثين عن عمل.
            </p>

            <div className="companies-search">
              <Search size={20} />

              <input
                type="text"
                placeholder="ابحث عن شركة أو موقع..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
          </div>
        </section>

        <section className="companies-section">
          <div className="companies-section-header">
            <div>
              <span className="companies-section-label">OUR COMPANIES</span>
              <h2>الشركات المتاحة</h2>
            </div>

            <div className="companies-section-actions">
              {!loading && (
                <span className="companies-count">
                  {filteredCompanies.length} شركة
                </span>
              )}

              {canCreateCompany && (
                <Link
                  to="/companies/create"
                  className="companies-create-button"
                >
                  <Plus size={17} />
                  <span>إنشاء شركة</span>
                </Link>
              )}
            </div>
          </div>

          {loading ? (
            <div className="companies-state">
              <div className="companies-loader" />
              <p>جاري تحميل الشركات...</p>
            </div>
          ) : error ? (
            <div className="companies-state companies-state-error">
              <Building2 size={42} />
              <h3>تعذر تحميل الشركات</h3>
              <p>{error}</p>

              <button
                type="button"
                className="companies-retry"
                onClick={loadCompanies}
              >
                حاول مرة أخرى
              </button>
            </div>
          ) : filteredCompanies.length === 0 ? (
            <div className="companies-state">
              <div className="companies-empty-icon">
                <Building2 size={42} />
              </div>

              <h3>
                {search.trim()
                  ? "لم نجد شركات مطابقة"
                  : "لا توجد شركات متاحة حالياً"}
              </h3>

              <p>
                {search.trim()
                  ? "جرّب البحث باسم شركة أو موقع مختلف."
                  : "ستظهر الشركات المعتمدة هنا عند توفرها."}
              </p>
            </div>
          ) : (
            <div className="companies-grid">
              {filteredCompanies.map((company) => {
                const companyName =
                  company.company_name || company.name || "شركة بدون اسم";

                const logo = company.logo_url || company.logo;
                const location = company.location || "الموقع غير متوفر";

                return (
                  <Link
                    key={company.id}
                    to={`/companies/${company.id}`}
                    className="company-card"
                  >
                    <div className="company-card-glow" />

                    <div className="company-card-top">
                      <div className="company-logo">
                        {logo ? (
                          <img src={logo} alt={companyName} />
                        ) : (
                          <Building2 size={30} />
                        )}
                      </div>

                      <span className="company-card-arrow">
                        <ArrowRight size={18} />
                      </span>
                    </div>

                    <div className="company-card-content">
                      <h3>{companyName}</h3>

                      <div className="company-location">
                        <MapPin size={16} />
                        <span>{location}</span>
                      </div>

                      {company.description && (
                        <p>
                          {company.description.length > 110
                            ? `${company.description.slice(0, 110)}...`
                            : company.description}
                        </p>
                      )}
                    </div>

                    <div className="company-card-footer">
                      <span>عرض الشركة</span>
                      <ArrowRight size={17} />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </PageContainer>
    </div>
  );
}

export default Companies;
