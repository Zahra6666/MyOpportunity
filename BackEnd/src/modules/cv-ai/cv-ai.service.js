const { GoogleGenAI } = require("@google/genai");
const cvRepository = require("../cvs/cv.repository");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function extractCvInfo(userId, parsedText) {
  const prompt = `
Analyze the following CV text and extract the candidate's information.

Return ONLY valid JSON with exactly these fields:

{
  "full_name": "string",
  "email": "string",
  "phone": "string",
  "skills": ["string"],
  "experience_years": 0,
  "education": "string"
}

Rules:
- Extract information only from the CV.
- Do not invent missing information.
- If a field is missing, use an empty string.
- If no skills are found, return an empty array.
- experience_years must be a number.
- Return JSON only.

CV TEXT:
${parsedText}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });

  const cvInfo = JSON.parse(response.text);

  await cvRepository.updateCvAiData(
    userId,
    cvInfo.skills,
    cvInfo.experience_years,
    cvInfo.education,
  );

  return cvInfo;
}

module.exports = {
  extractCvInfo,
};
