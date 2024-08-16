import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectUser, selectAuthToken } from "../authSlice";
import Users from "./Users";

const GET_MESSAGES = "https://chatify-api.up.railway.app/messages";

const Chat = () => {
  const [conversations, setConversations] = useState({}); 
  const [selectedConversationId, setSelectedConversationId] = useState(null); 
  const [messages, setMessages] = useState([]);
  const user = useSelector(selectUser);
  const token = useSelector(selectAuthToken);

  return (
    <>
      <Users />
    </>
  );
};

export default Chat;
