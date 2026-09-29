import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

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
      const savedUser =
        localStorage.getItem(USER_KEY);

      return savedUser
        ? JSON.parse(savedUser)
        : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() =>
    localStorage.getItem(TOKEN_KEY)
  );

  useEffect(() => {
    if (user) {
      localStorage.setItem(
        USER_KEY,
        JSON.stringify(user)
      );
    } else {
      localStorage.removeItem(USER_KEY);
    }
  }, [user]);

  const login = async (credentials) => {
    const response =
      await loginRequest(credentials);

    const data =
      response?.user ||
      response?.data ||
      response;

    const jwt =
      response?.token ||
      response?.access_token ||
      response?.accessToken ||
      data?.token ||
      data?.access_token;

    const loggedUser =
      response?.user ||
      response?.data?.user ||
      data;

    if (jwt) {
      localStorage.setItem(
        TOKEN_KEY,
        jwt
      );

      setToken(jwt);
    }

    if (loggedUser) {
      localStorage.setItem(
        USER_KEY,
        JSON.stringify(loggedUser)
      );

      setUser(loggedUser);
    }

    return response;
  };

  const register = async (userData) => {
    const response =
      await registerRequest(userData);

    return response;
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
    isAuthenticated:
      Boolean(user) && Boolean(token),
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}

export default AuthContext;