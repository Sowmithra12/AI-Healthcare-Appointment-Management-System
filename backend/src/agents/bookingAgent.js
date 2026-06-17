const getDoctorsTool =
  require("../tools/getDoctorsTool");

const getSlotsTool =
  require("../tools/getSlotsTool");

const createAppointmentTool =
  require("../tools/createAppointmentTool");

async function bookingAgent(
  message,
  state,
  patient
) {

  // STEP 1

  if (!state.specialization) {

    const specializations = [

      "Cardiologist",

      "Dermatologist",

      "Neurologist",

      "Orthopedic",

      "Pediatrician"

    ];

    const selected =
      specializations.find(
        spec =>
          spec.toLowerCase() ===
          message.toLowerCase()
      );

    if (!selected) {

      return {

        action:
          "ASK_SPECIALIZATION",

        specializations,

        reply:
          "Please choose a specialization",

        state

      };

    }

    state.specialization =
      selected;

  }

  // STEP 2

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

        state

      };

    }

    state.doctorName =
      selectedDoctor.name;

  }

  // STEP 3

  if (!state.appointmentSlot) {

    const slots =
      await getSlotsTool(
        state.doctorName
      );

    const selectedSlot =
      slots.find(
        slot =>
          slot === message
      );

    if (!selectedSlot) {

      return {

        action:
          "SHOW_SLOTS",

        slots,

        state

      };

    }

    state.appointmentSlot =
      selectedSlot;

  }

  // STEP 4

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

      status:
        "BOOKED"

    });

  return {

    action:
      "BOOKED",

    appointment,

    state

  };

}

module.exports =
  bookingAgent;