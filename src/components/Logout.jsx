import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../authSlice";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
     navigate("/login"); 
  };

  return (
    <button onClick={handleLogout}>Log Out</button>
  );
}

export default Logout;