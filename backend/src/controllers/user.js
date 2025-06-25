const bcrypt = require('bcrypt');
const Usermodels = require('../models/user')
const Tokenmodels = require('../models/token')
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
                Userdata: crateUser
            })
        } catch (error) {
            console.error(error)
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
                Userdata: data
            })
        } catch (error) {
            console.error(error)
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    }
    static async getUserID(req, res) {
        try {
            const userId = req.params.id
            if (!userId) {
                return res.status(400).json({
                    message: "Missing user id"
                })
            }
            const getDateUserID = await Usermodels.getUserID(userId)
            if (!getDateUserID) {
                return res.status(404).json({
                    message: "User not found"
                })
            }
            res.status(200).json({
                message: "Successful",
                Userdata: getDateUserID
            })
        } catch (error) {
            console.error(error)
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    }
    static async deleteUserID(req, res) {
        try {
            const userId = req.params.id
            if (!userId) {
                return res.status(400).json({
                    message: "Missing user id"
                })
            }
            // check User
            const checkUser = await Usermodels.getUserID(userId)
            if (checkUser.length === 0) {
                return res.status(404).json({
                    message: "User not found"
                })
            }
            //ลบ Token
            await Tokenmodels.deleteToken(userId)
            // ลบ สิทธิของ User
            await Usermodels.deleteRights(userId)

            // delete user
            const deleteuser = await Usermodels.deleteUserID(userId)
            if (!deleteuser) {
                return res.status(404).json({
                    message: "User not found"
                })
            }
            res.status(200).json({
                message: "Successful",
                deleteuser
            })
        } catch (error) {
            console.error(error)
            res.status(500).json({
                message: "Internal Server Error",
            })
        }
    }
    static async update(req, res) {
        try {
            const userId = req.params.id
            const { username, password, email, phone, address } = req.body
            if (!userId) {
                return res.status(400).json({
                    message: "Missing user id"
                })
            }
            const checkUser = await Usermodels.getUserID(userId)
            if (checkUser.length === 0) {
                return res.status(404).json({
                    message: "User not found"
                })
            }
            const userData = {}
            if (username) {
                userData.username = username
            }
            if (password) {
                userData.password = await bcrypt.hash(password, 10)
            }
            if (email) {
                userData.email = email
            }
            if (phone) {
                userData.phone = phone
            }
            if (address) {
                userData.address = address
            }
            const updateResult = await Usermodels.update(userData, userId)
            res.status(200).json({
                message: "Successful",
                Userdata: updateResult
            })
        } catch (error) {
            console.error(error)
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    }

}

module.exports = UserController