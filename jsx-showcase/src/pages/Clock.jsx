import { useState, useEffect } from "react";

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) => date.toLocaleTimeString();
  const formatAMPM = (date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
  const formatDate = (date) =>
    date.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  // Analog clock hands angles
  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const secDeg = seconds * 6;
  const minDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = ((hours % 12) / 12) * 360 + (minutes / 60) * 30;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 p-6 grid gap-6 place-items-center sm:grid-cols-2 lg:grid-cols-3">
      {/* Digital Clock */}
      <ClockCard title="🌸 Digital Clock 🌸">
        <p className="text-4xl font-mono text-purple-700">{formatTime(time)}</p>
      </ClockCard>

      {/* 12-Hour AM/PM */}
      <ClockCard title="🌸 12-Hour Clock (AM/PM) 🌸">
        <p className="text-4xl font-semibold text-rose-700">{formatAMPM(time)}</p>
      </ClockCard>

      {/* Analog Clock */}
      <ClockCard title="🌸 Analog Clock 🌸">
        <div className="relative w-36 h-36 mx-auto rounded-full border-4 border-rose-300 flex items-center justify-center bg-white/50">
          {/* Hour hand */}
          <div
            className="absolute bg-rose-700 w-1 h-10 origin-bottom"
            style={{ transform: `rotate(${hourDeg}deg)` }}
          />
          {/* Minute hand */}
          <div
            className="absolute bg-purple-600 w-0.5 h-14 origin-bottom"
            style={{ transform: `rotate(${minDeg}deg)` }}
          />
          {/* Second hand */}
          <div
            className="absolute bg-pink-500 w-0.5 h-16 origin-bottom"
            style={{ transform: `rotate(${secDeg}deg)` }}
          />
          {/* Center dot */}
          <div className="absolute w-3 h-3 bg-rose-700 rounded-full z-10" />
        </div>
      </ClockCard>

      {/* Date Clock */}
      <ClockCard title="🌸 Date & Day 🌸">
        <p className="text-lg text-purple-600">{formatDate(time)}</p>
      </ClockCard>

      {/* Fancy Clock */}
      <ClockCard title="🌸 Fancy Minimal Clock 🌸">
        <p className="text-5xl font-bold text-pink-600 tracking-widest">
          {time.getHours().toString().padStart(2, "0")}:
          {time.getMinutes().toString().padStart(2, "0")}
        </p>
      </ClockCard>
    </div>
  );
}

// 💖 Reusable Clock Card
const ClockCard = ({ title, children }) => (
  <div className="bg-white/90 backdrop-blur-lg border border-rose-200 rounded-xl shadow-2xl p-6 w-full max-w-xs text-center">
    <h2 className="text-xl font-bold text-pink-600 mb-3">{title}</h2>
    <div>{children}</div>
  </div>
);
