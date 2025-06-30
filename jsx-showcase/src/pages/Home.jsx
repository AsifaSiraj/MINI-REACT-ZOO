import React, { useState } from "react";
import { Link } from "react-router-dom";
import 'animate.css';
import cuteCat from "../assets/hehe.gif";

const features = [
  { name: "To-Do List", path: "/todo" },
  { name: "Counter", path: "/counter" },
  { name: "Digital Clock", path: "/clock" },
  { name: "Weather App", path: "/weather" },
  { name: "Quote Generator", path: "/quote" },
  { name: "Calculator", path: "/calculator" },
  { name: "Color Picker", path: "/colorpicker" },
  { name: "Form Validation", path: "/formvalidation" },
  { name: "Image Gallery", path: "/imagegallery" },
  { name: "Theme Toggle", path: "/themetoggle" },
  { name: "Stopwatch", path: "/stopwatch" },
  { name: "Accordion", path: "/accordion" },
  { name: "BMI Calculator", path: "/bmi" },
  { name: "Currency Converter", path: "/currency" },
  { name: "Search Filter", path: "/searchfilter" },
  { name: "Quiz App", path: "/quiz" },
  { name: "Cards Display", path: "/cards" },
  { name: "Emoji Meaning", path: "/emoji" },
];

export default function Home() {
  const [showCat, setShowCat] = useState(false);

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-pink-100 to-blue-100 flex flex-col items-center justify-center p-6 overflow-hidden relative"
      onMouseEnter={() => setShowCat(true)}
      onMouseLeave={() => setShowCat(false)}
    >
      {/* Title */}
      <h1 className="text-5xl font-extrabold text-rose-600 mb-4 drop-shadow-lg text-center animate__animated animate__fadeInDown">
        Mini React Project Zoo 
      </h1>

      <p className="text-lg text-rose-500 mb-8 max-w-lg text-center font-medium animate__animated animate__fadeIn">
        ✨ Explore interactive mini apps made in ReactJS. Tap any box to begin!
      </p>

      {/* 🐱 Cute Cat Appears Only When Hovering */}
      {showCat && (
        <img
          src={cuteCat}
          alt="Cute animated cat"
          className="absolute bottom-16 right-5 w-32 h-32 animate-float-slow z-10 transition-opacity duration-500"
        />
      )}

      {/* Project Links Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl w-full z-10">
        {features.map((item, i) => (
          <Link
            key={i}
            to={item.path}
            className="bg-white shadow-xl rounded-xl p-4 text-center text-rose-600 font-semibold hover:bg-rose-50 hover:scale-105 transition-all duration-300 border border-rose-200"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
