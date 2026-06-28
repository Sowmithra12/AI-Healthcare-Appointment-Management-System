import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import CurrentAppointmentCard from "../../components/dashboard/CurrentAppointmentCard";
import AppointmentsListCard from "../../components/dashboard/AppointmentsListCard";
import BookAppointmentButton from "../../components/dashboard/BookAppointmentButton";
import ChatBox from "../../components/ai/ChatBox";
import AppointmentHistoryCard from "../../components/dashboard/AppointmentHistoryCard";
import NotificationCard from "../../components/dashboard/NotificationCard";

function PatientDashboard() {

  const navigate =
    useNavigate();

  const user =
    JSON.parse(
      localStorage.getItem("user")
    ) || {};

  useEffect(() => {

    if (
      !user ||
      user.role !== "patient"
    ) {

      navigate("/");

    }

  }, [navigate, user]);

  const handleLogout =
    () => {

      localStorage.removeItem(
        "user"
      );

      localStorage.removeItem(
        "token"
      );

      navigate("/");

    };

  return (

    <div className="min-h-screen bg-slate-100">

      {/* HEADER */}

      <div className="bg-gradient-to-r from-blue-700 to-cyan-700 text-white p-6 shadow-md">

        <div className="flex justify-between items-center">

          <div>

            <h1 className="text-3xl font-bold">
              Patient Dashboard
            </h1>

            <p className="mt-1">
              Welcome back, {user.name}
            </p>

          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
          >
            Logout
          </button>

        </div>

      </div>

      <div className="p-6 space-y-6">

        {/* TOP SECTION */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <CurrentAppointmentCard />
          
        <NotificationCard />

        </div>

        {/* MY APPOINTMENTS */}

        <AppointmentsListCard />

        {/* APPOINTMENT HISTORY */}

        <AppointmentHistoryCard />


        {/* AI HEALTHCARE CONCIERGE */}

        <ChatBox key={user?._id || "guest"} />

      </div>

    </div>

  );

}

export default PatientDashboard;