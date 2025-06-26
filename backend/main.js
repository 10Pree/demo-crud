const express = require('express')
const users = require('./src/routers/user')
const auth = require('./src/routers/auth')
const roles = require('./src/routers/roles') 
const { connectMySql } = require("./src/config/database")
const cors = require("cors")
const cookieParser = require('cookie-parser')

const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use('/', users)
app.use('/', auth)
app.use('/', roles)

const port = 8000
const startServer = async() => {    
    await connectMySql();
    app.listen(port, () =>{
        console.log("Start Server")
    })
}

startServer()