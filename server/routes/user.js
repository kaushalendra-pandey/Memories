const express = require('express');
const router = express.Router()
const mongoose = require('mongoose')
const middleware = require('../middlewares/authMiddleware')
const postController = require("../authController/postController")
const userController = require("../authController/userController")
const Post = require("../models/post")
const User = require('../models/user')

router.get('/profile/:id',middleware.loginMiddleware,userController.userProfile)
router.put('/follow',middleware.loginMiddleware,userController.follow)
router.put('/unfollow',middleware.loginMiddleware,userController.unfollow)

module.exports = router