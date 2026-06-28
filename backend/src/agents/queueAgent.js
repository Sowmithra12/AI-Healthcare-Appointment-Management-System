const askLLM =
  require("../services/ollamaService");

const Queue =
  require("../models/Queue");

const Appointment =
  require("../models/Appointment");

const mongoose =
  require("mongoose");

async function queueAgent(
  message,
  state,
  patient
) {

  try {

    console.log("QUEUE AGENT");

    // =====================
    // STEP 1
    // UNDERSTAND USER QUERY
    // =====================

    if (!state.step) {

      const prompt = `

You are a Healthcare Queue Agent.

Patient message:

"${message}"

Classify the intent.

Return ONLY JSON.

Example:

{
  "intent":"QUEUE_STATUS"
}

`;

      const llmResponse =
        await askLLM(prompt);

      const cleaned =
        llmResponse
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();

      const result =
        JSON.parse(cleaned);

      if (
        result.intent !==
        "QUEUE_STATUS"
      ) {

        return {

          action:
            "UNKNOWN",

          reply:
            "I could not understand your queue request."

        };

      }

      const appointments =
        await Appointment.find({

          patientId:
            patient._id,

          status: {
            $in: [
              "BOOKED",
              "RESCHEDULED"
            ]
          }

        });

      if (
        appointments.length === 0
      ) {

        return {

          action:
            "NO_QUEUE",

          reply:
            "You have no active appointments."

        };

      }

      // Multiple appointments

      if (
        appointments.length > 1
      ) {

        return {

          action:
            "SELECT_QUEUE_APPOINTMENT",

          appointments,

          state: {

            flow:
              "queue",

            step:
              "SELECT_APPOINTMENT"

          }

        };

      }

      // Single appointment

      return await getQueueStatus(

        appointments[0],

        patient,

        message

      );

    }

    // =====================
    // STEP 2
    // USER SELECTS APPOINTMENT
    // =====================

    if (

      state.flow === "queue"

      &&

      state.step ===
        "SELECT_APPOINTMENT"

    ) {

      if (

        !mongoose.Types.ObjectId.isValid(
          message
        )

      ) {

        return {

          action:
            "ERROR",

          reply:
            "Please select an appointment from the list."

        };

      }

      const appointment =
        await Appointment.findOne({

          _id:
            message,

          patientId:
            patient._id

        });

      if (!appointment) {

        return {

          action:
            "ERROR",

          reply:
            "Appointment not found."

        };

      }

      return await getQueueStatus(

        appointment,

        patient,

        "What is my queue status?"

      );

    }

    return {

      action:
        "UNKNOWN",

      reply:
        "Unable to process queue request."

    };

  }

  catch (error) {

    console.log(
      "QUEUE AGENT ERROR:"
    );

    console.log(error);

    return {

      action:
        "ERROR",

      reply:
        "Something went wrong while checking queue."

    };

  }

}

// =====================
// TOOL EXECUTION
// =====================

async function getQueueStatus(
  appointment,
  patient,
  originalMessage
) {

  const queue =
    await Queue.findOne({

      patientId:
        patient._id,

      doctorName:
        appointment.doctorName,

      status:
        "WAITING"

    });

  if (!queue) {

    return {

      action:
        "NO_QUEUE",

      reply:
        `No active queue found for ${appointment.doctorName}.`

    };

  }

  const doctorQueue =
    await Queue.find({

      doctorName:
        appointment.doctorName,

      status:
        "WAITING"

    }).sort({
      createdAt: 1
    });

  const position =
    doctorQueue.findIndex(

      q =>
        q.patientId.toString() ===
        patient._id.toString()

    ) + 1;

  const patientsAhead =
    position - 1;

  // =====================
  // LLM RESPONSE
  // =====================

  return {

  action: "QUEUE_STATUS",

  reply:
    `Queue Status

Doctor: ${appointment.doctorName}

Appointment Slot: ${appointment.appointmentSlot}

Current Position: ${position}

Patients Ahead: ${patientsAhead}`,

  queueInfo: {

    doctorName:
      appointment.doctorName,

    slot:
      appointment.appointmentSlot,

    position,

    patientsAhead

  },

  state: {}

};

}

module.exports =
  queueAgent;