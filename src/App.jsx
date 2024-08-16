import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Chat from "./components/Chat";
import Header from "./components/Header";
//import SideNav from "./components/SideNav";
//import Register from "./components/Register";

function App() {
  return (
    <Provider store={store}>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/messages" element={<Chat />} />

        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Provider>
  );
}

export default App;
