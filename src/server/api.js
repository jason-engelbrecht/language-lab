import express from 'express';
import UploadModel from './database';

//start router
const router = express.Router();

//get recent uploads
router.get('/recentuploads', (req, res) => {
  //find all, select filename property, execute callback sending result
  UploadModel.find({}).select('filename').exec((err, recentUploads) => {
    if (err) console.log('failure');
    res.send({recentUploads});
  });
});

export default router;
