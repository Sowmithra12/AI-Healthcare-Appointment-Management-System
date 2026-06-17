const Queue =
  require("../models/Queue");

const getQueueStatus =
  async (req, res) => {

    try {

      const {
        doctorName,
      } = req.params;

      console.log(
        "Requested Doctor:",
        doctorName
      );

      const queue =
        await Queue.find({
          doctorName,
          status:
            "WAITING",
        }).sort({
          position: 1,
        });

      console.log(
        "Queue Found:",
        queue
      );

      res.json({
        waiting:
          queue.length,
        queue,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

module.exports = {
  getQueueStatus,
};