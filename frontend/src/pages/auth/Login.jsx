import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../api/authApi";

import {
  FaUserMd,
  FaUser,
  FaUserShield,
  FaHeartbeat,
} from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await loginUser({
        email,
        password,
      });

      localStorage.setItem(
        "token",
        response.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response)
      );

      navigate(
        `/${response.role}/dashboard`
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-900">

      {/* LEFT SECTION */}
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
            Intelligent Appointment Management Platform
          </p>

          <div className="space-y-5 text-lg">

            <div className="flex items-center gap-3">
              <span className="text-cyan-400">✓</span>
              AI Reminder Agent
            </div>

            <div className="flex items-center gap-3">
              <span className="text-cyan-400">✓</span>
              Smart Rescheduling
            </div>

            <div className="flex items-center gap-3">
              <span className="text-cyan-400">✓</span>
              Real-Time Queue Monitoring
            </div>

            <div className="flex items-center gap-3">
              <span className="text-cyan-400">✓</span>
              Doctor Availability Intelligence
            </div>

          </div>

          <div className="grid grid-cols-2 gap-5 mt-14">

            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl">
              <h2 className="text-3xl font-bold">
                10K+
              </h2>
              <p className="text-gray-300">
                Appointments
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl">
              <h2 className="text-3xl font-bold">
                95%
              </h2>
              <p className="text-gray-300">
                Reminder Accuracy
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl">
              <h2 className="text-3xl font-bold">
                24/7
              </h2>
              <p className="text-gray-300">
                AI Agents
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl">
              <h2 className="text-3xl font-bold">
                40%
              </h2>
              <p className="text-gray-300">
                Reduced Wait Time
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* RIGHT SECTION */}

      <div className="flex justify-center items-center w-full lg:w-1/2 p-6">

        <div className="w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-8">

          <h2 className="text-3xl font-bold text-white text-center">
            Welcome Back
          </h2>

          <p className="text-center text-gray-300 mt-2">
            Sign in to continue
          </p>

          {error && (
            <div className="mt-4 p-3 rounded-xl bg-red-500/20 border border-red-500 text-red-200">
              {error}
            </div>
          )}

          <form
            onSubmit={handleLogin}
            className="mt-8 space-y-5"
          >

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 outline-none"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 outline-none"
            />

            <div>
              <label className="text-gray-300 mb-2 block">
                Select Role
              </label>

              <div className="flex gap-3">

                <button
                  type="button"
                  onClick={() => setRole("patient")}
                  className={`flex-1 p-3 rounded-xl flex justify-center items-center gap-2 ${
                    role === "patient"
                      ? "bg-cyan-500 text-white"
                      : "bg-white/10 text-gray-300"
                  }`}
                >
                  <FaUser />
                  Patient
                </button>

                <button
                  type="button"
                  onClick={() => setRole("doctor")}
                  className={`flex-1 p-3 rounded-xl flex justify-center items-center gap-2 ${
                    role === "doctor"
                      ? "bg-cyan-500 text-white"
                      : "bg-white/10 text-gray-300"
                  }`}
                >
                  <FaUserMd />
                  Doctor
                </button>

                <button
                  type="button"
                  onClick={() => setRole("admin")}
                  className={`flex-1 p-3 rounded-xl flex justify-center items-center gap-2 ${
                    role === "admin"
                      ? "bg-cyan-500 text-white"
                      : "bg-white/10 text-gray-300"
                  }`}
                >
                  <FaUserShield />
                  Admin
                </button>

              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:scale-105 transition-all duration-300 disabled:opacity-50"
            >
              {loading
                ? "Signing In..."
                : "Login"}
            </button>

          </form>

          <p className="text-center text-gray-300 mt-6">
            New here?{" "}
            <Link
              to="/register"
              className="text-cyan-400 font-semibold"
            >
              Create Account
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;
