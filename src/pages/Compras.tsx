import { useState, useEffect } from "react";
import api from "../services/api";

const CompraManager = () => {
  const [compras, setCompras] = useState<any[]>([]);
  const [nomeProduto, setNomeProduto] = useState("");
  const [valorProduto, setValorProduto] = useState("");
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const fetchCompras = async () => {
    try {
      const response = await api.get("/compra");
      setCompras(response.data);
    } catch (error) {
      console.error("Erro ao buscar compras", error);
    }
  };

  useEffect(() => {
    fetchCompras();
  }, []);

  const handleSubmit = async () => {
    if (editing) {
      try {
        await api.put(`/compra/${editingId}`, { nomeProduto, valorProduto });
        setMessage("Compra atualizada!");
      } catch (error) {
        console.error("Erro ao atualizar compra", error);
      }
    } else {
      try {
        await api.post("/compra", { nomeProduto, valorProduto });
        setMessage("Compra criada!");
      } catch (error) {
        console.error("Erro ao criar compra", error);
      }
    }
    setNomeProduto("");
    setValorProduto("");
    setEditing(false);
    setEditingId(null);
    fetchCompras();
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/compra/${id}`);
      setMessage("Compra deletada!");
      fetchCompras();
    } catch (error) {
      console.error("Erro ao deletar compra", error);
    }
  };

  const handleEdit = (compra: any) => {
    setNomeProduto(compra.nomeProduto);
    setValorProduto(compra.valorProduto);
    setEditing(true);
    setEditingId(compra._id);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h1 className="text-3xl font-bold mb-6">Gerenciador de Compras</h1>

        {/* Exibe a mensagem se houver uma */}
        {message && (
          <div className="bg-green-500 text-white p-2 rounded-md mb-4">
            {message}
          </div>
        )}

        <div className="mb-4">
          <label className="block mb-1 font-medium">Nome do Produto</label>
          <input
            type="text"
            value={nomeProduto}
            onChange={(e) => setNomeProduto(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Valor do Produto</label>
          <input
            type="number"
            value={valorProduto}
            onChange={(e) => setValorProduto(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          {editing ? "Atualizar Compra" : "Criar Compra"}
        </button>
      </div>

      <div className="flex-col mx-4">
        <h2 className="text-2xl font-bold mb-4">Compras Cadastradas</h2>
        <ul>
          {compras.map((compra) => (
            <li
              key={compra._id}
              className="bg-white p-4 mb-4 shadow-md rounded-md flex justify-between items-center"
            >
              <div>
                <strong>{compra.nomeProduto}</strong> - R${compra.valorProduto}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(compra)}
                  className="bg-yellow-500 text-white p-1 rounded-md"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(compra._id)}
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

export default CompraManager;
