import { useEffect, useState } from "react";

export default function Counter() {
  const [basic, setBasic] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [double, setDouble] = useState(0);
  const [step, setStep] = useState(1);
  const [stepValue, setStepValue] = useState(0);
  const [auto, setAuto] = useState(0);
  const [autoRunning, setAutoRunning] = useState(false);

  // ✅ Custom Counter State
  const [custom, setCustom] = useState(0);
  const [customStart, setCustomStart] = useState(0);
  const [customStep, setCustomStep] = useState(1);

  useEffect(() => {
    let interval;
    if (autoRunning) {
      interval = setInterval(() => {
        setAuto((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [autoRunning]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 p-6 grid gap-6 place-items-center sm:grid-cols-2 md:grid-cols-3">
      
      {/* Basic Counter */}
      <CounterCard title="🌸 Basic Counter 🌸" value={basic}>
        <CounterButton onClick={() => setBasic(basic - 1)}>Decrease</CounterButton>
        <CounterButton onClick={() => setBasic(0)}>Reset</CounterButton>
        <CounterButton onClick={() => setBasic(basic + 1)}>Increase</CounterButton>
      </CounterCard>

      {/* Click Counter */}
      <CounterCard title="💫 Click Counter" value={clicks}>
        <CounterButton onClick={() => setClicks(clicks + 1)}>Click Me!</CounterButton>
      </CounterCard>

      {/* Double Counter */}
      <CounterCard title="🌸 Double Counter 🌸" value={double}>
        <CounterButton onClick={() => setDouble(double - 2)}>-2</CounterButton>
        <CounterButton onClick={() => setDouble(0)}>Reset</CounterButton>
        <CounterButton onClick={() => setDouble(double + 2)}>+2</CounterButton>
      </CounterCard>

      {/* Step Counter */}
      <CounterCard title="🌸 Step Counter 🌸" value={stepValue}>
        <input
          type="number"
          className="w-full text-center border border-rose-300 rounded py-1 mb-2"
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
        />
        <CounterButton onClick={() => setStepValue(stepValue + step)}>+ Step</CounterButton>
        <CounterButton onClick={() => setStepValue(0)}>Reset</CounterButton>
      </CounterCard>

      {/* Auto Counter */}
      <CounterCard title="⏱ Auto Counter" value={auto}>
        <CounterButton onClick={() => setAutoRunning(!autoRunning)}>
          {autoRunning ? "Stop" : "Start"}
        </CounterButton>
        <CounterButton onClick={() => setAuto(0)}>Reset</CounterButton>
      </CounterCard>

      {/* ✅ Customizable Counter */}
      <CounterCard title="🎨 Custom Counter" value={custom}>
        <div className="w-full text-left space-y-2 mb-2">
          <label className="text-sm text-pink-600 font-medium">
            Start Value
            <input
              type="number"
              className="w-full text-center border border-rose-300 rounded py-1 mt-1"
              placeholder="Start Value"
              value={customStart}
              onChange={(e) => setCustomStart(Number(e.target.value))}
            />
          </label>

          <label className="text-sm text-pink-600 font-medium">
            Step Value
            <input
              type="number"
              className="w-full text-center border border-rose-300 rounded py-1 mt-1"
              placeholder="Step Value"
              value={customStep}
              onChange={(e) => setCustomStep(Number(e.target.value))}
            />
          </label>
        </div>

        <CounterButton onClick={() => setCustom(custom - customStep)}>Decrease</CounterButton>
        <CounterButton onClick={() => setCustom(custom + customStep)}>Increase</CounterButton>
        <CounterButton onClick={() => setCustom(customStart)}>Reset</CounterButton>
      </CounterCard>
    </div>
  );
}

// 💎 Reusable Card Component
const CounterCard = ({ title, value, children }) => (
  <div className="bg-white/90 backdrop-blur-lg border border-rose-200 rounded-xl shadow-2xl p-6 w-full max-w-xs text-center">
    <h2 className="text-xl font-bold text-pink-600 mb-2">{title}</h2>
    <div className="text-4xl font-extrabold text-rose-700 mb-4">{value}</div>
    <div className="space-y-2 flex flex-col items-center w-full">{children}</div>
  </div>
);

// 💖 Reusable Button
const CounterButton = ({ children, ...props }) => (
  <button
    {...props}
    className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg shadow transition-all w-full"
  >
    {children}
  </button>
);
