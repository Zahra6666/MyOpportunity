const API_URL = import.meta.env.VITE_API_URL || "/api";

async function request(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token
        ? { Authorization: `Bearer ${token}` }
        : {}),
      ...(options.headers || {}),
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.message ||
        "تعذر تنفيذ الطلب."
    );
  }

  return data;
}

export async function getMyProfile() {
  return request("/users/me");
}

export async function updateMyProfile(data) {
  return request("/users/me", {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteMyAccount() {
  return request("/users/me", {
    method: "DELETE",
  });
}

export async function getUsers() {
  return request("/users");
}

export async function updateUser(id, data) {
  return request(`/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteUser(id) {
  return request(`/users/${id}`, {
    method: "DELETE",
  });
}