import loginService from "@/services/loginService";
import { User } from "@/types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useUser = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("user") ? true : false,
  );
  const [user, setUser] = useState(localStorage.getItem("user"));

  const navigate = useNavigate();

  const login = async (username: string, password: string) => {
    const response = await loginService(username, password);
    const userString = JSON.stringify(response);
    localStorage.setItem("user", userString);
    setUser(userString);
    setIsLoggedIn(true);
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  return {
    isLoggedIn,
    user: user ? (JSON.parse(user) as User) : null,
    login,
    logout,
  };
};
