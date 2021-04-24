const dotenv=require("dotenv");
dotenv.config();

const mailchimpClient = require("@mailchimp/mailchimp_transactional")(process.env.MAILCHIMP_ACCESS_KEY);

const sendMail = async (to,from,name,subject,body,sender_id,customer_id) => {

  const message={
      html: body,
      subject: subject,
      from_email: from,
      to: [
        {
          email: to,
          type: "to"
        }
      ],
      from_name: name
  }

  const response = await mailchimpClient.messages.send({message});
  console.log(response);
};

module.exports = sendMail;