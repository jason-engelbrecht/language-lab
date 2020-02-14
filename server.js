import express from 'express';
import fileUpload from 'express-fileupload';
import excelToJson from 'convert-excel-to-json';
import UploadModel from './src/server/database';
import router from './src/server/api';
const path = require('path');
const server = express();

//serve public files statically and enable file uploads on server
server.use(express.static('public'), fileUpload());

//bring in the api router
server.use('/api', router);

//base routes
server.get(['/', '/uploads', '/profile'], (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

//maybe move to api
server.post('/upload', (req, res) => {
    if(req.files === null) {
        return res.status(400).json({ msg: "No file uploaded" });
    }

    const file = req.files.file;

    file.mv(`${__dirname}/uploads/${file.name}`, err => {
        if (err) {
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

        //new upload object with data
        const upload = new UploadModel(uploadData);

        //upload to db and meow
        async function showUploaded() {
            await upload.save().then(() => console.log('uploaded...meow'));
            let q = UploadModel.find().sort({'date' : -1}).limit(1);
            q.exec(function(error, doc) {
                console.log("This works!");
                console.log(doc);
            });
        }
        showUploaded();

        // TODO remove after confirmation of functionality
        //find uploaded document - this doesn't actually return the last uploaded doc?
        // UploadModel.findOne({}, {}, { sort: { 'date' : -1 } }, function (err, doc) {
        //     console.log(doc);
        // });
        //
        // UploadModel.find({}, { sort : { 'date' : -1 }}, { limit : 1 }, function (err, doc) {
        //     console.log("Second statement works?");
        //     console.log(doc);
        // });



        res.json({ filename: file.name, filePath: `/uploads/${file.name}`});
    })
});

server.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
