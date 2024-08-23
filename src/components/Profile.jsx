import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectUser } from "../authSlice";
import UpdateUserProfile from "./UpdateUser";


const UserProfile = () => {
  const user = useSelector(selectUser);

  return (

      <div>
        <img
          src={user.avatar}
          alt="User Avatar"
          style={{ width: "70px", height: "70px", borderRadius: "100%" }}
        />
         <p>{user.user}</p>
         <UpdateUserProfile />
      </div>
  );
};

export default UserProfile;