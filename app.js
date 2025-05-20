const express = require("express")
const mysql = require("mysql2/promise")
const cors = require("cors")

const app = express();
const post = 8000

app.use(express.json())

app.use("/hello", (req, res) => {
    res.send("WELCOME NONTHANAN")
})

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


app.post("/user", async(req, res) => {
    try {
        const { username, password, email, phone, address  } = req.body

        const userDate = { username, password, email, phone, address  }

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




app.listen(post, async () => {
    await connectMySql()
    console.log(`Start Server ${post}`)
})