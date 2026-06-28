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
    availabilityStatus: {

    type: String,

    enum: [

        "AVAILABLE",

        "ABSENT"

    ],

    default: "AVAILABLE"

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
  