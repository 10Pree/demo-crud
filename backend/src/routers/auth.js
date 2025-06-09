const express = require("express")
const auth = require('../controllers/auth')
const router = express.Router();

router.use(express.json())

router.post('/login', auth.login)

module.exports = router 