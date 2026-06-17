require("dotenv").config();

const express =
  require("express");

const cors =
  require("cors");

const connectDB =
  require("./config/db");

const authRoutes =
  require("./routes/authRoutes");

const appointmentRoutes =
  require("./routes/appointmentRoutes");

const queueRoutes =
  require("./routes/queueRoutes");

const agentRoutes =
  require("./routes/agentRoutes");

const reminderRoutes =
require(
  "./routes/remainderRoutes"
);

require("./jobs/remainderJob");

const app =
  express();

connectDB();

app.use(cors());

app.use(express.json());

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/queue",
  queueRoutes
);

app.use(
  "/api/appointments",
  appointmentRoutes
);

app.use(
  "/api/agent",
  agentRoutes
);

app.use(
  "/api/remainder",
  reminderRoutes
);

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server Running on ${PORT}`
  );

});