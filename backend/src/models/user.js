const { getDB } = require('../config/database');

class Usermodels {
    static async createUser(userData) {
        try {
            const conn = getDB()
            const [results] = await conn.query("INSERT INTO users SET ?", userData)
            return results
        } catch (error) {
            throw error
        }
    }
    static async findByEmail(email) {
        const conn = getDB()
        const [results] = await conn.query("SELECT * FROM users WHERE email = ?", [email])
        return results.length > 0 ? results[0] : null
    }
}


module.exports = Usermodels