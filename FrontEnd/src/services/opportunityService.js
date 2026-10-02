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

export async function getOpportunities(params = {}) {
  const query = new URLSearchParams();

  if (params.search !== undefined) {
    query.append("search", params.search);
  }

  if (params.category_id !== undefined) {
    query.append("category_id", params.category_id);
  }

  if (params.location !== undefined) {
    query.append("location", params.location);
  }

  if (params.type_id !== undefined) {
    query.append("type_id", params.type_id);
  }

  const queryString = query.toString();

  return request(`/opportunities${queryString ? `?${queryString}` : ""}`);
}

export async function getOpportunityById(id) {
  return request(`/opportunities/${id}`);
}

export async function createOpportunity(opportunityData) {
  return request("/opportunities", {
    method: "POST",
    body: JSON.stringify(opportunityData),
  });
}

export async function updateOpportunity(id, opportunityData) {
  return request(`/opportunities/${id}`, {
    method: "PUT",
    body: JSON.stringify(opportunityData),
  });
}

export async function deleteOpportunity(id) {
  return request(`/opportunities/${id}`, {
    method: "DELETE",
  });
}

export async function saveOpportunity(id) {
  return request(`/opportunities/${id}/save`, {
    method: "POST",
  });
}

export async function unsaveOpportunity(id) {
  return request(`/opportunities/${id}/save`, {
    method: "DELETE",
  });
}

export async function getSavedOpportunities() {
  return request("/me/saved");
}

export async function getCategories() {
  return request("/categories");
}

export async function getTypes() {
  return request("/types");
}


export default {
  getOpportunities,
  getOpportunityById,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity,
  saveOpportunity,
  unsaveOpportunity,
  getSavedOpportunities,
  getCategories,
  getTypes,
};
