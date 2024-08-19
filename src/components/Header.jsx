import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectUser } from "../authSlice";
import Logout from "./Logout";

const Header = () => {
  const user = useSelector(selectUser);

  return (
    <HeaderStyled>
      <HeaderText>Chatify</HeaderText>
      <Logout />

      <Img>
        <img
          src={user.avatar}
          alt="User Avatar"
          style={{ width: "70px", height: "70px", borderRadius: "100%" }}
        />
      </Img>
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
`;
