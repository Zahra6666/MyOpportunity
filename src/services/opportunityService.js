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
        "حدث خطأ أثناء جلب بيانات الفرص"
    );
  }

  return data;
}


export async function getOpportunities(params = {}) {
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
    `/opportunities${
      queryString ? `?${queryString}` : ""
    }`
  );
}

export async function getOpportunityById(id) {
  if (!id) {
    throw new Error("معرّف الفرصة مطلوب");
  }

  return request(`/opportunities/${id}`);
}


export async function searchOpportunities(
  searchTerm,
  filters = {}
) {
  return getOpportunities({
    search: searchTerm,
    ...filters,
  });
}

export async function saveOpportunity(id) {
  if (!id) {
    throw new Error("معرّف الفرصة مطلوب");
  }

  return request(`/opportunities/${id}/save`, {
    method: "POST",
  });
}

export async function removeSavedOpportunity(id) {
  if (!id) {
    throw new Error("معرّف الفرصة مطلوب");
  }

  return request(`/opportunities/${id}/save`, {
    method: "DELETE",
  });
}

export async function getSavedOpportunities() {
  return request("/opportunities/saved");
}


export async function applyToOpportunity(
  id,
  applicationData = {}
) {
  if (!id) {
    throw new Error("معرّف الفرصة مطلوب");
  }

  return request(`/opportunities/${id}/apply`, {
    method: "POST",
    body: JSON.stringify(applicationData),
  });
}


export async function getMyApplications() {
  return request("/applications/me");
}

export async function getOpportunityCategories() {
  return request("/opportunities/categories");
}

export async function getGovernorates() {
  return request("/opportunities/governorates");
}

export default {
  getOpportunities,
  getOpportunityById,
  searchOpportunities,
  saveOpportunity,
  removeSavedOpportunity,
  getSavedOpportunities,
  applyToOpportunity,
  getMyApplications,
  getOpportunityCategories,
  getGovernorates,
};