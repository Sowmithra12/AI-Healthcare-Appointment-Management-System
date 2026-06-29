const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function askLLM(prompt) {
  try {
    const response = await groq.chat.completions.create({
      model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content:
            "You are a healthcare assistant. Return JSON only.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],

      temperature: 0,
      max_tokens: 300,
    });

    return response.choices[0].message.content.trim();

  } catch (error) {
    console.error("GROQ ERROR:", error);
    throw error;
  }
}

module.exports = askLLM;