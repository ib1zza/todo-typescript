import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Navigation from "./components/Navigation";
import CompletedPage from "./pages/CompletedPage";

function App() {
  return (
    <div className={"App"}>
      <Navigation />
      <Routes>
        <Route path="/home" element={<HomePage />}></Route>
        <Route path="/completed" element={<CompletedPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
