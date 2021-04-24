var postmark = require("postmark");
const dotenv=require("dotenv");
dotenv.config();

const sendMail=(to,from,name,subject,body,sender_id,customer_id)=>{
    var client = new postmark.Client(process.env.POSTMARK_ACCESS_KEY);

    client.sendEmail({
        "From": from,
        "To": to,
        "Subject": subject,
        "TextBody": body
    });
}

module.exports = sendMail;