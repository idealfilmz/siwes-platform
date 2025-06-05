require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require("express");
const router = express.Router();
const db = require("../../management/databaseConnect");
const CreateScore = require("../../helpers/scorehlper");
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY); // Use environment variable


const generateRandomQuestions = (topic) => {
  const questionTemplates = [
    `What is an interesting fact about ${topic}?`,
    `Why is ${topic} important?`,
    `How does ${topic} work in real life?`,
    `What are some examples of ${topic}?`,
    `What challenges are associated with ${topic}?`,
    `What benefits does ${topic} provide?`,
  ];

  const questions = [];
  for (let i = 1; i <= 5; i++) {
    const questionId = i;

    const questionText =
      questionTemplates[Math.floor(Math.random() * questionTemplates.length)];

    const options = [
      `${topic} is important for A.`,
      `${topic} relates to B.`,
      `C is connected to ${topic}.`,
      `None of the above.`,
    ]; 
    const answer = options[Math.floor(Math.random() * options.length)]; // Randomly select an answer
    questions.push({
      id: questionId,
      question: questionText,
      options,
      answer,
    });
  }
  return questions;
};

router.post("/questions", async (req, res) => {
  try {
    const topic = req.body.question;

    if (!topic) {
      return res.status(400).json({ error: "Question parameter is required" });
    }

   
    const questions = generateRandomQuestions(topic);

    res.json({ data: questions });
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



router.post("/answers", async (req, res, next) => {
  const { answer, student_id, id } = req.body;
  const score = Number(answer * 2);
  const scorehlper = new CreateScore(score, student_id, id);



  db.query("SELECT * FROM students_score WHERE student_id = ? AND post_id = ?", [student_id, id], (error, result) => {
    if (error) {
      return res.json({ "message": error });
    }

    if (result.length > 0) {

      return res.json({ "message": "Student already has a score for this post." });
    }
    try {
      db.query("INSERT INTO students_score SET ?", [scorehlper.Values()], (error, result) => {
        if (error) {
          return res.json({ "message": error });
        }
        return res.json({ "message": "Score added successfully." });
      });
    } catch (err) {
      return res.json({ "message": err.message });
    }
  });
});

module.exports = router;