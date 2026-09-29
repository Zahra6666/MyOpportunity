const API_BASE_URL =
  import.meta.env.VITE_API_URL || "/api";

async function request(endpoint, options = {}) {
  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      headers: {
        ...(options.body instanceof FormData
          ? {}
          : { "Content-Type": "application/json" }),
        ...(options.headers || {}),
      },
      ...options,
    }
  );

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.message ||
        "حدث خطأ أثناء التعامل مع السيرة الذاتية"
    );
  }

  return data;
}

/**
 * Upload CV file
 */
export async function uploadCV(file) {
  if (!file) {
    throw new Error("ملف السيرة الذاتية مطلوب");
  }

  const formData = new FormData();
  formData.append("file", file);

  return request("/cv/upload", {
    method: "POST",
    body: formData,
  });
}

/**
 * Get current user's CV
 */
export async function getMyCV() {
  return request("/cv/me");
}

/**
 * Get CV analysis
 */
export async function getCVAnalysis() {
  return request("/cv/me/analysis");
}

/**
 * Re-analyze CV
 */
export async function analyzeCV() {
  return request("/cv/me/analyze", {
    method: "POST",
  });
}

/**
 * Delete current CV
 */
export async function deleteCV() {
  return request("/cv/me", {
    method: "DELETE",
  });
}

/**
 * Get extracted CV skills
 */
export async function getCVSkills() {
  return request("/cv/me/skills");
}

/**
 * Get opportunities matched with CV
 */
export async function getCVMatches() {
  return request("/cv/me/matches");
}

export default {
  uploadCV,
  getMyCV,
  getCVAnalysis,
  analyzeCV,
  deleteCV,
  getCVSkills,
  getCVMatches,
};