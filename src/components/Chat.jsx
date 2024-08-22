import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectUser, selectAuthToken } from "../authSlice";
import Users from "./Users";
import NewMessage from "./NewMessage";
import { useFetch } from "../hooks/useFetch";

const GET_MESSAGES = "https://chatify-api.up.railway.app/messages";

const Chat = () => {
  const [conversations, setConversations] = useState({});  console.log(conversations)    // visar mina meddelandeInfo per convoId. {conviId:[msgId, userId, text, conviId]}
  const [selectedConversationId, setSelectedConversationId] = useState(null);// state byts när klickar olika i react dev tool
  const [messages, setMessages] = useState([]);                                 console.log('messages',messages, )

  const user = useSelector(selectUser);
  const token = useSelector(selectAuthToken);


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

  

    // GET CONVO MESSAGES
    const { data: conversationMessages } = useFetch(
      selectedConversationId ? `${GET_MESSAGES}?conversationId=${selectedConversationId}` : null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    

  useEffect(() => {
    if (conversationMessages) {
      //console.log(conversationMessages),
      setMessages(conversationMessages);
     
    }
  }, [conversationMessages]);



  // creating conversation by invite sending convoId, or start convo from
  const handleConversationCreated = (newConversationId) => {
    setSelectedConversationId(newConversationId);
    //console.log("conversation created");
  };

  // go to konversation
  const handleConversationClick = (conversationId) => {
    //console.log('go to convo', conversationId)
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
          <UlItem>
            {messages.map((message, id) => (
             //  console.log(messages),
              <MessageItem key={id}>
                <DeleteMsgButton>x</DeleteMsgButton>
               <TextBubble>
                {message.text}
                {message.userId}
                </TextBubble> 
                <CreatedAtText>{new Date(message.createdAt).toDateString()}</CreatedAtText> 
                <img
                  src={user.avatar}
                  alt="User Avatar"
                  style={{ width: "25px", height: "25px", borderRadius: "50%" }}
                />
              </MessageItem>
            ))}
          </UlItem>
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

      <h2>ONGOING CONVERSATIONS</h2>
      <ul>
        {Object.keys(conversations).map((conversationId) => (
        //  console.log(conversations),
          <li
            key={conversationId}
            onClick={() => handleConversationClick(conversationId)}
          >
            ConvoId: {conversationId.slice(-3)}
          </li>
        ))}
      </ul>
      </ConversationsList>
    </ChatContainer>
  );
};

export default Chat;

const ChatContainer = styled.div`
font-size: 0.8em;
  display: flex;
  min-height: 85vh;
  background-color: #F0EBE3; 
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
  background-color: #F0EBE3; 
  color: #585555;
 border-radius: 5px 5px 5px 5px;
 font-size: 0.8em;
`;

const ConversationWindow = styled.div`
  width: 60%;
  padding: 3%;
  background-color: #F6F5F2;
  border-radius: 5px 5px 5px 5px;
`;

const TextBubble = styled.div`
text-align: left;
font-size: 0.8em;
  max-width: 80%;
  padding: 5px;
  border-radius: 5px 5px 5px 5px;
  background-color: #ddc6c6;
  color: #585555;
  text-align: right;
`;

const MessageItem = styled.li`
  display: flex;
  justify-content: right;
  align-items: center;
  width: 100%; 
  padding: 5px;
`;

const UlItem = styled.ul`
  width: 100%;
`;

const DeleteMsgButton = styled.button`
  background-color: transparent;
  width: min-content;
  margin: 0;
  padding: 3px;
  color: grey;
`;

export const CreatedAtText = styled.p`
text-align: right;
font-style: italic;
color: grey;
font-size: 0.6em;
margin-top:0;
 margin: 1%;
 width: 6%;
`
