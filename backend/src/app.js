// const express = require("express")
// const bcrypt = require('bcrypt')
// const jwt = require("jsonwebtoken")
// const cors = require("cors")
// const cookieParser = require("cookie-parser")
// const { getDB } = require("./config/database")
// const { checkPermission, createAccessToken, createRefreshToken } = require("./middleware/authentication")

// const app = express();

// app.use(express.json())
// app.use(cookieParser())

// app.use(cors({
//     origin: "http://localhost:5173",
//     credentials: true
// }))

// app.post("/login", async (req, res) => {
//     try {
//         const { email, password } = req.body

//         // หาอีเมล ว่ามีอยู่ จริง
//         const conn = getDB()
//         const [results] = await conn.query("SELECT * FROM users WHERE email = ?", [email])
//         if (results.length === 0) {
//             return res.status(401).json({
//                 message: "Login Fail Wrong Email Password"
//             })
//         }

//         // ตรวจสอบ ว่า password มีอยู่จริง
//         const userData = results[0]
//         const match = await bcrypt.compare(password, userData.password)
//         if (!match) {
//             return res.status(401).json({
//                 message: "Login Fail Wrong Email Password",
//             })
//         }

//         // สร้าง Refresh Tokens กับ  Access Token
//         const refresh_token = createRefreshToken(userData.id, email)
//         const access_token = createAccessToken(userData.id, email)

//         const expires = new Date()
//         expires.setDate(expires.getDate() + 30)

//         const refreshTokenDate = {
//             users_id: userData.id,
//             token: refresh_token,
//             expires_at: expires,
//             is_revoked: false,
//             device_info: JSON.stringify({
//                 user_agent: req.headers['user-agent'],
//                 ip: req.ip
//             })
//         }


//         const [refreshToken] = await conn.query('INSERT INTO refresh_tokens SET ?', refreshTokenDate)

//         res.status(200).json({
//             message: "Login Successful",
//             refresh_token: refresh_token,
//             access_token: access_token
//         })
//     } catch (error) {
//     console.log("Login Error:", error); // ✅ เพิ่มบรรทัดนี้
//     res.status(500).json({
//         message: "Internal server error",
//         error
//     });
//     }
// });


// app.post("/user", async (req, res) => {
//     try {
//         const { username, password, email, phone, address } = req.body

//         const hash = await bcrypt.hash(password, 10)

//         const userData = { username, password: hash, email, phone, address }

//         const conn = getDB()
//         const [results] = await conn.query("INSERT INTO users SET ?", userData)

//         res.status(201).json({
//             message: "Create Successful",
//             results
//         })
//     } catch (error) {
//         res.status(400).json({
//             message: "Create fail",
//         })
//     }
// })

// app.put('/user/:id', async (req, res) => {
//     try {
//         const userId = req.params.id
//         const { username, password, email, phone, address } = req.body
//         // ติดต่อ BD
//         const conn = getDB()

//         const [checkUser] = await conn.query("SELECT * FROM users WHERE id = ?", userId)
//         if (checkUser.length === 0) {
//             return res.status(404).json({
//                 message: "User not found"
//             })
//         }

//         const userData = { username, email, phone, address }
//         if (password) {
//             userData.password = await bcrypt.hash(password, 10)
//         }

//         const [results] = await conn.query("UPDATE users SET ? WHERE id = ?", [userData, userId])
//         res.status(200).json({
//             message: "Update User Successful",
//             results
//         })
//     } catch (error) {
//         res.status(400).json({
//             message: "Update User fail",
//         })
//     }
// })

// app.get("/users", checkPermission('read'), async (req, res) => {
//     try {
//         // ติดต่อ BD
//         const conn = getDB()
//         const [results] = await conn.query("SELECT id, username, email, phone, address FROM users")
//         res.status(200).json({
//             message: "Date User",
//             results
//         })
//     } catch (error) {
//         res.status(400).json({
//             message: "Get user fail",
//         })
//     }
// })

// app.get("/user/:id", async (req, res) => {
//     try {
//         const userId = req.params.id
//         // ติดต่อ BD
//         const conn = getDB()
//         const [results] = await conn.query("SELECT id, username, email, phone, address FROM users WHERE id = ?", userId)
//         if (results.length === 0) {
//             res.status(404).json({
//                 message: "User not found"
//             })
//         }
//         res.status(200).json({
//             message: `User Date`,
//             results
//         })
//     } catch (error) {
//         res.status(400).json({
//             message: "Get user fail",
//         })
//     }
// })

// app.delete("/user/:id", async (req, res) => {
//     try {
//         const userId = req.params.id
//         // ติดต่อ BD
//         const conn = getDB()
//         const [checkUser] = await conn.query("SELECT * FROM users WHERE id = ?", userId)
//         if (checkUser.length === 0) {
//             res.status(404).json({
//                 message: "User not found"
//             })
//         }

//         const [results] = await conn.query("DELETE FROM users WHERE id = ?", userId)
//         res.status(200).json({
//             message: "Delete User Successful",
//             results
//         })
//     } catch (error) {
//         res.status(404).json({
//             message: "Delete user fail",
//         })
//     }
// })

// app.post('/role', async (req, res) => {
//     try {
//         const { name } = req.body
//         const conn = getDB()
//         const [results] = await conn.query('INSERT INTO roles SET ?', { name })

//         res.status(201).json({
//             message: "Create Successful",
//             results
//         })
//     } catch (error) {
//         res.status(400).json({
//             message: "Create fail",
//             error
//         })
//     }
// })

// app.post('/permission', async (req, res) => {
//     try {
//         const { name } = req.body
//         const conn = getDB()

//         const [results] = await conn.query('INSERT INTO permission SET ?', { name })
//         res.status(201).json({
//             message: "Create Successful",
//             results
//         })
//     } catch (error) {
//         res.status(400).json({
//             message: "Create fail",
//             error
//         })
//     }
// })

// app.post('/user_roles', async (req, res) => {
//     try {
//         const { users_id, roles_id } = req.body

//         const conn = getDB()
//         const [results] = await conn.query('INSERT INTO user_roles SET ?', { users_id, roles_id })
//         res.status(201).json({
//             message: "Create Successful",
//             results
//         })
//     } catch (error) {
//         res.status(400).json({
//             message: "Create fail",
//             error
//         })
//     }
// })

// app.post('/role_permissions', async(req, res) => {
//     try{
//             const { roles_id, permissions_id} = req.body
//     const conn = getDB()

//     const [results] = await conn.query('INSERT INTO role_permissions SET ?', { roles_id, permissions_id})
//         res.status(201).json({
//             message: "Create Successful",
//             results
//         })
//     } catch (error) {
//         res.status(400).json({
//             message: "Create fail",
//             error
//         })
//     }
// })

module.exports = app