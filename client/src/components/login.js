import React, { useState } from 'react';

function Login() {
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });

    const [loading, setLoading] = useState(false); // This is a state variable that indicates whether a form submission is occuring
    const [message, setMessage] = useState(''); // this is a state variable that displays messages to the user such as validation errors or success messages.

    const handleInputChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const validateLoginData = () => {
    // Here contains the validation logic, in line with the requirments i set out in my design section

    const errors = []; //creates an array for all the errors to be held, if any.
        
        // Checks to see whether username is empty,less than 3 characters long, or contains special characters, and prints an error message if found to be erroneous.
        if (!loginData.username.trim()) {
            errors.push("Username is required.");
        } else if (loginData.username.length < 3) {
            errors.push("Username must be at least 3 characters long.");
        } else if (/[^a-zA-Z0-9]/.test(loginData.username)) {
            errors.push("Username must not contain special characters.");
        }

        // checks to see whether username is empty, less than 6 characters long, doesn't contain a number, or doesn't contain at least one special character, and prints an error message if found to be erroneous.
        if (!loginData.password.trim()) {
            errors.push("Password is required.");
        } else if (loginData.password.length < 6) {
            errors.push("Password must be at least 6 characters long.");
        } else if (!/\d/.test(loginData.password)) {
            errors.push("Password must contain at least one number.");
        } else if (!/[!@#$%^&*]/.test(loginData.password)) {
            errors.push("Password must contain at least one special character.");
        }

        return errors; // returns an array of error messages or an empty array if all data is valid

    }


    const handleLoginSubmit = async (e) => {
        e.preventDefault(); //// This line stops my form from submitting in a traditional way that causes my app to reload, which would be inconvienient.
        const errors = validateLoginData(); // This line validates the data inputted by the user, checking that it meets all the requirements that i set
       
       //// This piece of code would alert the user of any errors in what they submitted, giving feedback on what they should correct
         if (errors.length > 0) {
            setMessage(errors.join("\n"));
            setLoading(true);
            return;
        }

        
        // This piece of code will submit the data provided by the user into the back-end (My database) if all the data is valid.
        try {
            const response = await fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            const data = await response.json();
            if (response.ok) {
                setMessage('Successful Login!');
            } else {
                throw new Error(data.message || 'Failed Login!');
            }
        } catch (error) {
            setMessage('Error: ' + error.message); //// This line of code displays the error messages through the 'message' state.
        } finally {
            setLoading(false); // indicates that the data has finished submitting.
        }
    };

    // Here is the form for users to put into the app, to log into their account.
    return (
        <div>
            <h2>Login</h2>
            {message && <p>{message}</p>}
            {loading ? <p>Loading...</p> : (
                <form onSubmit={handleLoginSubmit}>
                    <div>
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={loginData.username}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={loginData.password}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <button type="submit">Login</button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default Login;
