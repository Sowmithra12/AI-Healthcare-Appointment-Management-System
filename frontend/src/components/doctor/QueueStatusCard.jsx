import {
  useEffect,
  useState,
} from "react";

import {
  getQueue,
} from "../../api/queueApi";

function QueueStatusCard() {

  const [queue,
    setQueue] =
      useState([]);

  const [waiting,
    setWaiting] =
      useState(0);

  useEffect(() => {

    fetchQueue();

  }, []);

  const fetchQueue =
    async () => {

      try {

        const user =
          JSON.parse(
            localStorage.getItem(
              "user"
            )
          );

        const data =
          await getQueue(
            user.name
          );

        setQueue(
          data.queue
        );

        setWaiting(
          data.waiting
        );

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="bg-white rounded-3xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-6">
        Current Queue
      </h2>

      <p className="mb-4">
        Patients Waiting: {waiting}
      </p>

      <div className="space-y-3">

        {queue.map(
          (
            patient
          ) => (

            <div
              key={
                patient._id
              }
              className="border rounded-lg p-3"
            >

              #{patient.position}
              {" "}
              {
                patient.patientName
              }

            </div>

          )
        )}

      </div>

    </div>

  );

}

export default QueueStatusCard;