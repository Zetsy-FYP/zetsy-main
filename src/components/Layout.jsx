import React, { useContext } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/Auth";

export default function Layout({ children }) {
  const { user } = useContext(AuthContext);

  return user ? (
    <Navigate to="/dashboard" />
  ) : (
    <>
      <Navbar />
      <main className="my-8 mx-[5vw] mb-10">{children}</main>
      <Footer />
    </>
  );
}
