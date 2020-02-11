import express from 'express';
import fileUpload from 'express-fileupload';
import excelToJson from 'convert-excel-to-json';
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

    file.mv(`${__dirname}/uploads/${file.name}`, err => {
        if(err) {
            console.error(err);
            return res.status(500).send(err);
        }

        //convert excel upload to json object
        const result = excelToJson({
            sourceFile: `${__dirname}/uploads/${file.name}`,
            //1st row is header - don't include
            header: {
                rows: 1
            },
            //column header as keys
            columnToKey: {
                '*': '{{columnHeader}}'
            }
        });

        //add file name to result object
        const object = {
            'filename': file.name,
            data: result.data
        };

        console.log(object);

        res.json({ filename: file.name, filePath: `/uploads/${file.name}`});
    })
});

server.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
