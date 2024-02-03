import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<h1>Welcome to the app!</h1>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
