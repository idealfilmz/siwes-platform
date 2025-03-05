const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const prisma = require("../client");
const jsonwebtoken = require("jsonwebtoken");

router.post("/login-lectures", async (req, res) => {
  const { staff_id, password } = req.body;
  try {
    const user = await prisma.supervisors.findUnique({
      where: { UQ: staff_id },
    });

    if (!user) {
      return res.status(404).json({
        message: `No lecture found`,
      });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Incorrect password.",
      });
    }

    const token = jsonwebtoken.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    return res.status(200).json({
      message: "Login successful.",
      user: user,
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
