import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// ✅ ADD 'export' keyword here
export async function analyzeResume(resumeText, jobDescription) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
      generationConfig: {
        response_mime_type: "application/json",
        temperature: 0.1,
        max_output_tokens: 2000
      }
    });

    const prompt = `
Analyze this resume against the job description.

Resume: ${resumeText}
Job Description: ${jobDescription}

${handleScannedPdfDetection(resumeText)}

Return VALID JSON only (no markdown, no explanations):
{
  "atsScore": 0-100,
  "matchedSkills": ["skill1", "skill2"],
  "unmatchedSkills": ["required1", "required2"], 
  "strengths": ["strength1", "strength2"],
  "weaknesses": ["weakness1"],
  "recommendations": ["action1", "action2"]
}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();

    const analysis = JSON.parse(text);
    
    if (!analysis.atsScore || analysis.atsScore > 100) {
      throw new Error("Invalid score format");
    }
    
    return analysis;

  } catch (error) {
    console.error("Gemini parsing error:", error);
    return {
      atsScore: detectBasicMatch(resumeText, jobDescription),
      matchedSkills: [],
      unmatchedSkills: [],
      strengths: [],
      weaknesses: getFallbackWeaknesses(resumeText),
      recommendations: ["Please use DOCX format for best results"]
    };
  }
}

// Helper functions (no export needed)
function handleScannedPdfDetection(text) {
  const wordCount = text.split(/\s+/).filter(w => w.length > 2).length;
  const hasResumeKeywords = /(experience|skills?|education|project|summary)/i.test(text);
  
  if (wordCount < 20 || !hasResumeKeywords) {
    return `
🚨 SCANNED PDF DETECTED: This appears to be an image-based PDF.
80% of ATS systems reject scanned resumes.
SOLUTION: Use DOCX or "Save as PDF" from Microsoft Word.
    `;
  }
  return "";
}

function detectBasicMatch(resume, job) {
  if (resume.length < 100) return 10;
  const commonWords = job.toLowerCase().split(/\s+/).filter(w => w.length > 4);
  const resumeWords = resume.toLowerCase().split(/\s+/);
  let matches = 0;
  
  for (let word of commonWords) {
    if (resumeWords.some(rw => rw.includes(word))) matches++;
  }
  
  return Math.min(100, Math.max(10, matches * 15));
}

function getFallbackWeaknesses(text) {
  if (text.length < 100) {
    return ["PDF appears to be scanned/image-based - not readable by ATS systems"];
  }
  return ["Unable to perform detailed analysis - please try DOCX format"];
}
