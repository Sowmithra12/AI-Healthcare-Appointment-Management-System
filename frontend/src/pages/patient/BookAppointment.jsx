import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  createAppointment,
} from "../../api/appointmentApi";

function BookAppointment() {

  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({
      patientName: "",
      phoneNumber: "",
      age: "",
      specialization: "",
      doctorName: "",
      appointmentSlot: "",
    });

  const specializations = [
    "Cardiologist",
    "Dermatologist",
    "Neurologist",
    "Orthopedic",
    "Pediatrician",
  ];

  const doctors = {
    Cardiologist: [
      "Dr. Rajesh Kumar",
      "Dr. Arjun Sharma",
    ],

    Dermatologist: [
      "Dr. Priya Sharma",
      "Dr. Meera Nair",
    ],

    Neurologist: [
      "Dr. Karthik Raman",
    ],

    Orthopedic: [
      "Dr. Vikram Singh",
    ],

    Pediatrician: [
      "Dr. Ananya Rao",
    ],
  };

  const slots = {
    "Dr. Rajesh Kumar": [
      "Mon, 15 Jun 2026 - 10:00 AM",
      "Mon, 15 Jun 2026 - 11:00 AM",
      "Tue, 16 Jun 2026 - 02:00 PM",
    ],

    "Dr. Arjun Sharma": [
      "Wed, 17 Jun 2026 - 09:00 AM",
      "Wed, 17 Jun 2026 - 12:00 PM",
    ],

    "Dr. Priya Sharma": [
      "Thu, 18 Jun 2026 - 10:30 AM",
      "Thu, 18 Jun 2026 - 03:00 PM",
    ],

    "Dr. Meera Nair": [
      "Fri, 19 Jun 2026 - 01:00 PM",
      "Fri, 19 Jun 2026 - 04:00 PM",
    ],

    "Dr. Karthik Raman": [
      "Sat, 20 Jun 2026 - 11:00 AM",
      "Sat, 20 Jun 2026 - 05:00 PM",
    ],

    "Dr. Vikram Singh": [
      "Mon, 22 Jun 2026 - 09:30 AM",
      "Mon, 22 Jun 2026 - 02:30 PM",
    ],

    "Dr. Ananya Rao": [
      "Tue, 23 Jun 2026 - 10:00 AM",
      "Tue, 23 Jun 2026 - 01:30 PM",
    ],
  };

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;

    if (
      name ===
      "specialization"
    ) {

      setFormData({
        ...formData,
        specialization:
          value,
        doctorName: "",
        appointmentSlot: "",
      });

      return;
    }

    if (
      name ===
      "doctorName"
    ) {

      setFormData({
        ...formData,
        doctorName:
          value,
        appointmentSlot: "",
      });

      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });

  };

  const handleSubmit =
  async (e) => {

    e.preventDefault();

    try {

      const user =
        JSON.parse(
          localStorage.getItem(
            "user"
          )
        );

      const appointmentData = {

  ...formData,

  patientId:
    user._id,

  appointmentDateTime:
    new Date(
      formData.appointmentSlot
    )

};

      console.log(
        "BOOKING DATA:"
      );

      console.log(
        appointmentData
      );

      const response =
        await createAppointment(
          appointmentData
        );

      console.log(
        response
      );

      alert(
        "Appointment Booked Successfully"
      );

      navigate(
        "/patient/dashboard"
      );

    } catch (error) {

      console.log(
        error
      );

      alert(
        error.response?.data
          ?.message ||
          "Failed to book appointment"
      );

    }

  };

  return (

    <div className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg p-8">

        <h1 className="text-4xl font-bold mb-8">
          Book Appointment
        </h1>

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-5"
        >

          <input
            type="text"
            name="patientName"
            placeholder="Patient Name"
            value={
              formData.patientName
            }
            onChange={
              handleChange
            }
            className="w-full border rounded-xl p-4"
            required
          />

          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={
              formData.phoneNumber
            }
            onChange={
              handleChange
            }
            className="w-full border rounded-xl p-4"
            required
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={
              formData.age
            }
            onChange={
              handleChange
            }
            className="w-full border rounded-xl p-4"
            required
          />

          <select
            name="specialization"
            value={
              formData.specialization
            }
            onChange={
              handleChange
            }
            className="w-full border rounded-xl p-4"
            required
          >

            <option value="">
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
                >
                  {
                    specialization
                  }
                </option>

              )
            )}

          </select>

          <select
            name="doctorName"
            value={
              formData.doctorName
            }
            onChange={
              handleChange
            }
            className="w-full border rounded-xl p-4"
            required
          >

            <option value="">
              Select Doctor
            </option>

            {(doctors[
              formData
                .specialization
            ] || []).map(
              (
                doctor
              ) => (

                <option
                  key={
                    doctor
                  }
                  value={
                    doctor
                  }
                >
                  {doctor}
                </option>

              )
            )}

          </select>

          <select
            name="appointmentSlot"
            value={
              formData
                .appointmentSlot
            }
            onChange={
              handleChange
            }
            className="w-full border rounded-xl p-4"
            required
          >

            <option value="">
              Select Slot
            </option>

            {(slots[
              formData
                .doctorName
            ] || []).map(
              (
                slot
              ) => (

                <option
                  key={slot}
                  value={slot}
                >
                  {slot}
                </option>

              )
            )}

          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-semibold"
          >
            Book Appointment
          </button>

        </form>

      </div>

    </div>

  );
}

export default BookAppointment;