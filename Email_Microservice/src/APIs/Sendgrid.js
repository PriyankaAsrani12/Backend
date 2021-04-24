const sgMail = require('@sendgrid/mail');
const local=require('node-localstorage')

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}
   
localStorage.setItem('myFirstKey', 'myFirstValue');
  

require('../db/sql');
const Email_table=require('../models/emails');

const dotenv=require("dotenv");
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_ACCESS_KEY)

const sendMail=(to,from,name,subject,body,sender_id,customer_id)=>{

    const msg = {
        to: to,
        from: {
            name:name,
            email:from
        },
        subject: subject,
        html: body
    }

    const errHandler=async(err)=>{
        console.error("ERROR!");
        const user=await Email_table.create({
            customer_id:customer_id,
            send_email_to:to,
            send_email_subject:subject,
            send_email_body:body,
            send_email_service_name:"sendgrid",
            send_email_confimation:0,
            send_email_error:err.message,
            createdBy:sender_id
        })
           
    localStorage.setItem('result', 'error');

    };

    sgMail
    .send(msg)
    .then(async () => {
        console.log('Email sent');
        const user=await Email_table.create({
            customer_id:customer_id,
            send_email_to:to,
            send_email_subject:subject,
            send_email_body:body,
            send_email_service_name:"sendgrid",
            send_email_confimation:1,
            send_email_error:"No error",
            createdBy:sender_id}).catch(errHandler);
               
localStorage.setItem('result', 'No error');
        
    })
    .catch(async(error) => {
        console.error("ERROR!");
        const user=await Email_table.create({
            customer_id:customer_id,
            send_email_to:to,
            send_email_subject:subject,
            send_email_body:body,
            send_email_service_name:"sendgrid",
            send_email_confimation:0,
            send_email_error:error.message,
            createdBy:sender_id}).catch(errHandler);
               
localStorage.setItem('result', 'error');

        })
}
module.exports = sendMail;