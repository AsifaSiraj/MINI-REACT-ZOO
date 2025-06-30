import { useState } from "react";

const people = [
  "Alice",
  "Bob",
  "Charlie",
  "David",
  "Evelyn",
  "Farhan",
  "Grace",
  "Hassan",
  "Ibrahim",
  "Jessica",
  "Kiran",
  "Liam",
];

export default function SearchFilter() {
  const [search, setSearch] = useState("");

  const filtered = people.filter((person) =>
    person.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-purple-200 p-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-rose-600 mb-6">🔍 Smart Search Filter</h2>

      <div className="bg-white/90 border border-rose-200 rounded-xl shadow-2xl backdrop-blur-md p-8 w-full max-w-md text-center animate-fade-in">
        <input
          type="text"
          placeholder="Type a name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-rose-300 text-sm shadow-sm"
        />

        <ul className="text-left space-y-2 max-h-60 overflow-y-auto text-sm">
          {filtered.length > 0 ? (
            filtered.map((name, index) => (
              <li
                key={index}
                className="bg-rose-100 px-4 py-2 rounded text-rose-800 hover:bg-rose-200 transition font-medium shadow-sm"
              >
                {name}
              </li>
            ))
          ) : (
            <li className="text-gray-400 text-center">No matches found.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
