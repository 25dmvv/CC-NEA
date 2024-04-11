const express = require('express');
const bcrypt = require('bcrypt');
const appUsers = require('../models/appUsers');
const router = express.Router();

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
  
      // This code sends a response which comes with the user's new details, without their password for security purposes, or returns an error message if the user creation process failed.
      res.status(201).json({ userId: savedUser._id, username: savedUser.username, email: savedUser.email, age: savedUser.age, profilePicture: savedUser.profilePicture });
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
        // This piece of code prints out a message indicating that the user's account has been authenticated successfully
        res.status(200).json({ message: 'Login successful', userId: user._id });
      } else {
        // This piece of code prints out a message indicating that the authentication has failed.
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  module.exports = router;

