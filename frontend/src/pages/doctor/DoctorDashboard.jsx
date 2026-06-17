import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import TodaysAppointmentsCard from "../../components/doctor/TodaysAppointmentsCard";
import QueueStatusCard from "../../components/doctor/QueueStatusCard";
import PatientHistoryCard from "../../components/doctor/PatientHistoryCard";
import DoctorAnalyticsCard from "../../components/doctor/DoctorAnalyticsCard";

function DoctorDashboard() {

  const navigate =
    useNavigate();

  const [
    selectedPatientId,
    setSelectedPatientId,
  ] = useState(null);

  const [
    doctor,
    setDoctor,
  ] = useState(null);

  useEffect(() => {

    const user =
      JSON.parse(
        localStorage.getItem("user")
      );

    if (
      !user ||
      user.role !== "doctor"
    ) {

      navigate("/");
      return;

    }

    setDoctor(user);

  }, [navigate]);

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

  if (!doctor) {

    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  }

  return (

    <div className="min-h-screen bg-slate-100">

      {/* HEADER */}

      <div className="bg-gradient-to-r from-blue-700 to-cyan-700 text-white p-6 shadow-md">

        <div className="flex justify-between items-center">

          <div>

            <h1 className="text-3xl font-bold">
              Doctor Dashboard
            </h1>

            <p className="mt-1">
              Welcome back, {doctor.name}
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

      <div className="p-6">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          <TodaysAppointmentsCard
            doctorName={doctor.name}
            setSelectedPatientId={
              setSelectedPatientId
            }
          />

          <QueueStatusCard
            doctorName={
              doctor.name
            }
          />

        </div>

        <div className="mt-8">

          <PatientHistoryCard
            patientId={
              selectedPatientId
            }
          />

        </div>

        <div className="mt-8">

          <DoctorAnalyticsCard
            doctorName={
              doctor.name
            }
          />

        </div>

      </div>

    </div>

  );

}

export default DoctorDashboard;