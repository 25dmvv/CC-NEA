import React, { useState } from 'react';

function Signup() {
    const  [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
        age: ''
    });

    const [loading, setLoading] = useState(false); // This is a state variable that indicates whether a form submission is occuring
    const [message, setMessage] = useState(''); // this is a state variable that displays messages to the user such as validation errors or success messages.

    const handleDataChange = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value})
    };
    
    const validationData = () => {
        const { username, email, password, age } = userData;
        const errors = [];

         // This line of code checks to see if the date of birth provided by the user is above or below the age of 16, and provides an error message if they are younger than 16.
         if (age < 16) {
            errors.push("You must be 16 years or older to register.");
        }

        // This line of code checks to see if the username provided by the user meets my specific requirements and provides an error message if it doesn't.
        if (username.length < 5 || /[^a-zA-Z0-9]/.test(username)) {
            errors.push("Username must be at least 5 characters and contain no special characters or spaces.");
        }

         // This line of code checks to see if the password inputted by the user fits my specific requirements,and provides an error message if it doesn't.
         if (password.length < 6 || !/\d/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            errors.push("Password must be at least 6 characters long and include at least one number and one special character.");
        }

        // This line of code checks to see if the email inputted by the user fits the required format, and provides an error message if it doesn't. 
        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            errors.push("Email format is invalid.");
        }

        return errors;
    };

    const handleDataSubmit = async (e) => {
        e.preventDefault(); // This line stops my form from submitting in a traditional way that causes my app to reload, which would be inconvienient.
        const errors = validationData(); // This line validates the data inputted by the user, checking that it meets all the requirements that i set
        setLoading(true);
        setMessage('');

        // This piece of code would alert the user of any errors in what they submitted, giving feedback on what they should correct
        if (errors.length > 0) {
            setMessage(errors.join("\n")); 
            setMessage('');
        } else {
            try {
            // This piece of code will submit the data provided by the user into the back-end (My database) if all the data is valid.
           const response = await fetch('http://localhost:3001/api/register', { // This line of code calls the fetch function, passing in the URl of my endpoint for user registration (http://localhost:3001/api/register), where i want the data to be sent.
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'  
                },
                body: JSON.stringify(userData) // in this snippet of code, i stated the HTTP method i decided to use (POST), An object containing any headers i wanted to send with my request, and the data to be sent with my request, which is my 'userData' objest converted to a JSON string.
            });
            const data = await response.json(); // this line will record the inital response from the server.
            if (response.ok) {
                setMessage('Successful Registration!'); // This line of code logs all the successful and validated coode into my console.
            } else{
                throw new Error(data.message || 'Failed Registration!') // This line of code logs any errors into the console.
            }

        } catch (error) {
            setMessage('Error: ' + error.message) // This line of code displays the error messages through the 'message' state.
        }    finally {
            setLoading(false); // indicates that the data has finished submitting.
        }
            
        }   
    }


// Here is the form for users to put into the app, for account creation:

return (
        <div>
            <h2>Signup</h2>
            {message && <p>{message}</p>}
            {loading ? <p>Loading...</p> : (
                <form onSubmit={handleDataSubmit}>
                    <div>
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={userData.username}
                            onChange={handleDataChange}
                        />
                    </div>
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={userData.email}
                            onChange={handleDataChange}
                        />
                    </div>
                    <div>
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={userData.password}
                            onChange={handleDataChange}
                        />
                    </div>
                    <div>
                        <label>Age</label>
                        <input
                            type="number"
                            name="age"
                            value={userData.age}
                            onChange={handleDataChange}
                        />
                    </div>
                    <div>
                        <button type="submit">Register</button>
                    </div>
                </form>
            )}
        </div>
    );
  
};
export default Signup;


