const mongoose = require('mongoose')

// Here I defined the Message schema:

const messageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true, // 'content' stores the text of the message, and is required.

    },

    sender: {
        type: mongoose.Schema.Types.ObjectId, // This uses MongoDB's ObjectId to refer to User
        ref: 'appUsers', // this specifies that this ID belongs to 'appUsers'
        required: true, // States that this is mandatory

    },

    receiver: {
        type: mongoose.Schema.Types.ObjectId, // This uses MongoDB's ObjectId to refer to User
        ref: 'appUsers', // this specifies that this ID belongs to 'appUsers'
        required: true, // States that this is mandatory

    }

}, {
    timestamps: true // this automatically manages the timestamps for when messages are created and updated.
});

//Here I created an 'Message' collection in my MongoDB database

const Message = mongoose.model('Message', messageSchema);

// This line exports the model so that other parts of the application can use it.
    
module.exports = Message;