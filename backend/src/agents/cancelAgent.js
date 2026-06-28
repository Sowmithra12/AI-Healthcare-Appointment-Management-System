const askLLM =
  require("../services/ollamaService");

const getPatientAppointmentsTool =
  require(
    "../tools/getPatientAppointmentsTool"
  );

const Appointment =
  require("../models/Appointment");

const Queue =
  require("../models/Queue");

const mongoose =
  require("mongoose");

async function cancelAgent(
  message,
  state,
  patient
) {

  try {

    console.log(
      "CANCEL AGENT CALLED"
    );

    console.log(
      "MESSAGE:",
      message
    );

    console.log(
      "STATE:",
      state
    );
if (
  state.flow === "reschedule" &&
  state.step === "ASK_ACTION"
) {

  console.log(
    "REDIRECTED FROM RESCHEDULE"
  );

  const appointments =
    await getPatientAppointmentsTool(
      patient._id
    );

  console.log(
    "APPOINTMENTS FOUND:",
    appointments.length
  );

  return {

    action:
      "SHOW_CANCEL_APPOINTMENTS",

    appointments,

    reply:
      "Please select the appointment you want to cancel.",

    state: {

      flow:
        "cancel",

      step:
        "SELECT_APPOINTMENT"

    }

  };

}
    // =====================
    // STEP 1
    // UNDERSTAND USER INTENT
    // =====================

    if (!state.step) {

      const prompt = `

You are an expert Healthcare Appointment Agent.

Patient Message:

"${message}"

Determine whether the patient wants to cancel an appointment.

Return ONLY valid JSON.

Example:

{
  "intent":"CANCEL_APPOINTMENT"
}

or

{
  "intent":"UNKNOWN"
}

`;

      const response =
        await askLLM(prompt);

      const cleaned =
        response
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();

      const result =
        JSON.parse(cleaned);

      if (
        result.intent !==
        "CANCEL_APPOINTMENT"
      ) {

        return {

          action:
            "UNKNOWN",

          reply:
            "I could not understand your cancellation request.",

          state: {}

        };

      }

      const appointments =
        await getPatientAppointmentsTool(
          patient._id
        );

      return {

        action:
          "SHOW_CANCEL_APPOINTMENTS",

        appointments,

        reply:
          "Please select the appointment you want to cancel.",

        state: {

          flow:
            "cancel",

          step:
            "SELECT_APPOINTMENT"

        }

      };

    }

    // =====================
    // STEP 2
    // USER SELECTED APPOINTMENT
    // =====================

    if (
      state.step ===
      "SELECT_APPOINTMENT"
    ) {
      console.log(
  "SELECT_APPOINTMENT STEP HIT"
);

console.log(
  "APPOINTMENT ID RECEIVED:",
  message
);

      if (
        !mongoose.Types.ObjectId.isValid(
          message
        )
      ) {

        console.log(
  "FETCHING APPOINTMENTS FOR:",
  patient._id
);

const appointments =
  await getPatientAppointmentsTool(
    patient._id
  );

console.log(
  "APPOINTMENTS FOUND:",
  appointments
);

return {

  action:
    "SHOW_CANCEL_APPOINTMENTS",

  appointments,

  reply:
    "Please select the appointment you want to cancel.",

  state: {

    flow:
      "cancel",

    step:
      "SELECT_APPOINTMENT"

  }

};

      }

      return {

        action:
          "CONFIRM_CANCEL",

        reply:
          "Are you sure you want to cancel this appointment?",

        state: {

          flow:
            "cancel",

          step:
            "CONFIRM",

          appointmentId:
            message

        }

      };

    }

    // =====================
    // STEP 3
    // USER CONFIRMS
    // =====================

    if (
      state.step ===
      "CONFIRM"
    ) {

      if (
        message.toUpperCase() ===
        "NO"
      ) {

        return {

          action:
            "CANCEL_ABORTED",

          reply:
            "Cancellation aborted.",

          state: {}

        };

      }

      if (
        message.toUpperCase() ===
        "YES"
      ) {

        console.log(
  "YES CONFIRMATION RECEIVED"
);

console.log(
  "CANCELLING APPOINTMENT:",
  state.appointmentId
);
        const appointment =
          await Appointment.findByIdAndUpdate(

            state.appointmentId,

            {
              status:
                "CANCELLED"
            },

            {
              new: true
            }

          );

        if (!appointment) {

          return {

            action:
              "ERROR",

            reply:
              "Appointment not found.",

            state: {}

          };

        }

        await Queue.findOneAndDelete({

          patientId:
            appointment.patientId,

          doctorName:
            appointment.doctorName

        });

        return {

          action:
            "CANCELLED",

          reply:
            "Appointment cancelled successfully.",

          state: {}

        };

      }

      return {

        action:
          "CONFIRM_CANCEL",

        reply:
          "Please choose YES or NO.",

        state

      };

    }

    return {

      action:
        "UNKNOWN",

      reply:
        "Unable to process request.",

      state

    };

  }

  catch (error) {

    console.log(
      "CANCEL AGENT ERROR:"
    );

    console.log(error);

    return {

      action:
        "ERROR",

      reply:
        "Something went wrong while cancelling the appointment.",

      state

    };

  }

}

module.exports =
  cancelAgent;  