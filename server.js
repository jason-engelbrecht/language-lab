import express from 'express';
import fileUpload from 'express-fileupload';
import excelToJson from 'convert-excel-to-json';
const path = require('path');
const server = express();
import mongoose from 'mongoose';

server.use(express.static('public'), fileUpload());
// server.use(express.static('dist'));

mongoose.connect('mongodb://localhost:27017/LLTest', {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connected');
});

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

        //add file name to result object and add result data
        const uploadData = {
            filename: file.name,
            data: result.data
        };
        // console.log(uploadData);

        //create upload schema
        let uploadSchema = new mongoose.Schema({
            filename: String,
            data: Array,
            date: { type: Date, default: Date.now },
        });

        //create upload model w schema and collection
        let Upload = mongoose.model('Test', uploadSchema, 'TestData');

        //new upload object with data
        const upload = new Upload(uploadData);

        //upload to db and meow
        upload.save().then(() => console.log('meow'));

        //find uploaded document
        Upload.findOne({}, {}, { sort: { 'date' : -1 } }, function (err, doc) {
            console.log(doc);
        });

        res.json({ filename: file.name, filePath: `/uploads/${file.name}`});
    })
});

server.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
