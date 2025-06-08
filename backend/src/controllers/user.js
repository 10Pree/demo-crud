const bcrypt = require('bcrypt');
const Usermodels = require('../models/user')

class UserController {
    static async createUser(req, res) {
            try {
        const { username, password, email, phone, address } = req.body

        const hash = await bcrypt.hash(password, 10)

        const userData = { username, password: hash, email, phone, address }

        const crateUser = await Usermodels.createUser(userData)
        if(!crateUser){
            res.status(400).json({
            message: "Create fail",
        })
        } 

        res.status(201).json({
            message: "Create Successful",
            crateUser
        })
    } catch (error) {
        res.status(400).json({
            message: "Create fail",
        })
    }
    }
}

module.exports = UserController