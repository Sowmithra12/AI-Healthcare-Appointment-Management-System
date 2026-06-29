import axios from "axios";

const API =
  `${import.meta.env.VITE_API_URL}/agent`;

export const sendAgentMessage =
  async (
    message,
    state,
    patientId
  ) => {

    const response =
      await axios.post(
        `${API}/booking`,
        {
          message,
          state,
          patientId,
        }
      );

    return response.data;

  };