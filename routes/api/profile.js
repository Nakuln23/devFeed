const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Load Profile model
const Profile = require('../../models/Profile');

//Load User model
const Users = require('../../models/Users')

router.get('/test', (req,res) => {
    res.send("Profiles are working")
})

//@route GET api/profile
//@desc  Get current users profile
//@access Private

router.get('/', passport.authenticate('jwt',{session: false}), (req,res)=> {
    const errors = {};
    
    Profile.findOne({user: req.user.id})
    .then(profile => {
        if(!profile) {
            errors.noprofile = "There is profile for this user"
            return res.status(404).json(errors)
        }
        res.json(profile);
    })
    .catch(err => {
        res.status(404).json(err)
    })
})

//@route POST api/profile
//@desc  Create or edit users profile
//@access Private

router.get('/', passport.authenticate('jwt',{session: false}), (req,res)=> {
    const profileFields = {};
    profileFields.user = req.user.id;
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.handle) profileFields.company = req.body.handle;
    if(req.body.handle) profileFields.website = req.body.handle;
    if(req.body.handle) profileFields.location = req.body.handle;
    if(req.body.handle) profileFields.bio  = req.body.handle;
    if(req.body.handle) profileFields.status = req.body.handle;
    if(req.body.handle) profileFields.githubusername = req.body.handle;
    
    // Skills -Split into array
    if (typeof req.body.skills !== 'undefined') {
        profileFields.skills = req.body.skills.split(',')
    } 

    // Social
    profileFields.social = {};
    if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if(req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({user : req.body.id})
    .then(profile => {
        if(profile) {
            //Update
            Profile.findOneAndUpdate({user: req.body.id}, {$set : profileFields}, {new: true})
            .then(profile => res.json(profile))
        } else {
            //Create

            //Check if handle exists
            Profile.findOne({handle : profile.profileFields.handle})
            .then(profile => {
                if(profile) {
                    errors.handle = "That handle already exists"
                    res.status(400).json(errors)
                }

                //save profile
                new Profile(profileFields).save()
                .then(profile => res.json(profile))
            })

        }
    })

})
module.exports = router;