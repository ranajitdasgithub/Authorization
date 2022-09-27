const express=require("express")
var jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const {connection}  = require("./Config/db")
const {userModel}=require("./Models/user.model")

const authenticationMid = require("./Middlewares/Authentication")
const authorizationMid = require("./Middlewares/Authorization")

const app=express()
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("This is homepage")
})
//Signup page here
app.post("/signup",async (req,res)=>{
    console.log(req.body)
    let {email,password,name,role}=req.body
    bcrypt.hash(password, 2).then(async function(hash){
        const user=new userModel({email,password:hash,name,role})
        await user.save()
        res.send("Signup successfully")
    })
    .catch(()=>{
        res.send("Something went wrong, try later")
    })
})
//login page here
app.post("/login",async (req,res)=>{
    let {email,password}=req.body
    let user=await userModel.findOne({email})
    let hash=user.password
    bcrypt.compare(password, hash, function(err, result) {
        if(result){
            var token = jwt.sign({ email:email }, process.env.SECRET_KEY,{
                expiresIn:"10h"
            });
            res.send({"msg":"Login successful","token":token})
        }else{
            res.send("Login failed, invalid credential")
        }
    });
})

//Product created
app.get("/products",authenticationMid,(req,res)=>{
    res.send("Here are the products") 
})

//access only seller
app.get("/products/info",authenticationMid,authorizationMid(["seller"]),(req,res)=>{
    res.send("Here are the products info....") 
})

//access only seller and admin
app.post("/products/create",authenticationMid, authorizationMid(["seller","admin"]),(req,res)=>{
     res.send("Products created successfully")
})


//access only by admin
app.delete("/products/:ProductId",authenticationMid,authorizationMid(["admin"]),(req,res)=>{
    let id=req.params.ProductId
    res.send("Products deletd successfully: "+id)
})


app.listen(7500,async ()=>{
    try{
        await connection
        console.log("Connected to db successfully")
    }
    catch(err){
        console.log(err)
    }
    console.log("Server started at 7500")
})