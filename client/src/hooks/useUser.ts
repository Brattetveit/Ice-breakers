export const useUser = () => {
  const user = localStorage.getItem("user");
  const isLoggedIn = user !== null && user !== "";

  const logOut = () => {
    localStorage.removeItem("user");
  };

  return { isLoggedIn, logOut };
};
