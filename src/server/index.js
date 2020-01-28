import express from 'express';

const server = express();

server.use(express.static('dist'));

server.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));

