import { useState } from "react";

// 🌍 Global Emoji Dictionary with Animations
const emojiDictionary = {
  "😀": "Grinning Face",
  "😂": "Face with Tears of Joy",
  "😍": "Smiling Face with Heart-Eyes",
  "🤔": "Thinking Face",
  "😎": "Cool Face",
  "😭": "Crying Face",
  "😡": "Angry Face",
  "🎉": "Party Popper",
  "❤️": "Red Heart",
  "👍": "Thumbs Up",
  "🙌": "Raising Hands",
  "🌍": "Globe Europe-Africa",
  "🇯🇵": "Flag: Japan",
  "🇫🇷": "Flag: France",
  "🇧🇷": "Flag: Brazil",
  "🇵🇰": "Flag: Pakistan",
  "🇺🇸": "Flag: United States",
  "🇰🇷": "Flag: South Korea",
  "🇮🇳": "Flag: India",
  "🌈": "Rainbow",
  "🔥": "Fire",
  "🌟": "Glowing Star",
  "💡": "Light Bulb (Idea)",
  "🎶": "Musical Notes",
  "🕊️": "Dove of Peace",
  "🍕": "Pizza",
  "⚽": "Soccer Ball",
  "🏔️": "Mountain",
};

const knownEmojis = Object.keys(emojiDictionary);

export default function EmojiApp() {
  const [inputEmoji, setInputEmoji] = useState("");
  const [meaning, setMeaning] = useState("");

  const handleInput = (e) => {
    const emoji = e.target.value.trim();
    setInputEmoji(emoji);
    if (emojiDictionary[emoji]) {
      setMeaning(emojiDictionary[emoji]);
    } else {
      setMeaning("❌ Emoji not found in database");
    }
  };

  const handleClick = (emoji) => {
    setInputEmoji(emoji);
    setMeaning(emojiDictionary[emoji]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-purple-200 flex flex-col items-center justify-center p-6">
      <h2 className="text-3xl font-bold text-rose-700 mb-6 animate-fade-in">🌐 Emoji Meaning Explorer</h2>

      <div className="bg-white/90 border border-rose-200 rounded-xl shadow-2xl backdrop-blur-md p-6 w-full max-w-xl text-center animate-fade-in">
        <input
          value={inputEmoji}
          onChange={handleInput}
          placeholder="🌎 Enter or click an emoji..."
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 text-3xl text-center shadow"
        />
        <div className="mt-4 text-lg text-rose-600 font-semibold min-h-[36px] transition-all">
          {meaning}
        </div>

        <div className="mt-6 grid grid-cols-5 sm:grid-cols-6 gap-4 justify-center items-center text-4xl">
          {knownEmojis.map((emoji, i) => (
            <span
              key={i}
              onClick={() => handleClick(emoji)}
              // className={`cursor-pointer transition-transform transform hover:scale-125 ${
              //   i % 5 === 0
              //     ? "animate-bounce"
              //     : i % 4 === 0
              //     ? "animate-pulse"
              //     : i % 3 === 0
              //     ? "hover:rotate-6"
              //     : ""
              // }`}
              title={emojiDictionary[emoji]}
            >
              {emoji}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
