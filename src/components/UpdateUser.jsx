import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, selectAuthToken, updateUserInfo } from "../authSlice";
import styled from "styled-components";

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

  //   const handleUpdate = async (event) => {
  //     event.preventDefault();
  //     const updatedUser = {
  //       ...userInfo,
  //       [event.target.name]: event.target.value,
  //     };

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
      console.log("user updated successfully:", data);
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
            <div>
              <label>Username:</label>
              <input
                type="text"
                name="user"
                value={userInfo.user}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Avatar URL:</label>
              <input
                type="text"
                name="avatar"
                value={userInfo.avatar}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit">Save & Update</button>
            <button type="button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </form>
        ) : (
          <div>
            <p>Username: {userInfo.user}</p>
            <p>Email: {userInfo.email}</p>
            <button onClick={() => setIsEditing(true)}>Edit Profile</button>
            <img
              src={userInfo.avatar}
              alt="User Avatar"
              style={{ width: "150px", height: "150px", borderRadius: "100%" }}
            />
          </div>
        )}
      </EditContainer>
    </>
  );
};

export default UpdateUserProfile;

const EditContainer = styled.div`
  color: black;
`;
