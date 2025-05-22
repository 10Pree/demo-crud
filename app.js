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

const oathToken = (req, res, next) =>{
    console.log("Hello Oath");
    next();
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

app.put('/user/:id', async (req, res) => {
    try {
        const userId = req.params.id
        const { username, password, email, phone, address } = req.body

        const [checkUser] = await conn.query("SELECT * FROM users WHERE id = ?", userId)
        if (checkUser.length === 0) {
            res.status(404).json({
                message: "User not found"
            })
        }

        let hashPassword;
        if (password) {
            hashPassword = await bcrypt.hash(password, 10)
        }

        const userDate = { username, password: hashPassword, email, phone, address }

        const [results] = await conn.query("UPDATE users SET ? WHERE id = ?", [userDate, userId])
        res.status(200).json({
            message: "Update User Successful",
            results
        })
    } catch (error) {
        res.status(400).json({
            message: "Update User fail",
            error
        })
    }
})

app.get("/users", oathToken,  async (req, res) => {
    try {
        const [results] = await conn.query("SELECT username, email, phone, address FROM users")
        res.status(200).json({
            message: "Date User",
            results
        })
    } catch (error) {
        res.status(400).json({
            message: "Get user fail",
            error
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
    } catch (error){
        res.status(400).json({
            message: "Get user fail",
            error
        })
    }
})

app.delete("/user/:id", async(req, res) => {
    try{
            const userId = req.params.id
    const [checkUser] = await conn.query("SELECT * FROM users WHERE id = ?", userId)
    if(checkUser.length === 0){
        res.status(404).json({
            message: "User not fail"
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
            error
        })
    }
})



app.listen(post, async () => {
    await connectMySql()
    console.log(`Start Server ${post}`)
})