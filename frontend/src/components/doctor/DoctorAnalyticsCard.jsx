import {
  useEffect,
  useState,
} from "react";

import {
  getDoctorAnalytics,
} from "../../api/appointmentApi";

function DoctorAnalyticsCard() {

  const [analytics,
    setAnalytics] =
      useState(null);

  useEffect(() => {

    fetchAnalytics();

  }, []);

  const fetchAnalytics =
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
          await getDoctorAnalytics(
            doctorName
          );

        setAnalytics(data);

      } catch (error) {

        console.log(error);

      }

    };

  if (!analytics) {

    return (
      <div className="bg-white rounded-3xl shadow-lg p-6">
        Loading Analytics...
      </div>
    );

  }

  return (

    <div className="bg-white rounded-3xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-6">
        Doctor Analytics
      </h2>

      <div className="grid grid-cols-2 gap-4">

        <div className="bg-blue-100 p-4 rounded-xl">
          <p className="text-sm">
            Total Appointments
          </p>
          <h3 className="text-3xl font-bold">
            {
              analytics.total
            }
          </h3>
        </div>

        <div className="bg-green-100 p-4 rounded-xl">
          <p className="text-sm">
            Completed
          </p>
          <h3 className="text-3xl font-bold">
            {
              analytics.completed
            }
          </h3>
        </div>

        <div className="bg-yellow-100 p-4 rounded-xl">
          <p className="text-sm">
            Booked
          </p>
          <h3 className="text-3xl font-bold">
            {
              analytics.booked
            }
          </h3>
        </div>

        <div className="bg-red-100 p-4 rounded-xl">
          <p className="text-sm">
            Cancelled
          </p>
          <h3 className="text-3xl font-bold">
            {
              analytics.cancelled
            }
          </h3>
        </div>

      </div>

      <div className="mt-6">

        <p className="font-semibold">
          Completion Rate
        </p>

        <div className="w-full bg-gray-200 rounded-full h-4 mt-2">

          <div
            className="bg-green-600 h-4 rounded-full"
            style={{
              width: `${analytics.completionRate}%`,
            }}
          />

        </div>

        <p className="mt-2 font-bold">
          {
            analytics.completionRate
          }%
        </p>

      </div>

    </div>

  );

}

export default DoctorAnalyticsCard;