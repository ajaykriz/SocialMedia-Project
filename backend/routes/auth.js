const router = require("express").Router()
const {register,login,checkEmail,otpValidation,otpConfirmation} = require('../controller/authcontroller')
router.post("/register",register)
router.post("/login",login)
router.post("/checkUser",checkEmail)
router.post("/otpValidation",otpValidation)
router.post("/otpConfirmation",otpConfirmation)
module.exports = router