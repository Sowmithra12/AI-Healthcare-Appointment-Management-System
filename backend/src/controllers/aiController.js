const {
  detectIntent,
} = require("../agents/IntentAgent");

const {
  getAvailableSlots,
} = require("../agents/AvailabilityAgent");

const processMessage = async (
  req,
  res
) => {
  try {

    const { message } = req.body;

    const intentResult =
      await detectIntent(message);

    const intent =
      intentResult.intent;

    // RESCHEDULE FLOW
    if (
      intent ===
      "RESCHEDULE_APPOINTMENT"
    ) {

      const availableSlots =
  await getAvailableSlots();

return res.json({
  success: true,
  intent,
  agent:
    "AvailabilityAgent",
  reply:
    "I found available slots for rescheduling.",
  availableSlots,
});
    }

    // CANCEL FLOW
    if (
      intent ===
      "CANCEL_APPOINTMENT"
    ) {
      return res.json({
        success: true,
        intent,
        reply:
          "Your appointment can be cancelled.",
      });
    }

    // BOOK FLOW
    if (
      intent ===
      "BOOK_APPOINTMENT"
    ) {
      return res.json({
        success: true,
        intent,
        reply:
          "Let's find an available doctor for you.",
      });
    }

    // QUEUE FLOW
    if (
      intent ===
      "QUEUE_QUERY"
    ) {
      return res.json({
        success: true,
        intent,
        reply:
          "Your estimated waiting time is 15 minutes.",
      });
    }

    // DEFAULT
    return res.json({
      success: true,
      intent:
        "GENERAL_QUERY",
      reply:
        "How can I help you with your healthcare appointment today?",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message:
        "AI Agent Failed",
      error:
        error.message,
    });
  }
};

module.exports = {
  processMessage,
};