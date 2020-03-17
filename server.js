import express from 'express';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';
import fs from 'fs';
import excelToJson from 'convert-excel-to-json';
import {ProficiencyModel, UploadModel} from './src/server/database';
import router from './src/server/api';
import crypto from 'crypto';

const path = require('path');
const server = express();

//serve public files statically and enable file uploads on server
server.use(express.static('public'), fileUpload());

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cookieParser());

//bring in the api router
server.use('/api', router);

//base routes
server.get(['/', '/dashboard', '/uploads', '/users', '/login', '/register'], (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

//maybe move to api
server.post('/upload/lab', (req, res) => {

    // console.log("crypto1: " + hash.update('123456789'));
    // console.log("crypto2: " + hash.update('123456789'));
    if(req.files === null) {
        return res.status(400).json({ msg: "No file uploaded" });
    }

    console.log("req: " + JSON.stringify(req.body));
    let quarter = req.body.quarter;
    let year = req.body.year;
    let language = '';
    let staffing = '';
    if(req.body.language) {
        language = req.body.language;
    }
    if(req.body.support) {
        staffing = req.body.support;
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
                'D': '{{D1}}',
                'F': '{{F1}}'
            },
            // TODO: make sheet names consistent from quarter to quarter and adjust this
            sheets: ['Language Lab Usage Summary']
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
            if(studentData[i]['Student ID#']) {
                // add new property names for mongoDB

                const hash = crypto.createHash('SHA3-512');
                const sid = studentData[i]['Student ID#'].toString().trim();
                hash.update(sid);
                studentData[i].sid = hash.digest('hex');
                // studentData[i].first_name = studentData[i]['Student First Name'];
                // studentData[i].last_name = studentData[i]['Student Last Name'];
                studentData[i].hours = studentData[i]['Hours in the Lab'];
                // remove the old property names
                delete studentData[i]['Student ID#'];
                delete studentData[i]['Student First Name'];
                delete studentData[i]['Student Last Name'];
                delete studentData[i]['Hours in the Lab'];
            }
        }

        //add file name to result object and add result data
        const uploadData = {
            filename: file.name,
            quarter: quarter,
            year: year,
            language: language,
            staffing: staffing,
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
            q.exec(function(err, doc) {
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

//maybe move to api
server.post('/upload/proficiency', (req, res) => {

    if(req.files === null) {
        return res.status(400).json({ msg: "No file uploaded" });
    }

    // console.log("req: " + JSON.stringify(req.body));
    let quarter = req.body.quarter;
    let year = req.body.year;
    let file = req.files.file;

    // get file extension to verify excel document
    let extension = file.name.split('.').pop();
    let excel = false;
    if(extension === 'xlsx' || extension === 'xls') {
        excel = true;
    }
    // console.log("Here?");
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
            sheets:[
                {
                    // ClassID, ItemNumber?, CourseID (level)
                    name: 'dbo.Class Dummy Data',
                    columnToKey: {
                        // 'B': '{{B1}}',
                        'C': '{{C1}}',
                        'D': '{{D1}}'
                    },
                    header: {
                        rows: 1
                    }
                },
                {
                    // SID, FullName
                    name: 'dbo.Student',
                    columnToKey: {
                        'A': '{{A1}}',
                        'B': '{{B1}}'
                    },
                    header: {
                        rows: 1
                    }
                },
                {
                    // Language, ItemNumber, SID, SPEAKING, WRITING, LISTENING, READING
                    name: 'tbl.ACTFLScores',
                    columnToKey: {
                        'B': "{{B1}}",
                        'C': "{{C1}}",
                        'D': "{{D1}}",
                        'E': "{{E1}}",
                        'F': "{{F1}}",
                        'G': "{{G1}}",
                        'H': "{{H1}}"
                    },
                    header: {
                        rows: 1
                    }
                }
            ]
        });

        // console.log("sheet2: " + result[sheet2]);
        // let count = 0;
        // let studentData = [];

        // for(let prop in result) {
        //     if(result.hasOwnProperty(prop)) {
        //         console.log("prop " + ": " + prop);
        //         // studentData.push(result[prop]);
        //     }
        // }
        let classDummy = [];
        for(let prop in result['dbo.Class Dummy Data']) {
            classDummy.push(result['dbo.Class Dummy Data'][prop]);
        }

        let students = [];
        for(let prop in result['dbo.Student']) {
            students.push(result['dbo.Student'][prop]);
        }

        let scores = [];
        let actfl = result['tbl.ACTFLScores'];
        for(let item in actfl) {
            if(actfl.hasOwnProperty(item)) {
                if(actfl[item]['SPEAKING'] && actfl[item]['SPEAKING'] !== '') {
                    let studentData = {};
                    studentData.language = actfl[item]['Language'];
                    studentData.itemNumber = actfl[item]['ItemNumber'];
                    // encrypt SID
                    const hash = crypto.createHash('SHA3-512');
                    const sid = actfl[item]['SID'].toString().trim();
                    hash.update(sid);
                    studentData.sid = hash.digest('hex');
                    // find the matching encrypted SID
                    let student = students.find(student => student['SID'].toString().trim() === sid);
                    // let name = student['FullName'];
                    // let fullName = name.split(' ');
                    let currentClass = classDummy.
                                        find(level => level['ItemNumber'] === actfl[item]['ItemNumber']);
                    studentData.current_class = currentClass['CourseID'];
                    // studentData.first_name = fullName[0];
                    studentData.speaking = actfl[item]['SPEAKING'];
                    studentData.writing = actfl[item]['WRITING'];
                    studentData.listening = actfl[item]['LISTENING'];
                    studentData.reading = actfl[item]['READING'];
                    scores.push(studentData);
                }
            }
        }
// Language, ItemNumber, SID, SPEAKING, WRITING, LISTENING, READING

        //add file name to result object and add result data
        const uploadData = {
            filename: file.name,
            quarter: quarter,
            year: year,
            data: scores
        };
        // console.log(uploadData);

        //new upload object with data
        const upload = new ProficiencyModel(uploadData);

        //upload to db and meow
        async function showUploaded() {
            await upload.save().then(() => console.log('uploaded...woof'));
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
