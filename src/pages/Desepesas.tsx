import { useState, useEffect } from "react";
import api from "../services/api";

const DespesaManager = () => {
  const [despesas, setDespesas] = useState<any[]>([]);
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [data, setData] = useState("");
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const fetchDespesas = async () => {
    try {
      const response = await api.get("/despesa");
      const despesasComDataFormatada = response.data.map((despesa: any) => {
        const formattedData = new Date(despesa.dataDespesa)
          .toISOString()
          .split("T")[0];
        return { ...despesa, data: formattedData };
      });
      setDespesas(despesasComDataFormatada);
    } catch (error) {
      console.error("Erro ao buscar despesas", error);
    }
  };

  useEffect(() => {
    fetchDespesas();
  }, []);

  const handleSubmit = async () => {
    const valorNumerico = parseFloat(valor);

    if (editing) {
      try {
        await api.put(`/despesa/${editingId}`, {
          descricao,
          valor: valorNumerico,
          dataDespesa: data,
        });
        setMessage("Despesa atualizada!");
      } catch (error) {
        console.error("Erro ao atualizar despesa", error);
      }
    } else {
      try {
        await api.post("/despesa", {
          descricao,
          valor: valorNumerico,
          dataDespesa: data,
        });
        setMessage("Despesa criada!");
      } catch (error) {
        console.error("Erro ao criar despesa", error);
      }
    }

    setDescricao("");
    setValor("");
    setData("");
    setEditing(false);
    setEditingId(null);
    fetchDespesas();
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/despesa/${id}`);
      setMessage("Despesa deletada!");
      fetchDespesas();
    } catch (error) {
      console.error("Erro ao deletar despesa", error);
    }
  };

  const handleEdit = (despesa: any) => {
    setDescricao(despesa.descricao);
    setValor(despesa.valor.toString());
    setData(despesa.data);
    setEditing(true);
    setEditingId(despesa._id);
  };

  const calcularTotal = () => {
    return despesas
      .reduce((total, despesa) => total + despesa.valor, 0)
      .toFixed(2);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h1 className="text-3xl font-bold mb-6">Gerenciador de Despesas</h1>

        {message && (
          <div className="bg-green-500 text-white p-2 rounded-md mb-4">
            {message}
          </div>
        )}

        <div className="mb-4">
          <label className="block mb-1 font-medium">Descrição da Despesa</label>
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Valor da Despesa</label>
          <input
            type="number"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Data da Despesa</label>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          {editing ? "Atualizar Despesa" : "Criar Despesa"}
        </button>
      </div>

      <div className="flex-col mx-4">
        <h2 className="text-2xl font-bold mb-4">Despesas Cadastradas</h2>
        <ul>
          {despesas.map((despesa) => (
            <li
              key={despesa._id}
              className="bg-white p-4 mb-4 shadow-md rounded-md flex justify-between items-center"
            >
              <div>
                <strong>{despesa.descricao}</strong> - R${despesa.valor} -{" "}
                {new Date(despesa.data).toLocaleDateString()}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(despesa)}
                  className="bg-yellow-500 text-white p-1 rounded-md"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(despesa._id)}
                  className="bg-red-500 text-white p-1 rounded-md"
                >
                  Deletar
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-4 text-lg font-bold">
          Total das Despesas: R${calcularTotal()}
        </div>
      </div>
    </div>
  );
};

export default DespesaManager;
