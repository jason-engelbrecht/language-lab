import express from 'express';
import fileUpload from 'express-fileupload';
const path = require('path');
const server = express();

server.use(express.static('public'), fileUpload());
// server.use(express.static('dist'));

server.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

server.post('/upload', (req, res) => {
    if(req.files === null) {
        return res.status(400).json({ msg: "No file uploaded" });
    }

    const file = req.files.file;

    file.mv(`${__dirname}/src/client/uploads/${file.name}`, err => {
        if(err) {
            console.error(err);
            return res.status(500).send(err);
        }

        res.json({ filename: file.name, filePath: `/uploads/${file.name}`});
    })
});

server.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));