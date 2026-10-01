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
        "حدث خطأ أثناء تنفيذ طلب التقديم"
    );
  }

  return data;
}

/**
 * Submit an application
 */
export async function submitApplication(
  opportunityId,
  applicationData = {}
) {
  if (!opportunityId) {
    throw new Error("معرّف الفرصة مطلوب");
  }

  return request(
    `/opportunities/${opportunityId}/applications`,
    {
      method: "POST",
      body: JSON.stringify(applicationData),
    }
  );
}

/**
 * Get current user's applications
 */
export async function getMyApplications() {
  return request("/applications/me");
}

/**
 * Get one application
 */
export async function getApplicationById(id) {
  if (!id) {
    throw new Error("معرّف الطلب مطلوب");
  }

  return request(`/applications/${id}`);
}

/**
 * Withdraw an application
 */
export async function withdrawApplication(id) {
  if (!id) {
    throw new Error("معرّف الطلب مطلوب");
  }

  return request(`/applications/${id}/withdraw`, {
    method: "PUT",
  });
}

/**
 * Get application status
 */
export async function getApplicationStatus(id) {
  if (!id) {
    throw new Error("معرّف الطلب مطلوب");
  }

  return request(`/applications/${id}/status`);
}

export default {
  submitApplication,
  getMyApplications,
  getApplicationById,
  withdrawApplication,
  getApplicationStatus,
};