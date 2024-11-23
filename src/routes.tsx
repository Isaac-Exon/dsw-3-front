import { Routes, Route } from "react-router-dom";
import Calculator from "./pages/Livro";

function Rotas() {
  return (
    <Routes>
      <Route path="/" element={<Calculator />} />
    </Routes>
  );
}

export default Rotas;
