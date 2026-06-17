const express =
  require("express");

const router =
  express.Router();

const {
  bookingChat,
} = require(
  "../controllers/agentController"
);

router.post(
  "/booking",
  bookingChat
);

module.exports =
  router;