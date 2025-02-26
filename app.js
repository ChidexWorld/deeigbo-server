require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");

const PORT = process.env.PORT;

const app = express();

app.use(morgan("dev"));
app.use(compression());
app.use(helmet());
app.use(express.json());
app.use(cors()); // Allow Next.js frontend
// app.use(cors({ origin: "https://example.com" }));


app.use("/audio", express.static(path.join(__dirname, "audio")));

// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

const HF_API_KEY = process.env.HF_API_KEY;

// route from text to text
app.post("/translate", async (req, res) => {
  try {
    const { text } = req.body;

    console.log(text);
    if (!text) return res.status(400).json({ error: "Text is required" });

    // Call Hugging Face API (Replace with your actual API)
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/Helsinki-NLP/opus-mt-en-ig",
      { inputs: text },
      { headers: { Authorization: `Bearer ${HF_API_KEY}` } }
    );

    const translation =
      response.data[0]?.translation_text || "Translation failed";
    res.json({ translation });
  } catch (error) {
    console.error("Translation Error:", error.message);
    res.status(500).json({ error: "Translation service failed" });
  }
});

// 🎙️ Text-to-Speech Route
app.post("/tts", async (req, res) => {
  try {
    const { text, language } = req.body;

    // Select model based on language
    let model = "facebook/mms-tts-ibo"; // Default (Igbo)
    if (language === "en") model = "facebook/mms-tts-eng";

    const response = await axios.post(
      `https://api-inference.huggingface.co/models/${model}`,
      { inputs: text },
      {
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
        },
        responseType: "arraybuffer", // Get audio as binary data
      }
    );

    // Ensure 'audio' directory exists
    const audioDir = path.join(__dirname, "audio");
    if (!fs.existsSync(audioDir)) fs.mkdirSync(audioDir);

    // Generate unique filename
    const fileName = `audio_${Date.now()}.wav`;
    const filePath = path.join(audioDir, fileName);

    // Save the file
    fs.writeFileSync(filePath, response.data);

    // Send response with file URL
    res.json({ success: true, audio: fileName });

    // Delete file after 30 minute (to allow playback)
    setTimeout(() => {
      fs.unlink(filePath, (err) => {
        if (err) console.error("Error deleting file:", err);
        else console.log(`Deleted: ${fileName}`);
      });
    }, 30000); // 30 seconds

  } catch (error) {
    console.error("TTS Error:", error.message);
    res.status(500).json({ error: "Failed to generate speech" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
