const mongoose=require("mongoose")

const userSchema= new mongoose.Schema({
    email:String,
    password:String,
    name:String,
    role:{ type:String,enum:["customer","admin"],default:"customer"}
})

const userModel=mongoose.model("users",userSchema)

module.exports={
    userModel
}