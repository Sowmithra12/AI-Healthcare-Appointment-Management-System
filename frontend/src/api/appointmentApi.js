import axios from "axios";

const API =
  `${import.meta.env.VITE_API_URL}/appointments`;

export const createAppointment =
  async (data) => {

    const response =
      await axios.post(
        `${API}/create`,
        data
      );

    return response.data;
  };

export const getCurrentAppointment =
  async (patientId) => {

    const response =
      await axios.get(
        `${API}/current?patientId=${patientId}`
      );

    return response.data;
  };

export const getPatientAppointments =
  async (patientId) => {

    const response =
      await axios.get(
        `${API}/patient/${patientId}`
      );

    return response.data;
  };

export const rescheduleAppointment =
  async (
    appointmentId,
    doctorName,
    slot
  ) => {

    const response =
      await axios.put(
        `${API}/reschedule`,
        {
          appointmentId,
          doctorName,
          slot,
        }
      );

    return response.data;
  };

  export const getAppointmentHistory =
  async (patientId) => {

    const response =
      await axios.get(
        `${API}/history/${patientId}`
      );

    return response.data;
  };

  export const markAppointmentCompleted =
  async (
    appointmentId
  ) => {

    const response =
      await axios.put(
        `${API}/complete/${appointmentId}`
      );

    return response.data;
  };

  export const getDoctorAppointments =
async (
  doctorName
) => {

  const response =
    await axios.get(
      `${API}/doctor/${doctorName}`
    );

  return response.data;

};

export const
updateAppointmentStatus =
async (
  appointmentId,
  status
) => {

  const response =
    await axios.put(
      `${API}/status/${appointmentId}`,
      {
        status,
      }
    );

  return response.data;

};

export const
getPatientHistory =
async (
  patientId
) => {

  const response =
    await axios.get(
      `${API}/patient-history/${patientId}`
    );

  return response.data;

};

export const
getDoctorAnalytics =
async (
  doctorName
) => {

  const response =
    await axios.get(
      `${API}/analytics/${doctorName}`
    );

  return response.data;

};