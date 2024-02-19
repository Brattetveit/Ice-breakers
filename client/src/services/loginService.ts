const login = async (username: string, password: string) => {
  const response = await fetch("api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();
  if (response.status === 200) {
    return data;
  } else {
    throw new Error("Login failed");
  }
};

export default login;
