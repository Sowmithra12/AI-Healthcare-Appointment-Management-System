import {
  useEffect,
  useState,
} from "react";

import {
  getAppointmentHistory,
} from "../../api/appointmentApi";

function AppointmentHistoryCard() {

  const [history,
    setHistory] =
      useState([]);

  const [loading,
    setLoading] =
      useState(true);

  useEffect(() => {

    fetchHistory();

  }, []);

  const fetchHistory =
    async () => {

      try {

        const user =
          JSON.parse(
            localStorage.getItem(
              "user"
            )
          );

        const data =
          await getAppointmentHistory(
            user._id
          );

        setHistory(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  return (

    <div className="bg-white rounded-3xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-6">
        Appointment History
      </h2>

      {loading ? (

        <p>
          Loading...
        </p>

      ) : history.length === 0 ? (

        <p className="text-gray-500">
          No History Available
        </p>

      ) : (

        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">

          {history.map(
            (
              appointment
            ) => (

              <div
                key={
                  appointment._id
                }
                className="border rounded-xl p-4 shadow-sm"
              >

                <h3 className="font-bold text-blue-700">
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

                <span
                  className={`inline-block mt-3 px-3 py-1 rounded-full text-sm font-medium ${
                    appointment.status ===
                    "COMPLETED"
                      ? "bg-green-100 text-green-700"
                      : appointment.status ===
                        "CANCELLED"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
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

export default AppointmentHistoryCard;