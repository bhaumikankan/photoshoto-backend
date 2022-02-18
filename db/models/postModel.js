const mongoose=require('mongoose');

const photoSchema=new mongoose.Schema({
    username:String,
    userid:String,
    caption:String,
    imageuri:String,
    likes:[{type:String}]
})

module.exports =  mongoose.model('Photo',photoSchema);