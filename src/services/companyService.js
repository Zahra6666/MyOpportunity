const API_BASE_URL =
  import.meta.env.VITE_API_URL || "/api";

async function request(endpoint, options = {}) {
  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    }
  );

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.message ||
        "حدث خطأ أثناء جلب بيانات الشركة"
    );
  }

  return data;
}


/**
 * Get all companies
 */
export async function getCompanies(params = {}) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== null &&
      value !== ""
    ) {
      query.append(key, value);
    }
  });

  const queryString = query.toString();

  return request(
    `/companies${
      queryString ? `?${queryString}` : ""
    }`
  );
}

/**
 * Get company by ID
 */
export async function getCompanyById(id) {
  if (!id) {
    throw new Error("معرّف الشركة مطلوب");
  }

  return request(`/companies/${id}`);
}

/**
 * Get company's opportunities
 */
export async function getCompanyOpportunities(id) {
  if (!id) {
    throw new Error("معرّف الشركة مطلوب");
  }

  return request(`/companies/${id}/opportunities`);
}

/**
 * Get company statistics
 */
export async function getCompanyStats(id) {
  if (!id) {
    throw new Error("معرّف الشركة مطلوب");
  }

  return request(`/companies/${id}/stats`);
}

export default {
  getCompanies,
  getCompanyById,
  getCompanyOpportunities,
  getCompanyStats,
};