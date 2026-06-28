const healthcareGraph =
  require("../graph/healthcareGraph");

const User =
  require("../models/User");

const Conversation =
require("../models/Conversation");

async function saveMessage(

    patientId,

    sender,

    text

) {

    // Don't save empty or invalid messages
    if (!patientId || !sender || !text || text.trim() === "") {
        return;
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

}

const bookingChat =
async (req, res) => {

  try {

    console.log("REQUEST BODY:");
    console.log(req.body);

    const {

      message: rawMessage,

      state = {},

      patientId

    } = req.body;

    const message =
      typeof rawMessage === "string"
        ? rawMessage.trim()
        : "";

    if (!message) {

      return res.status(400).json({

        message:
          "Message is required."

      });

    }

    const patient =
      await User.findById(
        patientId
      );

    if (!patient) {

      return res.status(404).json({

        message:
          "Patient not found"

      });

    }
    await saveMessage(

    patientId,

    "user",

    message

);

    console.log("PATIENT:");
    console.log(patient);

    console.log("\n========================");
    console.log("STARTING LANGGRAPH");
    console.log("========================");

    const result =
      await healthcareGraph.invoke({

        message,

        patient,

        state

      });

     let aiMessage = result.reply;

if (!aiMessage) {

    switch (result.action) {

        case "SHOW_DOCTORS":
            aiMessage = "Available doctors";
            break;

        case "SHOW_RECOMMENDED_DOCTORS":
            aiMessage =
                `Recommended Specialization: ${result.specialization}`;
            break;

        case "SHOW_SLOTS":
            aiMessage = "Available slots";
            break;

        case "SHOW_APPOINTMENTS":
            aiMessage = "Select an appointment";
            break;

        case "SHOW_CANCEL_APPOINTMENTS":
            aiMessage = "Select an appointment to cancel";
            break;

        case "SHOW_RESCHEDULE_SLOTS":
            aiMessage = "Select a new slot";
            break;

        default:
            aiMessage = result.action;
    }

}

await saveMessage(
    patientId,
    "ai",
    aiMessage
);

    console.log("========================");
    console.log("LANGGRAPH FINISHED");
    console.log("========================");

    console.log("GRAPH RESULT:");
    console.dir(result, {
      depth: null
    });

return res.json({

    action: result.action,

    reply: result.reply,

    state: result.state || {},

    specialization:
        result.specialization || "",

    doctors:
        result.doctors || [],

    slots:
        result.slots || [],

    appointments:
        result.appointments || [],

    specializations:
        result.specializations || [],

    appointment:
        result.appointment || null

});

  }

  catch (error) {

    console.log("AGENT ERROR:");

    console.log(error);

    return res.status(500).json({

      message:
        error.message

    });

  }

};

module.exports = {

  bookingChat

};