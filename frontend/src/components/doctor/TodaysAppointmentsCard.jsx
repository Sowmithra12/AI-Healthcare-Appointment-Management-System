import {
  useEffect,
  useState,
} from "react";

import {
  getDoctorAppointments,
  updateAppointmentStatus,
} from "../../api/appointmentApi";

function TodaysAppointmentsCard({
  setSelectedPatientId,
}) {

  const [appointments,
    setAppointments] =
      useState([]);

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

const doctorName =
  user.name;

        const data =
          await getDoctorAppointments(
            doctorName
          );

        setAppointments(data);

      } catch (error) {

        console.log(error);

      }

    };

  const handleStatusUpdate =
    async (
      appointmentId,
      status
    ) => {

      try {

        await updateAppointmentStatus(
          appointmentId,
          status
        );

        alert(
          `Appointment ${status}`
        );

        fetchAppointments();

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="bg-white rounded-3xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-6">
        Today's Appointments
      </h2>

      {appointments.length === 0 ? (

        <p>
          No Appointments
        </p>

      ) : (

        <div className="space-y-4">

          {appointments.map(
            (
              appointment
            ) => (

              <div
                key={
                  appointment._id
                }
                className="border rounded-xl p-4 shadow-sm"
              >

                <h3 className="font-bold text-blue-700 text-lg">
                  {
                    appointment.patientName
                  }
                </h3>

                <p className="text-gray-600">
                  {
                    appointment.appointmentSlot
                  }
                </p>

                <p className="mt-2">
                  Status:
                  <span className="font-semibold ml-2">
                    {
                      appointment.status
                    }
                  </span>
                </p>

                <div className="flex gap-3 mt-4">

                  <button
                    onClick={() =>
                      handleStatusUpdate(
                        appointment._id,
                        "COMPLETED"
                      )
                    }
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                  >
                    Complete
                  </button>

                  <button
                    onClick={() =>
                      handleStatusUpdate(
                        appointment._id,
                        "CANCELLED"
                      )
                    }
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                  onClick={() =>
                  setSelectedPatientId(
                    appointment.patientId
                  )}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                  View History
                  </button>

                </div>

              </div>

            )
          )}

        </div>

      )}

    </div>

  );

}

export default TodaysAppointmentsCard;