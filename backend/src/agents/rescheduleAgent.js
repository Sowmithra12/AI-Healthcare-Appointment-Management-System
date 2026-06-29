const askLLM =
  require("../services/ollamaService");

const Appointment =
  require("../models/Appointment");

const getSlotsTool =
  require("../tools/getSlotsTool");

const getPatientAppointmentsTool =
  require(
    "../tools/getPatientAppointmentsTool"
  );

const Queue =
  require("../models/Queue");

async function rescheduleAgent(
  message,
  state,
  patient
) {

  try {

    console.log(
      "RESCHEDULE STATE:",
      state
    );

    console.log(
      "MESSAGE:",
      message
    );

    // =====================
    // STEP 1
    // LLM UNDERSTANDS INTENT
    // =====================

    if (!state.step) {

      const prompt = `

You are an expert Healthcare Appointment Agent.

Patient Message:

"${message}"

Determine whether the patient wants:

1. RESCHEDULE
2. CANCEL

Return ONLY valid JSON.

Example:

{
  "intent":"RESCHEDULE"
}

or

{
  "intent":"CANCEL"
}

`;

      const response =
        await askLLM(prompt);

      console.log(
        "LLM RESPONSE:",
        response
      );

      const cleaned =
        response
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();

      const result =
        JSON.parse(cleaned);

      return {

        action:
          "ASK_RESCHEDULE_OR_CANCEL",

        reply:
          "Would you like to Reschedule or Cancel your appointment?",

        actions: [
          "RESCHEDULE",
          "CANCEL"
        ],

        state: {

          flow:
            "reschedule",

          step:
            "ASK_ACTION",

          detectedIntent:
            result.intent

        }

      };

    }

// =====================
// USER CHOSE CANCEL
// =====================

if (
  state.step === "ASK_ACTION" &&
  message.toUpperCase() === "CANCEL"
) {

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
    // USER CHOSE RESCHEDULE
    // =====================

    if (
      state.step ===
        "ASK_ACTION" &&
      message.toUpperCase() ===
        "RESCHEDULE"
    ) {

      const appointments =
        await getPatientAppointmentsTool(
          patient._id
        );

      return {

        action:
          "SHOW_APPOINTMENTS",

        appointments,

        state: {

          flow:
            "reschedule",

          step:
            "SELECT_APPOINTMENT"

        }

      };

    }
// =====================
// CANCEL APPOINTMENT SELECTED
// =====================

if (

  state.flow === "cancel"

  &&

  state.step === "SELECT_APPOINTMENT"

) {

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
// CANCEL CONFIRMATION
// =====================

if (

  state.flow === "cancel"

  &&

  state.step === "CONFIRM"

) {

  if (

    message.toUpperCase() === "NO"

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

    message.toUpperCase() === "YES"

  ) {

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

}

 // =====================
// USER SELECTED APPOINTMENT
// =====================

const mongoose =
  require("mongoose");

if (

  state.flow === "reschedule"

  &&

  state.step === "SELECT_APPOINTMENT"

) {

  if (
    !mongoose.Types.ObjectId.isValid(
      message
    )
  ) {

    const appointments =
      await getPatientAppointmentsTool(
        patient._id
      );

    return {

      action:
        "SHOW_APPOINTMENTS",

      appointments,

      reply:
        "Please select an appointment from the list.",

      state

    };

  }

  const appointment =
    await Appointment.findById(
      message
    );

  if (!appointment) {

    return {

      action:
        "ERROR",

      reply:
        "Appointment not found."

    };

  }

  const slots =
    await getSlotsTool(
      appointment.doctorName
    );

  return {

action:
"SHOW_RESCHEDULE_SLOTS",

slots:
slots.map(
slot => slot.label
),

reply:
`Available slots for ${appointment.doctorName}`,

state:{

flow:"reschedule",

step:"SELECT_SLOT",

appointmentId:
appointment._id

}

};
}

    // =====================
    // USER SELECTED SLOT
    // =====================

    if (
      state.step ===
      "SELECT_SLOT"
    ) {

      const appointment =
        await Appointment.findById(
          state.appointmentId
        );

      if (!appointment) {

        return {

          action:
            "ERROR",

          reply:
            "Appointment not found."

        };

      }

      const slots =
  await getSlotsTool(
    appointment.doctorName
  );

const selectedSlot =
  slots.find(
    slot =>
      slot.label === message
  );

appointment.appointmentSlot =
  selectedSlot.label;

appointment.appointmentDate =
  selectedSlot.date;

appointment.status =
  "RESCHEDULED";

await appointment.save();

      return {

        action:
          "RESCHEDULED",

        reply:
          `Appointment rescheduled successfully to ${message}`,

        state: {}

      };

    }

    return {

      action:
        "UNKNOWN",

      reply:
        "Unable to process request."

    };

  }

  catch (error) {

    console.log(
      "RESCHEDULE AGENT ERROR:"
    );

    console.log(error);

    return {

      action:
        "ERROR",

      reply:
        "Something went wrong while rescheduling.",

      state

    };

  }

}

module.exports =
  rescheduleAgent;