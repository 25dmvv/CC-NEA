/* eslint-disable no-unused-vars */
const express = require('express');
const bcrypt = require('bcrypt');
const appUsers = require('../models/appUsers');
const router = express.Router();
const jwt = require('jsonwebtoken')


// Creation of registration endpoint:

router.post('/register', async (req, res) => {
    try {
      // This piece of code checks to see if the user already exists. If they do, a message stating that the username is taken is outputted.
      let user = await appUsers.findOne({ username: req.body.username });
      if (user) {
        return res.status(400).json({ message: 'Username taken!' });
      }
      
      user = await appUsers.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ message: 'This Email Address is already registered!' });
      }
  
      // This checks to see if the age provided by the user meets my specific minimum requiremnts
      if (req.body.age < 18) { // checks to see if the user is less than 18
        return res.status(400).json({ message: 'You must 18 years old or older to register!' }); // denies the user access as they are underage.
      }
  
      
      const hashPassword = await bcrypt.hash(req.body.password, 10); // creates a hashed password
  
      // This will create a new user 
      const newUser = new appUsers({
        username: req.body.username,
        email: req.body.email,
        password: hashPassword,
        age: req.body.age,
        profilePicture: req.body.profilePicture || ''
      });
  
      // This will save the user's information in my database
      const savedUser = await newUser.save();
      // This is for after the user has been created
      const token = jwt.sign(
        { userId: savedUser._id, email: savedUser.email },
        process.env.JWT_SECRET, 
        { expiresIn: '30mins' }
      );

      // This code sends a response which comes with the user's new details, without their password for security purposes, or returns an error message if the user creation process failed.
      res.status(201).json({ message: 'Your account has successfully been created!',  userId: savedUser._id, username: savedUser.username, email: savedUser.email, age: savedUser.age, profilePicture: savedUser.profilePicture, token: token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Creation of Login Endpoint:

  router.post('/login', async (req, res) => {
    try {
      // This piece of code attempts to find a user via their username or email.
      const user = await appUsers.findOne({ 
        $or: [
          { username: req.body.username },
          { email: req.body.email }
        ]
      });
  
      if (user && await bcrypt.compare(req.body.password, user.password)) {

        // This is for after the user's password has been validated
      const token = jwt.sign(
        { userId: user._id, email: user.email },
       process.env.JWT_SECRET,  // This should match the variable name in your .env file
        { expiresIn: '30mins' }
      );

        // This line of code sends the token to the client (new user)
        res.json({ message: 'Login successful!', userId: user._id, token: token });
      } else {
        // This piece of code prints out a message indicating that the authentication has failed.
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }

  });
  
  module.exports = router;

