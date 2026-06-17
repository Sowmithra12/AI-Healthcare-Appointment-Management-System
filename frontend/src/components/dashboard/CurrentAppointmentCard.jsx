import { useEffect, useState } from "react";
import { getCurrentAppointment } from "../../api/appointmentApi";

import {
  FaUserMd,
  FaCalendarAlt,
  FaCheckCircle,
} from "react-icons/fa";

function CurrentAppointmentCard() {

  const [appointment,
    setAppointment] =
      useState(null);

  const [loading,
    setLoading] =
      useState(true);

  useEffect(() => {

    fetchAppointment();

  }, []);

  const fetchAppointment =
    async () => {

      try {

        const user =
          JSON.parse(
            localStorage.getItem(
              "user"
            )
          );

        const data =
          await getCurrentAppointment(
            user._id
          );

        setAppointment(data); 

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  if (loading) {

    return (
      <div className="bg-white rounded-3xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">
          Current Appointment
        </h2>

        <p>Loading...</p>
      </div>
    );

  }

  if (!appointment) {

    return (
      <div className="bg-white rounded-3xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">
          Current Appointment
        </h2>

        <p className="text-red-500">
          No Appointment Found
        </p>
      </div>
    );

  }

  return (

    <div className="bg-white rounded-3xl shadow-lg p-6 border border-slate-200">

      <h2 className="text-2xl font-bold mb-6">
        Current Appointment
      </h2>

      <div className="space-y-4">

        <div className="flex items-center gap-3">

          <FaUserMd className="text-blue-600 text-xl" />

          <div>

            <p className="text-sm text-gray-500">
              Doctor
            </p>

            <p className="font-semibold">
              {appointment.doctorName}
            </p>

          </div>

        </div>

        <div className="flex items-center gap-3">

          <FaCalendarAlt className="text-green-600 text-xl" />

          <div>

            <p className="text-sm text-gray-500">
              Appointment Slot
            </p>

            <p className="font-semibold">
              {appointment.appointmentSlot}
            </p>

          </div>

        </div>

        <div className="flex items-center gap-3">

          <FaCheckCircle className="text-purple-600 text-xl" />

          <div>

            <p className="text-sm text-gray-500">
              Status
            </p>

            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                appointment.status ===
                "BOOKED"
                  ? "bg-green-100 text-green-700"
                  : appointment.status ===
                    "RESCHEDULED"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {appointment.status}
            </span>

          </div>

        </div>

      </div>

    </div>

  );

}

export default CurrentAppointmentCard;