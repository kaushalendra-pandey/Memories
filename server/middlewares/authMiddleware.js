const jwt = require('jsonwebtoken')
const User = require("../models/user")


const loginMiddleware = (req,res,next) =>{
    const {authorization} = req.headers
    if(!authorization){
        return res.status(401).json({error:"You must be logged in"})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,`${process.env.JWT_SECRET}`,async (err,payload)=>{
        if(err){
            return res.status(401).json({error:"Not a valid user"})
        }else{
            const {id} = payload
            try {
                const userData = await User.find({_id:id})
                req.user = userData
                next()
                
            } catch (error) {
                res.status(501).json({error:"Something went wrong"})
                next()
            }
            
        }
        
    })
   

}

module.exports = {loginMiddleware}