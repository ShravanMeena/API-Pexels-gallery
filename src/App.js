import React from "react";
import Header from "./components/Header";

// pages
import Home from "./pages/Home";

export default function App() {
  return (
    <>
      <Header />
      <div style={{ padding: 20 }}>
        <Home />
      </div>
    </>
  );
}
