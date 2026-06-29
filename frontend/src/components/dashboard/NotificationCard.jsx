import { useEffect, useState } from "react";
import axios from "axios";
const API =
  import.meta.env.VITE_API_URL;
import { sendAgentMessage } from "../../api/agentApi";

function NotificationCard() {

  const [notifications, setNotifications] =
    useState([]);

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  useEffect(() => {

    fetchNotifications();

  }, []);

  const fetchNotifications =
    async () => {

      try {

        const response =
  await axios.get(

    `${API}/notifications/${user._id}`

  );

        setNotifications(
          response.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  const handleAction =
    async (
      notification,
      action
    ) => {

      try {

const result =
  await sendAgentMessage(

    action,

    {

      flow: "confirm",

      appointmentId:
        notification.appointmentId

    },

    user._id

  );

if (
  result.action !== "CONFIRMED"
) {

  alert(result.reply);

  return;

}

await axios.put(

  `${API}/notifications/${notification._id}`,

  {

    actionTaken: action,

    read: true

  }

);

        setNotifications(
          prev =>
            prev.map(
              item =>

                item._id ===
                notification._id

                  ? {

                      ...item,

                      actionTaken:
                        action,

                      read: true

                    }

                  : item
            )
        );

      }

      catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="bg-white rounded-2xl shadow-md p-6">

      <h2 className="text-2xl font-bold mb-4">

        🔔 Notifications

      </h2>

      <div className="max-h-[400px] overflow-y-auto pr-2">

        {

          notifications.length === 0

          ? (

            <p>

              No notifications

            </p>

          )

          : (

            notifications.map(

              notification => (

                <div

                  key={notification._id}

                  className="border rounded-xl p-4"

                >

                  <div className="flex justify-between items-center">

                    <h3 className="font-bold text-lg">

                      {notification.title}

                    </h3>

                    {

                      notification.actionTaken && (

                        <span
                          className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700"
                        >

                          {notification.actionTaken}

                        </span>

                      )

                    }

                  </div>

                  <p className="mt-3 whitespace-pre-line">

                    {notification.message}

                  </p>

                 {
  !notification.actionTaken &&
  notification.type === "REMINDER" && (

    <div className="mt-4">

      <button
        onClick={() =>
          handleAction(
            notification,
            "CONFIRM"
          )
        }
        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
      >
        Confirm Appointment
      </button>

    </div>

  )
}

                </div>

              )

            )

          )

        }

      </div>

    </div>

  );

}

export default NotificationCard;