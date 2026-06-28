const mongoose =
  require("mongoose");

const notificationSchema =
  new mongoose.Schema({

    patientId: {

      type:
        mongoose.Schema.Types.ObjectId,

      ref:
        "User"

    },

    appointmentId: {

      type:
        mongoose.Schema.Types.ObjectId,

      ref:
        "Appointment"

    },

    title:
      String,

    message:
      String,

    type: {

      type:
        String,

      enum: [

        "REMINDER",

        "QUEUE",

        "SYSTEM"

      ]

    },

    actions:[String],

actionTaken: {
  type: String,
  default: null
},

read: {
  type: Boolean,
  default: false
}

  },

  {

    timestamps:
      true

  }

);

module.exports =
  mongoose.model(

    "Notification",

    notificationSchema

  );