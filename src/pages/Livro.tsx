import { useState } from "react";

const Calculator = () => {
  const [firstNumber, setFirstNumber] = useState("");
  const [secondNumber, setSecondNumber] = useState("");
  const [operator, setOperator] = useState("+");
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    const num1 = parseFloat(firstNumber);
    const num2 = parseFloat(secondNumber);
    let res = 0;

    switch (operator) {
      case "+":
        res = num1 + num2;
        break;
      case "-":
        res = num1 - num2;
        break;
      case "*":
        res = num1 * num2;
        break;
      case "/":
        res = num1 / num2;
        break;
      default:
        break;
    }
    setResult(res);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Calculadora</h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <div className="mb-4">
          <label className="block mb-1 font-medium">Primeiro Número</label>
          <input
            type="number"
            value={firstNumber}
            onChange={(e) => setFirstNumber(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Operador</label>
          <select
            value={operator}
            onChange={(e) => setOperator(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="+">+</option>
            <option value="-">-</option>
            <option value="*">*</option>
            <option value="/">/</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Segundo Número</label>
          <input
            type="number"
            value={secondNumber}
            onChange={(e) => setSecondNumber(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Calcular
        </button>

        {result !== null && (
          <div className="mt-4 text-center text-xl">
            <strong>Resultado: </strong>
            {result}
          </div>
        )}
      </div>
    </div>
  );
};

export default Calculator;
