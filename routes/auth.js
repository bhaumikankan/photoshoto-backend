const router=require("express").Router();
const jwt=require('jsonwebtoken');
const userModel=require('../db/models/userModel');
const bcrypt = require('bcrypt');
const saltRounds=10;
const auth=require('../middleware/cheakAuth')

router.post('/register',async (req,res)=>{
    try{
    const {username,email,picture,password} = req.body;
    const user= await userModel.exists({email:email});
    if(user){
        res.send({msg: 'User already exists'});
    }else{
    const hash = bcrypt.hashSync(password, saltRounds);
    const newUser= new userModel({username:username,email:email,picture:picture,password:hash});
    const u= await newUser.save();

    const token = jwt.sign({
        id: u._id,
        username: u.username,
        email: u.email
    }, 'secret');

    res.send({msg:'user registration successful',token:token});
    }

    }catch(err){
        res.status(500).send({msg: 'server error'});
    }
    

})

router.post('/login',async (req,res)=>{
    try{
    const {email,password} = req.body;
    const user= await userModel.findOne({email:email});

    if(!user){
        res.send({msg: 'invalid credentials'});
    }
    else if(!bcrypt.compareSync(password, user.password)){

        res.send({msg: 'invalid credentials'});

    }else{

       const token = jwt.sign({
        id: user._id,
        username: user.username,
        email: user.email
    }, 'secret');

    res.send({msg:'user login successful',token:token}); 
    }
    
    

    }catch(err){
        res.status(500).send({msg: 'server error'});
    }
    

})



module.exports =router;
