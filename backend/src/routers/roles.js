const express = require('express')
const rolesControllers = require('../controllers/roles')
const router = express()

router.post('/role', rolesControllers.AddRole)

module.exports = router