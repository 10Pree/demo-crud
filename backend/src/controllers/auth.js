const { comParePassword, createAccessToken, createRefreshToken } = require('../services/auth')
const Usersmodels = require('../models/user')
const tokensModel = require('../models/token')
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
            res.status(200).json({
                message: "Login Successful",
                access_token,
                refresh_token
            })
        } catch (error) {
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    }
}

module.exports = authController