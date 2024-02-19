export const useAuthStatus = () => {
  const checkLoginStatus = () => {
    const user = localStorage.getItem("user");
    return user != null && user !== "";
  };

  return { checkLoginStatus };
};
