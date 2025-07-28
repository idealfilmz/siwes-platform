const express = require("express");
const jsonwebtoken = require("jsonwebtoken");
const app = express();
const router = express.Router();
const loghelper = require("../../helpers/logbookHelp");
const bcrypt = require("bcryptjs");

const prisma = require("../../client");
const { where } = require("sequelize");

router.post("/create-account", async (req, res) => {
  try {
    const {
      fullname,
      password,
      matric_number,
      email,
      department,
      course,
      phone_number,
    } = req.body;

    // Validation for missing fields
    if (!fullname || !matric_number || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please fill all fields to continue" });
    }

    // Check if student already exists
    const existingStudent = await prisma.students.findUnique({
      where: { email },
    });

    if (existingStudent) {
      return res.status(400).json({ message: "matric number already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new student
    const newStudent = await prisma.students.create({
      data: {
        fullname,
        matric_number,
        email,
        department,
        course,
        password: hashedPassword,
        phone_number,
      },
    });
    return res.status(201).json({ message: "student created succesfully " });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error processing request" });
  }
});

router.get("/verify/", async (req, res, next) => {
  const { id } = req.query;
  try {
    const checkuser = await prisma.logbook.findMany({
      where: { id: id },
    });

    if (checkuser.length === 0) {
      return res.status(401).json({ message: "nothing found", data: null });
    }

    return res
      .status(200)
      .json({ message: "fetched succesfully", data: checkuser });
  } catch {
    return res
      .status(400)
      .json({ messsage: "something went wrong!", data: null });
  }
});

router.post("/create-logbook", async (req, res) => {
  const { establishment, institution, address, student_id } = req.body;

  // Check if all required fields are provided
  if (!establishment || !institution || !address || !student_id) {
    return res.status(400).json({ message: "Please complete all details" });
  }

  try {
    // Check if the student already has a logbook entry
    const existingLogbook = await prisma.logbook.findFirst({
      where: { student_id: Number(student_id) },
    });

    if (existingLogbook) {
      return res
        .status(400)
        .json({ message: "Student already has a logbook entry" });
    }

    // Create a new logbook entry
    const newLogbook = await prisma.logbook.create({
      data: {
        establishment,
        institution,
        address,
        student_id: Number(student_id),
      },
    });

    return res.status(201).json({
      message: "Logbook created successfully",
      data: newLogbook,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating logbook", error: error.message });
  }
});

router.get("/get-supervisor-details", async (req, res, next) => {
  const { student_id } = req.query; // Ensure the correct spelling 'req.query'
  try {
    const studentSupervisor = await prisma.studentSupervisor.findFirst({
      where: { std_id: Number(student_id) },
      include: {
        supervisor: true, // Include supervisor details
      },
    });

    if (!studentSupervisor) {
      return res
        .status(404)
        .json({ message: "No supervisor assigned to this student" });
    }

    res.json(studentSupervisor.supervisor);
  } catch (error) {
    res.status(500).json({ message: "Error processing request" });
  }
});

// uploading of image sync.....%60 done
router.post("/upload-image", (req, res, next) => {
  const { address } = req.query;
  if (address) {
    res.json(address);
  } else {
    res.json({ test: "not working" });
  }
});

module.exports = router;
