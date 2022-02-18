const express=require('express');
const bodyParser = require('body-parser');
const cors=require('cors');
const app = express();
const dbconnection=require('./db/connection');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors());

app.use('/auth',require('./routes/auth'));
app.use('/profile',require('./routes/profile'));
app.use('/public',require('./routes/public'));

app.listen(process.env.PORT||5000,()=>{
    console.log('server running on port 5000');
})