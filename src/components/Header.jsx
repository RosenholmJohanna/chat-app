import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { selectUser } from "../authSlice";

const Header = () => {
  const user = useSelector(selectUser);

  return (
    <HeaderStyled>
      <HeaderText>
        <h3>Chatify</h3>{" "}
      </HeaderText>
      <SubHeaderDiv>
        <SubHeaderText>Welcome {user.user}</SubHeaderText>
        <Image>
          <img
            src={user.avatar}
            alt="User Avatar"
            style={{
              width: "45px",
              height: "45px",
              borderRadius: "50%",
            }}
          />
        </Image>
      </SubHeaderDiv>

      {/* <button onClick={() => methodDoesNotExist()}>Break the world</button>;  */}
    </HeaderStyled>
  );
};

export default Header;

export const HeaderStyled = styled.header`
  width: 95%;
  display: flex;
  justify-content: space-between;
  color: black;
  font-size: 0.8em;
  padding: 1.5%;
`;

export const HeaderText = styled.div`
  display: flex;
  font-weight: 100;
  justify-content: end;
`;

export const SubHeaderText = styled.div`
  display: flex;
  justify-content: flex-end;
  font-weight: 100;
  margin-right: 2%;
`;

export const SubHeaderDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const Image = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 1em;
  color: white;
  display: block;
  transition: 0.3s;
  font-weight: 300;
  margin-top: 1em;
`;
