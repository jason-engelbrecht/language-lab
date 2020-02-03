import express from 'express';
const path = require('path');
const server = express();

server.use(express.static('public'));
// server.use(express.static('dist'));

server.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

server.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));

