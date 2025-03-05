const express = require("express");
const jsonwebtoken = require("jsonwebtoken");
const router = express.Router();
const bcrypt = require("bcryptjs");
const prisma = require("../../client");

router.post("/login", async (req, res) => {
  const { matric_number, password } = req.body;

  if (!matric_number || !password) {
    return res
      .status(400)
      .json({ message: "Please provide your matric number and password" });
  }

  try {
    const user = await prisma.students.findUnique({
      where: { matric_number },
    });

    if (!user) {
      return res.status(404).json({ message: "Can't find user" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(403)
        .json({ message: "Please provide the correct password" });
    }

    const token = jsonwebtoken.sign({ user: user.id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    // Check if the student is already assigned to a supervisor
    const existingAssignment = await prisma.studentSupervisor.findFirst({
      where: { std_id: user.id },
    });

    if (!existingAssignment) {
      // Find an available supervisor with less than 20 students
      const availableSupervisor = await prisma.supervisors.findFirst({
        where: {
          students: {
            some: {
              std_id: { not: null },
            },
          },
        },
        include: {
          students: true, // Include student-supervisor relationships
        },
        orderBy: {
          students: { _count: "asc" }, // Prioritize supervisors with the fewest students
        },
      });

      // Ensure we don't exceed 20 students per supervisor
      if (availableSupervisor && availableSupervisor.students.length < 20) {
        // Assign student to the supervisor
        await prisma.studentSupervisor.create({
          data: {
            std_id: user.id,
            supervisor_id: availableSupervisor.PK, // Use supervisor's PK
          },
        });

        return res.status(201).json({
          message: "Login successful and supervisor assigned!",
          token,
        });
      }
    }

    return res.status(200).json({
      message: "Login successful",
      user: { id: user.id, matric_no: user.matric_number },
      token: token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({
      message: "An error occurred during login.",
      data: error,
    });
  }
});

module.exports = router;
