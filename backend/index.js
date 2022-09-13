const express = require ('express')
const app = express()
const mongoose = require("mongoose")
const helmet = require("helmet")
const morgan = require("morgan")
const dotenv = require("dotenv")
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
dotenv.config()

mongoose.connect('mongodb://127.0.0.1:27017/SocialMedia',{
    useNewUrlParser:true,
   
}).then(()=>{
    console.log('db connected');
}).catch((e)=>{
    console.log('db not connected');
})    

app.use(express.json())
app.use(helmet())
app.use(morgan("common"))
app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)

app.listen(7070,()=>{
    console.log("backend server is running!");
})