const express=require('express');
const app=express();
const verifyToken = require('../middleware/verify_token');

app.get('/',verifyToken,(req,res)=>{
    res.redirect(`http://localhost:6060/checkout/6`)
})

module.exports=app