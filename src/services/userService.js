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
        "حدث خطأ أثناء جلب بيانات المستخدم"
    );
  }

  return data;
}

/**
 * Get current user profile
 */
export async function getProfile() {
  return request("/users/me");
}

/**
 * Update current user profile
 */
export async function updateProfile(profileData) {
  return request("/users/me", {
    method: "PUT",
    body: JSON.stringify(profileData),
  });
}

/**
 * Get user dashboard data
 */
export async function getDashboard() {
  return request("/users/me/dashboard");
}

/**
 * Get user's skills
 */
export async function getUserSkills() {
  return request("/users/me/skills");
}

/**
 * Update user's skills
 */
export async function updateUserSkills(skills) {
  return request("/users/me/skills", {
    method: "PUT",
    body: JSON.stringify({
      skills,
    }),
  });
}

/**
 * Get user's education
 */
export async function getUserEducation() {
  return request("/users/me/education");
}

/**
 * Update user's education
 */
export async function updateUserEducation(
  education
) {
  return request("/users/me/education", {
    method: "PUT",
    body: JSON.stringify(education),
  });
}

/**
 * Get user's application history
 */
export async function getApplicationHistory() {
  return request("/users/me/applications");
}

/**
 * Get user's notifications
 */
export async function getNotifications() {
  return request("/users/me/notifications");
}

export async function markNotificationsAsRead() {
  return request("/users/me/notifications/read", {
    method: "PUT",
  });
}

export default {
  getProfile,
  updateProfile,
  getDashboard,
  getUserSkills,
  updateUserSkills,
  getUserEducation,
  updateUserEducation,
  getApplicationHistory,
  getNotifications,
  markNotificationsAsRead,
};