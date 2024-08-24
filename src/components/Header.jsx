import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { selectUser,selectAuthToken } from "../authSlice";

const Header = () => {
  const user = useSelector(selectUser);
  const token = useSelector(selectAuthToken)

  return (

    <HeaderStyled>
    <HeaderText>
      <h3>Chatify</h3>
    </HeaderText>
    {token && token && (
      <SubHeaderDiv>
        <SubHeaderText>Welcome {user.user}</SubHeaderText>
        {user.avatar && (
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
        )}
      </SubHeaderDiv>
    )}
  </HeaderStyled>
);
};

export default Header;

// {/* <button onClick={() => methodDoesNotExist()}>Break the world</button>;  */}

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
  color: #483e3e;
  text-decoration: 1px underline;
  display: block;
  transition: 0.3s;
  font-weight: 300;
  margin-top: 1em;
`;
