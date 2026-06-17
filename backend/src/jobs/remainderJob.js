const cron =
require("node-cron");

const reminderAgent =
require("../agents/remainderAgent");

cron.schedule(

  "*/1 * * * *",

  async () => {

    console.log(
      "Checking reminders..."
    );

    await reminderAgent();

  }

);