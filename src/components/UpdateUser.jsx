import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, selectAuthToken, updateUserInfo } from "../authSlice";
import styled from "styled-components";
import AvatarPicker from "./AvatarPicker";
import { Button } from "./Logout";

const USER_UPDATE = "https://chatify-api.up.railway.app/user";

const UpdateUserProfile = () => {
  const user = useSelector(selectUser);
  const token = useSelector(selectAuthToken);
  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = useState({
    user: user.user,
    avatar: user.avatar,
    email: user.email,
  });
  const [isEditing, setIsEditing] = useState(false);
  //const [preview, setPrewiev] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const setAvatar = (newAvatar) => {
    setUserInfo((prevState) => ({
      ...prevState,
      avatar: newAvatar,
    }));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    const updatedUser = {
      userId: user.id,
      updatedData: {
        user: userInfo.user,
        email: userInfo.email,
        avatar: userInfo.avatar,
      },
    };

    try {
      const response = await fetch(USER_UPDATE, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) {
        throw new Error("network error");
      }
      const data = await response.json();
      dispatch(updateUserInfo(updatedUser.updatedData));

      setIsEditing(false);
    } catch (error) {
      console.error("problem updating user:", error);
    }
  };

  return (
    <>
      <EditContainer>
        {isEditing ? (
          <form onSubmit={handleUpdate}>
            <label>Username:</label>
            <div>
              <input
                type="text"
                name="user"
                value={userInfo.user}
                onChange={handleInputChange}
                required
              />
            </div>
            <label>Email:</label>
            <div>
              <input
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label>Avatar:</label>
              <AvatarPicker avatar={userInfo.avatar} setAvatar={setAvatar} />
            </div>

            <button type="submit">Save & Update</button>
            <Button type="button" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </form>
        ) : (
          <div>
            <p>Username: {userInfo.user}</p>
            <p>Email: {userInfo.email}</p>
            <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
          </div>
        )}
      </EditContainer>
    </>
  );
};

export default UpdateUserProfile;

export const EditContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  color: black;

  form {
    width: 100%;
    justify-content: center;
  }

  input {
    width: 30%;
  }
`;
