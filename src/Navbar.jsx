import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#1e3d58] shadow-md p-4 fixed top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-white text-2xl font-bold">PharmaStock</h1>

        {/* Hamburger Button (Mobile) */}
        <button
          className="md:hidden text-white text-3xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✖" : "☰"}
        </button>

        {/* Navigation Links */}
        <motion.ul
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`md:flex md:space-x-8 absolute md:static bg-[#1e3d58] w-full md:w-auto left-0 md:flex-row flex-col transition-all duration-300 ease-in-out ${
            isOpen ? "top-14 opacity-100" : "top-[-300px] opacity-0 md:opacity-100"
          }`}
        >
          {["Home", "Add Stock", "View Stock", "Reports"].map((item, index) => (
            <li key={index} className="text-center md:text-left">
              <NavLink
                to={item.toLowerCase().replace(" ", "-")}
                className={({ isActive }) =>
                  `relative block px-4 py-2 text-white text-lg transition-all duration-300 ${
                    isActive
                      ? "font-bold text-[#43b0f1]"
                      : "hover:text-[#43b0f1]"
                  }`
                }
              >
                {item}
                {/* Animated underline */}
                <motion.span
                  className="absolute left-1/2 bottom-0 w-0 h-1 bg-[#43b0f1] rounded-lg transition-all duration-300"
                  whileHover={{ width: "100%", left: 0 }}
                />
              </NavLink>
            </li>
          ))}
        </motion.ul>
      </div>
    </nav>
  );
};

export default Navbar;
