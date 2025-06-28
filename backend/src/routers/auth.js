const express = require("express")
const auth = require('../controllers/auth')
const { comParePassword, createAccessToken, createRefreshToken } = require('../services/auth')
const router = express.Router();
const passport = require('passport')

router.use(express.json())

router.post('/login', auth.login)
router.post('/logout', auth.logout)
router.get('/check', auth.checkAccess)

router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
)
router.get('/auth/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/' }) , async (req, res) => {
        const access_token = createAccessToken(req.user.id, req.user.email)
        const refresh_token = createRefreshToken(req.user.id, req.user.email)

        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 30 * 24 * 60 * 60 * 1000,  // 30 วัน
            path: '/'
        })
        res.cookie('access_token', access_token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 15 * 60 * 1000,// 15 นาที
            path: '/'
        })
        console.log("Login Successful")
        res.redirect('http://localhost:5173/index.js')
    }
)

module.exports = router 