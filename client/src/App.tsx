import { Routes, Route } from "react-router-dom";
import { Home, Login, Register, AboutGame, IcebreakerForm } from "./pages";
import { Categories } from "./pages/CategoryPage";
import { InCategory } from "./pages/Category";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/aboutGame" element={<AboutGame />} />
        <Route path="/icebreakerForm" element={<IcebreakerForm />} />
        <Route path="/categoryPage" element={<Categories/>} />
        <Route path="/category" element={<InCategory/>} />
      </Routes>
    </>
  );
};

export default App;
