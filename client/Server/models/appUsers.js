/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Here I defined the user schema:
 const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true // Here I am making it a requirement for all users to have a unique username.
    },
    password: {
        type: String,
        required: true, 
    },   
    email: {
        type: String,
        required: true,
        unique: true // Here I am making it a requirement for all users to have a unique email address.
    },
    age: {
        type: Number,
        required: true,
    },
    profilePicture: {
        type: String,
        required: false, // Here I gave users the option of having a profle picture
    },
 });

// Here I created an 'appUsers' collection in my MongoDB database

const appUsers = mongoose.model('appUsers', userSchema)

module.exports = appUsers; // This line of code exports the 'appUsers' model.
