import { useState } from "react";

export default function Calculator() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [operator, setOperator] = useState("+");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const a = parseFloat(num1);
    const b = parseFloat(num2);

    if (isNaN(a) || isNaN(b)) {
      setResult("Please enter valid numbers");
      return;
    }

    let res;
    switch (operator) {
      case "+": res = a + b; break;
      case "-": res = a - b; break;
      case "*": res = a * b; break;
      case "/": res = b !== 0 ? a / b : "Cannot divide by zero"; break;
      case "%": res = b !== 0 ? a % b : "Cannot mod by zero"; break;
      case "^": res = Math.pow(a, b); break;
      default: res = "Invalid operation";
    }

    setResult(res);
  };

  const reset = () => {
    setNum1("");
    setNum2("");
    setOperator("+");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-lg border border-pink-200 rounded-xl shadow-2xl p-8 max-w-md w-full text-center space-y-6 animate-fade-in">
        <h2 className="text-3xl font-bold text-pink-600">🌸 Fancy Calculator 🌸</h2>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <input
            type="number"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
            placeholder="First number"
            className="px-4 py-2 border border-rose-300 rounded w-full focus:outline-pink-400"
          />

          <select
            value={operator}
            onChange={(e) => setOperator(e.target.value)}
            className="px-4 py-2 border border-rose-300 bg-pink-50 rounded w-full"
          >
            <option value="+">+</option>
            <option value="-">−</option>
            <option value="*">×</option>
            <option value="/">÷</option>
            <option value="%">%</option>
            <option value="^">^ (power)</option>
          </select>

          <input
            type="number"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
            placeholder="Second number"
            className="px-4 py-2 border border-rose-300 rounded w-full focus:outline-pink-400"
          />
        </div>

        <div className="flex gap-4 justify-center mt-4">
          <button
            onClick={calculate}
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded shadow transition-all"
          >
            Calculate
          </button>
          <button
            onClick={reset}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded shadow transition-all"
          >
            Reset
          </button>
        </div>

        {result !== null && (
          <div className="mt-6 p-4 bg-purple-100 text-purple-800 text-xl font-semibold rounded-lg shadow animate-bounce">
            🌟 Result: {result}
          </div>
        )}
      </div>
    </div>
  );
}
