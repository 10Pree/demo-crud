const { getDB } = require('../config/database')

class rolesModels {
    static async createRoles(users_id, roles_id) {
        try {
            const conn = getDB()
            const [results] = await conn.query('INSERT INTO user_roles SET ?', { users_id, roles_id })
            return results
        } catch (error) {
            throw error
        }
    }
}

module.exports = rolesModels