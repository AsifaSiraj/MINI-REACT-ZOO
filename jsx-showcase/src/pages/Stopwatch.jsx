import { useState, useRef, useEffect } from "react";

export default function Stopwatch() {
  const [mode, setMode] = useState("basic");

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-purple-200 p-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-pink-600 mb-6">⏰ Multi Stopwatch</h2>

      <div className="flex gap-4 mb-6">
        {["basic", "lap", "countdown"].map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-4 py-2 rounded-full shadow-md font-medium transition ${
              mode === m
                ? "bg-pink-500 text-white"
                : "bg-white/80 text-gray-800 hover:bg-pink-200"
            }`}
          >
            {m.charAt(0).toUpperCase() + m.slice(1)} Mode
          </button>
        ))}
      </div>

      <div className="w-full max-w-md">
        {mode === "basic" && <BasicTimer />}
        {mode === "lap" && <LapTimer />}
        {mode === "countdown" && <CountdownTimer />}
      </div>
    </div>
  );
}

// Time formatter
const formatTime = (s) => {
  const mins = String(Math.floor(s / 60)).padStart(2, "0");
  const secs = String(s % 60).padStart(2, "0");
  return `${mins}:${secs}`;
};

// 💠 Shared Card Wrapper
function Card({ children }) {
  return (
    <div className="bg-white/90 border border-rose-200 rounded-xl shadow-2xl p-8 w-full text-center backdrop-blur-md">
      {children}
    </div>
  );
}

// ✅ Basic Timer
function BasicTimer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const ref = useRef();

  useEffect(() => () => clearInterval(ref.current), []);

  const start = () => {
    if (!running) {
      setRunning(true);
      ref.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    }
  };

  const stop = () => {
    setRunning(false);
    clearInterval(ref.current);
  };

  const reset = () => {
    stop();
    setSeconds(0);
  };

  return (
    <Card>
      <h3 className="text-2xl font-bold text-purple-700 mb-4">⏱️ Basic Stopwatch</h3>
      <p className="text-5xl font-mono text-gray-800 mb-6">{formatTime(seconds)}</p>
      <div className="flex justify-center gap-4">
        {!running ? (
          <button onClick={start} className="btn-green">Start</button>
        ) : (
          <button onClick={stop} className="btn-yellow">Pause</button>
        )}
        <button onClick={reset} className="btn-red">Reset</button>
      </div>
    </Card>
  );
}

// ✅ Lap Timer
function LapTimer() {
  const [seconds, setSeconds] = useState(0);
  const [laps, setLaps] = useState([]);
  const [running, setRunning] = useState(false);
  const ref = useRef();

  useEffect(() => () => clearInterval(ref.current), []);

  const start = () => {
    if (!running) {
      setRunning(true);
      ref.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    }
  };

  const stop = () => {
    setRunning(false);
    clearInterval(ref.current);
  };

  const reset = () => {
    stop();
    setSeconds(0);
    setLaps([]);
  };

  const lap = () => setLaps([...laps, formatTime(seconds)]);

  return (
    <Card>
      <h3 className="text-2xl font-bold text-purple-700 mb-4">🏁 Lap Stopwatch</h3>
      <p className="text-5xl font-mono text-gray-800 mb-4">{formatTime(seconds)}</p>
      <div className="flex justify-center gap-3 mb-3">
        {!running ? (
          <button onClick={start} className="btn-green">Start</button>
        ) : (
          <button onClick={stop} className="btn-yellow">Pause</button>
        )}
        <button onClick={lap} className="btn-blue">Lap</button>
        <button onClick={reset} className="btn-red">Reset</button>
      </div>
      {laps.length > 0 && (
        <ul className="text-left max-h-40 overflow-y-auto text-sm text-gray-700">
          {laps.map((lap, i) => (
            <li key={i}>Lap {i + 1}: {lap}</li>
          ))}
        </ul>
      )}
    </Card>
  );
}

// ✅ Countdown Timer
function CountdownTimer() {
  const [input, setInput] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const ref = useRef();

  useEffect(() => () => clearInterval(ref.current), []);

  const start = () => {
    const sec = parseInt(input);
    if (isNaN(sec) || sec <= 0) return;
    setSeconds(sec);
    setRunning(true);
    ref.current = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(ref.current);
          setRunning(false);
        }
        return s - 1;
      });
    }, 1000);
  };

  const reset = () => {
    clearInterval(ref.current);
    setRunning(false);
    setSeconds(0);
    setInput("");
  };

  return (
    <Card>
      <h3 className="text-2xl font-bold text-purple-700 mb-4">⏳ Countdown</h3>
      <p className="text-5xl font-mono text-gray-800 mb-4">{formatTime(seconds)}</p>
      <div className="flex flex-col items-center gap-3">
        <input
          type="number"
          placeholder="Enter seconds"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={running}
          className="px-4 py-1.5 border border-rose-200 rounded text-center w-40 text-sm"
        />
        <div className="flex gap-3">
          <button onClick={start} disabled={running} className="btn-green">Start</button>
          <button onClick={reset} className="btn-red">Reset</button>
        </div>
      </div>
    </Card>
  );
}
