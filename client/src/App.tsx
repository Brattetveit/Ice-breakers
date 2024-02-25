import { Routes, Route } from "react-router-dom";
import {
  Home,
  Login,
  Register,
  AboutGame,
  IcebreakerForm,
  Profile,
} from "./pages";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/aboutGame" element={<AboutGame />} />
        <Route path="/icebreakerForm" element={<IcebreakerForm />} />
      </Routes>
    </>
  );
};

export default App;
