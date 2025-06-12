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
    static async revokeTokensByUser(userid) {
        try{
            const conn = getDB()
            const [results] = await conn.query('UPDATE refresh_tokens SET is_revoked = ? WHERE users_id = ?', [true, userid])
            return results
        } catch(error){
            throw error
        }
    }
}

module.exports = refreshToken