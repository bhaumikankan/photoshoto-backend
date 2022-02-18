const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://hackaweb:hackaweb@cluster0.b33rm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
const conn=mongoose.connection;

conn.on('connected',()=>{
    console.log('db connected');
})

conn.on('error',()=>{
    console.log('db error');
})