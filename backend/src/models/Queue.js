const mongoose = require("mongoose");

const queueSchema =
  new mongoose.Schema(
    {
      patientId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      patientName: {
        type: String,
        required: true,
      },

      doctorName: {
        type: String,
        required: true,
      },

      position: {
        type: Number,
        required: true,
      },

      status: {
        type: String,
        enum: [
          "WAITING",
          "ONGOING",
          "COMPLETED",
        ],
        default: "WAITING",
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Queue",
    queueSchema
  );