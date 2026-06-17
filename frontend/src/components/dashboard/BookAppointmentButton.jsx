import {
  useNavigate,
} from "react-router-dom";

function BookAppointmentButton() {

  const navigate =
    useNavigate();

  return (

    <button
      onClick={() =>
        navigate(
          "/patient/book-appointment"
        )
      }
      className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg"
    >
      + Book New Appointment
    </button>

  );
}

export default BookAppointmentButton;