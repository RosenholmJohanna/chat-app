import React from "react";
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectUser } from "../authSlice";

const Profile = () => {
    const user = useSelector(selectUser); 


return (
 <div>
  <h1>Profile</h1>
 <img
   src={user.avatar}
   alt="User Avatar"
   style={{ width: "200px", height: "200px", borderRadius: "100%" }}
 />{" "}
</div>
);
}

export default Profile;