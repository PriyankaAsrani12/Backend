const MailchimpSendMail = require("../APIs/Mailchimp");
const PostmarkSendMail = require("../APIs/Postmark");
const ZohoSendMail = require("../APIs/Zoho");
const MailgunSendMail=require("../APIs/Mailgun");
const SendgridSendMail=require("../APIs/Sendgrid");
const express=require("express");
const decodingJWT=require('../JWT/decoding');
const app=express();

params=undefined;
err_key=""

//Main email route
app.get("/email/:code",(req,res)=>{
    code=req.params.code
    params=decodingJWT(code);

    console.log(params)

    if(params!=null){
        //Email verification
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        validation=re.test(String(params.to).toLowerCase()) && re.test(String(params.from.address).toLowerCase());
        
        //Id verification
        id_check=false;
        if(typeof(params.sender_id)=="number" && typeof(params.customer_id)=="number"){
            id_check=true;
        }
    }

    if(params!=null && validation!=false && id_check!=false){
        if(params.method=="postmark"){
            res.redirect("/email/api/postmark"); 
        }
        else if(params.method=="mailchimp"){
            res.redirect("/email/api/mailchimp");
        }
        else if(params.method=="sendgrid"){
            res.redirect("/email/api/sendgrid");
        }
        else if(params.method=="mailgun"){
            res.redirect("/email/api/mailgun");
        }
        else if(params.method=="zoho" || params.method=="default"){
            res.redirect("/email/api/zoho"); 
        }
        else{
            res.send("Method is wrong!")
        }
    }
    else{
        res.send("Check your details")
    }
});

//Zoho route
app.get("/email/api/zoho",(req,res)=>{
    if(params==undefined || params.to==null || params.from==null){
        res.send("Go to email page")
        res.end();
    }else{
        ZohoSendMail(params.to,params.from.address,params.sender_name,params.subject,params.htmlbody,params.sender_id,params.customer_id);
        var myresult=localStorage.getItem('result');
        if(myresult!="error"){
            res.send(params);
        }else{
            res.send("Error")
        }
        localStorage.clear();
        params={}
    }
});

//Sendgrid route
app.get("/email/api/sendgrid",(req,res)=>{
    if(params==undefined || params.to==null || params.from==null){
        res.send("Go to email page")
        res.end();
    }else{
        SendgridSendMail(params.to,params.from,params.sender_name,params.subject,params.body,params.sender_id,params.customer_id)
        res.send(params)
    }  
});

//Postmark route
app.get("/email/api/postmark",(req,res)=>{
    if(params==undefined || params.to==null || params.from==null){
        res.send("Go to email page")
        res.end();
    }else{
        PostmarkSendMail(params.to,params.from,params.sender_name,params.subject,params.body,params.sender_id,params.customer_id);
        var myresult=localStorage.getItem('result');
        if(myresult!="error"){
            res.send(params);
        }else{
            res.send("Error")
        }
        localStorage.clear();
        params={}
    }  
});

//Mailchimp route
app.get("/email/api/mailchimp",(req,res)=>{
    if(params==undefined || params.to==null || params.from==null){
        res.send("Go to email page")
        res.end();
    }else{
        MailchimpSendMail(params.to,params.from,params.sender_name,params.subject,params.body,params.sender_id,params.customer_id);
        var myresult=localStorage.getItem('result');
        if(myresult!="error"){
            res.send(params);
        }else{
            res.send("Error")
        }
        localStorage.clear();
        params={}
    }
});

//Mailgun route
app.get("/email/api/mailgun",(req,res)=>{
    if(params==undefined || params.to==null || params.from==null){
        res.send("Go to email page")
        res.end();
    }else{
        MailgunSendMail(params.to,params.from,params.sender_name,params.subject,params.body,params.sender_id,params.customer_id);
        var myresult=localStorage.getItem('result');
        if(myresult!="error"){
            res.send(params);
        }else{
            res.send("Error")
        }
        localStorage.clear();
        params={}
    }
});

module.exports=app;