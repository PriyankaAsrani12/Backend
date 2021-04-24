const http=require("https");
const dotenv=require("dotenv");
dotenv.config();

require('../db/sql');
const Email_table=require('../models/emails');

const sendMail=(to,from,name,subject,body,sender_id,customer_id)=>{

    var options = {
        "method": "POST",
        "hostname": "api.transmail.com",
        "port": null,
        "path": "/v1.1/email",
        "headers": {
            "accept": "application/json",
            "body-type": "application/json",
            "authorization": process.env.ZOHO_ACCESS_KEY,
        }
    };

    var req = http.request(options, function (res) {
        var chunks = [];

        const errHandler=async(err)=>{
            const user=await Email_table.create({
                customer_id:customer_id,
                send_email_to:to,
                send_email_subject:subject,
                send_email_body:body,
                send_email_service_name:"zoho",
                send_email_confimation:0,
                send_email_error:error.message,
                createdBy:sender_id})
            };


        req.on('error', async(error) => {
            const user=await Email_table.create({
                customer_id:customer_id,
                send_email_to:to,
                send_email_subject:subject,
                send_email_body:body,
                send_email_service_name:"zoho",
                send_email_confimation:0,
                send_email_error:error.message,
                createdBy:sender_id})
        });

        res.on("data", async(chunk)=>{
            chunks.push(chunk);
        });

        res.on("end", async ()=>{
            var buf = Buffer.concat(chunks);
            var stringobj=buf.toString();
            var content=JSON.parse(stringobj)
            
            if(content.data){
                const user=await Email_table.create({
                    customer_id:customer_id,
                    send_email_to:to,
                    send_email_subject:subject,
                    send_email_body:body,
                    send_email_service_name:"zoho",
                    send_email_confimation:1,
                    send_email_error:"No error",
                    createdBy:sender_id})
            }else{
                const user=await Email_table.create({
                    customer_id:customer_id,
                    send_email_to:to,
                    send_email_subject:subject,
                    send_email_body:body,
                    send_email_service_name:"zoho",
                    send_email_confimation:0,
                    send_email_error:content.error.message,
                    createdBy:sender_id})
            }
        });
    });

    req.write(JSON.stringify({ 
        bounce_address: 'email@bounce.oyesters.in',
        from: {address: from},
        to: [ { email_address: { 
                    address: to,
                    name: name 
                } } ],
        subject: subject,
        htmlbody: body
    }));


    
    req.end();
}

module.exports=sendMail;
            