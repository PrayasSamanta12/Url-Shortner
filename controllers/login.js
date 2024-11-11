const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');
const { setuserid } = require('../services/autherization');

async function loginUser(req, res) {
    const { email, password } = req.body;
    console.log(req.body.email);
    
    try {
        // Find the user by email and password
        const loggeduser = await User.findOne({ email, password });
        console.log(loggeduser);
        
        if (loggeduser) {
            //Stateful Process
            //const uniqueid = uuidv4(); // Generate UUID
            
            // Save the user in your custom authorization map
            //setuserid(uniqueid, loggeduser); // loggeduser now contains the _id
            const token=setuserid(loggeduser);
            console.log(token);
            // Set the cookie with UUID
            res.cookie("uuid", token);
            console.log("Logged user: ", loggeduser);
            
            // Redirect to the home page (index.ejs)
            return res.redirect('/');
        } else {
            // If login fails, return to the login page with an error message
            return res.render('login', {
                error: "Invalid email or password"
            });
        }
    } catch (error) {
        console.error("Error during login: ", error);
        return res.render('login', {
            error: "Something went wrong. Please try again."
        });
    }
}

module.exports = {
    loginUser,
};
