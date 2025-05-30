const app = require('./app')
const { connectMySql } = require("./config/database")

const port = 8000

const startServer = async() => {
    await connectMySql();
    app.listen(port, () =>{
        console.log("Start Server")
    })
}

startServer()