import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="bg-pink-200 text-rose-700 py-4 shadow-lg relative z-50">
    <div className="container mx-auto px-4 flex justify-between items-center">
      <Link
        to="/"
        className="text-2xl font-bold tracking-wide hover:scale-105 transition-all flex items-center gap-2"
      >
        <span className="text-3xl"></span>
        Mini React Zoo
      </Link>

      <span className="hidden sm:inline text-sm text-rose-600 italic">
        Explore, click, enjoy 
      </span>
    </div>
  </nav>
);

export default Navbar;
