const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
 done(null, user.id);
});

passport.deserializeUser((id, done) => {
 User.findById(id)
   .then(user => {
     done(null, user);
   });
});

// configuaring google-oauth-20 with passport
passport.use(
    new GoogleStrategy(
    {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleId : profile.id })
            .then(existingUser => {
                if(existingUser){
                  done(null,existingUser);
                }else{
                    //creating new model instance
                    new User({ googleId: profile.id })
                     .save()
                     .then(user => done(null, user));
                }
            });
    }
));