const express = require('express')
const user = require('./src/routers/user')
const { connectMySql } = require("./src/config/database")
const cors = require("cors")

const app = express();
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use('/', user)


const port = 8000
const startServer = async() => {    
    await connectMySql();
    app.listen(port, () =>{
        console.log("Start Server")
    })
}

startServer()