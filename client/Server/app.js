const express = require('express'); // Here I imported the Express library

const app = express(); // I then initialized the Express application

app.use(express.json()); // 'express,json()' organises data sent by the browser in JSON format, before placing the organized data into the 'req.body' property.
// This is required by routes which take in JSON data, such as APIs.

const PORT =  process.env.PORT || 3001; // this line provides the default port as to where my server should start listening for visitors or requests from my app.
app.listen(PORT, () => { 
    console.log('Server is running on port ${PORT}'); // This piece of code starts my server, and indicates what port it is running on.

});
