require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const queueRoutes = require("./routes/queueRoutes");
const agentRoutes = require("./routes/agentRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const chatRoutes = require("./routes/chatRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/queue", queueRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/agent", agentRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/chat",chatRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;

async function startServer() {

    await connectDB();

    app.listen(PORT, () => {

        console.log(`Server Running on ${PORT}`);

        require("./schedulers/remainderScheduler");

    });

}

startServer();