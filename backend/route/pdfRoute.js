import express from "express";
import multer from "multer";
import { getPDFbyUserID, storePDF, getallPDF } from "../model/pdf.js";

const pdfRoute = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

pdfRoute.get("/getbyUserID", async (req, res) => {
  try {
    const { user_id } = req.query;
    if (!user_id) {
      throw new Error("user_id is required");
    }

    const pdflist = await getPDFbyUserID(user_id);
    res.status(200).json(pdflist);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

pdfRoute.post("/storePDF", upload.single("pdf_file"), async (req, res) => {
  try {
    const { pdf_name, user_id, summary } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: "PDF file is required." });
    }

    const pdf_file = req.file.buffer;
    const newPDF = await storePDF(pdf_name, pdf_file, user_id, summary);
    res.status(200).json(newPDF);
  } catch (error) {
    console.error("Error uploading PDF:", error.message);
    res.status(500).json({ message: "Server error. Could not upload PDF." });
  }
});

pdfRoute.get("/getall", async (req, res) => {
  try {
    const pdflist = await getallPDF();
    res.status(200).json(pdflist);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export default pdfRoute;
