const { Ollama } =
  require("ollama");

const ollama =
  new Ollama({
    host:
      "http://127.0.0.1:11434"
  });

async function askLLM(prompt) {

  const response =
    await ollama.chat({

      model:
        "qwen3:4b",

      messages: [

        {
          role: "system",
          content:
            "You are a healthcare assistant. Return JSON only."
        },

        {
          role: "user",
          content:
            prompt
        }

      ]

    });

  return response.message.content;

}

module.exports =
  askLLM;