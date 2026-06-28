const askLLM =
  require("../services/ollamaService");

const getDoctorsTool =
  require("../tools/getDoctorsTool");

const getSlotsTool =
  require("../tools/getSlotsTool");

const createAppointmentTool =
  require("../tools/createAppointmentTool");

const Appointment =
require("../models/Appointment");

const User = require("../models/User");
async function bookingAgent(
  message,
  state,
  patient
) {

  try {

    // =====================
    // STEP 1
    // GET SPECIALIZATION
    // =====================

    if (!state.specialization) {

      const specializations = [

        "Cardiologist",

        "Dermatologist",

        "Neurologist",

        "Orthopedic",

        "Pediatrician"

      ];

      // User selected specialization button

      const selectedSpecialization =
        specializations.find(

          spec =>

            spec.toLowerCase() ===
            message.toLowerCase()

        );

      if (selectedSpecialization) {

        state.specialization =
          selectedSpecialization;

      }

      else {

        const prompt = `

You are an expert Healthcare Booking Agent.

Your job is to identify the medical specialization required by the patient.

Available Specializations:

- Cardiologist
- Dermatologist
- Neurologist
- Orthopedic
- Pediatrician

Patient Message:

"${message}"

Return ONLY valid JSON.

Example:

{
  "specialization":"Cardiologist"
}

If unsure:

{
  "specialization":""
}

`;

        const response =
          await askLLM(prompt);

        console.log(
          "LLM RESPONSE:",
          response
        );

        const cleaned =
          response
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const result =
          JSON.parse(cleaned);

        const validSpecializations = [

          "Cardiologist",

          "Dermatologist",

          "Neurologist",

          "Orthopedic",

          "Pediatrician"

        ];

        if (

          !result.specialization ||

          !validSpecializations.includes(
            result.specialization
          )

        ) {

          return {

            action:
              "ASK_SPECIALIZATION",

            specializations,

            reply:
              "What type of doctor would you like to consult?",

            state

          };

        }

        state.specialization =
          result.specialization;

      }

    }

    // =====================
    // STEP 2
    // SELECT DOCTOR
    // =====================

    if (!state.doctorName) {

      const doctors =
        await getDoctorsTool(
          state.specialization
        );

      const selectedDoctor =
        doctors.find(

          doctor =>

            doctor.name ===
            message

        );

      if (!selectedDoctor) {

        return {

          action:
            "SHOW_DOCTORS",

          doctors,

          reply:
            "Please select a doctor.",

          state

        };

      }

      state.doctorName =
        selectedDoctor.name;

      // =========================
// CHECK DOCTOR AVAILABILITY
// =========================

const doctor = await User.findOne({

    name: state.doctorName,

    role: "doctor"

});

if (

    doctor &&
    doctor.availabilityStatus === "ABSENT"

) {

    // Reset selected doctor
    delete state.doctorName;

    return {

        action:
        "DOCTOR_UNAVAILABLE",

        reply:
        `${doctor.name} is currently unavailable because the doctor is absent. Please choose another doctor.`,

        doctors:
        doctors,

        state

    };

}

    }

    // =====================
    // STEP 3
    // SELECT SLOT
    // =====================

// STEP 3
const slots =
    await getSlotsTool(state.doctorName);

// Check whether the current message is one of the slot labels
const selectedSlot =
    slots.find(

        slot =>

        slot.label === message

    );

// If the user clicked a slot,
// ALWAYS overwrite the previous slot.
if(selectedSlot){

    state.appointmentSlot =
        selectedSlot.label;

    state.appointmentDate =
        new Date(selectedSlot.date);

}

if(!state.appointmentSlot){

    return{

        action:"SHOW_SLOTS",

        slots:
        slots.map(

            slot=>slot.label

        ),

        reply:
        "Please select a slot.",

        state

    };

}

    if (
      state.appointmentSlot &&
      !state.appointmentDate
    ) {
      const slots =
        await getSlotsTool(
          state.doctorName
        );

      const selectedSlot =
        slots.find(
          slot =>
            slot.label ===
            state.appointmentSlot
        );

      if (!selectedSlot) {
        return {
          action:
            "SHOW_SLOTS",
          slots:
            slots.map(
              slot => slot.label
            ),
          reply:
            "Please select a slot.",
          state
        };
      }

      state.appointmentDate =
        new Date(
          selectedSlot.date
        );
    }

    // =====================
    // STEP 4
    // BOOK APPOINTMENT
    // =====================

    const appointment =
      await createAppointmentTool({

        patientId:
          patient._id,

        patientName:
          patient.name,

        phoneNumber:
          patient.phone,

        age:
          patient.age || 0,

        specialization:
          state.specialization,

        doctorName:
          state.doctorName,

        appointmentSlot:
          state.appointmentSlot,

        appointmentDate:
  state.appointmentDate,

        status:
          "BOOKED"

      });
      console.log("TOOL RETURNED:");
console.log(appointment);

    return {

      action:
        "BOOKED",

      appointment,

      reply:
        `Appointment booked successfully with ${appointment.doctorName}`,

      state: {}

    };

  }

 catch (error) {

    console.log("BOOKING AGENT ERROR:");
    console.log(error);

    if (

        error.message ===
        "SLOT_ALREADY_BOOKED"

    ) {

        // Get all slots again
        const slots =
        await getSlotsTool(

            state.doctorName

        );

        // Find already booked appointments
        const bookedAppointments =
        await Appointment.find({

            doctorName:
            state.doctorName,

            status: {

                $in: [

                    "BOOKED",
                    "CONFIRMED",
                    "RESCHEDULED"

                ]

            }

        });

        // Remove booked slots
        const availableSlots =
        slots.filter(slot =>

            !bookedAppointments.some(

                appointment =>

                    appointment.appointmentDate.getTime() ===
                    new Date(slot.date).getTime()

            )

        );

        // Remove old selection
        delete state.appointmentSlot;
        delete state.appointmentDate;

        return {

            action:
            "SLOT_ALREADY_BOOKED",

            reply:
            "Sorry, that appointment slot has just been booked by another patient. Please choose another available slot.",

            slots:
            availableSlots.map(

                slot => slot.label

            ),

            state

        };

    }

    return {

        action:
        "ERROR",

        reply:
        "Something went wrong while booking.",

        state

    };

}

}

module.exports =
  bookingAgent;