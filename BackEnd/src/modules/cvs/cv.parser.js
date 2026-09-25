const fs = require("fs");
const path = require("path");
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

async function extractText(filePath, mimetype) {
  switch (mimetype) {
    case "application/pdf":
      return await extractPdfText(filePath);

    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return await extractDocxText(filePath);

    case "application/msword":
      return await extractDocText(filePath);

    case "image/jpeg":
    case "image/png":
      return await extractImageText(filePath);

    default:
      throw new Error("Unsupported CV file type");
  }
}

module.exports = {
  extractText,
};
