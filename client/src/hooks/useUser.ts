import loginService from "@/services/loginService";
import { User } from "@/types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useUser = () => {
  const [isSignedIn, setIsSignedIn] = useState(
    localStorage.getItem("user") ? true : false,
  );
  const [user, setUser] = useState(localStorage.getItem("user"));

  const navigate = useNavigate();

  const login = async (username: string, password: string) => {
    const response = await loginService(username, password);
    const userString = JSON.stringify(response);
    localStorage.setItem("user", userString);

    setUser(userString);
    setIsSignedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setIsSignedIn(false);
    navigate("/");
  };

  return {
    isSignedIn,
    user: user ? (JSON.parse(user) as User) : null,
    login,
    logout,
  };
};
