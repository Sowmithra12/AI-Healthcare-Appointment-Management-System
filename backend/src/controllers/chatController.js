const Conversation =
require("../models/Conversation");

// =====================================
// Get Conversation
// =====================================

const getConversation =
async (req, res) => {

    try {

        const { patientId } =
        req.params;

        let conversation =
        await Conversation.findOne({

            patientId

        });

        if (!conversation) {

            conversation =
            await Conversation.create({

                patientId,

                messages: []

            });

        }

       return res.json(conversation);

    }

    catch (error) {

        console.log(error);

        return res.status(500).json({

            message:
            error.message

        });

    }

};

// =====================================
// Save Message
// =====================================

const saveMessage =
async (req, res) => {

    try {

        const {

            patientId,

            sender,

            text

        } = req.body;

        if (!patientId || !sender || !text || text.trim() === "") {
            return res.status(400).json({
                message: "Invalid message payload"
            });
        }

        let conversation =
        await Conversation.findOne({

            patientId

        });

        if (!conversation) {

            conversation =
            await Conversation.create({

                patientId,

                messages: []

            });

        }

        conversation.messages.push({

            sender,

            text: text.trim()

        });

        await conversation.save();

        return res.json({

            success: true

        });

    }

    catch (error) {

        console.log(error);

        return res.status(500).json({

            message:
            error.message

        });

    }

};

// =====================================

module.exports = {

    getConversation,

    saveMessage

};