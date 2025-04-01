const express = require('express');     
const router = express.Router();

const User = require('../models/userModel'); // Import the UserModel

//routes

//CRUD operations

//View/Read all Users

// Create a new user (for login or registration)
router.post('/login', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
});

module.exports = router;