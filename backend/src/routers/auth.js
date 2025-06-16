const express = require("express")
const auth = require('../controllers/auth')
const router = express.Router();

router.use(express.json())

router.post('/login', auth.login)
router.get('/check', auth.checkAccess)

module.exports = router 