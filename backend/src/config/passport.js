require('dotenv').config()
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook')
const Usermodels = require('../models/user')

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/auth/google/callback"
},
    async (accessToken, refreshToken, profile, cb) => {
        try {
            const email = profile.emails[0].value
            const username = profile.displayName

            console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
            console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET);

            const user = await Usermodels.findByEmail(email)
            if (!user) {
                const newUser = {
                    username: username,
                    password: '',
                    email: email,
                    phone: null,
                    address: null
                }
                await Usermodels.createUser(newUser)
                user = await Usermodels.findByEmail(email)
            }
            return cb(null, user);
        } catch (error) {
            return cb(error, null);
        }
    }
));


passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:8000/auth/facebook/callback"
},
    async (accessToken, refreshToken, profile, cb) => {
        try {
            const email = profile.emails[0].value
            const username = profile.displayName

            console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
            console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET);

            const user = await Usermodels.findByEmail(email)
            if (!user) {
                const newUser = {
                    username: username,
                    password: '',
                    email: email,
                    phone: null,
                    address: null
                }
                await Usermodels.createUser(newUser)
                user = await Usermodels.findByEmail(email)
            }
            return cb(null, user);
        } catch (error) {
            return cb(error, null);
        }
    }
));

// app.get('/auth/facebook/callback',
//     passport.authenticate('facebook', { failureRedirect: '/login' }),
//     async (req, res) => {
//         const email = profile.emails[0].value
//         const username = profile.displayName

//         console.log('FACEBOOK_APP_ID:', process.env.FACEBOOK_APP_ID);
//         console.log('FACEBOOK_APP_SECRET:', process.env.FACEBOOK_APP_SECRET);

//         const user = await Usermodels.findByEmail(email)
//         if (!user) {
//             const newUser = {
//                 username: username,
//                 password: '',
//                 email: email,
//                 phone: null,
//                 address: null
//             }
//             await Usermodels.createUser(newUser)
//             user = await Usermodels.findByEmail(email)
//         }
//         res.redirect('/');
//     });

module.exports = passport