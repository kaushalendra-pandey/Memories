const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const {ObjectId} = mongoose.Schema.Types

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    pic:{
        type:String,
        default:"https://res.cloudinary.com/test-cloud-by-kaush/image/upload/v1617188333/default_avatar_nm0knq.jpg"
    },
    followers:[{type:ObjectId,ref:"User"}],
    following:[{type:ObjectId,ref:"User"}]
})

UserSchema.pre("save",async function (next){
    const hashed = await bcrypt.hash(this.password,10)
    this.password = hashed
    next()
})

const User = mongoose.model('User',UserSchema)


module.exports = User
