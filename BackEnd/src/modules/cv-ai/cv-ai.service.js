const { GoogleGenAI } = require("@google/genai");

const cvRepository = require("../cvs/cv.repository");

const GEMINI_MODEL =
  process.env.GEMINI_MODEL || "gemini-2.5-flash-lite";

const apiKey = process.env.GEMINI_API_KEY;

const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
    })
  : null;

/**
 * Make sure Gemini is configured.
 */
function ensureAiConfigured() {
  if (!apiKey || !ai) {
    const error = new Error("GEMINI_API_KEY is not configured");
    error.code = "CV_AI_CONFIG_ERROR";
    throw error;
  }
}

/**
 * Extract structured information from the user's CV.
 */
async function extractCvInfo(userId, parsedText) {
  ensureAiConfigured();

  if (!parsedText || !String(parsedText).trim()) {
    const error = new Error("CV text is empty");
    error.code = "EMPTY_CV_TEXT";
    throw error;
  }

  const prompt = `
You are a CV information extraction system.

Analyze the following CV text and extract only information
that is explicitly present in the CV.

Return ONLY valid JSON with exactly these fields:

{
  "full_name": "",
  "email": "",
  "phone": "",
  "skills": [],
  "experience_years": 0,
  "education": ""
}

RULES:

1. full_name:
   - Extract the candidate's full name if available.
   - If it is not available, return an empty string.

2. email:
   - Extract the email address if available.
   - If it is not available, return an empty string.

3. phone:
   - Extract the phone number if available.
   - If it is not available, return an empty string.

4. skills:
   - Return an array of relevant technical and professional skills
     explicitly mentioned in the CV.
   - Do not invent skills.
   - Remove duplicate skills.
   - If no skills are found, return [].

5. experience_years:
   - Return the estimated total years of professional experience
     only when the CV provides enough information.
   - Return 0 if experience information is unavailable.
   - Return a number only.

6. education:
   - Return the candidate's highest or most relevant educational
     qualification from the CV.
   - Do not invent a degree.
   - If unavailable, return an empty string.

7. Never invent information.

8. Return JSON only.
Do not use Markdown.
Do not wrap the JSON in code fences.

CV TEXT:
${String(parsedText).trim()}
`;

  const response = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      temperature: 0.1,
    },
  });

  const rawText =
    typeof response.text === "function"
      ? response.text()
      : response.text;

  const cvInfo = parseCvJson(rawText);

  const normalizedCvInfo = normalizeCvInfo(cvInfo);

  await cvRepository.updateCvAiData(
    userId,
    normalizedCvInfo.full_name,
    normalizedCvInfo.email,
    normalizedCvInfo.phone,
    normalizedCvInfo.skills,
    normalizedCvInfo.experience_years,
    normalizedCvInfo.education
  );

  return normalizedCvInfo;
}

/**
 * Safely parse Gemini JSON.
 */
function parseCvJson(text) {
  if (!text) {
    throw new Error("Gemini returned an empty CV analysis response");
  }

  let cleaned = String(text).trim();

  // Remove Markdown code fences if Gemini returns them.
  cleaned = cleaned
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch (error) {
    console.error("Invalid CV AI JSON response:", cleaned);

    const parseError = new Error(
      "Invalid JSON returned by CV analysis AI"
    );

    parseError.code = "INVALID_CV_AI_RESPONSE";

    throw parseError;
  }
}

/**
 * Normalize CV information before saving it.
 */
function normalizeCvInfo(data) {
  const experience = Number(data?.experience_years);

  return {
    full_name: normalizeText(data?.full_name),

    email: normalizeText(data?.email),

    phone: normalizeText(data?.phone),

    skills: normalizeSkills(data?.skills),

    experience_years:
      Number.isFinite(experience) && experience >= 0
        ? experience
        : 0,

    education: normalizeText(data?.education),
  };
}

/**
 * Normalize text values.
 */
function normalizeText(value) {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value).trim();
}

/**
 * Normalize skills.
 */
function normalizeSkills(skills) {
  if (!Array.isArray(skills)) {
    return [];
  }

  const cleanedSkills = skills
    .map((skill) => String(skill).trim())
    .filter(Boolean);

  // Remove duplicate skills without changing their original order.
  return [...new Set(cleanedSkills)];
}

module.exports = {
  extractCvInfo,
};