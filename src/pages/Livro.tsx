import { useState, useEffect } from "react";
import api from "../services/api";

const LivroManager = () => {
  const [livro, setlivro] = useState<any[]>([]);
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [ano, setAno] = useState("");
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Função para buscar livro
  const fetchlivro = async () => {
    try {
      const response = await api.get("/livro");
      setlivro(response.data);
    } catch (error) {
      console.error("Erro ao buscar livro", error);
    }
  };

  // Carregar livro da API ao montar o componente
  useEffect(() => {
    fetchlivro();
  }, []);

  // Criar ou atualizar livro
  const handleSubmit = async () => {
    if (editing) {
      try {
        await api.put(`/livro/${editingId}`, { titulo, autor, ano });
        alert("Livro atualizado!");
      } catch (error) {
        console.error("Erro ao atualizar livro", error);
      }
    } else {
      try {
        await api.post("/livro", { titulo, autor, ano });
        alert("Livro criado!");
      } catch (error) {
        console.error("Erro ao criar livro", error);
      }
    }
    setTitulo("");
    setAutor("");
    setAno("");
    setEditing(false);
    setEditingId(null);
    fetchlivro(); // Recarregar os livro após criar ou atualizar
  };

  // Deletar livro
  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/livro/${id}`);
      alert("Livro deletado!");
      fetchlivro(); // Recarregar os livro após deletar
    } catch (error) {
      console.error("Erro ao deletar livro", error);
    }
  };

  // Editar livro
  const handleEdit = (livro: any) => {
    setTitulo(livro.titulo);
    setAutor(livro.autor);
    setAno(livro.ano);
    setEditing(true);
    setEditingId(livro._id);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Gerenciador de livro</h1>

      {/* Formulário de Livro */}
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <div className="mb-4">
          <label className="block mb-1 font-medium">Título</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Autor</label>
          <input
            type="text"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Ano</label>
          <input
            type="number"
            value={ano}
            onChange={(e) => setAno(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          {editing ? "Atualizar Livro" : "Criar Livro"}
        </button>
      </div>

      {/* Lista de livro */}
      <div className="mt-8 w-80">
        <h2 className="text-2xl font-bold mb-4">livro Cadastrados</h2>
        <ul>
          {livro.map((livro) => (
            <li
              key={livro._id}
              className="bg-white p-4 mb-4 shadow-md rounded-md flex justify-between items-center"
            >
              <div>
                <strong>{livro.titulo}</strong> por {livro.autor} ({livro.ano})
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(livro)}
                  className="bg-yellow-500 text-white p-1 rounded-md"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(livro._id)}
                  className="bg-red-500 text-white p-1 rounded-md"
                >
                  Deletar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LivroManager;
