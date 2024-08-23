import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { avatars } from "../data/avatars";

const AvatarPicker = ({ avatar, setAvatar }) => {
  const handleAvatarChange = (newAvatar) => {
    setAvatar(newAvatar);
  };

  return (
    <div>
      <AvatarContainer>
        <form>
          {avatars.map((avatarUrl, index) => (
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
          ))}
        </form>
      </AvatarContainer>
    </div>
  );
};

export default AvatarPicker;

const AvatarContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
`;

const Label = styled.label`
  margin-top: 3%;
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