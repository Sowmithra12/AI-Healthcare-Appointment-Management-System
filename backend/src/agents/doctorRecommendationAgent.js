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

const validSpecializations = [
    "Cardiologist",
    "Dermatologist",
    "Neurologist",
    "Orthopedic",
    "Pediatrician"
  ];

  const specializationMap = {
    cardiologist: "Cardiologist",
    dermatologist: "Dermatologist",
    neurologist: "Neurologist",
    orthopedic: "Orthopedic",
    orthopaedic: "Orthopedic",
    orthopedics: "Orthopedic",
    pediatrician: "Pediatrician",
    paediatrician: "Pediatrician"
  };

  const symptomFallback = (text) => {
    const lower = text.toLowerCase();
    if (/(joint|knee|elbow|shoulder|hip|back|pain)/.test(lower)) {
      return "Orthopedic";
    }
    if (/(rash|itch|skin|dermatitis|eczema|acne)/.test(lower)) {
      return "Dermatologist";
    }
    if (/(headache|migraine|dizzy|numb|seizure|stroke)/.test(lower)) {
      return "Neurologist";
    }
    if (/(chest|heart|cardiac|palpitations|blood pressure|bp)/.test(lower)) {
      return "Cardiologist";
    }
    if (/(child|baby|kid|pediatric|paediatric)/.test(lower)) {
      return "Pediatrician";
    }
    return null;
  };

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

Return ONLY valid JSON with one exact specialization from the available list.
If the symptoms match more than one field, choose the closest match.

Example:
{ "specialization": "Orthopedic" }
`;

  const result = await askLLM(prompt);

  let specialization = null;

  try {
    const parsed = JSON.parse(result.trim());
    specialization = parsed.specialization?.trim();
  } catch (error) {
    const match = result.match(/"specialization"\s*:\s*"([^"]+)"/i);
    if (match) {
      specialization = match[1].trim();
    }
  }

  if (specialization) {
    const normalized = specializationMap[specialization.toLowerCase()];
    if (normalized) {
      specialization = normalized;
    }
  }

  if (!validSpecializations.includes(specialization)) {
    specialization = symptomFallback(message);
  }

  if (!specialization) {
    return {
      action: "RECOMMENDATION_FAILED",
      reply: "Unable to determine specialization. Please provide more details."
    };
  }

  const doctors = await Doctor.find({ specialization });

  console.log("SPECIALIZATION:", specialization);
  console.log("DOCTORS:", doctors);

  return {
    action: "SHOW_RECOMMENDED_DOCTORS",
    specialization,
    doctors
  };

}

module.exports =
  doctorRecommendationAgent;