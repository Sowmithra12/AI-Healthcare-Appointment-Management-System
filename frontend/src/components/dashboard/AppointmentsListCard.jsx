import { useEffect, useState } from "react";

import {
  getPatientAppointments,
} from "../../api/appointmentApi";

function AppointmentsListCard() {

  const [appointments,
    setAppointments] =
      useState([]);

  const [loading,
    setLoading] =
      useState(true);

  useEffect(() => {

    fetchAppointments();

  }, []);

  const fetchAppointments =
    async () => {

      try {

        const user =
  JSON.parse(
    localStorage.getItem(
      "user"
    )
  );

console.log("Logged User");
console.log(user);

const data =
  await getPatientAppointments(
    user._id
  );

const activeAppointments =
  data.filter(
    (appointment) =>
      appointment.status ===
        "BOOKED" ||
      appointment.status ===
        "RESCHEDULED"
  );

setAppointments(
  activeAppointments
);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  if (loading) {

    return (

      <div className="bg-white rounded-3xl shadow-lg p-6">

        <h2 className="text-2xl font-bold mb-5">
          My Appointments
        </h2>

        <p>
          Loading...
        </p>

      </div>

    );

  }

  return (

    <div className="bg-white rounded-3xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-5">
        My Appointments
      </h2>

      {appointments.length === 0 ? (

        <p className="text-gray-500">
          No Appointments Found
        </p>

      ) : (

        <div className="space-y-4">

          {appointments.map(
            (appointment) => (

              <div
                key={
                  appointment._id
                }
                className="border rounded-xl p-4 shadow-sm"
              >

                <h3 className="font-bold text-lg text-blue-700">
                  {
                    appointment.doctorName
                  }
                </h3>

                <p className="text-gray-600">
                  {
                    appointment.specialization
                  }
                </p>

                <p className="mt-2">
                  <strong>
                    Slot:
                  </strong>{" "}
                  {
                    appointment.appointmentSlot
                  }
                </p>

                <p>
                  <strong>
                    Patient:
                  </strong>{" "}
                  {
                    appointment.patientName
                  }
                </p>

                <span
                  className={`inline-block mt-3 px-3 py-1 rounded-full text-sm font-medium ${
                    appointment.status ===
                    "BOOKED"
                      ? "bg-green-100 text-green-700"
                      : appointment.status ===
                        "RESCHEDULED"
                      ? "bg-yellow-100 text-yellow-700"
                      : appointment.status ===
                        "CANCELLED"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {
                    appointment.status
                  }
                </span>

              </div>

            )
          )}

        </div>

      )}

    </div>

  );
}

export default AppointmentsListCard;