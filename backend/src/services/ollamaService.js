const ollama =
  require("ollama").default;

async function askLLM(
  prompt
) {

  const response =
    await ollama.chat({
      model: "qwen3:4b",

      messages: [
  {
    role: "system",
    content:
      "You are a healthcare booking assistant. Always return valid JSON only when extracting information."
  },
  {
    role: "user",
    content: prompt
  }
]
    });

  return response.message.content;

}

module.exports =
  askLLM;