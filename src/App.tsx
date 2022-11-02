import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import FavouritesPage from "./pages/FavouritesPage";
import HomePage from "./pages/HomePage";
import Navigation from "./components/Navigation";
import Modal from "./UI/Modal";
import CreateTaskForm from "./components/CreateTaskForm";

function App() {
  return (
    <div className={"App"}>
      <Navigation />
      <Routes>
        <Route path="/home" element={<HomePage />}></Route>
        <Route path="/favourites" element={<FavouritesPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
