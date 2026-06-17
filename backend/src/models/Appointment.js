const mongoose = require("mongoose");

const appointmentSchema =
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

      phoneNumber: {
        type: String,
        required: true,
      },

      age: {
        type: Number,
        required: true,
      },

      doctorName: {
        type: String,
        required: true,
      },

      specialization: {
        type: String,
        required: true,
      },

      appointmentSlot: {
        type: String,
        required: true,
      },

      status: {
        type: String,
        enum: [
          "BOOKED",
          "ONGOING",
          "RESCHEDULED",
          "CANCELLED",
          "COMPLETED",
        ],
        default: "BOOKED",
      },
      appointmentDateTime: {
  type: Date,
  required: true
},
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Appointment",
    appointmentSchema
  );