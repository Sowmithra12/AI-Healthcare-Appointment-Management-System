import axios from "axios";

const API =
    `${import.meta.env.VITE_API_URL}/admin`;

export const getDoctors =
async () => {

    const res =
    await axios.get(

        `${API}/doctors`

    );

    return res.data;

};

export const updateAvailability =
async (

    doctorId,

    availabilityStatus

) => {

    const res =
    await axios.put(

        `${API}/doctor/${doctorId}`,

        {

            availabilityStatus

        }

    );

    return res.data;

};