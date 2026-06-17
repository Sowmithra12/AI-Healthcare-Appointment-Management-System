const express = require("express");

const {
  processMessage,
} = require("../controllers/aiController");

const router =
  express.Router();

router.post(
  "/chat",
  processMessage
);

module.exports = router;