 //This is Authentication middleware
 var jwt = require("jsonwebtoken");
 require("dotenv").config()

 const authenticationMid=(req,res,next)=>{
    if(!req.headers.authorization){
        res.send("Please login again")
    }
    //[Chaining] This "?" is used for insted of error its gives us undefined
    const token=req.headers?.authorization?.split(" ")[1]
    jwt.verify(token, process.env.SECRET_KEY,function(err,decoded){
        if(err){
            res.send("Please login")
        }
        else{
            req.body.email = decoded.email //this key email pass the decoded email to the authorization middleware
            next()
        }
    })
}

module.exports = authenticationMid