const Post = require("../models/post")

const createPost = async (req,res) => {
    const {title,body,photo} = req.body
    if(!title || !body || !photo){
        return res.status(402).json({error:"Please add title or image"})
    }
    const post = new Post({
        title:title,
        body:body,
        photo:photo,
        postedBy:req.user[0]
    })
    try {
        await post.save()
        res.status(200).json({message:"Post created successfully"})
        
    } catch (error) {
        res.status(402).json({error:error})
    }
   
}

const getPosts = async (req,res) => {
    try {
        
        // finding all posts and populating postedBy field with id and email
        const post = await Post.find().populate("postedBy","_id name email")
        res.json({posts:post})
        
    } catch (error) {
        res.send(error)
    }
    
}

const myPosts = async (req,res) => {
    try {

        const posts = await Post.find({postedBy:req.user[0].id}).populate("postedBy","name")
        res.json({posts})
        
    } catch (error) {
        res.json({error})
    }
}

const likePost = async (req,res)=>{
    try{
        const post = await Post.findByIdAndUpdate(req.body.postId,
            {$push:{likes:req.user[0]._id}},{
                new:true
            }).exec((err,result)=>{
            if(err){
                return res.status(402).json({error:err})
            }else{
                console.log("like here");
                return res.status(200).json({result})
            }
        })

    } catch (error) {
        console.log("error here");
        return res.status(402).json({error})
    }
}

const dislikePost = async (req,res)=>{
    try{
        const post = await Post.findByIdAndUpdate(req.body.postId,
            {$pull:{likes:req.user[0]._id}},{
                new:true
            }).exec((err,result)=>{
            if(err){
                return res.status(402).json({error:err})
            }else{
                return res.status(200).json({result})
            }
        })

    } catch (error) {
        return res.status(402).json({error})
    }
}

const comment = async (req,res) =>{

    try {
        const comm = {
            text:req.body.text,
            postedBy:req.user[0].id
        }
        const post = await Post.findByIdAndUpdate(req.body.postId,{
            $push:{comment:comm}
        },{
            new:true
        }).populate("comment.postedBy","_id name email")
        .exec((error,result)=>{
            if(error){
                res.status(402).json({error})
            }else{
                res.status(200).json({result})
            }
        })
        

    } catch (error) {
        console.log(error)
    }
    
}

const deletePost = async (req,res) => {

    Post.findOne({_id:req.params.postId})
    .populate("postedBy","_id")
    .exec((err,post)=>{
        if(err || !post){
            return res.status(422).json({error:err})
        }
        if(post.postedBy._id.toString() === req.user[0]._id.toString()){
              post.remove()
              .then(result=>{
                  res.json(result)
              }).catch(err=>{
                  console.log(err)
              })
        }
    })

    }

module.exports = {createPost,getPosts,myPosts,likePost,dislikePost,comment,deletePost}
