const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcryptjs');
// const validate = require('./validate.js')


const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());



const PORT = process.env.PORT ;
const uri = process.env.DATABASE_URL ;


// app.get('/',validate,async (req,res)=>{
app.get('/',async (req,res)=>{
    const client = await MongoClient.connect(uri);
    const data = await client.db('users').collection('register').find({}).toArray();
    
    res.status(200);
    res.send(data);
    
})

// login post
app.post('/login',async (req,res)=>{
    const body = await req.body;
    const client = await MongoClient.connect(uri);
    const data = await client.db('users').collection('register').find({"email":body.email}).toArray();

    
    if(data[0]){
        const validPassword = await bcrypt.compare(body.password,data[0].password )
        if(validPassword){
            // const token = await jwt.sign({_id:data[0]._id},process.env.SECRET_KEY);
            // const options={
            //     expire:new Date(Date.now() * 3 * 24 * 60 * 60 * 1000),
            //     httpOnly:true
            // };
            res.cookie("cookie-name1","cookie value",{httpOnly:true, maxAge:12000});
            res.sendStatus(200);
            
        }else{
            res.sendStatus(401);
            console.log('wrong password')
        }
    }else{
        res.sendStatus(401);
        console.log("email dosn't exist")
    }
})

app.get('/temp',(req,res)=>{
    res.send('hii')
})

// register post
app.post('/register',async (req,res)=>{
    const salt  = await bcrypt.genSalt(10);
    const body = await req.body;
    const hashPassword = await bcrypt.hash(body.password,salt);

    const client = await MongoClient.connect(uri);
    const registeredEmail = await client.db('users').collection('register').find({"email":body.email}).toArray();
    if(registeredEmail[0] ){
        res.sendStatus(401);
    }else{
        await client.db('users').collection('register').insertOne({
            "firstname":body.firstname,
            "lastname":body.lastname,
            "username":body.username,
            "email":body.email,
            "password":hashPassword
        });
        res.sendStatus(200).end();
   }

})

app.listen(PORT,()=>{
    console.log(`server started at : http://localhost:${PORT}`);
    
})