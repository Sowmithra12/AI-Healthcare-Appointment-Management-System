const mongoose = require("mongoose");

const doctorSchema =
  new mongoose.Schema({
    doctorName: {
      type: String,
      required: true,
    },

    specialization: {
      type: String,
      required: true,
    },

    availableSlots: [
      String,
    ],
  });

module.exports =
  mongoose.model(
    "Doctor",
    doctorSchema
  );
  