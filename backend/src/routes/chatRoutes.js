const express =
require("express");

const router =
express.Router();

const {

    getConversation,

    saveMessage

} = require(

    "../controllers/chatController"

);

// Get previous conversation

router.get(

    "/:patientId",

    getConversation

);

// Save one message

router.post(

    "/",

    saveMessage

);

module.exports =
router;