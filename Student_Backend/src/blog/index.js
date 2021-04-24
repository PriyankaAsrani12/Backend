const express=require('express');
const app=express();
const verifyToken = require('../middleware/verify_token');

app.get('/',verifyToken,(req,res)=>{
    res.redirect(`http://localhost:3636/blog`)
})

<<<<<<< HEAD
module.exports=app
=======
module.exports=app;
>>>>>>> e504bb2d391e064a5999fcf1718d2fa72f324340
