const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());


const PORT = process.env.PORT ;
const uri = process.env.DATABASE_URL ;

app.get('/',async (req,res)=>{
    const client = await MongoClient.connect(uri);
    const data = await client.db('users').collection('users').find({}).toArray();
    res.status(200);
    res.send(data);
})

// login post
app.post('/login',async (req,res)=>{
    const body = await req.body;
    const client = await MongoClient.connect(uri);
    const data = await client.db('users').collection('register').find({"email":body.email}).toArray();
    if(data[0]){
        if(data[0].password == body.password){
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

// register post
app.post('/register',async (req,res)=>{
    const body = await req.body;
    const client = await MongoClient.connect(uri);
    const registeredEmail = await client.db('users').collection('register').find({"email":body.email}).toArray();
    console.log(registeredEmail)
    if(registeredEmail[0] ){
        res.sendStatus(401);
    }else{
        await client.db('users').collection('register').insertOne({
            "firstname":body.firstname,
            "lastname":body.lastname,
            "username":body.username,
            "email":body.email,
            "password":body.password
        });
        console.log('new email')
        res.sendStatus(200).end();
   }

})

app.listen(PORT,()=>{
    console.log(`server started at : http://localhost:${PORT}`);
    
})