function getSlots(doctorName) {

  const slots = [];

  const today = new Date();

  const doctorSchedule = {

    // Cardiologists

    "Dr. Rajesh Kumar": {
      days: [1, 3, 5], // Mon Wed Fri
      times: [
        "10:00 AM",
        "11:00 AM"
      ]
    },

    "Dr. Anitha Menon": {
      days: [2, 4, 6], // Tue Thu Sat
      times: [
        "02:00 PM",
        "04:00 PM"
      ]
    },

    // Dermatologists

    "Dr. Priya Sharma": {
      days: [1, 3, 5],
      times: [
        "10:30 AM",
        "03:00 PM"
      ]
    },

    "Dr. Kavya Reddy": {
      days: [2, 4, 6],
      times: [
        "01:00 PM",
        "05:00 PM"
      ]
    },

    // Neurologists

    "Dr. Arjun Nair": {
      days: [1, 4],
      times: [
        "11:00 AM",
        "02:30 PM"
      ]
    },

    "Dr. Meera Iyer": {
      days: [2, 5],
      times: [
        "10:00 AM",
        "04:00 PM"
      ]
    },

    // Orthopedic

    "Dr. Vikram Singh": {
      days: [1, 3, 5],
      times: [
        "09:00 AM",
        "12:00 PM"
      ]
    },

    "Dr. Sanjay Patel": {
      days: [2, 4, 6],
      times: [
        "10:30 AM",
        "03:30 PM"
      ]
    },

    // Pediatricians

    "Dr. Lakshmi Devi": {
      days: [1, 4],
      times: [
        "11:00 AM",
        "05:00 PM"
      ]
    },

    "Dr. Rohit Verma": {
      days: [2, 5],
      times: [
        "10:00 AM",
        "02:00 PM"
      ]
    }

  };

  const doctor =
    doctorSchedule[doctorName];

  if (!doctor)
    return [];

  for (
    let i = 1;
    i <= 7;
    i++
  ) {

    const date =
      new Date(today);

    date.setDate(
      today.getDate() + i
    );

    const day =
      date.getDay();

    if (
      doctor.days.includes(day)
    ) {

      const formattedDate =
        date.toLocaleDateString(
          "en-IN",
          {
            weekday: "short",
            day: "2-digit",
            month: "short",
            year: "numeric"
          }
        );

      doctor.times.forEach(time => {

  const [timePart, period] =
    time.split(" ");

  let [hours, minutes] =
    timePart.split(":");

  hours = Number(hours);

  if (
    period === "PM" &&
    hours !== 12
  ) {
    hours += 12;
  }

  if (
    period === "AM" &&
    hours === 12
  ) {
    hours = 0;
  }

  const slotDate =
    new Date(date);

  slotDate.setHours(
    hours,
    Number(minutes),
    0,
    0
  );

  slots.push({

    label:
      `${formattedDate} - ${time}`,

    date:
      slotDate

  });

});

    }

  }

  return slots;

}

module.exports =
  getSlots;