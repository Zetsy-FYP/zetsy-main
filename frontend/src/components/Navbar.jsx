import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-around py-3 bg-gray-300">
      <Link to="/">Home</Link>
      <Link to="/themes">Themes</Link>
      <Link to="/auth/login">Sign In</Link>
    </nav>
  );
}
