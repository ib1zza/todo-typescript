import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import "./nullstyle.css";
import HomePage from "./pages/HomePage";
import Navigation from "./components/Navigation";
import CompletedPage from "./pages/CompletedPage";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store/store";
import { AppRoutes } from "./constants";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <div className={"App"}>
      <Navigation />
      <PersistGate loading={null} persistor={persistor}>
        <Routes>
          <Route path={AppRoutes.todos} element={<HomePage />} />
          <Route path={AppRoutes.completed} element={<CompletedPage />} />
          <Route path={AppRoutes.login} element={<LoginPage />} />
          <Route path={AppRoutes.register} element={<RegisterPage />} />
        </Routes>
      </PersistGate>
    </div>
  );
}

export default App;
