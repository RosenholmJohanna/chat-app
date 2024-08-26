import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAuthToken } from "../authSlice";
import { GET_MESSAGES } from "../utils/api";

const GET_CONVERSATIONS = "https://chatify-api.up.railway.app/conversations";


const fetchConversations = () => {
  const token = useSelector(selectAuthToken);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await fetch(GET_CONVERSATIONS, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Couldnt fetch conversations");
        }

        const conversations = await response.json();

        const messagesPromises = conversations.map((convoId) =>
          fetch(`${GET_MESSAGES}?conversationId=${convoId}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then(async (response) => {
            if (!response.ok) {
              throw new Error(
                `Failed to fetch messages for conversation ${convoId}`
              );
            }
            const messages = await response.json();
            return {
              convoId,
              lastMessage:
                messages.length > 0 ? messages[messages.length - 1] : null,
            };
          })
        );

        const lastMessages = await Promise.all(messagesPromises);

        setMessages(lastMessages.filter((item) => item.lastMessage !== null));
      } catch (error) {
        console.error("error fetching messages:", error);
      }
    };
    fetchConversations();
  }, []);

  return messages;
};

export default fetchConversations;
