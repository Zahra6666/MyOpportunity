import { createContext, useContext, useEffect, useState } from "react";

import {
  login as loginRequest,
  register as registerRequest,
} from "../services/authService";

const AuthContext = createContext(null);

const USER_KEY = "myopportunity_user";
const TOKEN_KEY = "token";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem(USER_KEY);
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_KEY);
    }
  }, [user]);

  const login = async (credentials) => {
    try {
      setLoading(true);

      const response = await loginRequest(credentials);

      const jwt =
        response?.token || response?.access_token || response?.accessToken;

      const loggedUser = response?.user;

      if (!jwt || !loggedUser) {
        throw new Error("بيانات تسجيل الدخول غير مكتملة.");
      }

      localStorage.setItem(TOKEN_KEY, jwt);
      localStorage.setItem(USER_KEY, JSON.stringify(loggedUser));

      setToken(jwt);
      setUser(loggedUser);

      return response;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);

      const response = await registerRequest(userData);

      return response;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);

    setUser(null);
    setToken(null);
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: Boolean(user && token),
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}

export default AuthContext;
