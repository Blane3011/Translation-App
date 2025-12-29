import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const PORT = 3000;

API_Key = "1_YbsRg5HZBg2yXDF5Y7C0PCaey";
API_URL = "https://smartcat.ai/api/integration/v1/translate/text"
API_User = "de98bb98-4f83-44e7-9b40-3366d61f8a82"

const app = express();
app.use(cors());
app.use(express.json());

app.post("/translate", async (req, res) => {
  const { text, target } = req.body;

  const response = await fetch("https://smartcat.ai/api/integration/v1/translate/text", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Basic " + Buffer.from(API_User + ":" + API_Key).toString("base64")
    },
    body: JSON.stringify({
      texts: text,
      targetLanguages: target,
      sourceLanguage: "en"
    })
  });

  const data = await response.json();
  res.json(data);
});

app.listen(PORT, () => console.log("Server running on port 3000"));
