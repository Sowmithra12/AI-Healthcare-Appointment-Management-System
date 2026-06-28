const cron =
  require("node-cron");

const reminderAgent =
  require("../agents/remainderAgent");

cron.schedule(

  "* * * * *",

  async () => {

    await reminderAgent();

  }

);

module.exports = {};