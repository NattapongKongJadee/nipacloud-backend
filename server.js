require("dotenv").config();
const express = require("express");
const ticketsRouter = require("./routes/tickets");
const app = express();
const cors = require("cors");
const portBackend = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use("/api/tickets", ticketsRouter);

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

// Start server
app.listen(portBackend, () => {
  console.log(`Server is running on http://localhost:${portBackend}`);
});
