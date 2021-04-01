const express = require('express');
const router = express.Router()
const mongoose = require('mongoose')
const middleware = require('../middlewares/authMiddleware')
const postController = require("../authController/postController")
const Post = require("../models/post")

router.post('/createpost',middleware.loginMiddleware,postController.createPost)
router.get("/getPosts",postController.getPosts)
router.get("/myPosts",middleware.loginMiddleware,postController.myPosts)
router.put("/like",middleware.loginMiddleware,postController.likePost)
router.put('/dislike',middleware.loginMiddleware,postController.dislikePost)
router.put("/comment",middleware.loginMiddleware,postController.comment)
router.delete("/deletepost/:postId",middleware.loginMiddleware,postController.deletePost)

module.exports = router