import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../authSlice";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    sessionStorage.clear();
     navigate("/login"); 
  };

  return (
    <Button onClick={handleLogout}>Log Out</Button>
  );
}

export default Logout;

export const Button = styled.button`
 padding: 1%;
 font-size: 0.8em;
 font-size: small;
 font-weight: 100;
 height: min-content;
 margin-left: 2%;
`;