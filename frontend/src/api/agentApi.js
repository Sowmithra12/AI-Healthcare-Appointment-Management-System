import axios from "axios";

const API =
  "http://localhost:5000/api/agent";

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