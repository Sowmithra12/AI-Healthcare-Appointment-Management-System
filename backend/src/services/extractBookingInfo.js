const askLLM =
  require("./ollamaService");

async function extractBookingInfo(
  message
) {

  const prompt = `
You are a healthcare assistant.

Extract information from:

${message}

Return ONLY JSON:

{
  "specialization":"",
  "doctorName":"",
  "appointmentSlot":""
}
`;

  const response =
    await askLLM(prompt);

  try {

    const cleaned =
      response
        .replace(
          /```json/g,
          ""
        )
        .replace(
          /```/g,
          ""
        )
        .trim();

    return JSON.parse(
      cleaned
    );

  } catch {

    return {};

  }

}

module.exports =
  extractBookingInfo;