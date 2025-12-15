import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.get("/", (_req, res) => {
  res.send("Server running 🚀");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
