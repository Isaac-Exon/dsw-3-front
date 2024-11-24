import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-blue-800 p-4 text-white flex justify-around">
      <button
        className="hover:bg-blue-700 p-2 rounded"
        onClick={() => navigate("/Livros")}
      >
        Livros
      </button>
      <button
        className="hover:bg-blue-700 p-2 rounded"
        onClick={() => navigate("/Compras")}
      >
        Compras
      </button>
      <button
        className="hover:bg-blue-700 p-2 rounded"
        onClick={() => navigate("/Despesas")}
      >
        Despesas
      </button>
    </nav>
  );
};

export default Navbar;
