import React, { useState } from 'react';
import { useSelector } from 'react-redux';
//import { v4 as uuidv4 } from 'uuid';
//import { selectAuthToken } from '../authSelector';
import { selectAuthToken } from '../authSlice';
import styled from 'styled-components';
import { POST_MESSAGE } from '../utils/api';



const sanitizeInput = (input) => {
  const element = document.createElement('div');
  element.innerText = input;
  return element.innerHTML;
};

const NewMessage = ({ addMessageToList, conversationId }) => {
  const [message, setMessage] = useState('');
  const [serverMsg, setServerMsg] = useState('');
  const token = useSelector(selectAuthToken); 

  const onFormSubmit = (event) => {
    event.preventDefault();

    const sanitizedMessage = sanitizeInput(message); 

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
      body: JSON.stringify({
        text: sanitizedMessage,
        conversationId: conversationId,
      }),
    };

    fetch(POST_MESSAGE, options)
      .then(res => res.json())
      .then((data) => {
        console.log("posted message:", data); 
        if (data.latestMessage) {
          addMessageToList(data.latestMessage); 
          setServerMsg(data.message); 
        }
        setMessage('');
      })
      .catch(error => console.error('error:', error));
  };

  return (
    <FormContainer>
      <form onSubmit={onFormSubmit}>
        <div>
          <input
            placeholder='Type your message'
            type="text"
            value={message}
            onChange={event => setMessage(event.target.value)}
          />
        </div>
        <button type="submit">Send</button>
        {serverMsg && <p style={{ color: "green" }}>{serverMsg}</p>}
      </form>
    </FormContainer>
  );
};

export default NewMessage;

const FormContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-start;
position: absolute;
bottom: 80px;
  width: 50%;
`;