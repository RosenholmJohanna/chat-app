import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
//import Register from "./components/Register";
import Profile from "./components/Profile";
import Chat from "./components/Chat";
//import SideNav from "./components/SideNav";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/messages" element={<Chat />} />

      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
