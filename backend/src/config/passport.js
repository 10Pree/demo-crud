require('dotenv').config()
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
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

module.exports = passport