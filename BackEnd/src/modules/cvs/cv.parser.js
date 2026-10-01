const fs = require("fs");

const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const WordExtractor = require("word-extractor");
const Tesseract = require("tesseract.js");

async function extractPdfText(filePath) {
  const fileBuffer = fs.readFileSync(filePath);

  const parser = new pdfParse.PDFParse({ data: fileBuffer });
  const result = await parser.getText();
  await parser.destroy();

  return result.text;
}

async function extractDocxText(filePath) {
  const result = await mammoth.extractRawText({
    path: filePath,
  });

  return result.value;
}

async function extractDocText(filePath) {
  const extractor = new WordExtractor();
  const document = await extractor.extract(filePath);

  return document.getBody();
}

async function extractImageText(filePath) {
  const result = await Tesseract.recognize(filePath, "eng");

  return result.data.text;
}

function validateEnglishText(text) {
  const arabicCharacters = text.match(/[\u0600-\u06FF]/g);

  if (arabicCharacters && arabicCharacters.length > 0) {
    const error = new Error(
      "Arabic CVs are not supported. Please upload an English CV.",
    );

    error.statusCode = 400;
    error.code = "UNSUPPORTED_LANGUAGE";

    throw error;
  }
}

async function extractText(filePath, mimetype) {
  let text;

  switch (mimetype) {
    case "application/pdf":
      text = await extractPdfText(filePath);
      break;

    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      text = await extractDocxText(filePath);
      break;

    case "application/msword":
      text = await extractDocText(filePath);
      break;

    case "image/jpeg":
    case "image/png":
      text = await extractImageText(filePath);
      break;

    default:
      throw new Error("Unsupported CV file type");
  }

  validateEnglishText(text);

  return text;
}

module.exports = {
  extractText,
};
