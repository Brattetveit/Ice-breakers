import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return { logOut };
};
export default useLogout;
