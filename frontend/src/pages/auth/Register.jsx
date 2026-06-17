import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../api/authApi";

import {
  FaUser,
  FaUserMd,
  FaHeartbeat,
  FaEnvelope,
  FaPhone,
  FaLock,
} from "react-icons/fa";

function Register() {

  const [role, setRole] =
    useState("patient");

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      phone: "",
      password: "",
      specialization: "",
    });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const navigate =
    useNavigate();

  const specializations = [
    "Cardiologist",
    "Dermatologist",
    "Neurologist",
    "Orthopedic",
    "Pediatrician",
  ];

  const handleRegister =
    async (e) => {

      e.preventDefault();

      setLoading(true);

      setError("");

      try {

        await registerUser({
          ...formData,
          role,
          specialization:
            role === "doctor"
              ? formData.specialization
              : null,
        });

        alert(
          "Registration Successful"
        );

        navigate("/");

      } catch (err) {

        setError(
          err.response?.data
            ?.message ||
            "Registration Failed"
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <div className="min-h-screen flex bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-900">

      {/* LEFT SIDE */}

      <div className="hidden lg:flex flex-col justify-center w-1/2 p-16 text-white relative overflow-hidden">

        <div className="absolute w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl top-10 left-10"></div>

        <div className="absolute w-72 h-72 bg-blue-500/20 rounded-full blur-3xl bottom-10 right-10"></div>

        <div className="relative z-10">

          <div className="flex items-center gap-3 mb-6">

            <FaHeartbeat className="text-cyan-400 text-4xl" />

            <h1 className="text-5xl font-bold">
              AI Healthcare
            </h1>

          </div>

          <p className="text-xl text-gray-300 mb-10">
            Join the Future of Intelligent Healthcare Management
          </p>

          <div className="space-y-5 text-lg">

            <div className="flex gap-3">
              <span className="text-cyan-400">
                ✓
              </span>
              AI Powered Appointment Scheduling
            </div>

            <div className="flex gap-3">
              <span className="text-cyan-400">
                ✓
              </span>
              Smart Reminder Agent
            </div>

            <div className="flex gap-3">
              <span className="text-cyan-400">
                ✓
              </span>
              Intelligent Rescheduling
            </div>

            <div className="flex gap-3">
              <span className="text-cyan-400">
                ✓
              </span>
              Real-Time Queue Monitoring
            </div>

          </div>

        </div>

      </div>

      {/* RIGHT SIDE */}

      <div className="w-full lg:w-1/2 flex justify-center items-center p-6">

        <div className="w-full max-w-lg bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-8">

          <h2 className="text-3xl font-bold text-center text-white">
            Create Account
          </h2>

          <p className="text-center text-gray-300 mt-2">
            Register as Patient or Doctor
          </p>

          {error && (

            <div className="mt-4 p-3 rounded-xl bg-red-500/20 border border-red-500 text-red-200">
              {error}
            </div>

          )}

          <form
            onSubmit={
              handleRegister
            }
            className="mt-8 space-y-4"
          >

            <div className="relative">

              <FaUser className="absolute left-4 top-4 text-gray-300" />

              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name:
                      e.target.value,
                  })
                }
                className="w-full pl-12 p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 outline-none"
                required
              />

            </div>

            <div className="relative">

              <FaEnvelope className="absolute left-4 top-4 text-gray-300" />

              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email:
                      e.target.value,
                  })
                }
                className="w-full pl-12 p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 outline-none"
                required
              />

            </div>

            <div className="relative">

              <FaPhone className="absolute left-4 top-4 text-gray-300" />

              <input
                type="text"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone:
                      e.target.value,
                  })
                }
                className="w-full pl-12 p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 outline-none"
                required
              />

            </div>

            <div className="relative">

              <FaLock className="absolute left-4 top-4 text-gray-300" />

              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password:
                      e.target.value,
                  })
                }
                className="w-full pl-12 p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 outline-none"
                required
              />

            </div>

            {/* SPECIALIZATION */}

            {role === "doctor" && (

              <div>

                <label className="text-gray-300 mb-2 block">
                  Specialization
                </label>

                <select
                  value={
                    formData.specialization
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      specialization:
                        e.target.value,
                    })
                  }
                  className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white outline-none"
                  required
                >

                  <option
                    value=""
                    className="text-black"
                  >
                    Select Specialization
                  </option>

                  {specializations.map(
                    (
                      specialization
                    ) => (

                      <option
                        key={
                          specialization
                        }
                        value={
                          specialization
                        }
                        className="text-black"
                      >
                        {
                          specialization
                        }
                      </option>

                    )
                  )}

                </select>

              </div>

            )}

            <div>

              <label className="text-gray-300 mb-2 block">
                Select Role
              </label>

              <div className="flex gap-4">

                <button
                  type="button"
                  onClick={() =>
                    setRole(
                      "patient"
                    )
                  }
                  className={`flex-1 p-3 rounded-xl flex justify-center items-center gap-2 ${
                    role ===
                    "patient"
                      ? "bg-cyan-500 text-white"
                      : "bg-white/10 text-gray-300"
                  }`}
                >
                  <FaUser />
                  Patient
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setRole(
                      "doctor"
                    )
                  }
                  className={`flex-1 p-3 rounded-xl flex justify-center items-center gap-2 ${
                    role ===
                    "doctor"
                      ? "bg-cyan-500 text-white"
                      : "bg-white/10 text-gray-300"
                  }`}
                >
                  <FaUserMd />
                  Doctor
                </button>

              </div>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:scale-105 transition-all duration-300 disabled:opacity-50"
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>

          </form>

          <p className="text-center text-gray-300 mt-6">

            Already have an account?{" "}

            <Link
              to="/"
              className="text-cyan-400 font-semibold"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>

  );

}

export default Register;