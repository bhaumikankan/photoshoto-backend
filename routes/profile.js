const router=require("express").Router();
const userModel=require('../db/models/userModel');
const photoModel=require('../db/models/postModel');
const auth=require('../middleware/cheakAuth')

router.get('/getProfilePic',auth,async(req,res)=>{
    try{
        const id=req.user.id;
        const profilePic= await userModel.findById(id,{picture:1});
        res.send({msg:"success",profilePic:profilePic});
    }catch(err){
        res.send({msg:"something went wrong"});
    }
})

router.post('/createPost',auth,async(req,res)=>{
    try{
        const {username,userid,caption,imageuri}=req.body;
        const newPhoto=new photoModel({username:username,userid:userid,caption:caption,imageuri:imageuri});
        await newPhoto.save();
        res.send({msg:"success"})
    }catch(err){
        res.send({msg:"something went wrong"});
    }
})

router.get('/findPost',auth,async(req,res)=>{
    try{
        const posts=await photoModel.find({userid:req.user.id});
        res.send({msg:"success",data:posts});
    }catch(err){
        res.send({msg:"something went wrong"});
    }
})

router.get('/findAllPost',async(req,res)=>{
    try{
        if(req.query.caption)
        {
        const posts=await photoModel.find({"caption" : {$regex : req.query.caption}})
        return res.send({msg:"success",data:posts});
        }
        const posts=await photoModel.find({});
        return res.send({msg:"success",data:posts});
    }catch(err){
        res.send({msg:"something went wrong"});
    }
})
router.get('/singelPhoto/:id',async(req,res)=>{
    try{
        const photo=await photoModel.findById(req.params.id);
        res.send({msg:"success",data:photo});
    }catch(err){
        res.send({msg:"something went wrong"});
    }
})

router.delete('/deletePost/:id',auth,async(req,res)=>{
    try{
        await photoModel.findByIdAndDelete(req.params.id);
        return res.send({msg:"success"});
    }catch(err){
        res.send({msg:"something went wrong"});
    }
})




module.exports =router;