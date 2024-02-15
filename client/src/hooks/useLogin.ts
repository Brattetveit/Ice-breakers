import { FormEvent, useState } from "react";
import loginService from "@/services/loginService";

const useLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = await loginService(username, password);
    localStorage.setItem("user", JSON.stringify(data.user));
    console.log(username, "logged in");
  };

  return { username, setUsername, password, setPassword, handleLogin };
};
export default useLogin;
