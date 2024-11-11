const User = require('../models/user');
async function CreateUser(req, res) {
    try {
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        return res.redirect('/login');
    } catch (error) {
        console.error('Error during signup:', error);

        // Check if the error is a duplicate key error
        if (error.code === 11000) {
            // Pass a friendly error message to the EJS template
            return res.render('signup', { errorMessage: 'Email already exists, please use another one.' });
        }

        // Handle other errors
        return res.render('signup', { errorMessage: 'An error occurred during signup. Please try again.' });
    }
}

module.exports = {
    CreateUser,
}