const doctorSchedule =
  require("../data/doctorSchedule");

const getAvailableSlots =
  async () => {

    const slots = [];

    doctorSchedule.forEach(
      (doctor) => {

        doctor.slots.forEach(
          (slot) => {

            slots.push({
              doctor:
                doctor.doctor,
              slot,
            });

          }
        );

      }
    );

    return slots;
  };

module.exports = {
  getAvailableSlots,
};