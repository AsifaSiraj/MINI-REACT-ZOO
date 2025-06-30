// server.js
import express from "express";
import fetch from "node-fetch"; // or "undici" in newer Node

const app = express();
const PORT = 5000;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/quote", async (req, res) => {
  try {
    const response = await fetch("https://zenquotes.io/api/random");
    const data = await response.json();
    res.json(data[0]); // send first object
  } catch (e) {
    res.status(500).json({ q: "Error fetching quote", a: "Server" });
  }
});

app.listen(PORT, () =>
  console.log(`Proxy server running on http://localhost:${PORT}`)
);
