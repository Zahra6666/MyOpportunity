import API_URL from "./api/api";

const testApiConnection = async () => {
  try {
    const response = await fetch(`${API_URL}/health`);
    const data = await response.json();

    console.log("Backend connection:", data);
  } catch (error) {
    console.error("Backend connection failed:", error);
  }
};

testApiConnection();
