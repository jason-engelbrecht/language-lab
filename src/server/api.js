import express from 'express';
import {UploadModel} from './database';

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
  UploadModel.find().select('data').sort({'date' : -1}).limit(1).exec((err, recentdata) => {
    if (err) console.log('failure');
    res.send({recentdata});
  });
});

export default router;
