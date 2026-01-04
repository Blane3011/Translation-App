import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Environment variables
const ONESIGNAL_API_KEY = process.env.ONESIGNAL_API_KEY;
const ONESIGNAL_APP_ID = process.env.APP_ID;

// CORS - only allows requests from the PWA domain
const allowedOrigins = ["https://blane3011.github.io"];

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://blane3011.github.io");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // respond to preflight immediately
  }

  next();
});

//Route 1: Send OneSignal notification to alert user feature is not implemented
app.post("/api/send-notification", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch("https://onesignal.com/api/v1/notifications", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${ONESIGNAL_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        app_id: ONESIGNAL_APP_ID,
        template_id: "83e7abb0-1572-4a9d-a5eb-f0c970ea29a7",
        included_segments: ["All"]
      })
    });

    const data = await response.json();
    res.setHeader("Access-Control-Allow-Origin", "https://blane3011.github.io");
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}); 

//Starts the server 
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));