import { useEffect, useState } from "react";
import {
    getDoctors,
    updateAvailability
} from "../../api/adminApi";

function AdminDashboard() {

    const [doctors, setDoctors] = useState([]);

    const loadDoctors = async () => {

        const data = await getDoctors();

        setDoctors(data);

    };

    useEffect(() => {

        loadDoctors();

    }, []);

    const changeAvailability = async (

        doctorId,

        currentStatus

    ) => {

        const newStatus =

            currentStatus === "AVAILABLE"

                ? "ABSENT"

                : "AVAILABLE";

        await updateAvailability(

            doctorId,

            newStatus

        );

        loadDoctors();

    };

    return (

        <div className="p-10">

            <h1 className="text-3xl font-bold mb-8">

                Doctor Availability

            </h1>

            <table className="w-full border">

                <thead>

                    <tr className="bg-gray-100">

                        <th className="p-3">

                            Doctor

                        </th>

                        <th>

                            Specialization

                        </th>

                        <th>

                            Status

                        </th>

                        <th>

                            Action

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {

                        doctors.map((doctor)=>(

                            <tr

                                key={doctor._id}

                                className="border-b"

                            >

                                <td className="p-3">

                                    {doctor.name}

                                </td>

                                <td>

                                    {doctor.specialization}

                                </td>

                                <td>

                                    {

                                        doctor.availabilityStatus==="AVAILABLE"

                                        ?

                                        <span className="text-green-600 font-bold">

                                            AVAILABLE

                                        </span>

                                        :

                                        <span className="text-red-600 font-bold">

                                            ABSENT

                                        </span>

                                    }

                                </td>

                                <td>

                                    <button

                                        onClick={()=>changeAvailability(

                                            doctor._id,

                                            doctor.availabilityStatus

                                        )}

                                        className="bg-blue-600 text-white px-4 py-2 rounded"

                                    >

                                        {

                                            doctor.availabilityStatus==="AVAILABLE"

                                            ?

                                            "Mark Absent"

                                            :

                                            "Mark Available"

                                        }

                                    </button>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default AdminDashboard;