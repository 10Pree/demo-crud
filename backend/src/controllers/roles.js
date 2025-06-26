const Usersmodels = require('../models/user')
const Rolesmodels = require('../models/roles')

class rolesControllers {
    static async AddRole(req, res) {
        try{
        const {userId, roleId = 3} = req.body

        if(!userId || !roleId){
            return res.status(400).json({
                message: "No UserID or No Role"
            })
        }

        // check user
        const checkUser = await Usersmodels.getUserID(userId)
        if(checkUser.length === 0){
            return res.status(400).json({
                message: "User Not Found"
            })
        }

        // create role
        const AddRole = await Rolesmodels.createRoles(userId, roleId)

        res.status(200).json({
            message: "Add Role Successful",
            data: AddRole
        })
        }catch(error){
            res.status(500).json({
                message: "Internal Server Error",
                error: error.message
            })
        }
    }
}

module.exports = rolesControllers