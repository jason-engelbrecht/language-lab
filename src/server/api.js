import express from 'express';
import {UploadModel, ProficiencyModel, UserModel} from './database';

//start router
const router = express.Router();

//get recent uploads
router.get('/recentuploads', (req, res) => {
  //find all, select filename property, execute callback sending result
  UploadModel.find({}).select('filename date').sort({'date' : -1}).exec((err, recentUploads) => {
    if (err) console.log('failure');
    res.send({recentUploads});
  });
});

//get recent data
router.get('/recentdata', (req, res) => {
  //find all, select data objects from most recent upload, execute callback sending result
  UploadModel.find().select('data quarter year').sort({'date' : -1}).limit(1).exec((err, recentdata) => {
    if (err) console.log('failure');
    res.send({recentdata});
  });
});

//gets data from clicked row
router.get('/recenttrdata/:id', (req, res) => {
  var clickedData = req.params.id;

  //finds clicked row by row object id
  UploadModel.find({_id: clickedData}).select('data').sort({'date' : -1}).limit(1).exec((err, recentdata) => {
    if (err) console.log('failure');
    res.send({recentdata});
  });
});

router.get('/lab/:quarter/:year', (req, res) => {
  var lastQ = req.params.quarter;
  var lastY = req.params.year;

  UploadModel.find({quarter : lastQ, year: lastY}).exec( (err, quarterData) => {
    if(err) console.error('error retrieving lab data: ' + err);
    res.send({quarterData});
  });
});

router.get('/proficiency/:quarter/:year', (req, res) => {
  var lastQ = req.params.quarter;
  var lastY = req.params.year;

  ProficiencyModel.find({quarter : lastQ, year: lastY}).exec( (err, quarterData) => {
    if(err) console.error("error retrieving proficiency data: " + err);
    res.send({quarterData});
  });
});

//register a user
router.post('/register', (req, res) => {
  //get email & password from req and create new model
  const { email, password } = req.body;
  const user = new UserModel({ email, password });

  //save user
  user.save((err) => {
    if (err) {
      res.status(500)
        .send("Error registering new user please try again.");
    } else {
      res.status(200).send("Welcome to the club!");
    }
  });
});

export default router;
