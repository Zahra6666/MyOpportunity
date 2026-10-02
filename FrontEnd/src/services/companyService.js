const API_URL = import.meta.env.VITE_API_URL || "/api";

async function request(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "حدث خطأ أثناء تنفيذ الطلب");
  }

  return data;
}

export async function getCompanies() {
  return request("/companies");
}

export async function getAllCompaniesForAdmin() {
  return request("/companies/admin/all");
}

export async function getCompanyById(id) {
  return request(`/companies/${id}`);
}

export async function createCompany(data) {
  return request("/companies", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateCompany(id, data) {
  return request(`/companies/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteCompany(id) {
  return request(`/companies/${id}`, {
    method: "DELETE",
  });
}

export async function approveCompany(id) {
  return request(`/companies/${id}/approve`, {
    method: "PUT",
  });
}

export async function rejectCompany(id) {
  return request(`/companies/${id}/reject`, {
    method: "PUT",
  });
}
