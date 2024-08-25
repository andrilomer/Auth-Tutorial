const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const User=require("./models/userSchema")

const SECRET_KEY=process.env.JWT_SECRET
const PORT=process.env.PORT
//connect to express
const app = express();

//connect to mongodb
const dbURI =process.env.DB_URI;

mongoose.connect(dbURI)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Connected to mongoDB")
    });
  })
  .catch((error) => {
    console.log("Unable to connect to Server and/or MongoDB",error)
  })

//middleware
app.use(bodyParser.json())
app.use(cors())


//Routes
//User registration
//POST 
app.post("/register", async (req,res)=>{
  try{
    const {email,userName,password}=req.body
    // console.log(req.body)
    const hashedPassword=await bcrypt.hash(password,10)
    const newUser=new User({email,userName,password:hashedPassword})
    await newUser.save()
    res.status(201).json({message:"User created successfully"})
  }
  catch(error){
    res.status(500).json({error:"Error signing up"})
  }
})


//GET 
app.get("/register",async (req,res)=>{
  try{
    const users=await User.find({})
    res.status(201).json(users)
  }
  catch(error){
    res.status(500).json({error:"Unable to get Users"})
  }
})

//GET Login
app.post("/login",async (req,res)=>{
  try{
    const {userName,password}=req.body
    const user=await User.findOne({userName})
    if(!user){
      return res.status(401).json({error:"Invalid credentials"})
    }
    const isPasswordValid=await bcrypt.compare(password,user.password)
    if(!isPasswordValid){
      return res.status(401).json({error:"Invalid credentials"})
    }
    const token=jwt.sign({userId:user._id},SECRET_KEY,{expiresIn:'1hr'})
    res.json({message:"Login Successsfull"})
  }
  catch(error){
    res.status(500).json({error:"Error logging in"})
  }
})
