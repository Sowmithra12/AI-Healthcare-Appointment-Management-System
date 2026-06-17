const ollama =
  require("ollama").default;

async function test() {

  const response =
    await ollama.chat({
      model: "qwen3:4b",
      messages: [
        {
          role: "user",
          content:
            "Say hello",
        },
      ],
    });

  console.log(
    response.message.content
  );

}

test();