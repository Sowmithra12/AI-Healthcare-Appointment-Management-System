const Appointment =
  require("../models/Appointment");

const sendEmail =
  require("../services/emailService");

async function reminderAgent() {

  console.log("====================");
  console.log("Reminder Agent Running...");

  const appointments =
    await Appointment.find({

      status: "BOOKED"

    });

  console.log(
    "Appointments Found:",
    appointments.length
  );

  const now =
    new Date();

  const reminderTime =

    process.env.TEST_MODE === "true"

      ? new Date(
          now.getTime() +
          60 * 60 * 1000
        )

      : new Date(
          now.getTime() +
          24 * 60 * 60 * 1000
        );

  for (
    const appointment of appointments
  ) {

    const appointmentDate =

      new Date(
        appointment.appointmentDateTime
      );

    if (

      appointmentDate > now &&

      appointmentDate <= reminderTime

    ) {

      console.log(
        "Sending reminder to:",
        appointment.patientName
      );

      const html = `

      <h2>Appointment Reminder</h2>

      <p>
      Hello ${appointment.patientName},
      </p>

      <p>
      Your appointment with
      <b>${appointment.doctorName}</b>
      is scheduled for
      <b>${appointment.appointmentSlot}</b>
      </p>

      <br>

      <a href="http://localhost:5000/api/reminder/confirm/${appointment._id}">
      <button>Confirm Appointment</button>
      </a>

      <br><br>

      <a href="http://localhost:5000/api/reminder/cancel/${appointment._id}">
      <button>Cancel Appointment</button>
      </a>

      `;

      await sendEmail(

        "23b149@psgitech.ac.in",

        "Appointment Reminder",

        html

      );

      console.log(
        "Reminder Sent"
      );

    }

  }

  console.log(
    "Reminder Check Completed"
  );

}

module.exports =
  reminderAgent;