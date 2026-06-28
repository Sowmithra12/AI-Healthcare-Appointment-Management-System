const Appointment =
require("../../models/Appointment");

module.exports =
async (state) => {

    console.log("===== CONFIRM NODE =====");

    const appointment =
    await Appointment.findById(

        state.state.appointmentId

    );

    if (!appointment) {

        return {

            action: "ERROR",

            reply: "Appointment not found."

        };

    }

    appointment.confirmed = true;

    await appointment.save();

    return {

        ...state,

        action: "CONFIRMED",

        reply:
        "Appointment confirmed successfully."

    };

};