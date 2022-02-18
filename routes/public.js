const router=require("express").Router();
const userModel=require('../db/models/userModel');
const photoModel=require('../db/models/postModel');
const auth=require('../middleware/cheakAuth')


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

router.get('/getProfile/:id',async(req,res)=>{
    try{
        const id=req.params.id;
        const profile= await userModel.findById(id);
        res.send({msg:"success",profile:profile});
    }catch(err){
        res.send({msg:"something went wrong"});
    }
})

router.get('/getPosts/:id',async(req,res)=>{
    try{
        const posts=await photoModel.find({userid:req.params.id});
        res.send({msg:"success",data:posts.reverse()});
    }catch(err){
        res.send({msg:"something went wrong"});
    }
})



module.exports =router;