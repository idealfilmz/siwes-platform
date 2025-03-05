const express = require("express");
const jsonwebtoken = require("jsonwebtoken");
const app = express();
const router = express.Router();
const loghelper = require("../../helpers/logbookHelp");
const bcrypt = require("bcryptjs");
const db = require("../../datbase_handler/index");
const prisma = require("../../client");

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

    // Hash the password before saving
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
    return res
      .status(400)
      .json({ message: "No available supervisor with less than 20 students." });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error processing request" });
  }
});

router.get("/verify/", (req, res, next) => {
  const { id } = req.query;
  try {
    db.query(
      "SELECT * FROM logbook WHERE student_id =?",
      [id],
      (error, result) => {
        if (error) {
          res.status(500).json({ message: "database Error" });
          return;
        }
        const data = result;
        if (data.length == 0) {
          return res.status(401).json({ message: "nothing found", data: null });
        }

        return res.json({ message: "succesfully fetched", data: data });
      }
    );
  } catch {
    return res
      .status(400)
      .json({ messsage: "something went wrong!", data: null });
  }
});
router.post("/create-logbook", (req, res, next) => {
  const { establishment, institution, address, student_id } = req.body;

  // Check if all required fields are provided
  if (!establishment || !institution || !address || !student_id) {
    return res.status(400).json({ message: "Please complete all details" });
  }

  // Create a new log entry
  const CreateLog = new loghelper(
    establishment,
    institution,
    address,
    student_id
  );
  // Get the insert values
  let insert_values = CreateLog.Values();

  // Check if the student already has a logbook entry
  db.query(
    "SELECT * FROM logbook WHERE student_id = ?",
    [student_id],
    (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error checking logbook", error: err });
      }

      // If no record is found for this student, insert a new logbook entry
      if (result.length === 0) {
        db.query(
          "INSERT INTO logbook SET ?",
          [insert_values],
          (err, result) => {
            if (err) {
              return res
                .status(500)
                .json({ message: "Error inserting logbook", error: err });
            }
            return res.status(201).json({
              message: "Logbook created successfully",
              data: insert_values,
            });
          }
        );
      } else {
        // If a logbook entry exists, return a message
        return res
          .status(400)
          .json({ message: "Student already has a logbook entry" });
      }
    }
  );
});

// Get all related student under supervisor
// fetching code error here need to fixed
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
    console.error("Error:", error);
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

router.post("/get-logbook", (req, res, next) => {
  const { student_id } = req.query;
  db.query(
    "SELECT * FROM logbook WHERE student_id=?",
    [student_id],
    (err, resul) => {
      if (err) {
        res.json({ message: "an error occur" });
        return;
      }
      if (resul.length === 0) {
        return res.status(200).json({
          message: "Logbook created successfully",
          data: resul,
        });
      }

      return res.status(200).json({
        message: "Logbook created successfully",
        data: resul,
      });
    }
  );
});

router.get("/get-supervisor", async (req, res) => {
  try {
    const { student_id } = req.query;

    if (!student_id) {
      return res.status(400).json({ message: "Student ID is required" });
    }

    // Find the supervisor assigned to this student
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
    console.error("Error:", error);
    res.status(500).json({ message: "Error processing request" });
  }
});

module.exports = router;
