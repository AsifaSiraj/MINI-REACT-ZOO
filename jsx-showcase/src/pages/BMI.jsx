import { useState } from "react";

export default function BMI() {
  const [mode, setMode] = useState("metric"); // metric | imperial | child
  const [inputs, setInputs] = useState({});
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const calculateBMI = () => {
    let h = 0, w = 0;

    if (mode === "metric") {
      h = parseFloat(inputs.height) / 100;
      w = parseFloat(inputs.weight);
    } else if (mode === "imperial") {
      const ft = parseFloat(inputs.feet) || 0;
      const inch = parseFloat(inputs.inch) || 0;
      h = ((ft * 12) + inch) * 0.0254; // in meters
      w = parseFloat(inputs.pounds) * 0.453592; // in kg
    } else if (mode === "child") {
      h = parseFloat(inputs.childHeight) / 100;
      w = parseFloat(inputs.childWeight);
    }

    if (isNaN(h) || isNaN(w) || h <= 0 || w <= 0) {
      setBmi(null);
      setCategory("Please enter valid values.");
      return;
    }

    const value = w / (h * h);
    setBmi(value.toFixed(2));

    if (value < 18.5) setCategory("Underweight");
    else if (value < 24.9) setCategory("Normal weight");
    else if (value < 29.9) setCategory("Overweight");
    else setCategory("Obese");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-purple-200 flex flex-col items-center justify-start py-12 px-4">
      <div className="bg-white/90 backdrop-blur-lg border border-rose-200 shadow-2xl rounded-2xl w-full max-w-xl p-8">
        <h2 className="text-3xl font-bold text-pink-600 text-center mb-6">🌸 BMI Calculator 🌸</h2>

        {/* Mode Selector */}
        <div className="flex flex-wrap gap-3 justify-center mb-6">
          <button
            onClick={() => setMode("metric")}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              mode === "metric" ? "bg-pink-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            Metric (kg/cm)
          </button>
          <button
            onClick={() => setMode("imperial")}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              mode === "imperial" ? "bg-pink-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            Imperial (lbs/ft+in)
          </button>
          <button
            onClick={() => setMode("child")}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              mode === "child" ? "bg-pink-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            Child/Teen
          </button>
        </div>

        {/* Form Inputs */}
        <div className="space-y-4 mb-6">
          {mode === "metric" && (
            <>
              <input
                name="height"
                type="number"
                value={inputs.height || ""}
                onChange={handleChange}
                placeholder="Height (cm)"
                className="w-full px-4 py-2 border border-rose-300 rounded-md"
              />
              <input
                name="weight"
                type="number"
                value={inputs.weight || ""}
                onChange={handleChange}
                placeholder="Weight (kg)"
                className="w-full px-4 py-2 border border-rose-300 rounded-md"
              />
            </>
          )}

          {mode === "imperial" && (
            <>
              <div className="flex gap-3">
                <input
                  name="feet"
                  type="number"
                  value={inputs.feet || ""}
                  onChange={handleChange}
                  placeholder="Feet"
                  className="w-full px-4 py-2 border border-rose-300 rounded-md"
                />
                <input
                  name="inch"
                  type="number"
                  value={inputs.inch || ""}
                  onChange={handleChange}
                  placeholder="Inches"
                  className="w-full px-4 py-2 border border-rose-300 rounded-md"
                />
              </div>
              <input
                name="pounds"
                type="number"
                value={inputs.pounds || ""}
                onChange={handleChange}
                placeholder="Weight (lbs)"
                className="w-full px-4 py-2 border border-rose-300 rounded-md"
              />
            </>
          )}

          {mode === "child" && (
            <>
              <input
                name="childHeight"
                type="number"
                value={inputs.childHeight || ""}
                onChange={handleChange}
                placeholder="Height (cm)"
                className="w-full px-4 py-2 border border-rose-300 rounded-md"
              />
              <input
                name="childWeight"
                type="number"
                value={inputs.childWeight || ""}
                onChange={handleChange}
                placeholder="Weight (kg)"
                className="w-full px-4 py-2 border border-rose-300 rounded-md"
              />
              <input
                name="age"
                type="number"
                value={inputs.age || ""}
                onChange={handleChange}
                placeholder="Age (years)"
                className="w-full px-4 py-2 border border-rose-300 rounded-md"
              />
              <select
                name="gender"
                value={inputs.gender || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-rose-300 rounded-md"
              >
                <option value="">Select Gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
            </>
          )}
        </div>

        <button
          onClick={calculateBMI}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-lg transition"
        >
          Calculate BMI
        </button>

        {/* Output */}
        {bmi && (
          <div className="mt-6 text-center text-xl">
            <p className="text-gray-800">
              Your BMI: <span className="font-bold text-pink-700">{bmi}</span>
            </p>
            <p className="text-purple-700 mt-2">
              Category: <span className="font-semibold">{category}</span>
            </p>
          </div>
        )}

        {!bmi && category && (
          <div className="mt-4 text-red-500 text-center font-medium">{category}</div>
        )}
      </div>
    </div>
  );
}
