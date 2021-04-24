const express=require('express');
const app=express();
const verifyToken = require('../middleware/verify_token');

app.get('/',verifyToken,(req,res)=>{
    res.redirect(`http://localhost:3636/blog`)
})