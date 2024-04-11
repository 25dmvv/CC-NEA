/* eslint-disable no-unused-vars */

const express = require('express'); // Here I imported the Express library
const mongoose = require('mongoose');
const authenticationRoutes = require('./routes/authenticationRoutes');
const app = express(); // I then initialized the Express application

app.use(express.json()); // 'express,json()' organises data sent by the browser in JSON format, before placing the organized data into the 'req.body' property.
// This is required by routes which take in JSON data, such as APIs.

// This code allows me to use my authentication routes with the Express app:
app.use('/api', authenticationRoutes);



const PORT =  process.env.PORT || 3001; // this line provides the default port as to where my server should start listening for visitors or requests from my app.
app.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT}`); // This piece of code starts my server, and indicates what port it is running on.

});

module.exports = app;

mongoose.connect('mongodb+srv://davidvaughan25:NEA2024@cryptconnect.zaqfdxp.mongodb.net/?retryWrites=true&w=majority&appName=CryptConnect', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(err));

