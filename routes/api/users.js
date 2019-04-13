const express = require('express');
const router = express.Router()
const Users = require('../../models/Users')
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');


router.get('/test', (req,res) => {
    res.send("Users are working")
})

//@route GET api/users/register
//@desc  Register User
//@access Public

router.post('/register', (req,res) => {
   Users.findOne({email: req.body.email} , (err, user) => {
       if (err) {
           res.json(err)
       } else {
           if(user) {
            res.status(400).json({email: "Email already exists"})
           } else {
           //Fetching avatar 
           const avatar = gravatar.url('req.body.email', {s: '200', r: 'pg', d: 'mm'})
           const newUser = new Users({
               name : req.body.name,
               email : req.body.email,
               password : req.body.password,
               avatar,
           })

           
           bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(newUser.password, salt, function(err, hash) {
           // Store hash in your password DB.
             if(err) throw err;
             else {
                newUser.password = hash;
                newUser.save((err,user) => {
                  if (err) {
                      console.log(err)
                  } else {
                      res.json(user)
                  }
                })}
            })
           })
           
       }
   }}
)})



module.exports = router;