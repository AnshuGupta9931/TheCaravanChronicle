import { Complaint } from "../models/complaint.js";
import {Parser} from "json2csv";
import PDFDocument from "pdfkit";

export const generateMonthlyComplaints = async (req, res) => {
  try {
    const { month, year } = req.query;

    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0, 23, 59, 59);

    const complaints = await Complaint.find({
      createdAt: { $gte: start, $lte: end }
    }).populate("citizen", "name email");

    res.json(complaints);
  } catch (err) {
    res.status(500).json({ error: "Error fetching monthly complaints" });
  }
};

export const exportMonthlyCSV = async (req, res) => {
  try {
    const { month, year } = req.query;

    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0, 23, 59, 59);

    const complaints = await Complaint.find({
      createdAt: { $gte: start, $lte: end }
    }).populate("citizen", "name email");

    const fields = ["_id", "type", "description", "status", "location", "citizen.name", "citizen.email", "createdAt"];
    const parser = new Parser({ fields });
    const csv = parser.parse(complaints);

    res.header("Content-Type", "text/csv");
    res.attachment(`complaints_${month}_${year}.csv`);
    res.send(csv);
  } catch (err) {
    res.status(500).json({ error: "Error generating CSV" });
  }
};

export const exportMonthlyPDF = async (req, res) => {
  try {
    const { month, year } = req.query;

    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0, 23, 59, 59);

    const complaints = await Complaint.find({
      createdAt: { $gte: start, $lte: end }
    }).populate("citizen", "name email");

    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=complaints_${month}_${year}.pdf`);
    
    doc.pipe(res);

    doc.fontSize(18).text(`Monthly Complaints Report - ${month}/${year}`, { align: "center" });
    doc.moveDown();

    complaints.forEach((c, idx) => {
      doc.fontSize(12).text(
        `${idx + 1}. ${c.type} | ${c.status}\n${c.description}\nLocation: ${c.location}\nCitizen: ${c.citizen?.name} (${c.citizen?.email})\nCreated At: ${c.createdAt}\n`
      );
      doc.moveDown();
    });

    doc.end();
  } catch (err) {
    res.status(500).json({ error: "Error generating PDF" });
  }
};




