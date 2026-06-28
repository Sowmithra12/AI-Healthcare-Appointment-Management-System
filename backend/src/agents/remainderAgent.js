const Appointment =
  require("../models/Appointment");

const Notification =
  require("../models/Notification");

const askLLM =
  require("../services/ollamaService");

async function reminderAgent() {

  try {

    console.log("Checking reminders...");

    const appointments =
      await Appointment.find({

        reminderSent: false,

        status: {
          $in: [
            "BOOKED",
            "RESCHEDULED"
          ]
        }

      });

    console.log(
      "Appointments Found:",
      appointments.length
    );

    for (const appointment of appointments) {

      try {

        // Prevent duplicate reminders
        appointment.reminderSent = true;
        appointment.reminderCount += 1;

        await appointment.save();

        const existingNotification =
          await Notification.findOne({

            appointmentId:
              appointment._id,

            type:
              "REMINDER"

          });

        if (existingNotification) {
          continue;
        }

        let reminderMessage;

        try {

          const prompt = `

You are a Healthcare Reminder Assistant.

Patient:
${appointment.patientName}

Doctor:
${appointment.doctorName}

Appointment:
${appointment.appointmentSlot}

Generate a short professional reminder.

Mention:
- Doctor name
- Appointment time
- Confirm option only.

Return ONLY the reminder message.

`;

          reminderMessage =
            await askLLM(prompt);

        }

        catch (error) {

          console.log(
            "LLM TIMEOUT - USING TEMPLATE"
          );

          reminderMessage = `Hello ${appointment.patientName},

This is a reminder for your appointment with ${appointment.doctorName}.

Appointment Time:
${appointment.appointmentSlot}

Please confirm your appointment.

✓ CONFIRM`;

        }

        console.log(
          "Notification Collection:",
          Notification.collection.name
        );

        console.log(
          "Notification DB:",
          Notification.db.name
        );

        await Notification.create({

          patientId:
            appointment.patientId,

          appointmentId:
            appointment._id,

          title:
            "Appointment Reminder",

          message:
            reminderMessage,

          type:
            "REMINDER",

          actions: [
            "CONFIRM"
          ],

          read: false,

          actionTaken: null

        });

        console.log(
          `Reminder created for ${appointment.patientName}`
        );

      }

      catch (error) {

        console.log(
          `Failed for appointment ${appointment._id}`
        );

        console.log(error);

      }

    }

    console.log(
      "Reminder Check Completed"
    );

  }

  catch (error) {

    console.log(
      "REMINDER AGENT ERROR:"
    );

    console.log(error);

  }

}

module.exports = reminderAgent;