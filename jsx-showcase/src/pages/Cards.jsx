import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const cards = [
  {
    title: "Inception",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUD3JdKPk9R9EjuDyh071O7e4XRt-j2gfvYg&s",
    rating: "8.8/10",
    genre: "Sci-Fi",
    description: "A mind-bending thriller by Christopher Nolan.",
  },
  {
    title: "Interstellar",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd9I7XhTx573nrcmOGVMi8nmCxV0S2ZNBSHg&s",
    rating: "8.6/10",
    genre: "Adventure",
    description: "Exploring love, gravity, and time across galaxies.",
  },
  {
    title: "The Dark Knight",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuQkuST8nQ9yLK6ZxxK2m3P2c9W4c5WzZSEw&s",
    rating: "9.0/10",
    genre: "Action",
    description: "Batman battles Joker in this legendary action film.",
  },
];

export default function Cards() {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (index) => {
    setFavorites((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-purple-200 p-8 flex flex-col items-center">
      <h2 className="text-4xl font-bold text-pink-600 mb-10 text-center animate-fade-in">
        🎬 Featured Movie Picks
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white/90 border border-rose-200 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md transition-transform transform hover:scale-105 relative group"
          >
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-48 object-cover"
            />

            {/* Favorite Heart Icon */}
            <button
              onClick={() => toggleFavorite(index)}
              className="absolute top-3 right-3 text-white bg-black/40 p-2 rounded-full hover:bg-black/60 transition"
            >
              {favorites.includes(index) ? (
                <FaHeart className="text-red-500" />
              ) : (
                <FaRegHeart className="text-white" />
              )}
            </button>

            <div className="p-5 text-left">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold text-purple-700">{card.title}</h3>
                <span className="text-xs bg-pink-200 text-pink-700 px-2 py-1 rounded-full text-xs font-medium">
                  {card.genre}
                </span>
              </div>
              <p className="text-xs text-rose-500 mb-2 font-mono">{card.rating}</p>
              <p className="text-gray-700 text-sm">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
