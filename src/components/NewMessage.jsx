import React, { useState } from 'react';
import { useSelector } from 'react-redux';
//import { v4 as uuidv4 } from 'uuid';
//import { selectAuthToken } from '../authSelector';
import { selectAuthToken } from '../authSlice';
import styled from 'styled-components';

const POST_MESSAGE = "https://chatify-api.up.railway.app/messages";

const NewMessage = ({ addMessageToList, conversationId }) => {
  const [message, setMessage] = useState('');
  const token = useSelector(selectAuthToken); 

  const onFormSubmit = (event) => {
    event.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
      body: JSON.stringify({
        text: message,
        conversationId: conversationId,
      }),
    };

    fetch(POST_MESSAGE, options)
      .then(res => res.json())
      .then((data) => {
        console.log("posted message:", data); 
        if (data.latestMessage) {
          addMessageToList(data.latestMessage); //  notify chat..
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
  /* padding: 20px; */
  /* background-color: #F0EBE3; */
`;



// const [messages, setMessages] = useState([]);
// const [textValue, setTextValue] = useState('')

// useEffect(() => {
//     const savedMessages = JSON.parse(localStorage.getItem('messages'))
//     if (savedMessages !== null) {
//         setTextMessages(savedMessages)
//     }
// }, []);

// useEffect(() => {
//         localStorage.getItem('messages') // Doesn't load the stored data
//       }, []);

// const sendMessage = (e) => {
//         e.preventDefault();
    
//         if (textValue != "") {

//           const newData = []
//           newData.push([...textMessages, textValue])
//           setTextMessages([...textMessages, textValue]);
//           localStorage.setItem('messages', JSON.stringify(newData))

//           setTextValue("");

//         } else {
//           return;
//         }
//       };

// return (
// <>
// <button type="submit" onClick={sendMessage}>
//             Send Message
// </button>
// </>
// )