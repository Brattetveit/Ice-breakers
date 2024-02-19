import { FormEvent, useState } from "react";
import loginService from "@/services/loginService";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const navigate = useNavigate(); // Use useNavigate here
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = await loginService(username, password);
    localStorage.setItem("user", JSON.stringify(data.user));
    console.log(username, "logged in");
    navigate("/");
  };

  return { username, setUsername, password, setPassword, handleLogin };
};
export default useLogin;
