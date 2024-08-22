import React, { useEffect, useState } from "react";
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
          throw new Error("error network response");
        }
        return res.json();
      })
      .then((data) => {
        onMessageDeleted(msgId);
      })
      .catch((error) => console.error("eror deleting message:", error));
  };

  return (
    <>
      <div>
        <button onClick={onDeleteMsg}>X</button>
      </div>
    </>
  );
};

export default DeleteMsg;