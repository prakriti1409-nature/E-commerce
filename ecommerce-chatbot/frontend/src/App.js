import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Chatbot from "./components/Chatbot";
import Login from "./components/Login";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import AdminLogs from "./pages/AdminLogs"; 
import ProductSearch from "./components/ProductSearch"; // add this import
import Register from "./components/Register";




function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/chat" element={<Chatbot />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/logs" element={<AdminLogs />} />
        <Route path="/products" element={<ProductSearch />} />
                <Route path="/register" element={<Register />} />


      </Routes>
    </Router>
  );
}

export default App;

