const express = require("express")
const authentication = require('../middleware/authentication')
const user = require('../controllers/user')
const auth = require('../controllers/auth')
const router = express.Router();

router.use(express.json())

router.post('/user', user.createUser)
router.get('/users',authentication.checkPermission("read"), user.getUsers)

module.exports = router 