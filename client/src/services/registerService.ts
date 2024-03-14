export const handleSubmitt = async (
  event: React.FormEvent<HTMLFormElement>,
  navigate: (path: string) => void, // Add navigate parameter with its type
) => {
  event.preventDefault();

  const form = event.currentTarget;
  const usernameInput = form.elements.namedItem("username") as HTMLInputElement;
  const passwordInput = form.elements.namedItem("password") as HTMLInputElement;

  const formData = {
    username: usernameInput.value,
    password: passwordInput.value,
  };

  try {
    const response = await fetch("api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const NewUser = await response.json();
      console.log("User register", NewUser);
      navigate("/login");
    } else {
      console.log("Registration failed", response.statusText);
    }
  } catch (error) {
    console.error("Error submitting form", error);
  }
};
