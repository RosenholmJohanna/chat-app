import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectAuthToken } from "../authSlice";

const DeleteMsg = ({ msgId, onMessageDeleted }) => {
  const token = useSelector(selectAuthToken);

  const onDeleteMsg = (event) => {
    event.preventDefault();

    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(`https://chatify-api.up.railway.app/messages/${msgId}`, options)
      .then((res) => {
        if (!res.ok) {
          throw new Error("network error");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data)
        onMessageDeleted(msgId);
      })
      .catch((error) => console.error("eror deleting message:", error));
  };

  return (
    <>
      <div>
        <DeleteMsgButton onClick={onDeleteMsg}>X</DeleteMsgButton>
      </div>
    </>
  );
};

export default DeleteMsg;

export const DeleteMsgButton = styled.button`
  background-color: transparent;
  width: min-content;
  margin: 0;
  padding: 3px;
  color: grey;
`;