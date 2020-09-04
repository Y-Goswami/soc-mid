const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const env = require('./environment');

const user = require('../models/user');


let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.jwt_secret
}

passport.use(new JWTStrategy(opts,function(jwtPayLoad, done){
    user.findById(jwtPayLoad._id,function(err, user){
        if(err){console.log('Error i finding user');return;}

        if(user){
            return done(null, user);
        }
        else{
            return done(null, false);
        }
    });
}));

module.exports = passport;
