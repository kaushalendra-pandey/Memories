const express = require('express')
const router = express.Router()
const User = require('../models/user')
const authFunc = require("../authController/authController")
const middleware = require('../middlewares/authMiddleware')


router.get('/',(req,res)=>{
    res.send("Hello World")
})

//dummy call 
router.get("/protected",middleware.loginMiddleware,(req,res)=>{
    res.send("jwt token is verified.")
})
//********************************

router.post('/signup',authFunc.signUp)
router.post('/signin',authFunc.signin)


module.exports = router