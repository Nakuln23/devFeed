const express = require('express');
const router = express.Router()
const Users = require('../../models/Users')
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const passport = require('passport')
const keys = require('../../config/keys')


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

//@route GET api/users/login
//@desc  Logging in User / Returning a JWT token  
//@access Public

router.post('/login', (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    
    //Find user by email
    Users.findOne({email})
    .then(user => {
        if(!user) {
          return res.status(404).json({email: "Email not found"})
        }

        //Check Password
        bcrypt.compare(password, user.password)
        .then(isMatch =>{
            if (isMatch) {
                //User Matched
                const payload = { id: user.id, name: user.name, avatar: user.avatar} //Create JWT payload

                //Sign token
                jwt.sign(payload, keys.secretOrKey, {expiresIn: 3600}, ((err,token) => {
                    if(err) {
                        return err;
                    } else {
                    res.json({
                        success: true,
                        token : 'Bearer ' + token
                    })
                }}) )
            } else {
                return res.status(400).json({password:"Password not correct"})
            }
        })
    })

})

//@route GET api/users/current
//@desc  Return current user
//@access Private

router.get('/current', passport.authenticate('jwt', {session: false}),(req,res) => {
    res.json({msg:'Success'})
})



module.exports = router;