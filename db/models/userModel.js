const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    username:String,
    email:String,
    picture:String,
    password:String,
    saveposts:[{type:String}]
})

module.exports =  mongoose.model('User',userSchema);