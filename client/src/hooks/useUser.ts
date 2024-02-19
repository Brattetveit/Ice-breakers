export const useUser = () => {
  const user = localStorage.getItem("user");

  return { isLoggedIn: user !== null && user !== "" };
};
