require("dotenv").config();

const sendEmail =
require(
  "./src/services/emailService"
);

async function test() {

  try {

    await sendEmail(

      "YOUR_EMAIL@gmail.com",

      "Healthcare Reminder Test",

      "<h1>Email Agent Working</h1>"

    );

    console.log(
      "EMAIL SENT"
    );

  }

  catch(error) {

    console.log(error);

  }

}

test();