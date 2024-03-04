import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import React from "react";
import Login from "./pages/login.jsx";
import Admin from "./pages/admin.jsx";
import Home from "./pages/home.jsx";
import "./App.css";

const App = () => {
  return (
    <div className="MainAppContainer">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Login register="true" />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
