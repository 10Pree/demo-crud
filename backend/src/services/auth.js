require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const hashPassword = async(password) => {
    return bcrypt.hash(password, 10)
}
const comParePassword = async(password, passworHash) => {
    return bcrypt.compare(password, passworHash)
}

// CreateToken
const createAccessToken = (id, email) => {
    return access_token = jwt.sign({ id, email  }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1m" })
}
const createRefreshToken = (id, email) => {
    return refresh_token = jwt.sign({ id, email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "30d" })
}

module.exports = { hashPassword, comParePassword, createAccessToken, createRefreshToken }