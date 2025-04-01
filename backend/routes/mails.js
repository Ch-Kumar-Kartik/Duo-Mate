const express = require('express');     
const router = express.Router();

const Email = require('../models/mailModel'); // Import the EmailModel

//routes

//CRUD operations

//View/Read all emails

router.get('/emails', async (req, res) => {
    try {
        const emails = await Email.find({});
        res.status(200).json(emails);
        console.log('Fetched all emails:', emails);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving emails', error: error.message });
    }
});

module.exports = router;