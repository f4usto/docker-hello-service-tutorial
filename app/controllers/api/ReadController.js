const express = require('express');
const router = express.Router();

router.get('/list', (req, res) => {

    const data = req.session.contacts ? req.session.contacts : [];
    
    res.send(data);

});

module.exports = router;
