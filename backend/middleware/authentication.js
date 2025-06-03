const jwt = require("jsonwebtoken")
require('dotenv').config()


const oauthToken = (req, res, next) => {
    try {
        const authHeaders = req.headers['authorization']
        const token = authHeaders && authHeaders.split(" ")[1]
        if (!token){
            return res.status(401).json({
                message: "No access rights"
            })
        }

        const user = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        req.user = user
        console.log("user",user)
        next()
    } catch (error) {
        return res.status(403).json({
            message: "Invalid token"
        })
    }
}

const createAccessToken = (id, email, role) => {
    return access_token = jwt.sign({ id, email, role  }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1m" })
}
const createRefreshToken = (id, email, role) => {
    return refresh_token = jwt.sign({ id, email, role }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "30d" })
}

module.exports = { oauthToken, createAccessToken, createRefreshToken}