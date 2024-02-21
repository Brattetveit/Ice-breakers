import { User } from "@/types";

const login = async (username: string, password: string) => {
  const response = await fetch("api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data: { message: string; user: User } = await response.json();
  if (response.status === 200) {
    return data.user;
  } else {
    throw new Error("Login failed");
  }
};

export default login;
