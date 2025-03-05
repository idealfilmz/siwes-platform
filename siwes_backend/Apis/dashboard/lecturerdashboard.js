const express = require("express");
const router = express.Router();
const prisma = require("../../client");

router.get("/lecturer-details", async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: "Lecturer ID is required" });
  }

  try {
    const lecturer = await prisma.supervisors.findUnique({
      where: { PK: Number(id) },
    });

    if (!lecturer) {
      return res.status(404).json({ message: "Lecturer not found" });
    }

    res.json(lecturer);
  } catch (error) {
    console.error("Error fetching lecturer details:", error);
    res.status(500).json({ message: "Error processing request" });
  }
});

// Route to fetch all students under a specific lecturer
router.get("/lecturer-std", async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: "Lecturer ID is required" });
  }

  try {
    const students = await prisma.studentSupervisor.findMany({
      where: { supervisor_id: Number(id) },
      include: {
        student: true, // Include student details
      },
    });

    if (students.length === 0) {
      return res
        .status(404)
        .json({ message: "No students found for this lecturer" });
    }

    res.json(students.map((studentSupervisor) => studentSupervisor.student));
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Error processing request" });
  }
});

// Route to fetch all details of a student by their ID
router.get("/student-details", async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: "Student ID is required" });
  }

  try {
    const student = await prisma.students.findUnique({
      where: { id: Number(id) },
      include: {
        logbooks: {
          include: {
            weekly: true, // Include weekly progress details
          },
        },
        supervisors: {
          include: {
            supervisor: true, // Include supervisor details
          },
        },
      },
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (error) {
    console.error("Error fetching student details:", error);
    res.status(500).json({ message: "Error processing request" });
  }
});

module.exports = router;
