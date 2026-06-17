const askLLM =
  require(
    "../services/ollamaService"
  );

const Doctor =
  require(
    "../models/User"
  );

async function doctorRecommendationAgent(
  message
) {

  const prompt = `

You are a medical triage assistant.

Available Specializations:

Cardiologist
Dermatologist
Neurologist
Orthopedic
Pediatrician

Patient Symptoms:

${message}

Return ONLY valid JSON.

{
  "specialization":"..."
}

`;

  const result =
    await askLLM(
      prompt
    );

  let specialization =
    null;

  try {

    const parsed =
      JSON.parse(
        result
      );

    specialization =
      parsed.specialization;

  }

  catch {

    return {

      action:
        "RECOMMENDATION_FAILED",

      reply:
        "Unable to determine specialization."

    };

  }

  console.log(
  "DOCTOR COLLECTION COUNT:",
  await Doctor.countDocuments()
);

console.log(
  "ALL DOCTORS:",
  await Doctor.find({})
);

  const doctors =
    await Doctor.find({

      specialization

    });

  console.log(
  "SPECIALIZATION:",
  specialization
);

console.log(
  "DOCTORS:",
  doctors
);

  return {

    action:
      "SHOW_RECOMMENDED_DOCTORS",

    specialization,

    doctors

  };

}

module.exports =
  doctorRecommendationAgent;