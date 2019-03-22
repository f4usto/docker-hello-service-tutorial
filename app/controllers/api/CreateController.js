const express = require('express');
const router = express.Router();

router.post('/create', (req, res) => {
    
    if (!req.session.contacts) {
        req.session.contacts = [];
    }

    if (req.body.message && req.body.email) {

        req.session.contacts.push({
            created_at: new Date(),
            email: req.body.email,
            message: req.body.message
        });

        res.sendStatus(200);

    } else {

        res.sendStatus(400);

    }

});

module.exports = router;
