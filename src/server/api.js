import express from 'express';
import {UploadModel, ProficiencyModel} from './database';

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
  UploadModel.find({_id: "5e5d5ec2bcd64c07c8564ec4"}).select('data').sort({'date' : -1}).limit(1).exec((err, recentdata) => {
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

export default router;
