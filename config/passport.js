const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const Users = require('../models/Users')
const keys = require('./keys')


const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = (passport)=> {
    passport.use(new JWTStrategy(opts, (jwt_payload,done) => {
        Users.findById(jwt_payload.id)
        .then(user => {
            if (user) {
                return done(null, user)
            }
            return done(null, false);
        })
        .catch(err => {
            console.log(err)
        })

    }))
}