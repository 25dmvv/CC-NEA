import React from "react";
import { ChatDisplay } from "./chatDisplay";
import { ChatInput }  from "./chatInput";

function Chat() {
    // This sends a test message, so that i can verify that my app works correctly
    const messages = [{ content: "Welcome to CryptConnect!", sender: "David Vaughan" }];

    // This is a test function, to handle the sending of messages
    function sendMessage(message) {
        console.log("Message Sent!", message);
    }

    return (
        <div>
            <ChatDisplay messages={messages} />
            <ChatInput sendMessage={sendMessage} />
        </div>
    );
}


export default Chat;