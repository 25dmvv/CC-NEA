/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'; // importing the React Library, and other neccessary hooks

import styles from './Chat.module.css';


// this component sends messages

function ChatInput({ sendMessage }) {
    const [message, setMessage] = useState('')

// This function allows a user to change message inputs

const inputChange = (e) => {
    setMessage(e.target.value);
}

//This function handles the sending of messages

const messageSend = () => {
    sendMessage(message);
    setMessage(''); // this line clears the input after a message is sent, allowing another message to be sent.
    }

    return (
        <div className="chat-input">
          <input
            type="text"
            value={message}
            onChange={inputChange}
            placeholder="Your message goes here..." // this goes in the blank message input box
          />
          <button 
            className={styles.sendButton}
            onClick={messageSend}
        >            
        </button>
        </div>
      );
    }

    export {ChatInput}