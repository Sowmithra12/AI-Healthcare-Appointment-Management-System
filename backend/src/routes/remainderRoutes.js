const express = require("express");
const router = express.Router();

const sendEmail =
  require("../services/emailService");
console.log(
  "REMINDER ROUTES LOADED"
);
router.get("/test", async (req, res) => {

  try {

    const response =
      await sendEmail(
        "23b149@psgitech.ac.in",
        "Reminder Test",
        "<h2>Hello</h2>"
      );

    console.log(response);

    res.send("Test Email Sent");

  } catch(error) {

    console.log(error);

    res.send(error.message);

  }

});

module.exports = router;