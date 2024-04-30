/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react'; // importing the React Library, and other neccessary hooks

import styles from './Chat.module.css';

// This component displays messages

function ChatDisplay({ messages }) {
    return (
        <div className={styles.chatDisplay}>
            {messages.map((message, index) => (
                <p key={index}>{message.content} - <small>{message.sender}</small></p>
            ))}
            
        </div>
    )
}



export {ChatDisplay}