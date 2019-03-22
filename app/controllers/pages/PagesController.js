const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile('index.html', {
        root: 'src/views'
    });
});

router.get('/envie-seu-contato', (req, res) => {
    res.sendFile('contato.html', {
        root: 'src/views'
    });
});

module.exports = router;
