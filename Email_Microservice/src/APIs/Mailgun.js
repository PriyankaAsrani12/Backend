require('../db/sql');
const Email_table=require('../models/emails');
const dotenv=require("dotenv");
dotenv.config();

var key = process.env.MAILGUN_ACCESS_KEY;
var DOMAIN = process.env.DOMAIN;

var mailgun = require('mailgun-js')({apiKey: key,domain: DOMAIN});

const sendMail=(to,from,name,subject,body,sender_id,customer_id)=>{
    const data = {
        from: from,
        to: to,
        subject: subject,
        text: body
    };

    mailgun.messages().send(data, async (error, res) => {
        if(error){
            console.error("ERROR!")
            const user=await Email_table.create({
                customer_id:customer_id,
                send_email_to:to,
                send_email_subject:subject,
                send_email_body:body,
                send_email_service_name:"mailgun",
                send_email_confimation:0,
                send_email_error:error.message,
                createdBy:sender_id})
        }
        else{
            const user=await Email_table.create({
                customer_id:customer_id,
                send_email_to:to,
                send_email_subject:subject,
                send_email_body:body,
                send_email_service_name:"mailgun",
                send_email_confimation:1,
                send_email_error:"No error",
                createdBy:sender_id})
        }
    });
}

module.exports = sendMail;