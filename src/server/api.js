import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import withAuth from './middleware';
import secret from './secret';
import {UploadModel, ProficiencyModel, UserModel} from './database';
import {isValidEmail, isValidPassword} from "../../validation/validate";

//start router
const router = express.Router();

//get recent uploads
router.get('/recentuploads', withAuth, (req, res) => {
    //find all, select filename property, execute callback sending result
    UploadModel.find({}).select('filename date quarter year').sort({'date': -1}).exec((err, recentUploads) => {
        if (err) console.log('failure');
        res.json({recentUploads});
    });
});

//get recent uploads
router.get('/proficiency', withAuth, (req, res) => {
    //find all, select filename property, execute callback sending result
    ProficiencyModel.find({}).select('filename date quarter year').sort({'date': -1}).exec((err, proficiency) => {
        if (err) console.log('failure');
        res.json({proficiency});
    });
});

//get recent data
router.get('/recentdata', withAuth, (req, res) => {
    //find all, select data objects from most recent upload, execute callback sending result
    UploadModel.find().select('data quarter year').sort({'date': -1}).limit(1).exec((err, recentdata) => {
        if (err) console.log('failure');
        res.send({recentdata});
    });
});

// check if data exists
router.get('/proficiency/:id', withAuth, (req, res) => {
    ProficiencyModel.findOne({_id: req.params._id}).exec((err, result) => {
        if(err) console.log("findOne proficiency file failure");
        res.send(result);
    })
});

router.get('/lab/:id', withAuth, (req, res) => {
    UploadModel.findOne({_id: req.params._id}).exec((err, result) => {
        if(err) console.log("findOne proficiency file failure");
        res.send(result);
    })
});


//gets data from clicked row
router.get('/labtrdata/:id', withAuth, (req, res) => {
    var clickedData = req.params.id;

    //finds clicked row by row object id
    UploadModel.find({_id: clickedData}).select('quarter year language staffing data').sort({'date': -1}).limit(1).exec((err, recentdata) => {
    // UploadModel.findOne({_id: clickedData}).exec((err, recentdata) => {
        if (err) console.log('failure');
        res.send({recentdata});
    });
});

router.get('/proftrdata/:id', withAuth, (req, res) => {
    var clickedData = req.params.id;

    //finds clicked row by row object id
    ProficiencyModel.find({_id: clickedData}).select('quarter year data').sort({'date': -1}).limit(1).exec((err, recentdata) => {
    // ProficiencyModel.findOne({_id: clickedData}).exec((err, recentdata) => {
        if (err) console.log('failure');
        res.send({recentdata});
    });
});



//deletes data from clicked row
router.get('/deletetrdata/:id', withAuth, (req, res) => {
    var clickedData = req.params.id;

    //finds clicked row by row object id
    UploadModel.findByIdAndDelete({_id: clickedData}, function (err, results) {
        console.log(results.result);
    });
});

router.get('/lab/:quarter/:year', withAuth, (req, res) => {
    var lastQ = req.params.quarter;
    var lastY = req.params.year;

    UploadModel.find({quarter: lastQ, year: lastY}).exec((err, quarterData) => {
        if (err) console.error('error retrieving lab data: ' + err);
        res.send({quarterData});
    });
});

router.get('/proficiency/:quarter/:year', withAuth, (req, res) => {
    var lastQ = req.params.quarter;
    var lastY = req.params.year;

    ProficiencyModel.find({quarter: lastQ, year: lastY}).exec((err, quarterData) => {
        if (err) console.error("error retrieving proficiency data: " + err);
        res.send({quarterData});
    });
});

router.get('/users', withAuth, (req, res) => {
    UserModel.find().select('email').exec((err, users) => {
        if (err) {
            console.log('user search failure');
        }
        res.send({users});
    })

});

//register a user
router.post('/register', withAuth, (req, res) => {
    //get email & password from req and create new model
    const {email, password} = req.body;
    const user = new UserModel({email, password});

    if (isValidEmail(email)) {
        if (isValidPassword(password)) {
            //save user
            user.save((err) => {
                if (err) {
                    console.log('Registration failed.');
                    // res.send('registration failed')
                    res.error('Registration failed.');
                } else {
                    console.log('user added');
                    res.send('user added');
                }
            })
        } else {
            res.send("Password must be 8 or more characters and have at least 1 number and 1 capital.");
        }
    } else {
        res.send("Invalid email address.");
    }
});

//verify user
router.post('/login', (req, res) => {
    const {email, password} = req.body;

    //find w email, check password
    UserModel.findOne({email: email}).exec((err, user) => {
        if (err) {
            console.log('find error');
        } else {
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) console.log('compare error');

                //successful login
                else if (result) {
                    console.log('Logged in');

                    //issue token, email as payload, using my secret, 24h expiration
                    const payload = {email};
                    const token = jwt.sign(payload, secret, {
                        expiresIn: '24h'
                    });

                    //send cookie w token
                    res.cookie('token', token, {httpOnly: true})
                        .sendStatus(200);
                } else {
                    console.log('wrong password');
                    res.sendStatus(401);
                }
            });
        }
    });
});

router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.send('Logged out.');
});

//check for valid token
router.get('/checkToken', withAuth, (req, res) => {
    res.sendStatus(200);
});

//testing authorization
router.get('/test', withAuth, (req, res) => {
    res.send({hello: 'hello'});
});

router.delete('/deleteUser/:email', withAuth, (req, res) => {
    UserModel.deleteOne({email: req.params.email}).exec((err) => {
        if (err) {
            // do things
            console.log("Error deleting user.");
            res.send("Error deleting user.");
        } else {
            res.send(`${req.params.email} successfully deleted.`);
        }
    })
});

export default router;
