import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectUser } from "../authSlice";


const Header = () => {
  const user = useSelector(selectUser);

  return (

      <div>
        <img
          src={user.avatar}
          alt="User Avatar"
          style={{ width: "70px", height: "70px", borderRadius: "100%" }}
        />
         <p>{user.user}</p>
      </div>
  );
};

export default Header;



// import React, {useState} from "react";
// import { useSelector } from 'react-redux';
// import styled from 'styled-components';
// import { selectUser } from "../authSlice";

// const Profile = () => {
//   const [userInfo, setUserinfo] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [preview, setPrewiev ] = useState(false);


//   const user = useSelector(selectUser); 

// return (
//  <>
//  <ProfileInfoContainer>
//  <>
//  <img
//    src={user.avatar}
//    alt="User Avatar"
//    style={{ width: "200px", height: "200px", borderRadius: "100%" }}
//  />{" "}
//   <ProfileText>{user.user}</ProfileText>
//   <ProfileText>{user.email} </ProfileText>
//   </>
// )}

// export default Profile;


// const ProfileText = styled.p`
//  color: #4a2020;
//  `
 
// {isEditing ? (
//   <>
//   <input
//     value={text}
//     onChange={(event) =>
//       setContext(event.target.value)
//     }
//     >
//   </>
// )}

//  <ProfileInfoContainer>
//  <img
//    src={user.avatar}
//    alt="User Avatar"
//    style={{ width: "200px", height: "200px", borderRadius: "100%" }}
//  />{" "}
//   <ProfileText>{user.user}</ProfileText>
//   <ProfileText>{user.email} </ProfileText>
  
// </ProfileInfoContainer>
// </>
// );
//  */}