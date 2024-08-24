import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectUser } from "../authSlice";
import UpdateUserProfile from "./UpdateUser";
import DeleteUser from "./DeleteUser";



const UserProfile = () => {
  const user = useSelector(selectUser);

  return (
<ProfileStyled>
<ProfileHeader>
<h2>My profile page</h2>
<DeleteUser />
</ProfileHeader>

        <img
          src={user.avatar}
          alt="User Avatar"
          style={{ width: "150px", height: "160px", borderRadius: "50%", marginTop:"5%" }}
        />
        
        <ProfileContainer>
         <UpdateUserProfile />
      
      </ProfileContainer>
      </ProfileStyled>
  );
};

export default UserProfile;

const ProfileStyled = styled.div`
margin-left: 10%;
color: black;
justify-items: center;
font-size: 0.8em;


h2{
  font-size: 1.2em;
  font-weight: 400;
  margin-right: 1%;
}
`

const ProfileContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
`

const ProfileHeader = styled.div`
display: flex;
flex-direction: row;
justify-content: flex-start; 
align-items: center;
`