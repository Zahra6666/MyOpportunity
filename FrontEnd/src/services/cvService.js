const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

async function request(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      ...(options.body instanceof FormData
        ? {}
        : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.message || "حدث خطأ أثناء التعامل مع السيرة الذاتية"
    );
  }

  return data;
}

export async function uploadCV(file) {
  if (!file) {
    throw new Error("ملف السيرة الذاتية مطلوب");
  }

  const MAX_SIZE_MB = 10;
  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    throw new Error(`حجم الملف يجب ألا يتجاوز ${MAX_SIZE_MB} ميجابايت`);
  }

  const allowedExtensions = ["pdf", "doc", "docx", "jpg", "jpeg", "png"];
  const fileExtension = file.name.split(".").pop().toLowerCase();
  if (!allowedExtensions.includes(fileExtension)) {
    throw new Error("صيغة الملف غير مدعومة. الصيغ المسموحة: PDF, DOC, DOCX, JPG, PNG");
  }

  const formData = new FormData();
  formData.append("file", file);

  return request("/cvs", {
    method: "POST",
    body: formData,
  });
}

export async function getMyCV() {
  return request("/cvs/me");
}

export async function getCVById(id) {
  return request(`/cvs/${id}`);
}

export async function deleteCV() {
  return request("/cvs", {
    method: "DELETE",
  });
}

export async function deleteCVById(id) {
  return request(`/cvs/${id}`, {
    method: "DELETE",
  });
}

export default {
  uploadCV,
  getMyCV,
  getCVById,
  deleteCV,
  deleteCVById,
};