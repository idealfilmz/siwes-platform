const express = require("express");
const prisma = require("../prismaClient"); // Import Prisma client
const router = express.Router();

router.get("/fetch-lecture", async (req, res) => {
  try {
    const { id } = req.query; // Get lecturer (supervisor) ID

    if (!id) {
      return res.status(400).json({ error: "Supervisor ID is required" });
    }

    // Find students supervised by the given supervisor ID
    const students = await prisma.students.findMany({
      where: {
        supervisors: {
          some: {
            supervisor_id: Number(id) // Filter by supervisor ID
          }
        }
      },
      include: {
        supervisors: {
          include: {
            supervisor: true // Include supervisor details if needed
          }
        }
      }
    });

    if (students.length === 0) {
      return res.status(404).json({ message: "No students found for this supervisor" });
    }

    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
