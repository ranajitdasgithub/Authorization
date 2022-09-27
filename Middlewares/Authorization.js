
//This Authoriztion middleware

const {userModel}=require("../Models/user.model")

const authorizationMid=(Roles)=>{
    //below is another function(Closures is use here for accept the roles variable from index.js)
    return async (req,res,next)=>{
        const {email}=req.body //this email is for authorization check
        const user=await userModel.findOne({email})
        if(Roles.includes(user.role)){
            next()
        }
        else{
            res.send("You are not authorised to perfrom this thing")
        }
    }
}


module.exports =  authorizationMid

//let arr=[1,3,5,"hi"]
//arr.includes(5)--->true
//arr.includes(2)--->false
//arr.includes(hi)--->true