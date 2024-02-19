import { Routes, Route } from "react-router-dom";
import { Home, Login, Register, IceBreakerForm} from "./pages";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/IceBreakerForm" element={<IceBreakerForm />} /> 
      </Routes>
    </>
  );
};

export default App;
