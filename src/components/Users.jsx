import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser, selectAuthToken } from "../authSlice";
import { v4 as uuidv4 } from "uuid";
import { useFetch } from "../hooks/useFetch";
import { Button } from "./Logout";

const GET_USERS = "https://chatify-api.up.railway.app/users";

const Users = ({ onConversationCreated }) => {
  const user = useSelector(selectUser); //console.log(user)
  const token = useSelector(selectAuthToken);
  const [allUsers, setAllUsers] = useState([]);
  const [myInvites, setMyInvites] = useState([]);

  const { data } = useFetch(GET_USERS, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    if (data) {
      const filteredUsers = data.filter((user) =>
        user.username.startsWith("johanna")
      );
      setAllUsers(filteredUsers);
    }
  }, [data]);

  // *** SEND INVITES ** //
  const onSendInvite = (event, userId) => {
    event.preventDefault();
    const newConversationId = uuidv4();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        conversationId: newConversationId,
      }),
    };

    fetch(`https://chatify-api.up.railway.app/invite/${userId}`, options)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          //console.log(data)
          onConversationCreated(newConversationId);
        }
      })
      .catch((error) => console.error("error:", error));
  };

  //***** DISPLAY MY INVITES ****** //
  // if invite = null then set it to empty array
  useEffect(() => {
    const invitesArray = user.invite ? JSON.parse(user.invite) : [];
    const invites = invitesArray.map((invite) => ({
      conversationId: invite.conversationId,
      username: invite.username,
    }));
    setMyInvites(invites);
  }, [user.invite]);


  return (
    <>
      <h2>Invites</h2>
      <ul>
        {myInvites?.map((invite, index) => (
          <li key={index}>
            {invite.username}
            <Button
              onClick={() => onConversationCreated(invite.conversationId)}
            >
              Start Convo
            </Button>
          </li>
        ))}
      </ul>

      <div>
        <h2>All users</h2>
        <ul>
          {allUsers.map((user) => (
            <li key={user.userId}>
              {user.username}
              {user.userId}
              <img
                src={user.avatar}
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  border: "1px solid white",
                }}
              />
              <Button onClick={(event) => onSendInvite(event, user.userId)}>
                Invite
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Users;

// *** GET USERS ***
// useEffect(() => {
//   const fetchUsers = async () => {
//     try {
//       const response = await fetch(GET_USERS, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const data = await response.json();
//       const filteredUsers = data.filter((user) =>
//         user.username.startsWith("johanna")
//       );
//       setAllUsers(filteredUsers);
//     } catch (error) {
//       console.error("cant fetch users:", error);
//     }
//   };
//   fetchUsers();
// }, []);

// useEffect(() => {
//   const invitesArray = JSON.parse(user.invite);
//   const invites = invitesArray.map(invite => ({
//     conversationId: invite.conversationId,
//     username: invite.username
//   }));
//   setMyInvites(invites); //invitesData = object
// }, []);
