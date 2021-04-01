require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")


const app = express()
app.use(cors())
app.use(express.json())

//connecting database
mongoose.connect(`${process.env.MONGOURI}`,{
    useCreateIndex:true,
    useFindAndModify:false,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(
    ()=>{
        console.log("connected to database");
    }
)
.catch((e)=>{
    console.log(e)
})

app.use(require('./routes/auth'))
app.use(require('./routes/posts'))
app.use(require('./routes/user'))

app.listen(7088,()=>{
    console.log(`Listening to port 7088`);
})