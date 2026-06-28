const User =
require("../models/User");

const getDoctorsBySpecialization =
async (specialization) => {

    const doctors =
    await User.find({

        role: "doctor",

        specialization

    }).select(

        "name specialization availabilityStatus"

    );

    return doctors;

};

module.exports =
getDoctorsBySpecialization;