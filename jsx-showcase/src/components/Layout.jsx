import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      {/* Show Back button only if not on home page */}
      {location.pathname !== "/" && (
        <button
          onClick={() => navigate("/")}
          className="fixed top-4 left-4 z-50 bg-pink-500 hover:bg-pink-600 text-white font-bold px-4 py-2 rounded-full shadow-md transition"
        >
          ⬅ Back to Home
        </button>
      )}
      {children}
    </>
  );
}
