const User = require("../models/User");
const Appointment = require("../models/Appointment");
const Notification = require("../models/Notification");

// ======================================
// GET ALL DOCTORS
// ======================================

const getDoctors = async (req, res) => {

    try {

        const doctors = await User.find({

            role: "doctor"

        }).select("-password");

        return res.json(doctors);

    }

    catch (error) {

        return res.status(500).json({

            message: error.message

        });

    }

};

// ======================================
// UPDATE DOCTOR AVAILABILITY
// ======================================

const updateAvailability = async (req, res) => {

    try {

        const { id } = req.params;

        const { availabilityStatus } = req.body;

        const doctor = await User.findById(id);

        if (!doctor) {

            return res.status(404).json({

                message: "Doctor not found"

            });

        }

        doctor.availabilityStatus =
            availabilityStatus;

        await doctor.save();

        // ======================================
        // IF DOCTOR IS ABSENT
        // CREATE NOTIFICATIONS
        // ======================================

        if (availabilityStatus === "ABSENT") {

            const appointments =
                await Appointment.find({

                    doctorName: doctor.name,

                    status: "BOOKED"

                });

            for (const appointment of appointments) {

                // =====================================
// Prevent duplicate notification
// =====================================

const alreadyExists =
await Notification.findOne({

    patientId:
        appointment.patientId,

    appointmentId:
        appointment._id,

    title:
        "Doctor Unavailable",

    read:
        false

});

if(!alreadyExists){

    await Notification.create({

        patientId:
            appointment.patientId,

        appointmentId:
            appointment._id,

        title:
            "Doctor Unavailable",

        message:
            `Your appointment with ${doctor.name} cannot be conducted because the doctor is unavailable. Please reschedule your appointment.`,

        type:
            "SYSTEM",

        read:
            false

    });

}
            }

        }

        return res.json({

            success: true,

            message:
                `Doctor marked as ${availabilityStatus}.`

        });

    }

    catch (error) {

        return res.status(500).json({

            message: error.message

        });

    }

};

module.exports = {

    getDoctors,

    updateAvailability

};