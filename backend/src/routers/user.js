const express = require("express")
const authentication = require('../middleware/authentication')
const user = require('../controllers/user')
const router = express.Router();

router.use(express.json())

router.post('/user', user.createUser)

module.exports = router 