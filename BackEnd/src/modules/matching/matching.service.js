const { GoogleGenAI } = require("@google/genai");

const opportunityRepository = require("../opportunities/opportunity.repository");
const cvRepository = require("../cvs/cv.repository");

const GEMINI_MODEL =
  process.env.GEMINI_MODEL || "gemini-2.5-flash-lite";

const apiKey = process.env.GEMINI_API_KEY;

const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
    })
  : null;

function ensureAiConfigured() {
  if (!apiKey || !ai) {
    const error = new Error("GEMINI_API_KEY is not configured");
    error.code = "MATCHING_CONFIG_ERROR";
    throw error;
  }
}

async function matchCvWithOpportunity(userId, opportunityId) {
  const cv = await cvRepository.getCvByUserId(userId);

  if (!cv) {
    const error = new Error("CV not found");
    error.code = "CV_NOT_FOUND";
    throw error;
  }

  const opportunity =
    await opportunityRepository.findById(opportunityId);

  if (!opportunity) {
    const error = new Error("Opportunity not found");
    error.code = "OPPORTUNITY_NOT_FOUND";
    throw error;
  }

  return generateMatch(cv, opportunity);
}

async function matchCvWithAllOpportunities(userId) {
  const cv = await cvRepository.getCvByUserId(userId);

  if (!cv) {
    const error = new Error("CV not found");
    error.code = "CV_NOT_FOUND";
    throw error;
  }

  const opportunities =
    await opportunityRepository.findAll();

  if (
    !Array.isArray(opportunities) ||
    opportunities.length === 0
  ) {
    return [];
  }

  const results = [];

  for (const opportunity of opportunities) {
    const match = await generateMatch(cv, opportunity);

    results.push({
      opportunity_id: opportunity.id,
      title: opportunity.title || "",
      company_name: opportunity.company_name || "",

      match_percentage: match.match_percentage,

      matched_skills: match.matched_skills,

      missing_skills: match.missing_skills,

      experience_match: match.experience_match,

      education_match: match.education_match,

      reason: match.reason,
    });
  }

  results.sort(
    (a, b) =>
      b.match_percentage - a.match_percentage
  );

  return results;
}

async function generateMatch(cv, opportunity) {
  ensureAiConfigured();

  const candidateData = {
    skills: normalizeArray(cv.skills),

    experience_years:
      normalizeNumber(cv.experience_years),

    education:
      normalizeText(cv.education),
  };

  const opportunityData = {
    title:
      normalizeText(opportunity.title),

    description:
      normalizeText(opportunity.description),

    requirements:
      normalizeText(opportunity.requirements),

    category:
      normalizeText(opportunity.category_name),

    type:
      normalizeText(opportunity.type_name),

    location:
      normalizeText(opportunity.location),
  };

  const prompt = `
You are an opportunity matching engine.

Compare the candidate's CV data with the opportunity.

CANDIDATE:
${JSON.stringify(candidateData, null, 2)}

OPPORTUNITY:
${JSON.stringify(opportunityData, null, 2)}

Return ONLY valid JSON with exactly these fields:

{
  "match_percentage": 0,
  "matched_skills": [],
  "missing_skills": [],
  "experience_match": false,
  "education_match": false,
  "reason": ""
}

RULES:

1. match_percentage:
- Integer from 0 to 100.
- Represents the overall compatibility.

2. Skills:
- Compare skills by meaning, not only exact spelling.
- "JS" and "JavaScript" are equivalent.
- "React.js" and "React" are equivalent.
- "Node" and "Node.js" are equivalent.
- Do not match unrelated skills.
- matched_skills must contain skills supported by the candidate.
- missing_skills must contain important required skills not supported
  by the candidate.

3. Experience:
- Compare candidate experience with the opportunity requirements.
- If no experience requirement exists, do not invent one.
- experience_match should be true only when the available information
  supports a match.

4. Education:
- Consider related educational fields when appropriate.
- Do not invent education.

5. Reason:
- Give a short explanation.
- Mention important matching skills when possible.
- Do not invent information.

6. Never invent skills, education, experience, certifications,
or opportunity requirements.

7. Return JSON only.
`;

  const response = await ai.models.generateContent({
    model: GEMINI_MODEL,

    contents: prompt,

    config: {
      responseMimeType: "application/json",
      temperature: 0.2,
    },
  });

  const rawText =
    typeof response.text === "function"
      ? response.text()
      : response.text;

  const parsed = parseGeminiJson(rawText);

  return normalizeMatchResult(parsed);
}

function parseGeminiJson(text) {
  if (!text) {
    throw new Error(
      "Gemini returned an empty response"
    );
  }

  let cleaned = String(text).trim();

  cleaned = cleaned
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch (error) {
    console.error(
      "Invalid Gemini JSON response:",
      cleaned
    );

    throw new Error(
      "Invalid JSON returned by matching AI"
    );
  }
}

function normalizeMatchResult(result) {
  const percentage =
    Number(result?.match_percentage);

  const matchPercentage =
    Number.isFinite(percentage)
      ? Math.max(
          0,
          Math.min(
            100,
            Math.round(percentage)
          )
        )
      : 0;

  return {
    match_percentage: matchPercentage,

    matched_skills:
      normalizeArray(result?.matched_skills),

    missing_skills:
      normalizeArray(result?.missing_skills),

    experience_match:
      result?.experience_match === true,

    education_match:
      result?.education_match === true,

    reason:
      normalizeText(result?.reason) ||
      "No matching reason was generated.",
  };
}

function normalizeArray(value) {
  if (Array.isArray(value)) {
    return value
      .map((item) => String(item).trim())
      .filter(Boolean);
  }

  if (typeof value === "string") {
    const trimmed = value.trim();

    if (!trimmed) {
      return [];
    }

    // PostgreSQL may return JSON/JSONB arrays as strings
    try {
      const parsed = JSON.parse(trimmed);

      if (Array.isArray(parsed)) {
        return parsed
          .map((item) => String(item).trim())
          .filter(Boolean);
      }
    } catch (error) {
      // Normal string, not JSON
    }

    return [trimmed];
  }

  return [];
}

function normalizeText(value) {
  if (
    value === null ||
    value === undefined
  ) {
    return "";
  }

  return String(value).trim();
}

function normalizeNumber(value) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return 0;
  }

  return number;
}

module.exports = {
  matchCvWithOpportunity,
  matchCvWithAllOpportunities,
};