const userModel = require('../db/models/userModel');
const jwt= require('jsonwebtoken');

module.exports =async (req,res,next)=>{
    const token = req.headers['x-user-token'];
    try{
    if(!token){
        return res.status(401).send({msg:"unauthorized access "});
    } 
    var decoded = jwt.verify(token, 'secret');
    if(!decoded){
        return res.status(401).send({msg:"unauthorized access "});
    }else{
        const user=await userModel.findById(decoded.id);
    req.user=user;
    next();
    }
    
    } catch(err){
        return res.status(401).send({msg:"unauthorized access "});
    }

}