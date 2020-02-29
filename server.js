import express from 'express';
import fileUpload from 'express-fileupload';
import excelToJson from 'convert-excel-to-json';
import UploadModel from './src/server/database';
import router from './src/server/api';
const path = require('path');
const server = express();
import fs from 'fs';

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

    console.log("req: " + JSON.stringify(req.body));
    let quarter = req.body.quarter;
    let year = req.body.year;
    let language = '';
    if(req.body.language) {
        language = req.body.language;
    }
    if(req.body.staffing) {
        language = req.body.staffing;
    }
    let file = req.files.file;

    // get file extension to verify excel document
    let extension = file.name.split('.').pop();
    let excel = false;
    if(extension === 'xlsx' || extension === 'xls') {
        excel = true;
    }
    console.log("Here?");
    const path = `${__dirname}/uploads/${file.name}`;
    // attempt to move the file to active directory / uploads /
    file.mv(path, err => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
        // return an error if somehow it got past client authentication for extension
        if(!excel) {
            console.error("improper file type, must be excel");
            // return res.status(415).send;
            return res.status(415).json({'msg':'File type must be xls or xlsx.'});
        }

        //convert excel upload to json object
        const result = excelToJson({
            sourceFile: `${__dirname}/uploads/${file.name}`,
            //1st row is header - don't include
            header: {
                rows: 2
            },
            //column header as keys
            columnToKey: {
                // '*': '{{columnHeader}}'
                'B': '{{B1}}',
                'C': '{{C1}}',
                'E': '{{E1}}'
            },
            // TODO: make sheet names consistent from quarter to quarter and adjust this
            sheets: ['Spring 2018 Lab Usage Summary']
        });

        // console.log("sheet2: " + result[sheet2]);
        // let count = 0;
        let studentData = [];
        for(let prop in result) {
            if(result.hasOwnProperty(prop)) {
                // console.log("prop " + count + ": " + prop + " => " + result[prop]);
                // count++;
                studentData.push(result[prop]);
            }
        }
        // only one property (0)  => retrieve that data
        studentData = studentData[0];

        for (let i = 0; i < studentData.length; i++) {
            // ignore empty rows
            if(studentData[i]['Student First Name']) {
                // add new property names for mongoDB
                studentData[i].id = studentData[i]['Student First Name'] + "-" + studentData[i]['Student Last Name'];
                studentData[i].first_name = studentData[i]['Student First Name'];
                studentData[i].last_name = studentData[i]['Student Last Name'];
                studentData[i].hours = studentData[i]['Hours in the Lab'];
                // remove the old property names
                delete studentData[i]['Student First Name'];
                delete studentData[i]['Student Last Name'];
                delete studentData[i]['Hours in the Lab'];
            }
        }

        //add file name to result object and add result data
        const uploadData = {
            filename: file.name,
            data: studentData
        };
        // console.log(uploadData);

        //new upload object with data
        const upload = new UploadModel(uploadData);

        //upload to db and meow
        async function showUploaded() {
            await upload.save().then(() => console.log('uploaded...meow'));
            // query the db for the data just uploaded
            let q = UploadModel.find().sort({'date' : -1}).limit(1);
            q.exec(function(error, doc) {
                // get array of all "students"
                // let data = doc[0].data;
                // for (let i = 0; i < data.length; i++) {
                //     console.log(data[i]);
                // }
                if(err) {
                    console.error("Error: " + err);
                }
            });
        }
        showUploaded();

        //testing
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

        // Delete file after using the data TODO: using input stream somehow might be better?
        try{
            fs.unlinkSync(path);
        } catch (err) {
            console.error(err);
        }

        res.json({ filename: file.name, filePath: `/uploads/${file.name}`});
    })
});

server.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
