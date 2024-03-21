import { Routes, Route } from "react-router-dom";
import {
  Home,
  Login,
  Register,
  AboutGame,
  IcebreakerForm,
  Profile,
  InCategory,
  Categories,
  AdminPage,
} from "./pages";
import SpinTheWheel from "./pages/SpinTheWheel";
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
        <Route path="/adminPage" element={<AdminPage/>} />
      </Routes>
    </>
  );
};

export default App;
