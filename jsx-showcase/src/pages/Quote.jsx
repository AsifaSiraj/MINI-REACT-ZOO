import { useEffect, useState } from "react";

export default function Quote() {
  const [quote, setQuote] = useState({ text: "", author: "" });
  const [loading, setLoading] = useState(true);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/quote");
      const data = await res.json();
      setQuote({ text: data.q, author: data.a });
    } catch (err) {
      console.error("Failed to fetch quote:", err);
      setQuote({
        text: "Oops! Could not fetch a quote. Please try again.",
        author: "Error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote(); // Load one quote on mount
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 flex items-center justify-center p-6">
      <div className="bg-white/90 backdrop-blur-lg border border-rose-200 rounded-xl shadow-2xl p-8 max-w-xl w-full text-center space-y-6 animate-fade-in">
        <h2 className="text-3xl font-bold text-pink-600 animate-pulse">
          🌸 Quote Generator 🌸
        </h2>

        {loading ? (
          <p className="text-lg text-gray-500">Loading quote…</p>
        ) : (
          <>
            <p className="text-xl font-medium text-purple-700 leading-snug">
              “{quote.text}”
            </p>
            <p className="text-sm italic text-rose-500">
              — {quote.author || "Unknown"}
            </p>
          </>
        )}

        <button
          onClick={fetchQuote}
          disabled={loading}
          className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg shadow transition-all disabled:opacity-50"
        >
          {loading ? "Loading…" : "Get New Quote"}
        </button>
      </div>
    </div>
  );
}
