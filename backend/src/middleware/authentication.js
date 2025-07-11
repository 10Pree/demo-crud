const jwt = require("jsonwebtoken")
const { getDB } = require('../config/database')
require('dotenv').config();


const checkPermission = (requestPermission) => { 
       return async(req, res, next) => {
    try {
        const token = req.cookies.access_token

        if (!token){
            return res.status(401).json({
                message: "No access rights"
            })
        }

        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = user
        const hasPermission  = await getPermission(user.id, requestPermission)
        if(!hasPermission){
            return res.status(403).json({
               message: "Insufficient permissions",
               hasPermission
            })
        }
        next()
    } catch (error) {
        return res.status(403).json({
            message: "Invalid token"
        })
    }
}
}

// CheckPermission
const getPermission = async(userId, requestPermission) => {
    try {
        const queryText = `
        SELECT p.name
        FROM users u
        JOIN user_roles ur on u.id = ur.users_id
        JOIN roles r on ur.roles_id = r.id
        JOIN role_permissions rp on r.id = rp.roles_id
        JOIN permissions p on rp.permissions_id = p.id
        WHERE u.id = ? and p.name = ? 
        LIMIT 1
        `;
        const conn = getDB()
        const [results] = await conn.query(queryText,[userId, requestPermission])
        // console.log([results])
        return results.length > 0
    } catch(error) {
        console.log(error)
        return false
    }
}




module.exports = { checkPermission  }