// useAuth.js
import { useState } from "react";

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setToken(token);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsLoggedIn(false);
  };

  return {
    isLoggedIn,
    token,
    login,
    logout,
    setIsLoggedIn,
  };
};

export default useAuth;
