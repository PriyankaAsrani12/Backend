const express=require('express');
const app=express();
const verifyToken = require('../middleware/verify_token');

app.get('/',verifyToken,(req,res)=>{
<<<<<<< HEAD
    res.redirect(`http://localhost:6060/checkout/6`)
})

module.exports=app
=======
    res.redirect(`http://localhost:6060/checkout`)
})

module.exports=app;
>>>>>>> e504bb2d391e064a5999fcf1718d2fa72f324340
