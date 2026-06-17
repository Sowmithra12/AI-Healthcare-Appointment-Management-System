const {
  GoogleGenerativeAI,
} = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const detectIntent = async (message) => {

  try {

    const model =
      genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
      });

    const prompt = `
You are an AI Healthcare Appointment Intent Classifier.

Classify the user's message into exactly ONE of these intents:

BOOK_APPOINTMENT
CANCEL_APPOINTMENT
RESCHEDULE_APPOINTMENT
QUEUE_QUERY
APPOINTMENT_QUERY
GENERAL_QUERY

Rules:

BOOK_APPOINTMENT:
- Wants a new appointment
- Wants to see a doctor
- Wants consultation

CANCEL_APPOINTMENT:
- Wants to cancel appointment

RESCHEDULE_APPOINTMENT:
- Wants another slot
- Busy tomorrow
- Can't come
- Move appointment
- Change appointment date/time

QUEUE_QUERY:
- Queue position
- Waiting time
- Am I next

APPOINTMENT_QUERY:
- When is my appointment
- Appointment details
- Doctor details
- Appointment status

GENERAL_QUERY:
- Anything else

Return ONLY JSON.

Example:
{"intent":"RESCHEDULE_APPOINTMENT"}

User Message:
"${message}"
`;

    const result =
      await model.generateContent({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          responseMimeType:
            "application/json",
        },
      });

    // Log raw result for debugging
    console.log("Gemini raw result:", result);

    // Safely extract text from various possible response shapes
    let response = "";
    try {
      if (
        result &&
        result.response &&
        typeof result.response.text === "function"
      ) {
        response = result.response.text();
      } else if (
        result &&
        result.response &&
        typeof result.response === "string"
      ) {
        response = result.response;
      } else if (result && result.outputText) {
        response = result.outputText;
      } else {
        response = JSON.stringify(result);
      }
    } catch (e) {
      console.error("Error extracting response text:", e);
      response = JSON.stringify(result);
    }

    response = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    console.log("Gemini Intent Response:", response);

    return JSON.parse(response);

  } catch (error) {

    console.log(
      "Gemini Failed. Using fallback..."
    );

    const msg =
      message.toLowerCase();

    // RESCHEDULE
    if (
      msg.includes("busy") ||
      msg.includes("reschedule") ||
      msg.includes("another slot") ||
      msg.includes("different slot") ||
      msg.includes("move appointment") ||
      msg.includes("change appointment") ||
      msg.includes("can't come") ||
      msg.includes("cannot come")
    ) {
      return {
        intent:
          "RESCHEDULE_APPOINTMENT",
      };
    }

    // CANCEL
    if (
      msg.includes("cancel") ||
      msg.includes("remove appointment")
    ) {
      return {
        intent:
          "CANCEL_APPOINTMENT",
      };
    }

    // BOOK
    if (
      msg.includes("book") ||
      msg.includes("schedule") ||
      msg.includes("doctor")
    ) {
      return {
        intent:
          "BOOK_APPOINTMENT",
      };
    }

    // QUEUE
    if (
      msg.includes("queue") ||
      msg.includes("waiting time") ||
      msg.includes("am i next")
    ) {
      return {
        intent:
          "QUEUE_QUERY",
      };
    }

    // APPOINTMENT QUERY
    if (
      msg.includes("appointment") ||
      msg.includes("when is my appointment") ||
      msg.includes("appointment details")
    ) {
      return {
        intent:
          "APPOINTMENT_QUERY",
      };
    }

    return {
      intent:
        "GENERAL_QUERY",
    };
  }
};

module.exports = {
  detectIntent,
};