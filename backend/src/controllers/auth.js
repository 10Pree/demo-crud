const { comParePassword, createAccessToken, createRefreshToken } = require('../services/auth')
const Usersmodels = require('../models/user')
const tokensModel = require('../models/token')
const jwt = require('jsonwebtoken')
require('dotenv').config()
class authController {
    static async login(req, res) {
        try {
            const { email, password } = req.body
            const data = await Usersmodels.findByEmail(email)
            if (!data) {
                return res.status(400).json({
                    message: "Login Fail Wrong Email Password"
                })
            }
            const compare = await comParePassword(password, data.password)
            if (!compare) {
                return res.status(400).json({
                    message: "Login Fail Wrong Email Password"
                })
            }
            await tokensModel.revokeTokensByUser(data.id)
            // createToken
            const access_token = await createAccessToken(data.id, data.email)
            const refresh_token = await createRefreshToken(data.id, data.email)

            const expires = new Date()
            expires.setDate(expires.getDate() + 30)

            const refreshTokenDate = {
                users_id: data.id,
                token: refresh_token,
                expires_at: expires,
                is_revoked: false,
                device_info: JSON.stringify({
                    user_agent: req.headers['user-agent'],
                    ip: req.ip
                })
            }
            const AddrefreshTokenDB = await tokensModel.createToken(refreshTokenDate)
            if (!AddrefreshTokenDB) {
                res.status(401).json({
                    message: "error Token"
                })
            }
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
            // console.log(req.cookies)
            res.status(200).json({
                message: "Login Successful",
            })
        } catch (error) {
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    }

    static async logout(req, res) {
        try {
            const token = req.cookies.refresh_token
            if (!token) {
                return res.status(401).json({
                    message: "Not Token"
                })
            }
            const checkToken = await jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)

            await tokensModel.revokeTokensByUser(checkToken.id)
            res.clearCookie('refresh_token', {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                path: '/'
            })
            res.clearCookie('access_token', {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                path: '/'
            })
            res.status(200).json({
                message: "Logout Successful"
            })
        } catch (error) {
            if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
                res.clearCookie('refresh_token', {
                    httpOnly: true,
                    secure: false,
                    sameSite: 'lax',
                    path: '/'
                })
                res.clearCookie('access_token', {
                    httpOnly: true,
                    secure: false,
                    sameSite: 'lax',
                    path: '/'
                })
                return res.status(200).json({
                    message: "Logout Successful"
                })
            }
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    }

    static async checkAccess(req, res) {
        try {
            const access_token = req.cookies.access_token
            const refresh_token = req.cookies.refresh_token
            if (!access_token && !refresh_token) {
                return res.status(401).json({
                    message: "Not token"
                })
            }
            const checkAccessToken = await jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET)
            const checkRefreshToken = await jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET)

            res.status(200).json({
                message: "Authenticated"
            })
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                return authController.checkRefresh(req, res)
            } else {
                res.clearCookie('refresh_token', {
                    httpOnly: true,
                    secure: false,
                    sameSite: 'lax',
                    path: '/'
                })
                res.clearCookie('access_token', {
                    httpOnly: true,
                    secure: false,
                    sameSite: 'lax',
                    path: '/'
                })
            }
            res.status(403).json({
                message: "Invalid token"
            })
        }
    }
    static async checkRefresh(req, res) {
        try {
            const refresh_token = req.cookies.refresh_token
            if (!refresh_token) {
                return res.status(401).json({
                    message: "Not Refresh Token"
                })
            }
            const checkRefresh = await jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET)

            const newAccess = await createAccessToken(checkRefresh.id, checkRefresh.email)
            res.cookie('access_token', newAccess, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                maxAge: 15 * 60 * 1000   // 15 นาที
            })
            res.status(200).json({
                message: "Create AccessToken Successful"
            })
        } catch (error) {
            res.status(403).json({
                message: "Invalid token"
            })
        }

    }
}


module.exports = authController