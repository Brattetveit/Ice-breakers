import { Routes, Route } from "react-router-dom";
import { Home, Login, Register, AboutGame } from "./pages";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/aboutGame" element={<AboutGame />} />
      </Routes>
    </>
  );
};

export default App;
