import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ===== Middleware FIRST =====
app.use(express.json());

app.use(cors({
  origin: "https://blane3011.github.io",
  methods: ["POST"],
  allowedHeaders: ["Content-Type"]
}));

// ===== Health check (IMPORTANT for Render) =====
app.get("/", (req, res) => {
  res.send("Backend running");
});

// ===== OneSignal route =====
app.post("/api/send-notification", async (req, res) => {
  try {
    const response = await fetch("https://onesignal.com/api/v1/notifications", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${process.env.ONESIGNAL_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        app_id: process.env.APP_ID,
        template_id: "83e7abb0-1572-4a9d-a5eb-f0c970ea29a7",
        included_segments: ["All"]
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== Start server =====
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
