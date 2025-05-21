const express = require("express")
const mysql = require("mysql2/promise")
const bcrypt = require('bcrypt')
const cors = require("cors")

const app = express();
const post = 8000

app.use(express.json())

let conn = null
const connectMySql = async () => {
    conn = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "practice-cred"
    });
    console.log("connect ==> DB")
}


app.post("/user", async (req, res) => {
    try {
        const { username, password, email, phone, address } = req.body

        const hash = await bcrypt.hash(password, 10)

        const userDate = { username, password: hash, email, phone, address }

        const [results] = conn = await conn.query("INSERT INTO users SET ?", userDate)
        res.status(201).json({
            message: "Create Successful",
            results
        })
    } catch (error) {
        res.status(400).json({
            message: "Create fail",
            error
        })
    }
})

app.put('/user/:id', async(req, res) => {
    try {
        const userId = req.params.id
        const { username, password, email, phone, address } = req.body

        const [checkUser] = await conn.query("SELECT * FROM users WHERE id = ?", userId)
        if(checkUser.length === 0){
            res.status(404).json({
                message: "User Not Found"
            })
        }

        let hashPassword;
        if(password){
            hashPassword = await bcrypt.hash(password, 10)
        }

        const userDate = { username, password: hashPassword, email, phone, address }

        const [results] = await conn.query("UPDATE users SET ? WHERE id = ?", [userDate, userId])
        res.status(200).json({
            message: "Update User Successful",
            results
        })
    } catch (error){
        res.status(400).json({
            message: "Update User fail",
            Error: error
        })
    }
})




app.listen(post, async () => {
    await connectMySql()
    console.log(`Start Server ${post}`)
})