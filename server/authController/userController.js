const User = require('../models/user')
const mongoose = require("mongoose")
const Post = require('../models/post')

const userProfile = async (req,res)=>{
    
    try {

        const user = await User.findOne({_id:req.params.id})
        .select("-password")

        const post = Post.find({postedBy:req.params.id})
        .populate("postedBy","_id name")
        .exec((err,post)=>{
            if(err){
                return res.status(422).json({error:err})
            }else{
                return res.json({user,post})
            }
        })
    } catch (error) {
        res.status(402).json({error:"user not found"})
    }
    
}

const follow = (req,res) =>{
    User.findByIdAndUpdate(req.body.followId,{
        $push:{followers:req.user[0]._id}
    },{
        new:true
    },(err,result)=>{
        if(err){
            console.log("error 1");
            return res.status(422).json({error:err})
        }
        // res.json(result)
      User.findByIdAndUpdate(req.user[0]._id,{
          $push:{following:req.body.followId}
          
      },{new:true}).select("-password").then(result=>{
        res.status(201).json({result})
      }).catch(err=>{
          console.log("error 3");
          return res.status(422).json({error:err})
      })

    }
    )
}

const unfollow = (req,res) => {
    User.findByIdAndUpdate(req.body.unfollowId,{
        $pull:{followers:req.user[0]._id}
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        // res.json(result)
      User.findByIdAndUpdate(req.user[0]._id,{
          $pull:{following:req.body.unfollowId}
          
      },{new:true}).select("-password").then(result=>{
          res.json({result})
      }).catch(err=>{
          return res.status(422).json({error:err})
      })

    }
    )
}

module.exports = {userProfile,follow,unfollow}