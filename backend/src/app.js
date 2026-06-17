const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const app = express();
const aiRoutes =
require("./routes/aiRoutes");

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);

module.exports = app;