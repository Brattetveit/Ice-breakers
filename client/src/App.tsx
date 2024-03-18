import { Routes, Route } from "react-router-dom";
import {
  Home,
  Login,
  Register,
  AboutGame,
  IcebreakerForm,
  Profile,
import SpinTheWheel from "./pages/SpinTheWheel";
  InCategory,
  Categories,
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
        <Route path="/categoryPage" element={<Categories />} />
        <Route path="/category" element={<InCategory />} />
        <Route path="/spinTheWheel" element={<SpinTheWheel/>} />
      </Routes>
    </>
  );
};

export default App;
