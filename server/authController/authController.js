const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")

const createToken = (id) => {
    let token = jwt.sign({id},`${process.env.JWT_SECRET}`,{
        expiresIn: 3*24*60*60
    })
    return token
}

const signUp = async (req,res)=>{
    const {name,email,password,pic} = req.body

    try {
        
        if(!name || !email || !password){
            return res.status(402).json({error:"Please fill the form correctly."})
        }else{
            const user = await User.findOne({email})
            if (user){
                return res.status(422).json({error:"User already exist"})
            } else{
                const newUser = await new User({name:name,email: email, password: password,pic:pic})
                
                //password is being hashed in user.js
    
                await newUser.save()
                res.status(200).json({message:"Sucesfully Created a new User"})
            
            }
        }

    } catch (error) {
        res.status(402).json({error:"Some problem occurred"})
    }

    

}

const signin = async (req,res) =>{
    const {email,password} = req.body;

    try {

        const user = await User.findOne({email})
        if(user){
            const isSame = await bcrypt.compare(password,user.password)
            if(isSame){
                const token = createToken(user._id)
                res.cookie("login_cookie",token,{maxAge:3*24*60*60*1000})
                
                return res.status(200).json({message:"Succesfully Logged In",token,user})
            }else{
                res.staus(402).json({error:"Invalid Email or Password"})
            }
        }else{
            res.status(402).json({error:"No such user exist!! Please Sign In"})
        }
       
        
    } catch (error) {
        res.status(400).json({error:"Invalid Credentials!! Try logging in again."})
    }    

}

module.exports = {signUp,signin}