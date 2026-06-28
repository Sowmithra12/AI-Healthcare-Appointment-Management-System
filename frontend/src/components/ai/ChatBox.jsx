import axios from "axios";
import {
  useState,
  useEffect
} from "react";
import {
  sendAgentMessage
}
from "../../api/agentApi";

function ChatBox() {
  const [messages, setMessages] = useState([]);

  const [loading, setLoading] =
    useState(false);
  
  const [message, setMessage] = useState("");

  const [bookingState, setBookingState] =
useState(() => {

    const saved =
        localStorage.getItem(
            "bookingState"
        );

    return saved
        ? JSON.parse(saved)
        : {};

});

useEffect(() => {

    localStorage.setItem(

        "bookingState",

        JSON.stringify(
            bookingState
        )

    );

}, [bookingState]);

    const getTime = () =>
  new Date().toLocaleString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  const loadConversation = async () => {

  try {

    const user =
      JSON.parse(
        localStorage.getItem("user")
      );

    const response =
      await axios.get(

        `http://localhost:5000/api/chat/${user._id}`

      );

    if (
      response.data.messages.length > 0
    ) {

      setMessages(
        response.data.messages
      );

    }

    else {

      setMessages([

        {

          sender: "ai",

          text:
            "👋 Welcome to AI Healthcare Concierge.\n\nI can help you with:\n• Appointment Booking\n• Rescheduling\n• Cancellation\n• Queue Information\n• Doctor Recommendations",

          timestamp:
            getTime()

        }

      ]);

    }

  }

  catch (error) {

    console.log(error);

  }

};

useEffect(() => {

    loadConversation();

}, []);

useEffect(() => {

    localStorage.setItem(
      "bookingState",
      JSON.stringify(bookingState)
    );

  }, [bookingState])

  const handleSend =
  async () => {

    if (!message.trim())
      return;

    const user =
      JSON.parse(
        localStorage.getItem(
          "user"
        )
      );

   const userMessage = {
  sender: "user",
  text: message,
  timestamp:
    getTime()
};

    setMessages(prev => [
      ...prev,
      userMessage,
    ]);

    setLoading(true);

    try {

      console.log(
  "BOOKING STATE BEFORE SEND:",
  bookingState
);
      const result =
        await sendAgentMessage(
          message,
          bookingState,
          user._id
        );
        if (result.state) {
  setBookingState(
    result.state
  );
}

if (
  result.action ===
  "ASK_RESCHEDULE_OR_CANCEL"
) {

  setMessages(prev => [

    ...prev,

    {

      sender: "ai",

      text:
        result.reply,

      actions: [
        "RESCHEDULE",
        "CANCEL"
      ],
       timestamp:
    getTime()

    }

  ]);

}

      if (
  result.action ===
  "ASK_SPECIALIZATION"
) {

  setMessages(prev => [
    ...prev,
    {
      sender: "ai",
      text:
        result.reply,

      specializations:
        result.specializations,
       timestamp:
    getTime()
    },
  ]);

}
else if (
  result.action ===
  "SHOW_APPOINTMENTS"
) {

  setMessages(prev => [

    ...prev,

    {

      sender: "ai",

      text:
        "Select Appointment",

      appointments:
        result.appointments,
       timestamp:
    getTime()

    }

  ]);

}

else if (
  result.action ===
  "SHOW_RESCHEDULE_SLOTS"
) {

  setMessages(prev => [

    ...prev,

    {

      sender: "ai",

      text:
        "Select New Slot",

      slots:
        result.slots,

      isReschedule:
        true,
         timestamp:
    getTime()

    }

  ]);

}

else if (
  result.action ===
  "RESCHEDULED"
) {

  setMessages(prev => [

    ...prev,

    {

      sender: "ai",

      text:
        result.reply,
       timestamp:
    getTime()

    }

  ]);

  setBookingState({});
  localStorage.removeItem(
  "bookingState"
);

}

      else if (
        result.action ===
        "SHOW_DOCTORS"
      ) {

        setMessages(prev => [
          ...prev,
          {
            sender:"ai",
            text:
              "Available Doctors",
            doctors:
              result.doctors,
             timestamp:
    getTime()
          },
        ]);

      }
      else if (

    result.action ===
    "DOCTOR_UNAVAILABLE"

){

    setMessages(prev => [

        ...prev,

        {

            sender:"ai",

            text:
            result.reply,

            doctors:
            result.doctors,

            timestamp:
            getTime()

        }

    ]);

}

      else if (
        result.action ===
        "SHOW_SLOTS"
      ) {

        setMessages(prev => [
          ...prev,
          {
            sender:"ai",
            text:
              "Available Slots",
            slots:
              result.slots,
             timestamp:
    getTime()
          },
        ]);

      }
      else if (

    result.action ===
    "SLOT_ALREADY_BOOKED"

) {

    setMessages(prev => [

        ...prev,

        {

            sender: "ai",

            text: result.reply,

            slots: result.slots,

            timestamp: getTime()

        }

    ]);

}

      else if (

  result.action ===
  "SHOW_CANCEL_APPOINTMENTS"

) {

  setMessages(prev => [

    ...prev,

    {

      sender:"ai",

      text:
        "Select Appointment To Cancel",

      cancelAppointments:
        result.appointments,
       timestamp:
    getTime()

    }

  ]);

}

else if (

  result.action ===
  "CONFIRM_CANCEL"

) {

  setMessages(prev => [

    ...prev,

    {

      sender:"ai",

      text:
        "Are you sure?",

      confirmations:
        ["YES","NO"],
       timestamp:
    getTime()

    }

  ]);

}

else if (

  result.action ===
  "QUEUE_STATUS"

) {

  setMessages(prev => [

    ...prev,

    {

      sender:"ai",

      text:
        result.reply,
       timestamp:
    getTime()

    }

  ]);

}
else if (
  result.action === "NO_QUEUE"
) {

  setMessages(prev => [

    ...prev,

    {

      sender: "ai",

      text: result.reply,

      timestamp: getTime()

    }

  ]);

}

else if (
  result.action === "ERROR"
) {

  setMessages(prev => [

    ...prev,

    {

      sender: "ai",

      text: result.reply,

      timestamp: getTime()

    }

  ]);

}

else if (

  result.action ===
  "SHOW_RECOMMENDED_DOCTORS"

) {

  setMessages(prev => [

    ...prev,

    {

      sender: "ai",

      text:
        `Recommended Specialization: ${result.specialization || "Unknown"}`,

      doctors:
        result.doctors,
       timestamp:
    getTime()

    }

  ]);

}

if (
  result.action ===
  "SELECT_QUEUE_APPOINTMENT"
) {

  setMessages(prev => [

    ...prev,

    {

      sender: "ai",

      text:
        "Which appointment are you asking about?",

      queueAppointments:
        result.appointments,
       timestamp:
    getTime()

    }

  ]);

}

else if (
  result.action ===
  "CANCELLED"
) {

  setBookingState({});

  setMessages(prev => [

    ...prev,

    {

      sender:"ai",

      text:
        result.reply,
       timestamp:
    getTime()

    }

  ]);

  setBookingState({});
  localStorage.removeItem(
  "bookingState"
);

}

      else if (
        result.action ===
        "BOOKED"
      ) {

        setMessages(prev => [
          ...prev,
          {
            sender:"ai",
            text:
              "✅ Appointment Booked Successfully",
             timestamp:
    getTime()
          },
        ]);

       setBookingState({});
  localStorage.removeItem(
  "bookingState"
);

  window.dispatchEvent(
    new Event("appointmentUpdated")
  );

      }

    } catch (error) {

      console.log(error);

    }

    setMessage("");

    setLoading(false);

  };

  const handleAppointmentSelect =
async (appointmentId) => {

  console.log(
    "SELECTED APPOINTMENT ID:",
    appointmentId
  );

  const user =
    JSON.parse(
      localStorage.getItem(
        "user"
      )
    );

  console.log(
    "CURRENT BOOKING STATE:",
    bookingState
  );

  const result =
    await sendAgentMessage(

      appointmentId,

      bookingState,

      user._id

    );

  console.log(
    "APPOINTMENT SELECT RESPONSE:",
    result
  );

  if (result.state) {

    setBookingState(
      result.state
    );

  }

  setMessages(prev => [

    ...prev,

    {
      sender: "user",
      text:
        "Selected Appointment",
        timestamp: getTime()
    },

    {
      sender: "ai",
      text:
        "Select New Slot",

      slots:
        result.slots,

      isReschedule:
        true,
    },

  ]);

};
const handleCancelAppointment =
async (
  appointmentId
) => {

  console.log(
  "SELECTED CANCEL APPOINTMENT:",
  appointmentId
);

  const user =
    JSON.parse(
      localStorage.getItem(
        "user"
      )
    );

  const result =
    await sendAgentMessage(

      appointmentId,

      bookingState,

      user._id

    );

  if (
    result.state
  ) {

    setBookingState(
      result.state
    );

  }

  setMessages(prev => [

    ...prev,

    {

      sender: "user",

      text:
        "Selected Appointment",
        timestamp: getTime()

    },

    {

      sender: "ai",

      text:
        "Are you sure?",

      confirmations:
        ["YES", "NO"]

    }

  ]);

};

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

      {/* HEADER */}

      <div className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 text-white p-5">

        <h2 className="text-2xl font-bold">
          AI Healthcare Concierge
        </h2>

        <p className="text-sm opacity-90 mt-1">
          Appointment • Rescheduling • Queue • Doctor Assistant
        </p>

        <div className="flex items-center gap-2 mt-3">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>

          <span className="text-xs">
            AI Concierge Online
          </span>
        </div>

      </div>

      {/* QUICK ACTIONS */}

      <div className="flex flex-wrap gap-2 p-4 border-b bg-slate-50">

        <button
          onClick={() =>
            setMessage(
              "When is my appointment?"
            )
          }
          className="px-3 py-2 rounded-xl bg-blue-100 text-blue-700 text-sm hover:bg-blue-200 transition"
        >
          My Appointment
        </button>

        <button
          onClick={() =>
            setMessage(
              "I am busy tomorrow"
            )
          }
          className="px-3 py-2 rounded-xl bg-cyan-100 text-cyan-700 text-sm hover:bg-cyan-200 transition"
        >
          Reschedule
        </button>

        <button
          onClick={() =>
            setMessage(
              "Cancel my appointment"
            )
          }
          className="px-3 py-2 rounded-xl bg-red-100 text-red-700 text-sm hover:bg-red-200 transition"
        >
          Cancel
        </button>

        <button
          onClick={() =>
            setMessage(
              "What is my queue position?"
            )
          }
          className="px-3 py-2 rounded-xl bg-green-100 text-green-700 text-sm hover:bg-green-200 transition"
        >
          Queue Status
        </button>

      </div>

      {/* CHAT AREA */}

      <div className="h-[500px] overflow-y-auto p-5 bg-slate-50">

        {messages.map((msg, index) => (

  <div
    key={index}
    className={`mb-4 flex ${
      msg.sender === "user"
        ? "justify-end"
        : "justify-start"
    }`}
  >

    <div
      className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${
        msg.sender === "user"
          ? "bg-blue-600 text-white"
          : "bg-white border border-slate-200 text-slate-800"
      }`}
    >

<p className="whitespace-pre-line">
  {msg.text}
</p>

{
  msg.timestamp && (

    <p className="text-xs mt-2 opacity-60 text-right">

      {msg.timestamp}

    </p>

  )
}
      {
  msg.actions && (

    <div className="mt-4 flex gap-2">

      {msg.actions.map(
        (action, index) => (

<button
  key={index}
  onClick={() => {

    setMessage(action);

    setTimeout(() => {

      document
        .getElementById(
          "agent-send-btn"
        )
        ?.click();

    }, 100);

  }}
  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
>
  {action}
</button>

        )
      )}

    </div>

  )
}

{
  msg.appointments && (

    <div className="mt-4 space-y-3">

      {msg.appointments.map(
        appointment => (

          <div
            key={appointment._id}
            className="border p-4 rounded-xl"
          >

            <h3>
              {
                appointment.doctorName
              }
            </h3>

            <p>
              {
                appointment.appointmentSlot
              }
            </p>

            <button
  onClick={() =>
    handleAppointmentSelect(
      appointment._id
    )
  }
  className="bg-green-600 text-white px-4 py-2 rounded-lg mt-2"
>
  Select
</button>

          </div>

        )
      )}

    </div>

  )
}

      {/* SPECIALIZATIONS */}

      {msg.specializations &&
        msg.specializations.length > 0 && (

          <div className="mt-4 flex flex-wrap gap-2">

            {msg.specializations.map(
              (spec, index) => (

                <button
                  key={index}
                  onClick={() => {

                    setMessage(spec);

                    setTimeout(() => {
                      document
                        .getElementById(
                          "agent-send-btn"
                        )
                        ?.click();
                    }, 100);

                  }}
                  className="bg-blue-100 text-blue-700 px-3 py-2 rounded-lg hover:bg-blue-200"
                >
                  {spec}
                </button>

              )
            )}

          </div>

        )}

{/* DOCTORS */}

{msg.doctors &&
  msg.doctors.length > 0 && (

    <div className="mt-4 space-y-2">

      {msg.doctors.map((doctor) => (

        <button
          key={doctor._id}
          disabled={
            doctor.availabilityStatus === "ABSENT"
          }
          onClick={() => {

            setMessage(
              doctor.name
            );

            setTimeout(() => {

              document
                .getElementById(
                  "agent-send-btn"
                )
                ?.click();

            }, 100);

          }}
          className={`block w-full text-left p-3 rounded-lg border transition

            ${
              doctor.availabilityStatus === "ABSENT"
                ? "bg-gray-100 border-gray-300 cursor-not-allowed opacity-70"
                : "bg-green-100 hover:bg-green-200 border-green-200"
            }

          `}
        >

          <div className="font-semibold">

            {doctor.name}

          </div>

          <div className="text-sm text-gray-600">

            {doctor.specialization}

          </div>

          {doctor.availabilityStatus === "ABSENT" && (

            <div className="mt-1 text-sm font-medium text-red-600">

              🚫 Doctor currently unavailable

            </div>

          )}

        </button>

      ))}

    </div>

)}

        {
  msg.cancelAppointments && (

    <div className="mt-4 space-y-3">

      {msg.cancelAppointments.map(
        appointment => (

          <div
            key={appointment._id}
            className="border rounded-xl p-4"
          >

            <h3>
              {appointment.doctorName}
            </h3>

            <p>
              {appointment.appointmentSlot}
            </p>

            <button
              onClick={() =>
                handleCancelAppointment(
                  appointment._id
                )
              }
              className="bg-red-600 text-white px-4 py-2 rounded-lg mt-2"
            >
              Cancel This
            </button>

          </div>

        )
      )}

    </div>

  )
}

{
  msg.queueAppointments && (

    <div className="mt-4 space-y-3">

      {msg.queueAppointments.map(
        appointment => (

          <div
            key={appointment._id}
            className="border rounded-xl p-4"
          >

            <h3 className="font-semibold">
              {appointment.doctorName}
            </h3>

            <p>
              {appointment.appointmentSlot}
            </p>

           <button

  onClick={() => {

    setMessage(
      appointment._id
    );

    setTimeout(() => {

      document
        .getElementById(
          "agent-send-btn"
        )
        ?.click();

    }, 100);

  }}

  className="bg-green-600 text-white px-4 py-2 rounded-lg mt-2"

>

  Select

</button>

          </div>

        )
      )}

    </div>

  )
}

{
  msg.confirmations && (

    <div className="mt-4 flex gap-2">

      {msg.confirmations.map(
        option => (

          <button

            key={option}

            onClick={() => {

              setMessage(
                option
              );

              setTimeout(() => {

                document
                  .getElementById(
                    "agent-send-btn"
                  )
                  ?.click();

              }, 100);

            }}

            className="bg-red-600 text-white px-4 py-2 rounded-lg"
          >

            {option}

          </button>

        )
      )}

    </div>

  )
}

      {/* SLOTS */}

{msg.slots &&
msg.slots.length > 0 && (

<div className="mt-4 space-y-2">

{msg.slots.map((slot,index)=>{
  const slotLabel =
    typeof slot === "string"
      ? slot
      : slot.label;

  return (
    <button
      key={index}
      onClick={() => {
        setMessage(slotLabel);
        setTimeout(() => {
          document
            .getElementById("agent-send-btn")
            ?.click();
        }, 100);
      }}
      className="block w-full text-left bg-purple-100 p-3 rounded-lg hover:bg-purple-200"
    >
      {slotLabel}
    </button>
  );
})}

</div>

)}

    </div>

  </div>

))}

        {loading && (

          <div className="flex justify-start">

            <div className="bg-white border rounded-2xl px-4 py-3 shadow-sm">
              🤖 AI is thinking...
            </div>

          </div>

        )}

      </div>

      {/* SUGGESTIONS */}

      <div className="px-5 py-3 border-t bg-slate-50">

        <p className="text-xs text-gray-500 mb-2">
          Suggested Questions
        </p>

        <div className="flex flex-wrap gap-2">

          <span className="text-xs px-3 py-1 bg-white border rounded-full">
            When is my appointment?
          </span>

          <span className="text-xs px-3 py-1 bg-white border rounded-full">
            I am busy tomorrow
          </span>

          <span className="text-xs px-3 py-1 bg-white border rounded-full">
            Cancel my appointment
          </span>

        </div>

      </div>

      {/* INPUT AREA */}

      <div className="p-4 flex gap-3 bg-white">

        <input
          type="text"
          value={message}
          onChange={(e) =>
            setMessage(
              e.target.value
            )
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          placeholder="Ask about appointments, doctors, queue status or rescheduling..."
          className="flex-1 border border-slate-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
  id="agent-send-btn"
  onClick={handleSend}
          disabled={loading}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:scale-105 transition text-white px-8 rounded-xl disabled:opacity-50"
        >
          Send
        </button>

      </div>

    </div>
  );
}

export default ChatBox;