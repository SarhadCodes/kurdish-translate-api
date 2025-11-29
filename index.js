import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post("/translate", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "No text provided" });

    const response = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: text,
        source: "en",
        target: "ckb",
        format: "text"
      })
    });

    const data = await response.json();
    return res.json({
      translated: data.translatedText || text
    });

  } catch (error) {
    console.error("Translation error:", error);
    return res.json({ translated: req.body.text });
  }
});

app.get("/", (req, res) => {
  res.send("Kurdish Translation API is running successfully.");
});

app.listen(PORT, () => console.log("Server running on port", PORT));
