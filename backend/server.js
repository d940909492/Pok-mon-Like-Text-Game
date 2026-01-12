require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/trainer", require("./routes/trainer"));
app.use("/api/game", require("./routes/gameData"));

app.get("/", (req, res) => {
  res.json({ message: "Pokemon Game API is running!" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
