import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

//Loads in environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;
const allowedOrigin = "https://blane3011.github.io/Translation-App/"

API_Key = "1_YbsRg5HZBg2yXDF5Y7C0PCaey";
API_URL = "https://smartcat.ai/api/integration/v1/translate/text"
API_User = "de98bb98-4f83-44e7-9b40-3366d61f8a82"

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Access denied by CORS policy."));
    }
  }
}));

app.get("/API/GETKEYS", async (req, res) => {
  try {
    const response = await fetch("https://translation-app-7o5f.onrender.com", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: "Hello from Ewan Blane!",
        max_tokens: 50
      })
    });

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
        template_id: "83e7abb0-1572-4a9d-a5eb-f0c970ea29a7", // Your template ID
        included_segments: ["All"]
      })
    });

    const data = await response.json();
    res.json(data); // Send only API response, not your key
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

const ONESIGNAL_API_KEY = process.env.ONESIGNAL_API_KEY;
const ONESIGNAL_APP_ID = process.env.APP_ID;

app.listen(PORT, () => console.log("Server running on port 3000"));
