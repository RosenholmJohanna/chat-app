import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { avatars } from "../data/avatars";

const AvatarPicker = ({ avatar, setAvatar }) => {
  const handleAvatarChange = (newAvatar) => {
    setAvatar(newAvatar);
  };

  return (
    
      <AvatarContainer>
        <Form>
          {avatars.map((avatarUrl, index) => (
            <AvatarImgContainer>
            <Label
              key={index}
              onClick={() => handleAvatarChange(avatarUrl)}
              $isSelected={avatar === avatarUrl}
            >
              <AvatarImg
                src={avatarUrl}
                alt={`Avatar ${index + 1}`}
                $isSelected={avatar === avatarUrl}
              />
            </Label>
            </AvatarImgContainer>
          ))}
        </Form>
      </AvatarContainer>
    
  );
};

export default AvatarPicker;

const AvatarContainer = styled.div`
  display: flex;
 flex-direction: row;
  justify-content: center;
  margin: 0 auto;
  width: auto;
`;

const Form = styled.form`
  display: flex;
 flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  min-width: 60%;
`;

const AvatarImgContainer = styled.div`
  display: flex;
 flex-direction: row;
  justify-content: center;
  width: 15%;
`;

const Label = styled.label`
  margin-top: 2%;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const AvatarImg = styled.img`
  margin-bottom: 3%;
  border-radius: 50%;
  width: ${(props) => (props.$isSelected ? "120px" : "80px")};
  height: ${(props) => (props.$isSelected ? "120px" : "80px")};
  transition: border 0.3s ease;
`;