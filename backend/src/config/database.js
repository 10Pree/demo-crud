const mysql = require("mysql2/promise")

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

const getDB = () =>{
    if(!conn) {
        throw new Error("DB Not Connect")
    }
    return conn
}
module.exports = { connectMySql, getDB}