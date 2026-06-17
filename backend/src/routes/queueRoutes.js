const express =
  require("express");

const router =
  express.Router();

const {
  getQueueStatus,
} = require(
  "../controllers/queueController"
);

router.get(
  "/:doctorName",
  getQueueStatus
);

module.exports =
  router;