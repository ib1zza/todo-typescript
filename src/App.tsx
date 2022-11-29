import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import "./nullstyle.css";
import HomePage from "./pages/HomePage";
import Navigation from "./components/Navigation";
import CompletedPage from "./pages/CompletedPage";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store/store";

function App() {
  return (
    <div className={"App"}>
      <Navigation />
      <PersistGate loading={null} persistor={persistor}>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/completed" element={<CompletedPage />} />
        </Routes>
      </PersistGate>
    </div>
  );
}

export default App;
