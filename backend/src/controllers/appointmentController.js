const Appointment =
  require("../models/Appointment");

const Queue =
  require("../models/Queue");

// Create Appointment
const createAppointment =
  async (req, res) => {

    try {

      console.log(
        "REQUEST BODY:"
      );

      console.log(req.body);

      const {
        patientId,
        patientName,
        phoneNumber,
        age,
        doctorName,
        specialization,
        appointmentSlot,
        appointmentDateTime,
      } = req.body;

      const appointment =
  await Appointment.create({

    patientId,

    patientName,

    phoneNumber,

    age,

    doctorName,

    specialization,

    appointmentSlot,

    appointmentDate:
      appointmentDateTime,

    status:
      "BOOKED"

  });

const existingQueue =
  await Queue.findOne({

    patientId,

    doctorName,

    status: "WAITING"

  });

if (!existingQueue) {

  const queueCount =
    await Queue.countDocuments({

      doctorName,

      status: "WAITING"

    });

  await Queue.create({

    patientId,

    patientName,

    doctorName,

    position:
      queueCount + 1,

    status: "WAITING"

  });

}

      res.status(201).json({
        success: true,
        appointment,
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

  const markAppointmentCompleted =
  async (req, res) => {

    try {

      const {
        appointmentId,
      } = req.params;

      const appointment =
        await Appointment.findById(
          appointmentId
        );

      if (!appointment) {

        return res.status(404).json({
          message:
            "Appointment not found",
        });

      }

      appointment.status =
        "COMPLETED";

      await appointment.save();

      res.json({
        success: true,
        appointment,
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

  const getAppointmentHistory =
  async (req, res) => {

    try {

      const {
        patientId,
      } = req.params;

      const appointments =
        await Appointment.find({
          patientId,
          status: {
            $in: [
              "COMPLETED",
              "CANCELLED",
              "RESCHEDULED",
            ],
          },
        }).sort({
          updatedAt: -1,
        });

      res.json(
        appointments
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

// Get ALL Appointments
const getAppointments =
  async (req, res) => {

    try {

      const appointments =
        await Appointment.find()
          .sort({
            createdAt: -1,
          });

      res.json(
        appointments
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

// Get Appointments By Patient
const getPatientAppointments =
  async (req, res) => {

    try {

      const {
        patientId,
      } = req.params;

      const appointments =
  await Appointment.find({
    patientId,

    status: {
      $in: [
        "BOOKED",
        "RESCHEDULED",
      ],
    },
  }).sort({
    createdAt: -1,
  });

      res.json(
        appointments
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

// Get Latest Appointment For Patient
const getAppointment =
  async (req, res) => {

    try {

      const {
        patientId,
      } = req.query;

      const appointment =
        await Appointment.findOne({
          patientId,
        }).sort({
          createdAt: -1,
        });

      res.json(
        appointment
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

// Reschedule Appointment
const rescheduleAppointment =
  async (req, res) => {

    try {

      const {
        appointmentId,
        doctorName,
        slot,
      } = req.body;

      const appointment =
        await Appointment.findById(
          appointmentId
        );

      if (!appointment) {

        return res.status(404).json({
          message:
            "Appointment not found",
        });

      }

      appointment.doctorName =
        doctorName;

      appointment.appointmentSlot =
        slot;

      appointment.status =
        "RESCHEDULED";

      await appointment.save();

      res.json({
        success: true,
        appointment,
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

  const getDoctorAppointments =
  async (req, res) => {

    try {

      const {
        doctorName,
      } = req.params;

const appointments =
  await Appointment.find({
    doctorName,

    status: {
      $in: [
        "BOOKED",
        "RESCHEDULED",
      ],
    },
  }).sort({
    createdAt: -1,
  });

      res.json(
        appointments
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

const updateAppointmentStatus =
  async (req, res) => {

    try {

      const {
        appointmentId,
      } = req.params;

      const {
        status,
      } = req.body;

      const appointment =
        await Appointment.findById(
          appointmentId
        );

      if (!appointment) {

        return res.status(404).json({
          message:
            "Appointment not found",
        });

      }

      appointment.status =
        status;

      await appointment.save();

      if (
        status ===
          "COMPLETED" ||
        status ===
          "CANCELLED"
      ) {

        await Queue.findOneAndDelete({
          patientId:
            appointment.patientId,
          doctorName:
            appointment.doctorName,
        });

      }

      res.json({
        success: true,
        appointment,
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

const getPatientHistory =
async (req, res) => {

  try {

    const { patientId } =
      req.params;

    const appointments =
  await Appointment.find({

    patientId,

    status: {

      $in: [

        "COMPLETED",

        "CANCELLED",

        "RESCHEDULED"

      ]

    }

  }).sort({

    updatedAt:-1

  });

    res.json(
      appointments
    );

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

  const getDoctorAnalytics =
  async (req, res) => {

    try {

      const {
        doctorName,
      } = req.params;

      const total =
        await Appointment.countDocuments({
          doctorName,
        });

      const completed =
        await Appointment.countDocuments({
          doctorName,
          status:
            "COMPLETED",
        });

      const booked =
        await Appointment.countDocuments({
          doctorName,
          status:
            "BOOKED",
        });

      const cancelled =
        await Appointment.countDocuments({
          doctorName,
          status:
            "CANCELLED",
        });

      const completionRate =
        total === 0
          ? 0
          : (
              (completed /
                total) *
              100
            ).toFixed(1);

      res.json({
        total,
        completed,
        booked,
        cancelled,
        completionRate,
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

module.exports = {
  createAppointment,
  getAppointments,
  getPatientAppointments,
  getAppointment,
  rescheduleAppointment,
  markAppointmentCompleted,
  getAppointmentHistory,
  getDoctorAppointments,
  updateAppointmentStatus,
  getPatientHistory,
  getDoctorAnalytics,
};