import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import "./nullstyle.css";
import HomePage from "./pages/HomePage";
import Navigation from "./components/Navigation";
import CompletedPage from "./pages/CompletedPage";

function App() {
  return (
    <div className={"App"}>
      <Navigation />
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/completed" element={<CompletedPage />} />
      </Routes>
    </div>
  );
}

export default App;
