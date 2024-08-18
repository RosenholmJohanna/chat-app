import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectUser, selectAuthToken } from "../authSlice";
import Users from "./Users";
import NewMessage from "./NewMessage";
import { useFetch } from "../hooks/useFetch";

const GET_MESSAGES = "https://chatify-api.up.railway.app/messages";

const Chat = () => {
  const [conversations, setConversations] = useState({});                       //console.log("conversations", conversations);
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [messages, setMessages] = useState([]);                                 //console.log('messages', messages)

  const user = useSelector(selectUser);
  const token = useSelector(selectAuthToken);


  

  // group messages based on convoId
  const groupConversations = (messages) => {
    return messages.reduce((acc, message) => {
      const { conversationId } = message;
      if (!acc[conversationId]) {
        acc[conversationId] = [];
      }
      acc[conversationId].push(message);
      return acc;
    }, {});
  };

  const { data: fetchedMessages } = useFetch(GET_MESSAGES, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

    useEffect(() => {
      if (fetchedMessages) {
        setMessages(fetchedMessages);
        const groupedConversations = groupConversations(fetchedMessages);
        setConversations(groupedConversations);
      }
    }, [fetchedMessages]);


  // creating conversation by invite sending convoId, or start convo from invite
  const handleConversationCreated = (newConversationId) => {
    setSelectedConversationId(newConversationId);
    console.log("conversation created");
  };

  // go to konversation
  const handleConversationClick = (conversationId) => {
    setSelectedConversationId(conversationId);
  };
 // add latest message to message list
  const addMessageToList = (newMessage) => {
    if (newMessage.conversationId === selectedConversationId) {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }
  };

  return (
    <ChatContainer className="chatcontainer">
      <ConversationWindow>
      {selectedConversationId ? (
        <>
          <h2>MESSAGES</h2>
          <ul>
            {messages.map((message) => (
              // console.log(message),
              <MessageItem key={message.id}>
               <TextBubble>
                {message.text}
                {message.userId}
                <img
                  src={user.avatar}
                  alt="User Avatar"
                  style={{ width: "25px", height: "25px", borderRadius: "50%", border: "2px solid white" }}
                />
                </TextBubble> 
              </MessageItem>
            ))}
          </ul>
          <NewMessage
            addMessageToList={addMessageToList}
            conversationId={selectedConversationId}
          />
        </>
      ) : (
        <h2>Select conversation to view messages</h2>
      )}
</ConversationWindow>


 <ConversationsList>
      <Users onConversationCreated={handleConversationCreated} />

      <h2>CONVERSATIONS</h2>
      <ul>
        {Object.keys(conversations).map((conversationId) => (
          <div
            key={conversationId}
            onClick={() => handleConversationClick(conversationId)}
          >
            ConvoId: {conversationId.slice(-3)}
          </div>
        ))}
      </ul>
      </ConversationsList>
    </ChatContainer>
  );
};

export default Chat;

const ChatContainer = styled.div`
  display: flex;
  height: 80vh;
  //background-color: #F0EBE3; 
  color: #585555;
  width: 750px;
  border-right: 1px solid grey;
  font-size: 10 em;
  text-align: left;
  h2 {
    margin-top: 0;
    font-size: 1.1em;
    font-weight: 100;
  }
`;

const ConversationsList = styled.div`
  width: 40%;
  //border-left: 0.5px solid #ddd;
  padding: 20px;
  background-color: #F0EBE3; 
  color: #585555;
 border-radius: 5px 5px 5px 5px;
 font-size: 0.8em;
`;

const ConversationWindow = styled.div`
  width: 80%;
  padding: 20px;
  background-color: #F6F5F2;
  border-radius: 5px 5px 5px 5px;
`;

const TextBubble = styled.div`
  max-width: 60%;
  font-size: 0.8em;
  padding: 5px;
  border-radius: 5px 5px 5px 5px;
  background-color: #FFEFEF;
  color: #585555;
  text-align: right;
`;

const MessageItem = styled.li`
  display: flex;
  justify-content: flex-end;
  padding: 4px;
`;