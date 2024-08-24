import React from "react";
import styled from "styled-components";
import Logout from "./Logout";
// import { useSelector } from "react-redux";
// import { selectUser } from "../authSlice";
import { StyledLink } from "./Header";

const SideNav = (props) => {


  return (
    <SideNavBar style={{ width: props.width }}>
      <ButtonCloseSideNav onClick={props.closeNav}>X</ButtonCloseSideNav>

      <StyledLink to="/profile">PROFILE</StyledLink>
      <StyledLink to="/messages">CHAT</StyledLink>
      <StyledLink to="/login">LOGIN</StyledLink>
      <Logout />
    </SideNavBar>
  );
};

export default SideNav;

const SideNavBar = styled.div`
color: white;
  position: absolute;
  right: 70px;
  font-size: 1em;
  height: 100%;
  width: 5em;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #a46d6d;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
`;
const ButtonCloseSideNav = styled.button`
  position: absolute;
  top: 20px;
  right: 70px;
  font-size: 16px;
`;
