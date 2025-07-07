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
      include:{
        logbooks:true
      }
    });
    if (!user) {
      return res.status(404).json({ message: "Account not found!. please create account" });
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
    const newLecturer = await prisma.supervisors.count();
    if (newLecturer === 0) {
      return res.status(300).json({ message: "no supervisors assigned, please try again login in in few minutes." });
    }
    // Check if the student is already assigned to a supervisor
    const existingAssignment = await prisma.studentSupervisor.findFirst({
      where: { std_id: user.id },
    });

    if (existingAssignment) {
      return res.status(200).json({
        message: "Login successful. Supervisor already assigned.",
        user: { id: user.id, matric_no: user.matric_number, logbook_id:user.logbooks },
        token,
      });
    }
    // Assign supervisor if not already assigned
    const supervisors = await prisma.supervisors.findMany({
      include: {
        students: true
      },
      orderBy: {
        students: {
          _count: 'asc'
        }
      }
    });
    const availableSupervisor = supervisors.find(s => s.students.length < 20);
    if (availableSupervisor && availableSupervisor.students.length < 20) {
      await prisma.studentSupervisor.create({
        data: {
          std_id: user.id,
          supervisor_id: availableSupervisor.PK, // Use supervisor's PK
        },
      });
      return res.status(201).json({
        message: "Login successful and supervisor assigned!",
        user: { id: user.id, matric_no: user.matric_number,logbook_id:user.logbooks  },
        token,
      });
    }
    return res.status(400).json({ message: "No available supervisor found." });
  } catch (error) {
console.log(error)
    return res.status(500).json({
      message: "An error occurred during login.",
      data: error,
    });
  }
});

module.exports = router;
