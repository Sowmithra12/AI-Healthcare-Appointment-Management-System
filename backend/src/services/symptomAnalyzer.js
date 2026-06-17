const askLLM =
  require("./ollamaService");

async function analyzeSymptoms(
  message
) {

  const prompt = `
Map symptoms to doctor specialization.

Reply with ONLY one word.

Possible values:

Cardiologist
Dermatologist
Neurologist
Orthopedic
Pediatrician

Symptoms:
${message}
`;

  const response =
    await askLLM(prompt);

  return response.trim();

}

module.exports =
  analyzeSymptoms;