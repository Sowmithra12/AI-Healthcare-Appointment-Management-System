import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import PatientDashboard from "../pages/patient/PatientDashboard";
import DoctorDashboard from "../pages/doctor/DoctorDashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";
import BookAppointment from "../pages/patient/BookAppointment";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/patient/dashboard"
        element={<PatientDashboard />}
      />

      <Route
        path="/doctor/dashboard"
        element={<DoctorDashboard />}
      />

      <Route
        path="/admin/dashboard"
        element={<AdminDashboard />}
      />
      <Route
      path="/patient/book-appointment"
      element={<BookAppointment />}
/>
    </Routes>
    
  );
}

export default AppRoutes;