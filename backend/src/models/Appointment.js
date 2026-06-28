const mongoose =
  require("mongoose");
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

      appointmentDate: {
        type: Date,
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

      reminderSent: {
        type: Boolean,
        default: false,
      },

      reminderCount: {
        type: Number,
        default: 0,
      },

      confirmed: {
        type: Boolean,
        default: false,
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