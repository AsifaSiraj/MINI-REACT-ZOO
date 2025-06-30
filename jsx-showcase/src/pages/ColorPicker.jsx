import { useState } from "react";

export default function ColorPicker() {
  const [hexColor, setHexColor] = useState("#ff9ff3");
  const [opacity, setOpacity] = useState(1);
  const [secondColor, setSecondColor] = useState("#feca57");
  const [showGradient, setShowGradient] = useState(false);
  const [copied, setCopied] = useState(false);

  const hexToRgb = (hex) => {
    let parsed = hex.replace("#", "");
    if (parsed.length === 3) {
      parsed = parsed.split("").map((c) => c + c).join("");
    }
    const bigint = parseInt(parsed, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
  };

  const rgb = hexToRgb(hexColor);
  const hsl = rgb
    ? rgbToHsl(rgb.r, rgb.g, rgb.b)
    : { h: 0, s: 0, l: 0 };

  function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    let max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h = 0,
      s = 0,
      l = (max + min) / 2;
    if (max !== min) {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
          break;
        case g:
          h = ((b - r) / d + 2) * 60;
          break;
        case b:
          h = ((r - g) / d + 4) * 60;
          break;
      }
    }
    return {
      h: Math.round(h),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setHexColor("#ff9ff3");
    setSecondColor("#feca57");
    setOpacity(1);
    setShowGradient(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-purple-200 flex items-center justify-center p-6">
      <div className="bg-white/90 backdrop-blur-lg border border-rose-200 rounded-2xl shadow-2xl p-8 max-w-xl w-full text-center space-y-6">
        <h2 className="text-3xl font-bold text-pink-600">🌸 Color Picker 🌸</h2>

        {/* Pickers */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <div className="flex flex-col items-center">
            <label className="text-sm font-medium text-gray-600 mb-1">Primary Color</label>
            <input
              type="color"
              value={hexColor}
              onChange={(e) => setHexColor(e.target.value)}
              className="w-24 h-14 rounded-lg border border-gray-300"
            />
          </div>
          <div className="flex flex-col items-center">
            <label className="text-sm font-medium text-gray-600 mb-1">Secondary (for Gradient)</label>
            <input
              type="color"
              value={secondColor}
              onChange={(e) => setSecondColor(e.target.value)}
              className="w-24 h-14 rounded-lg border border-gray-300"
            />
          </div>
          <div className="flex flex-col items-center">
            <label className="text-sm font-medium text-gray-600 mb-1">Opacity</label>
            <input
              type="range"
              value={opacity}
              onChange={(e) => setOpacity(Number(e.target.value))}
              min="0"
              max="1"
              step="0.01"
              className="w-28"
            />
            <span className="text-sm text-gray-500">{Math.round(opacity * 100)}%</span>
          </div>
        </div>

        {/* Display Box */}
        <div
          className="rounded-xl border-4 border-rose-200 shadow-inner w-full h-44 transition-all duration-500"
          style={{
            background: showGradient
              ? `linear-gradient(135deg, ${hexColor}, ${secondColor})`
              : hexColor,
            opacity,
          }}
        ></div>

        {/* Formats */}
        <div className="grid sm:grid-cols-3 gap-4 text-left text-sm font-mono text-gray-600">
          <div>HEX: <span className="font-semibold text-black">{hexColor}</span></div>
          <div>RGB: <span className="font-semibold text-black">rgb({rgb.r}, {rgb.g}, {rgb.b})</span></div>
          <div>HSL: <span className="font-semibold text-black">hsl({hsl.h}, {hsl.s}%, {hsl.l}%)</span></div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <button
            onClick={() => setShowGradient(!showGradient)}
            className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg shadow transition-all"
          >
            {showGradient ? "Hide Gradient" : "Show Gradient"}
          </button>

          <button
            onClick={() => copyToClipboard(hexColor)}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg shadow transition-all"
          >
            {copied ? "Copied!" : "Copy HEX"}
          </button>

          <button
            onClick={reset}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg shadow transition-all"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
