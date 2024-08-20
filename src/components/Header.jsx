import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { selectUser } from "../authSlice";
import Logout from "./Logout";

const Header = () => {
  const user = useSelector(selectUser);

  return (
    <HeaderStyled>
      <Img>
        <img
          src={user.avatar}
          alt="User Avatar"
          style={{ width: "70px", height: "70px", borderRadius: "100%" }}
        />
         <p>{user.user}</p>
      </Img>

      <Link to="/profile"><A>PROFILE</A></Link>
      <Link to="/messages"><A>CHAT</A></Link>
      <Link to="/login"><A>LOGIN</A></Link>
      <Logout />
     
       {/* <button onClick={() => methodDoesNotExist()}>Break the world</button>;  */}
    </HeaderStyled>
  );
};

export default Header;

export const HeaderStyled = styled.header`
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: space-between;
`;
export const HeaderText = styled.h3`
  font-weight: 200;
  justify-content: flex-start;
`;

export const Img = styled.div`
  justify-content: flex-end;
  
  p{
    font-size: 0%.8;
  color: #c27b7b;
  }
`;

export const A = styled.a`
  justify-content: flex-end;
  text-decoration: none;
  font-size: 1em;
  color: #c27b7b;
  display: block;
  transition: 0.3s;
  font-weight: 400;
`;


