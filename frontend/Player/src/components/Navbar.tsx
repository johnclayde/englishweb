import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AlbumTest } from "./AlbumTest";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800 px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-white text-lg font-bold">
        Home
      </Link>
      <div
        className="lg:hidden space-y-1 cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="block w-6 h-0.5 bg-white"></span>
        <span className="block w-6 h-0.5 bg-white"></span>
        <span className="block w-6 h-0.5 bg-white"></span>
      </div>

      <ul
        className={`${
          menuOpen ? "block" : "hidden"
        } lg:flex space-x-4 text-white`}
      >
        <li>
          <NavLink
            to="/audio"
            className={({ isActive }) => (isActive ? "underline" : "")}
          >
            AudioPlayer
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/album"
            className={({ isActive }) => (isActive ? "underline" : "")}
          >
            AlbumTest
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};