import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import withAuth from './middleware';
import secret from './secret';
import {UploadModel, ProficiencyModel, UserModel} from './database';

//start router
const router = express.Router();


//get recent uploads
router.get('/recentuploads', (req, res) => {
  //find all, select filename property, execute callback sending result
  UploadModel.find({}).select('filename date quarter year').sort({'date' : -1}).exec((err, recentUploads) => {
    if (err) console.log('failure');
    res.json({recentUploads});
  });
});

//get recent uploads
router.get('/proficiency', (req, res) => {
  //find all, select filename property, execute callback sending result
  ProficiencyModel.find({}).select('filename date quarter year').sort({'date' : -1}).exec((err, proficiency) => {
    if (err) console.log('failure');
    res.json({proficiency});
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
    if (err) console.log('registration failed')
    else console.log('user added');
  });
});

//verify user
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  //find w email, check password
  UserModel.findOne({ email: email }).exec((err, user) => {
    if(err) console.log('find error');
    else {
      bcrypt.compare(password, user.password, (err, result) => {
        if(err) console.log('compare error');

        //successful login
        else if(result) {
          console.log('Logged in');

          //issue token, email as payload, using my secret, 24h expiration
          const payload = { email };
          const token = jwt.sign(payload, secret, {
            expiresIn: '24h'
          });

          //send cookie w token
          res.cookie('token', token, { httpOnly: true })
            .sendStatus(200);
        }

        else {
          console.log('wrong password');
          res.sendStatus(401);
        }
      });
    }
  });
});

//check for valid token
router.get('/checkToken', withAuth, (req, res) => {
  res.sendStatus(200);
});

//testing authorization
router.get('/test', withAuth, (req, res) => {
  res.send({hello: 'hello'});
});

export default router;
