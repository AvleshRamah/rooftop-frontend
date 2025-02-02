const express = require('express');
const router = express.Router();

module.exports = (db) => {
    router.post('/callback', (req, res) => {
        const {fullName, emailAddress} = req.body;

        const query = "INSERT INTO user(fullName, email_address) VALUES(?, ?)";

        db.query(query, [fullName, emailAddress], (err, results) =>{
            if(err) throw err;
            res.redirect('/');
        });
    });
    return router;
};