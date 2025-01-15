const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const natural = require("natural");
const cors = require("cors");

const app = express();
const upload = multer({ storage: multer.memoryStorage() });
app.use(cors());
app.use(express.json());

app.post("/check-resume", upload.single("resume"), async (req, res) => {
  try {
    const jobDescription = req.body.jobDescription;
    const file = req.file;

    if (!file || !jobDescription) {
      return res.status(400).json({ message: "Resume or Job Description missing" });
    }

    // Extract text from the PDF resume
    const resumeText = await pdfParse(file.buffer).then((data) => data.text);

    // Tokenize and compute similarity
    const tokenizer = new natural.WordTokenizer();
    const resumeTokens = tokenizer.tokenize(resumeText.toLowerCase());
    const jobTokens = tokenizer.tokenize(jobDescription.toLowerCase());

    const similarity = natural.JaroWinklerDistance(
      resumeTokens.join(" "),
      jobTokens.join(" ")
    );

    // Respond with similarity score
    res.json({ matchScore: (similarity * 100).toFixed(2) });
  } catch (error) {
    console.error("Error processing resume:", error);
    res.status(500).json({ message: "Error processing resume" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
