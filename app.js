const express = require("express")
const mysql = require("mysql2/promise")
const bcrypt = require('bcrypt')
const session = require("express-session")
const jwt = require("jsonwebtoken")
const cors = require("cors")

const app = express();
const port = 8000

app.use(express.json())

app.use(session({
    secret: 'iorhjt0u03u40589298yu31j9',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
}))

let conn = null
const connectMySql = async() => {
    conn = await mysql.createPool({
        host: "localhost",
        user: "root",
        password: "root",
        database: "practice-cred",
        // การใช้ Pool
        waitForConnections: true, //  ถ้าไม่มี connection ว่าง จะให้รอ (ไม่ล้มเหลวทันที)
        connectionLimit: 10,      //  จำนวนสูงสุดของ connection ที่จะเปิดพร้อมกันใน pool
        queueLimit: 0             //  จำนวนคำขอที่รอคิวได้ (0 = ไม่จำกัด)
    });
    console.log("connect ==> DB")
}

const oauthToken = (req, res, next) => {
    try {
        if (!req.session.userId) {
            return res.status(400).json({
                message: "Unauthorized"
            })
        }
        next()
    } catch (error) {
        res.status()
    }
}

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body

        // หาอีเมล ว่ามีอยู่ จริง
        const [results] = await conn.query("SELECT * FROM users WHERE email = ?", [email])
        if (results.length === 0) {
            return res.status(401).json({
                message: "Login Fail Wrong Email Password"
            })
        }

        // ตรวจสอบ ว่า password มีอยู่จริง
        const userData = results[0]
        const match = await bcrypt.compare(password, userData.password)
        if (!match) {
            return res.status(401).json({
                message: "Login Fail Wrong Email Password",
            })
        }


        // สร้าง session
        req.session.userId = userData.id
        req.session.user = userData


        res.status(200).json({
            message: "Login Successful"
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
        })
    }
});


app.post("/user", async (req, res) => {
    try {
        const { username, password, email, phone, address } = req.body

        const hash = await bcrypt.hash(password, 10)

        const userData = { username, password: hash, email, phone, address }

        const [results] = await conn.query("INSERT INTO users SET ?", userData)

        res.status(201).json({
            message: "Create Successful",
            results
        })
    } catch (error) {
        res.status(400).json({
            message: "Create fail",
        })
    }
})

app.put('/user/:id', async (req, res) => {
    try {
        const userId = req.params.id
        const { username, password, email, phone, address } = req.body

        const [checkUser] = await conn.query("SELECT * FROM users WHERE id = ?", userId)
        if (checkUser.length === 0) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        const userData = { username, email, phone, address }
        if (password) {
            userData.password = await bcrypt.hash(password, 10)
        }

        const [results] = await conn.query("UPDATE users SET ? WHERE id = ?", [userData, userId])
        res.status(200).json({
            message: "Update User Successful",
            results
        })
    } catch (error) {
        res.status(400).json({
            message: "Update User fail",
        })
    }
})

app.get("/users", oauthToken, async (req, res) => {
    try {
        const [results] = await conn.query("SELECT username, email, phone, address FROM users")
        res.status(200).json({
            message: "Date User",
            results
        })
    } catch (error) {
        res.status(400).json({
            message: "Get user fail",
        })
    }
})

app.get("/user/:id", async (req, res) => {
    try {
        const userId = req.params.id
        const [resutls] = await conn.query("SELECT username, email, phone, address FROM users WHERE id = ?", userId)
        if (resutls.length === 0) {
            res.status(404).json({
                message: "User not found"
            })
        }
        res.status(200).json({
            message: `User Date`,
            resutls
        })
    } catch (error) {
        res.status(400).json({
            message: "Get user fail",
        })
    }
})

app.delete("/user/:id", async (req, res) => {
    try {
        const userId = req.params.id
        const [checkUser] = await conn.query("SELECT * FROM users WHERE id = ?", userId)
        if (checkUser.length === 0) {
            res.status(404).json({
                message: "User not found"
            })
        }

        const [results] = await conn.query("DELETE FROM users WHERE id = ?", userId)
        res.status(200).json({
            message: "Delete User Successful",
            results
        })
    } catch (error) {
        res.status(404).json({
            message: "Delete user fail",
        })
    }
})




app.listen(port, async () => {
    await connectMySql()
    console.log(`Start Server ${port}`)
})