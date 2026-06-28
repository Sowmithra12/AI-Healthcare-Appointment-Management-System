const Appointment =
require("../models/Appointment");

const Queue =
require("../models/Queue");

async function createAppointmentTool(data){

    console.log("========== CREATE APPOINTMENT TOOL ==========");
    console.log(data);

    // ======================================
    // CHECK SLOT AVAILABILITY
    // ======================================

    const existingAppointment =
    await Appointment.findOne({

        doctorName:
        data.doctorName,

        appointmentDate:
        data.appointmentDate,

        status:{

            $in:[

                "BOOKED",
                "CONFIRMED",
                "RESCHEDULED"

            ]

        }

    });

    if(existingAppointment){

        throw new Error(
            "SLOT_ALREADY_BOOKED"
        );

    }

    // ======================================
    // CREATE APPOINTMENT
    // ======================================

    const appointment =
    await Appointment.create(data);

    console.log(
        "Appointment Saved Successfully"
    );

    console.log(appointment);

    // ======================================
    // CREATE QUEUE ENTRY
    // ======================================

    const queueCount =
    await Queue.countDocuments({

        doctorName:
        data.doctorName,

        status:
        "WAITING"

    });

    await Queue.create({

        patientId:
        data.patientId,

        patientName:
        data.patientName,

        doctorName:
        data.doctorName,

        position:
        queueCount + 1,

        status:
        "WAITING"

    });

    return appointment;

}

module.exports =
createAppointmentTool;