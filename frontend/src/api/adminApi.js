import axios from "axios";

const API =
    "http://localhost:5000/api/admin";

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