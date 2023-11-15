import React from "react";
import "./App.css";
import Search from "./Search";
import Login from "./Login";
import Register from "./Register";
import Landing from "./Landing";
import Favorites from "./Favorites";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/search" element={<Search />} />
          <Route path="/register" element={<Register />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
