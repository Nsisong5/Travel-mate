import api from "../api/axios";

export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials);

    if (response.data.access_token) {
      localStorage.setItem("access_token", response.data.access_token);
    }

    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};