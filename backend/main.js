const app = require('./src/app')
const { connectMySql } = require("./src/config/database")

const port = 8000

const startServer = async() => {    
    await connectMySql();
    app.listen(port, () =>{
        console.log("Start Server")
    })
}

startServer()