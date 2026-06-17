const nodemailer =
require("nodemailer");

const transporter =
nodemailer.createTransport({

  host:
    "smtp-relay.brevo.com",

  port:
    587,

  secure:
    false,

  auth: {

    user:
      process.env.BREVO_USER,

    pass:
      process.env.BREVO_PASSWORD

  }

});

async function sendEmail(

  to,
  subject,
  html

) {

  return transporter.sendMail({

    from:
  process.env.SENDER_EMAIL,

    to,

    subject,

    html

  });

}

module.exports =
  sendEmail;  