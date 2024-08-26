import React, {useEffect, useState} from "react";
import styled from "styled-components";
import fetchConversations from "./fetchConversations";
import { Button } from "./Logout";
import { UserItem } from "./Users";

const SentInvites = ({onConversationCreated}) => {
  const messages = fetchConversations();
  //console.log(messages)

  return (
    <div>
        <>Conversations</>
      {messages.length === 0 ? (
        <p>No messages yet..y</p>
      ) : (
        <ul>
          {messages.map(({ convoId, lastMessage }) => (
            <UserItem key={convoId} onClick={() => onConversationCreated(convoId)}>
               <p>User ID: {lastMessage.userId}</p>
              <MessageText>{lastMessage.text.slice(0, 10)}...</MessageText>
              <Button
              onClick={() => onConversationCreated(convoId)}
            > Chat
             </Button>
            </UserItem>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SentInvites;

const MessageText = styled.p `
margin: 0;
font-style: italic;
font-size: 0.7em;
`