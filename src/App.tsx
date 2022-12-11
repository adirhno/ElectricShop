/** @format */
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState } from "react";
import { Home } from "./pages/home";
import { Contact } from "./pages/contact";
import Navbar from "./components/navbar";
import { ShoppingCartProvider } from "./context/useContex";
import ShoppingCart from "./components/shoppingCart";

function App() {
  return (
    <div style={{ height: "800px" }}>
      <ShoppingCartProvider>
        <Navbar />
        <Container className="mb-4" style={{ height: "100%" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<Contact />} />
            <Route path="/cart" element={<ShoppingCart />} />
          </Routes>
        </Container>
      </ShoppingCartProvider>
    </div>
  );
}

export default App;
