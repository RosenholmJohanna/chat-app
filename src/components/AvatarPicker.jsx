import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { avatars } from "../data/avatars";

// const AvatarPicker = ({ avatar, setAvatar }) => {
//   const handleAvatarChange = (event) => {
//     setAvatar(event.target.value);
//   };


const AvatarPicker = ({ avatar, setAvatar }) => {
  const handleAvatarChange = (newAvatar) => {
    setAvatar(newAvatar);
  };

  return (
//     <div>
//        <AvatarContainer>
//       <form>
//         {avatars.map((avatarUrl, index) => (
//           <Label key={index}>
//             <input
//               type="radio"
//               value={avatarUrl}
//               onChange={handleAvatarChange}
//               checked={avatar === avatarUrl}
//             />
           
//             {index + 1}
//             <AvatarImg
//               src={avatarUrl}
//               alt={`Avatar ${index + 1}`}
//               // style={{ width: "70px", height: "70px", borderRadius: "100%" }}
//             />
          
//           </Label>
//         ))}
//       </form>
//       </AvatarContainer>
//     </div>
//   );
// };

<div>
<AvatarContainer>
  <form>
    {avatars.map((avatarUrl, index) => (
      <Label 
        key={index} 
        onClick={() => handleAvatarChange(avatarUrl)}
        $isSelected={avatar === avatarUrl} // Pass selection status for styling
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
  border: ${props => props.$isSelected ? '2px solid #767b81' : '2px solid transparent'};
  width: ${props => props.$isSelected ? '120px' : '80px'};
  height: ${props => props.$isSelected ? '120px' : '80px'};
  transition: border 0.3s ease;
`;