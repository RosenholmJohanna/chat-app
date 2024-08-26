import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectUser, selectAuthToken } from "../authSlice";
import { v4 as uuidv4 } from "uuid";
import { useFetch } from "../hooks/useFetch";
import { Button } from "./Logout";
import { GET_USERS, INVITE_USER } from "../utils/api";
//import fetchConversations from "./fetchConversations";



const Users = ({ onConversationCreated }) => {
  const user = useSelector(selectUser); 
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

  //SEND INVITES 
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
    fetch(INVITE_USER(userId), options)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          onConversationCreated(newConversationId);
        }
      })
      .catch((error) => console.error("error:", error));
  };

  // DISPLAY MY INVITES 
  useEffect(() => {
    const invitesArray = user.invite ? JSON.parse(user.invite) : []; // if invite = null then set it to empty array
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
        {myInvites && myInvites.map((invite, index) => (
          <UserItem key={index}>
           <span>🪶</span>
            {invite.username}
            <Button
              onClick={() => onConversationCreated(invite.conversationId)}
            >
              Chat
            </Button>
          </UserItem>
        ))}
      </ul>

      <div>
        <h2>All users</h2>
        <input></input>
        <ul>
          {allUsers.map((user) => (
            <UserItem key={user.userId}>
              <img
                src={user.avatar}
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  marginRight: "2%",
                }}
              />
              {user.username}
              {user.userId}

              <Button onClick={(event) => onSendInvite(event, user.userId)}>
                Invite
              </Button>
            </UserItem>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Users;

export const UserItem = styled.li`
  flex-direction: row;
  display: flex;
  align-items: center;
  margin-bottom: 2%;
  justify-content: space-between;
`;
