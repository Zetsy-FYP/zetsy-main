import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  <>
    <Navbar />
    <main className="my-8 mx-[5vw] mb-10">{children}</main>
    <Footer />
  </>;
}
