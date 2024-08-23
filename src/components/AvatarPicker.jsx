import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { avatars } from "../data/avatars";

const AvatarPicker = ({ avatar, setAvatar }) => {
  const handleAvatarChange = (event) => {
    setAvatar(event.target.value);
  };

  return (
    <div>
      <h3>Pick avatar</h3>
      <form>
        {avatars.map((avatarUrl, index) => (
          <label key={index}>
            <input
              type="radio"
              value={avatarUrl}
              onChange={handleAvatarChange}
              checked={avatar === avatarUrl}
            />
            {index + 1}
            <img
              src={avatarUrl}
              alt={`Avatar ${index + 1}`}
              style={{ width: "70px", height: "70px", borderRadius: "100%" }}
            />
          </label>
        ))}
      </form>
    </div>
  );
};

export default AvatarPicker;
