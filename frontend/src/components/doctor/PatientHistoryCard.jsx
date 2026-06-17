import {
  useEffect,
  useState,
} from "react";

import {
  getPatientHistory,
} from "../../api/appointmentApi";

function PatientHistoryCard({
  patientId,
}) {

  const [history,
    setHistory] =
      useState([]);

  useEffect(() => {

    if (
      patientId
    ) {

      fetchHistory();

    }

  }, [patientId]);

  const fetchHistory =
    async () => {

      try {

        const data =
          await getPatientHistory(
            patientId
          );

        setHistory(
          data
        );

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="bg-white rounded-3xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-6">
        Patient History
      </h2>

      {!patientId ? (

        <p>
          Select a patient
        </p>

      ) : history.length === 0 ? (

        <p>
          No History Found
        </p>

      ) : (

        <div className="space-y-4">

          {history.map(
            (
              appointment
            ) => (

              <div
                key={
                  appointment._id
                }
                className="border rounded-xl p-4"
              >

                <h3 className="font-bold">
                  {
                    appointment.patientName
                  }
                </h3>

                <p>
                  {
                    appointment.doctorName
                  }
                </p>

                <p>
                  {
                    appointment.appointmentSlot
                  }
                </p>

                <span>
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

export default PatientHistoryCard;