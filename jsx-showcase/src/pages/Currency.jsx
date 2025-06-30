import { useState } from "react";

// Exchange rates relative to USD (static mock rates for demo purposes)
const exchangeRates = {
  USD: 1, EUR: 0.92, GBP: 0.78, PKR: 278, INR: 83, JPY: 158.24, CNY: 7.25,
  AUD: 1.51, CAD: 1.36, CHF: 0.89, AED: 3.67, SAR: 3.75, KWD: 0.31, BDT: 109,
  RUB: 89, TRY: 32, MXN: 18, ZAR: 18.5, HKD: 7.85, SGD: 1.34, MYR: 4.7,
  THB: 36.6, KRW: 1390, VND: 24600, NGN: 1490, BRL: 5.4, EGP: 47,
  DKK: 6.8, SEK: 10.5, NOK: 10.4,
};

const currencySymbols = {
  USD: "$", EUR: "€", GBP: "£", PKR: "₨", INR: "₹", JPY: "¥", CNY: "¥",
  AUD: "A$", CAD: "C$", CHF: "Fr", AED: "د.إ", SAR: "ر.س", KWD: "د.ك",
  BDT: "৳", RUB: "₽", TRY: "₺", MXN: "$", ZAR: "R", HKD: "HK$", SGD: "S$",
  MYR: "RM", THB: "฿", KRW: "₩", VND: "₫", NGN: "₦", BRL: "R$", EGP: "£",
  DKK: "kr", SEK: "kr", NOK: "kr"
};

const currencies = Object.keys(exchangeRates);

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [converted, setConverted] = useState(null);

  const convert = () => {
    if (!amount || isNaN(amount)) {
      setConverted("❌ Please enter a valid number");
      return;
    }

    const result = (parseFloat(amount) / exchangeRates[from]) * exchangeRates[to];
    setConverted(result.toFixed(2));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-purple-200 flex items-center justify-center p-6">
      <div className="bg-white/90 border border-rose-200 rounded-xl shadow-2xl p-8 w-full max-w-md text-center backdrop-blur-md">
        <h2 className="text-3xl font-bold text-pink-600 mb-6">🌍 Currency Converter</h2>

        <div className="mb-4">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="px-4 py-2 border border-rose-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-pink-200 text-center"
          />
        </div>

        <div className="flex gap-3 mb-6">
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-1/2 px-3 py-2 border border-rose-300 rounded"
          >
            {currencies.map((cur) => (
              <option key={cur} value={cur}>
                {currencySymbols[cur] || ""} {cur}
              </option>
            ))}
          </select>

          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-1/2 px-3 py-2 border border-rose-300 rounded"
          >
            {currencies.map((cur) => (
              <option key={cur} value={cur}>
                {currencySymbols[cur] || ""} {cur}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={convert}
          className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition font-medium shadow-md"
        >
          Convert Now
        </button>

        {converted !== null && (
          <div className="mt-6 text-lg font-semibold">
            {isNaN(converted) ? (
              <span className="text-red-500">{converted}</span>
            ) : (
              <span className="text-green-600 animate-pulse">
                {currencySymbols[to] || ""} {converted} {to}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
