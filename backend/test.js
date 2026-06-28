const askLLM =
require("./src/services/ollamaService");

(async () => {

  console.log("START");

  try {

    console.log(
      "CALLING LLM..."
    );

    const result =
      await askLLM(
        "Say hello"
      );

    console.log(
      "RESULT:"
    );

    console.log(result);

  }

  catch (err) {

    console.log(
      "ERROR:"
    );

    console.log(err);

  }

})();