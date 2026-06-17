const Queue =
  require("../models/Queue");

async function getQueueTool(
  patientId
) {

  const queue =
    await Queue.findOne({

      patientId,

      status:
        "WAITING"

    });

  return queue;

}

module.exports =
  getQueueTool;