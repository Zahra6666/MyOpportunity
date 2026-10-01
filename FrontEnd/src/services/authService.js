const API_URL =
  import.meta.env.VITE_API_URL || "/api";

async function request(endpoint, options = {}) {
  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    }
  );

  const data =
    await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.message ||
        "تعذر تنفيذ عملية المصادقة."
    );
  }

  return data;
}

export async function register(data) {
  return request("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function login(data) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export default {
  register,
  login,
};