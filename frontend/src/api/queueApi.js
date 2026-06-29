import axios from "axios";

const API =
  `${import.meta.env.VITE_API_URL}/queue`;

export const getQueue =
  async (
    doctorName
  ) => {

    const response =
      await axios.get(
        `${API}/${doctorName}`
      );

    return response.data;

  };

export const nextPatient =
  async () => {

    const response =
      await axios.put(
        `${API}/next`
      );

    return response.data;

  };