import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectUser, selectAuthToken } from "../authSlice";
import Users from "./Users";
import NewMessage from "./NewMessage";
//import { useFetch } from "../hooks/useFetch";
import DeleteMsg from "./DeleteMessage";

const GET_MESSAGES = "https://chatify-api.up.railway.app/messages";

const Chat = () => {
  // const [conversations, setConversations] = useState({});  console.log(conversations)    // visar mina meddelandeInfo per convoId. {conviId:[msgId, userId, text, conviId]}
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [messages, setMessages] = useState([]); //console.log('messages',messages, )

  const token = useSelector(selectAuthToken);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (selectedConversationId) {
      const fetchConversationMessages = async () => {
        const response = await fetch(
          `${GET_MESSAGES}?conversationId=${selectedConversationId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setMessages(data);
      };
      fetchConversationMessages();
    }
  }, [selectedConversationId]);

  // creating conversation by invite sending convoId, or start convo from
  const handleConversationCreated = (newConversationId) => {
    setSelectedConversationId(newConversationId);
  };

  // add latest message to message list
  const addMessageToList = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  // remove deleted message from list
  const handleMessageDeleted = (deletedMessageId) => {
    setMessages((prevMessages) =>
      prevMessages.filter((message) => message.id !== deletedMessageId)
    );
  };

  return (
    <ChatContainer>
      <ConversationWindow>
        {selectedConversationId ? (
          <>
            <ul>
              {messages.map((message) => (
                <MessageItem
                  key={message.id}
                  $isOwnMessage={message.userId === user.id}
                >
                   <DeleteMsg
                    msgId={message.id}
                    onMessageDeleted={handleMessageDeleted}
                  />
                  <MessageImage
                    $isNotOwnMessage={message.userId === user.id}
                    $msgId={message.id}
                  >
                    {message.userId == user.id ? (
                      <img
                        src={user.avatar}
                        alt="User Avatar"
                        style={{
                          width: "25px",
                          height: "25px",
                          borderRadius: "50%",
                        }}
                      />
                    ) : (
                      <span>🪶</span>
                    )}
                  </MessageImage>

                  <TextBubble $isOwnMessage={message.userId === user.id}>
                    {message.text}
                    {message.userId}
                  </TextBubble>
                  <CreatedAtText>
                    {new Date(message.createdAt).toDateString()}
                  </CreatedAtText>
                 
                </MessageItem>
              ))}
            </ul>
            <NewMessage
              addMessageToList={addMessageToList}
              conversationId={selectedConversationId}
            />
          </>
        ) : (
          <p>Select conversation to view messages</p>
        )}
      </ConversationWindow>

      <ConversationsList>
        <Users onConversationCreated={handleConversationCreated} />
      </ConversationsList>
    </ChatContainer>
  );
};

export default Chat;

const ChatContainer = styled.div`
  font-size: 0.8em;
  display: flex;
  min-height: 85vh;
  background-color: #f0ebe3;
  color: #585555;
  width: 100%;
  text-align: left;
  h2 {
    margin-top: 0;
    font-size: 1.4em;
    font-weight: 400;
  }
`;

const ConversationsList = styled.div`
  width: 30%;
  padding: 3%;
  background-color: #f0ebe3;
  color: #585555;
  border-radius: 5px 5px 5px 5px;
  font-size: 0.8em;
`;

const ConversationWindow = styled.div`
  width: 60%;
  padding: 3%;
  background-color: #f6f5f2;
  border-radius: 5px 5px 5px 5px;
`;

const TextBubble = styled.div`
display: flex;
  text-align: left;
  font-size: 0.8em;
  max-width: 80%;
  padding: 5px;
  border-radius: 5px 5px 5px 5px;
  background-color: ${(props) => (props.$isOwnMessage ? "#928483" : "#6e795d")};
  color: black;
  text-align: right;
`;

const MessageImage = styled.div``;

const MessageItem = styled.li`
  display: flex;
  justify-content: ${(props) =>props.$isOwnMessage ? "flex-end" : "flex-start"};
  align-items: center;
  width:100%;
  padding: 5px;
`;

export const CreatedAtText = styled.p`
  text-align: right;
  font-style: italic;
  color: grey;
  font-size: 0.6em;
  margin-top: 0;
  margin: 1%;
  width: 6%;
`;
