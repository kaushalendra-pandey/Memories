const mongoose = require('mongoose')
const User = require('./user')

const {ObjectId} = mongoose.Schema.Types
const PostSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    photo:{
        type:String,
    },
    likes:[{
        type:ObjectId,
        ref:"User"
    }],
    comment:[{
        text:String,
        postedBy:{
            type:ObjectId,
            ref:"User"}
    }],
    postedBy:{
        type:ObjectId,
        ref:"User"
    }
},

)

const Post = mongoose.model("post",PostSchema)
module.exports = Post