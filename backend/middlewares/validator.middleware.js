const jwt =require('jsonwebtoken')
require('dotenv').config()

const validator =(req,res,next)=>{
    const token =req.headers.authorization
    // console.log(token)
    if(token){
        const decoded=jwt.verify(token,process.env.secret)
        
        if(decoded){
            // console.log(decoded)
            const userId=decoded.userId;
            req.body.userId=userId;
            next()
        }else{
            res.status(401).send({"msg":"please login first"})
        }
    }else{
        res.status(401).send("please login first")
    }
}


module.exports={validator}