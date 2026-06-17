const Queue =
  require("../models/Queue");

const Appointment =
  require(
    "../models/Appointment"
  );

async function queueAgent(
  message,
  state,
  patient
) {

  console.log(
    "QUEUE AGENT CALLED"
  );

  console.log(
    "PATIENT ID:",
    patient._id
  );

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

  appointments.length > 1

  &&

  !(

    state?.flow === "queue"

    &&

    state?.step ===
      "SELECT_APPOINTMENT"

  )

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

  const queue =
    await Queue.findOne({
      patientId:
        patient._id
    });

    const doctorQueue =
  await Queue.find({

    doctorName:
      queue.doctorName,

    status: "WAITING"

  })
  .sort({
    createdAt: 1
  });


const actualPosition =
  doctorQueue.findIndex(

    q =>
      q.patientId.toString() ===
      patient._id.toString()

  ) + 1;
  console.log(
    "QUEUE FOUND:",
    queue
  );

  if (!queue) {

    return {

      action:
        "NO_QUEUE",

      reply:
        "You are not currently in any queue."

    };

  }

  if (

  state.flow === "queue"

  &&

  state.step === "SELECT_APPOINTMENT"

) {

  const appointment =
    await Appointment.findById(
      message
    );

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
        "QUEUE_STATUS",

      reply:
        "No active queue found for this appointment."

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

  return {

    action:
      "QUEUE_STATUS",

    reply:
      `You are #${position} in the queue for ${appointment.doctorName}.`

  };

}

  return {

    action:
      "QUEUE_STATUS",

    reply:
  `You are #${actualPosition} in the queue.`
  };

}

module.exports =
  queueAgent;