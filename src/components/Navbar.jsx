import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between bg-white p-4 rounded-full">
      <Link to="/">
      <p className="text-2xl font-bold text-gradient">RESUMIND</p></Link>
      <Link to="/upload" className="primary-button w-fit">Upload Resume</Link>
    </nav>
  );
};

export default Navbar;