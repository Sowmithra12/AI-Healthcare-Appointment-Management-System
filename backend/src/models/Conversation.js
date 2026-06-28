const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({

    sender: {
        type: String,
        enum: ["user", "ai"],
        required: true
    },

    text: {
        type: String,
        required: true
    },

    timestamp: {
        type: Date,
        default: Date.now
    }

});

const ConversationSchema = new mongoose.Schema({

    patientId: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,

        unique: true

    },

    messages: [MessageSchema]

}, {

    timestamps: true

});

module.exports = mongoose.model(
    "Conversation",
    ConversationSchema
);