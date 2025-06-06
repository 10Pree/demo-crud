const { error } = require("console");
const { request } = require("http");
const jwt = require("jsonwebtoken")
const path = require('path');
const { getDB } = require("./src/config/database")
require('dotenv').config();


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

// CheckPermission
const checkPermission = async(userId, Permission) => {
    try {
        const queryText = `
        SETECT p.name
        FROM users u
        JOIN roles r on u.id = r.id
        JOIN role_permission rp on rp.roles_id = r.id 
        JOIN permission p on p.id = rp.roles_id 
        WHERE u.id = ? and p.name
        `
        const conn = getDB()
        const results = await conn.query(queryText,[userId, Permission])
        console.log(results)
    } catch(error) {
        return false
    }
}

// CreateToken
const createAccessToken = (id, email) => {
    return access_token = jwt.sign({ id, email  }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1m" })
}
const createRefreshToken = (id, email) => {
    return refresh_token = jwt.sign({ id, email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "30d" })
}



module.exports = { oauthToken, createAccessToken, createRefreshToken}