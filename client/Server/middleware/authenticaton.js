const jwt = require('jsonwebtoken')  // This line imports the jwt into my file


// The function 'verifyToken' checks to see if the request made by the user has a valid authorization token

const verifyToken = (req, res, next) => {  // takes in a request (‘req’), a response (‘res’) and the next middleware function in the chain (‘next’).
    const authHeader = req.headers['authorization']; // Attempts to access the authroization header from the request
    const token = authHeader && authHeader.split(' ')[1]; // this line tries to extract the token from the header
  
    if (token == null) return res.sendStatus(401);  // this line stops the check and sends a status message indicating that the user is not authorized, if no token is found.

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => { // if a token is found, this line of code verifies and checks to see if it is valid and hasn't expired.
      if (err) return res.sendStatus(403); // this line stops the check and sends an status message indicating that user access is forbidden, if the token is found to be expired or invalid
      req.user = user; // this line of code attachs the user details from the token to the request so that it can be used in other parts of my app.
      next(); 
    });
  };
  
  module.exports = verifyToken; // this line of code makes the function available to be used in other files in this project.
