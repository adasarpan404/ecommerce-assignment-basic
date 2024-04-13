const express = require('express')
const UserService = require('../service/user.service')
const router = express.Router();

router.post('/signup', UserService.checkAccount)
router.post('/verify-otp', UserService.verifyOTP)
router.post('/update-profile/:user', UserService.updateProfile)

module.exports = router