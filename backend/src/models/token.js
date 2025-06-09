const { getDB } = require('../config/database')
class refreshToken {
    static async createToken(refreshTokenDate) {
        try {
            const conn = getDB()
            const [results] = await conn.query('INSERT INTO refresh_tokens SET ?', refreshTokenDate)
            return results
        } catch (error) {
            throw error
        }
    }
}

module.exports = refreshToken