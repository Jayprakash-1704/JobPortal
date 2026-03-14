import express from "express";
import multer from "multer";
import { createRequire } from "module";
import mammoth from "mammoth";
import isauthenticated from "../middlewares/isauth.js";
import {analyzeResume} from "../controllers/resumeAI.controller.js";

const require = createRequire(import.meta.url);
const router = express.Router();

const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post(
  "/check",
  isauthenticated,
  upload.single("resume"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "Resume file is required" });
      }

      const jobDescription = req.body.jobDescription || "";
      const resumeBuffer = req.file.buffer;
      let resumeText = "";

      // Enhanced PDF parsing with multiple strategies
      if (req.file.mimetype === "application/pdf") {
        resumeText = extractPdfText(resumeBuffer);
      }
      // DOCX
      else if (
        req.file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        const result = await mammoth.extractRawText({ buffer: resumeBuffer });
        resumeText = result.value || "";
      }
      else {
        return res.status(400).json({ error: "Only PDF or DOCX files allowed" });
      }

      // Clean and truncate
      resumeText = resumeText
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 8000);

      // Log for debugging
      console.log(`Extracted ${resumeText.split(' ').length} words from ${req.file.originalname}`);

      const AIResult = await analyzeResume(resumeText, jobDescription);
      res.json(AIResult);

    } catch (error) {
      console.error("Resume analysis error:", error);
      res.status(500).json({ 
        error: "Failed to analyze resume",
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
);

// Enhanced PDF text extraction
function extractPdfText(buffer) {
  // Try multiple encodings for best results
  const encodings = ['latin1', 'utf8', 'binary'];
  let bestText = '';
  let maxWords = 0;

  for (const encoding of encodings) {
    try {
      let text = buffer.toString(encoding)
        .replace(/\0/g, '')  // Null bytes
        .replace(/[\x00-\x1F\x7F-\x9F]/g, '')  // Control characters
        .replace(/[^\x20-\x7E\n\r\t]/g, ' ');  // Non-printable to spaces

      // Count meaningful words
      const words = text.split(/\s+/).filter(w => w.length > 2).length;
      
      if (words > maxWords && words > 10) {
        bestText = text.trim();
        maxWords = words;
      }
    } catch (e) {
      continue;
    }
  }

  // Fallback: Look for common resume patterns if no good text found
  if (maxWords < 20) {
    bestText = extractResumePatterns(buffer);
  }

  return bestText;
}

function extractResumePatterns(buffer) {
  const text = buffer.toString('latin1');
  const patterns = [
    /([A-Za-z]{2,50})\s+(\d{10}|\+\d{10})/g,  // Name + Phone
    /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g,  // Email
    /(Experience|Skills?|Education|Projects?|Summary|Objective|Contact)/gi  // Headers
  ];

  let extracted = ' ';
  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      extracted += match[0] + ' ';
    }
  }
  return extracted.trim() || "PDF appears to be image-based. Please use text-based PDF or DOCX.";
}

export default router;
