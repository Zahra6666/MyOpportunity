const { GoogleGenAI } = require("@google/genai");
const opportunityRepository = require("../opportunities/opportunity.repository");
const cvRepository = require("../cvs/cv.repository");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function matchCvWithOpportunity(userId, opportunityId) {
  const cv = await cvRepository.getCvByUserId(userId);

  if (!cv) {
    throw new Error("CV not found");
  }

  const opportunity = await opportunityRepository.findById(opportunityId);

  if (!opportunity) {
    throw new Error("Opportunity not found");
  }

  return generateMatch(cv, opportunity);
}

async function matchCvWithAllOpportunities(userId) {
  const cv = await cvRepository.getCvByUserId(userId);

  if (!cv) {
    throw new Error("CV not found");
  }

  const opportunities = await opportunityRepository.findAll();

  const results = [];

  for (const opportunity of opportunities) {
    const match = await generateMatch(cv, opportunity);

    results.push({
      opportunity_id: opportunity.id,
      title: opportunity.title,
      company_name: opportunity.company_name,
      match_percentage: match.match_percentage,
      matched_skills: match.matched_skills,
      missing_skills: match.missing_skills,
      experience_match: match.experience_match,
      education_match: match.education_match,
      reason: match.reason,
    });
  }

  return results;
}

async function generateMatch(cv, opportunity) {
  const prompt = `
Compare this candidate's CV data with this opportunity.

CANDIDATE:
${JSON.stringify({
  skills: cv.skills || [],
  experience_years: cv.experience_years || 0,
  education: cv.education || "",
})}

OPPORTUNITY:
${JSON.stringify({
  title: opportunity.title,
  description: opportunity.description,
  requirements: opportunity.requirements || "",
})}

Return ONLY valid JSON with exactly these fields:

{
  "match_percentage": 0,
  "matched_skills": [],
  "missing_skills": [],
  "experience_match": false,
  "education_match": false,
  "reason": ""
}

Rules:
- Compare skills by meaning, not exact spelling.
- Treat common equivalents such as "JS" and "JavaScript" as the same skill.
- Do not consider unrelated skills to be matches.
- Compare the candidate's experience with the experience required by the opportunity.
- Consider related educational fields when the opportunity allows a related degree.
- Do not invent information that is not present in either the CV data or opportunity.
- match_percentage must be between 0 and 100.
- matched_skills must contain skills from the opportunity that the candidate satisfies.
- missing_skills must contain required skills that the candidate does not have.
- Return JSON only.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });

  return JSON.parse(response.text);
}

module.exports = {
  matchCvWithOpportunity,
  matchCvWithAllOpportunities,
};
