
const express = require('express')
const  router = express.Router();
const prisma = require("../client")
const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error("Only images are allowed"));
  },
  limits: { fileSize: 2 * 1024 * 1024 } 
});

// Upload single image and attach it to a weekly record


router.post("/upload-image-data", upload.single("image"), async (req, res) => {
  const { weeklyId} = req.body; 

  if (!weeklyId) {
    return res.status(400).json({ message: "Missing logbookId in request body." });
  }

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }

  try {
    const latestWeekly = await prisma.weekly.findFirst({
      where: { logbook_id: Number(weeklyId) },
      orderBy: { createdAt: "desc" }
    });

    if (latestWeekly.progress_file){
       return res.status(402).json({ message: "File already updated." });
    }

    if (!latestWeekly) {
      return res.status(404).json({ message: "No weekly entry found for this logbook." });
    }

    // Update the latest weekly entry with the image
    const updated = await prisma.weekly.update({
      where: { id: latestWeekly.id },
      data: { progress_file: req.file.filename }
    });

    return res.status(200).json({
      message: "Image uploaded successfully.",
      data: {
        filename: req.file.filename,
        path: req.file.path
      }
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Upload failed. Please try again later." });
  }
});
module.exports = router;
