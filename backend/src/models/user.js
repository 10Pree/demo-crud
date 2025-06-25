const { getDB } = require('../config/database');

class Usermodels {
    static async createUser(userData) {
        try {
            const conn = getDB()
            const [results] = await conn.query('INSERT INTO users SET ?', userData)
            return results
        } catch (error) {
            throw error
        }
    }
    static async getUserID(userid) {
        try {
            const conn = getDB()
            const [results] = await conn.query('SELECT id, username, email, phone, address  FROM users WHERE id = ?', userid)
            return results
        } catch (error) {
            throw error
        }
    }
    static async findByEmail(email) {
        const conn = getDB()
        const [results] = await conn.query('SELECT * FROM users WHERE email = ?', [email])
        return results.length > 0 ? results[0] : null
    }
    static async getUsers() {
        try {
            const conn = getDB()
            const [results] = await conn.query('SELECT id, username, email, phone, address FROM users')
            return results
        } catch (error) {
            throw error
        }
    }
    static async deleteUserID(userid) {
        try {
            const conn = getDB()
            const [results] = await conn.query('DELETE FROM users WHERE id = ?', userid)
            return results
        } catch (error) {
            throw error
        }
    }
    static async update(userData, userid) {
        try {
            const conn = getDB()
            const [results] = await conn.query('UPDATE users SET ? WHERE id = ?', [userData, userid])
            return results
        } catch (error) {
            throw error
        }
    }
    static async deleteRights(userid) {
        try {
            const conn = getDB()
            const [results] = await conn.query('DELETE FROM user_roles WHERE users_id = ?', userid)
            return results
        } catch (error) {
            throw error
        }
    }
}


module.exports = Usermodels