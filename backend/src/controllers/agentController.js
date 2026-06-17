const bookingAgent =
  require(
    "../agents/bookingAgent"
  );

const User =
  require(
    "../models/User"
  );

const rescheduleAgent =
require(
  "../agents/rescheduleAgent"
);

const cancelAgent =
require(
  "../agents/cancelAgent"
);

const queueAgent =
require(
  "../agents/queueAgent"
);

const doctorRecommendationAgent =
require(
  "../agents/doctorRecommendationAgent"
);

const bookingChat =
  async (req, res) => {

    try {

      console.log(
        "REQUEST BODY:",
        req.body
      );

      const {
        message,
        state,
        patientId,
      } = req.body;

      const patient =
        await User.findById(
          patientId
        );

      if (!patient) {

        return res.status(404).json({
          message:
            "Patient not found",
        });

      }

      console.log(
        "PATIENT:",
        patient
      );

const lower =
  message.toLowerCase();

// CANCEL FLOW
if (

  lower.includes("cancel")

  ||

  state?.flow === "cancel"

) {

  const response =
    await cancelAgent(
      message,
      state,
      patient
    );

  return res.json(
    response
  );

}

// RESCHEDULE FLOW
if (

  state?.flow === "reschedule" ||

  lower.includes("busy") ||

  lower.includes("reschedule") ||

  lower.includes("can't come") ||

  lower.includes("cannot attend") ||

  lower.includes("cannot make it") ||

  lower.includes("can you reschedule") ||

  lower.includes("not available") ||

  lower.includes("cannot come")

) {

  const response =
    await rescheduleAgent(
      message,
      state,
      patient
    );
  if (
  response.action ===
  "REDIRECT_TO_CANCEL"
) {

  const cancelResponse =
    await cancelAgent(
      "cancel",
      {},
      patient
    );

  return res.json(
    cancelResponse
  );

}

  return res.json(
    response
  );

}

//QUEUE FLOW
if (

  state?.flow === "queue"

  ||

  lower.includes("queue")

  ||

  lower.includes("turn")

  ||

  lower.includes("position")

  ||

  lower.includes("waitlist")

  ||

  lower.includes("status")

) {

  console.log(
    "QUEUE ROUTE HIT"
  );

  const response =
    await queueAgent(
      message,
      state,
      patient
    );

  console.log(
    "QUEUE RESPONSE:",
    response
  );

  return res.json(
    response
  );

}

if (

  lower.includes("pain")

  ||

  lower.includes("headache")

  ||

  lower.includes("fever")

  ||

  lower.includes("rash")

  ||

  lower.includes("itching")

  ||

  lower.includes("chest")

  ||

  lower.includes("skin")

  ||

  lower.includes("dizzy")

  ||

  lower.includes("migraine")

  ||

  lower.includes("joint")

  ||

  lower.includes("knee")

  ||

  lower.includes("back pain")

) {

  const response =
    await doctorRecommendationAgent(
      message
    );

  return res.json(
    response
  );

}

// BOOKING FLOW
const response =
  await bookingAgent(
    message,
    state,
    patient
  );

return res.json(
  response
);
    } catch (error) {

      console.log(
        "AGENT ERROR:"
      );

      console.log(error);

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

module.exports = {
  bookingChat,
};