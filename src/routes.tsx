import { Routes, Route } from "react-router-dom";

import LivroManager from "./pages/Livro";
import CompraManager from "./pages/Compras";
import Navbar from "./components/Menu";

function Rotas() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/Livros" element={<LivroManager />} />
        <Route path="/Compras" element={<CompraManager />} />
      </Routes>
    </div>
  );
}

export default Rotas;
