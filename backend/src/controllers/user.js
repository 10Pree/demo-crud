const bcrypt = require('bcrypt');
const Usermodels = require('../models/user')
const { hashPassword } = require('../services/auth')

class UserController {
    static async createUser(req, res) {
        try {
            const { username, password, email, phone, address } = req.body

            const hash = await hashPassword(password)

            const userData = { username, password: hash, email, phone, address }

            const crateUser = await Usermodels.createUser(userData)
            if (!crateUser) {
                return res.status(400).json({
                    message: "Create fail",
                })
            }

            res.status(201).json({
                message: "Create Successful",
                data: crateUser
            })
        } catch (error) {
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    }
    static async getUsers(req, res) {
        try {
            const data = await Usermodels.getUsers()
            res.status(200).json({
                message: "Successful",
                data: data
            })
        } catch (error) {
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    }
}

module.exports = UserController