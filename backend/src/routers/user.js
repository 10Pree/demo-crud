const express = require("express")
const authentication = require('../middleware/authentication')
const usercontrollers = require('../controllers/user')
const authcontrollers = require('../controllers/auth')
const router = express.Router();

router.use(express.json())

router.post('/user', authentication.checkPermission('create'), usercontrollers.createUser)
router.get('/user/:id', usercontrollers.getUserID)
router.get('/users',authentication.checkPermission('read'), usercontrollers.getUsers)
router.put('/user/:id', authentication.checkPermission('update'), usercontrollers.update)
router.delete('/user/:id', authentication.checkPermission('delete'),  usercontrollers.deleteUserID)

module.exports = router 