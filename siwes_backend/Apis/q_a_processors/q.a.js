require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require("express");
const prisma = require("../../client");
const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const generateRandomQuestions = (topic, numQuestions = 5) => {
  const questionTemplates = [
    {
      template: `What is a key definition of ${topic}?`,
      type: 'definition',
      generateOptions: (topic) => [
        `${topic} refers to a core concept in modern science.`,
        `${topic} is an outdated term used in ancient texts.`,
        `A name for a person involved with ${topic}.`,
        `None of the above.`,
      ],
      correctIndex: 0,
    },
    {
      template: `Why is ${topic} important in today's world?`,
      type: 'importance',
      generateOptions: (topic) => [
        `It helps solve real-world problems.`,
        `It is not relevant anymore.`,
        `It only applies to history.`,
        `None of the above.`,
      ],
      correctIndex: 0,
    },
    {
      template: `What are common challenges with ${topic}?`,
      type: 'challenges',
      generateOptions: (topic) => [
        `Lack of understanding and resources.`,
        `It is universally accepted without controversy.`,
        `It has no real-world applications.`,
        `None of the above.`,
      ],
      correctIndex: 0,
    },
    {
      template: `Which of the following is an example of ${topic}?`,
      type: 'examples',
      generateOptions: (topic) => [
        `Real-world scenario involving ${topic}.`,
        `A fictional character.`,
        `A cooking recipe.`,
        `None of the above.`,
      ],
      correctIndex: 0,
    },
    {
      template: `How does ${topic} apply in real life?`,
      type: 'application',
      generateOptions: (topic) => [
        `${topic} is used in modern industries.`,
        `${topic} is only a theoretical idea.`,
        `It's part of ancient mythology.`,
        `None of the above.`,
      ],
      correctIndex: 0,
    },
  ];

  const usedIndexes = new Set();
  const questions = [];

  while (questions.length < numQuestions) {
    const randIndex = Math.floor(Math.random() * questionTemplates.length);

    // Avoid duplicate templates
    if (usedIndexes.has(randIndex)) continue;
    usedIndexes.add(randIndex);

    const templateObj = questionTemplates[randIndex];
    const questionText = templateObj.template;
    const options = templateObj.generateOptions(topic);
    const answer = options[templateObj.correctIndex];

    questions.push({
      id: questions.length + 1,
      question: questionText,
      options,
      answer,
      type: templateObj.type, // helpful for categorization
    });
  }

  return questions;
};
router.post("/questions", async (req, res) => {
  const { std_id } = req.body;
  try {
    const get_user = await prisma.students.findUnique({
      where:{
        id:std_id
      }
    })
    const topic = get_user.course
          if (!topic) {
        return res.status(400).json({ error: "Question parameter is required" });
      }
      const questions = generateRandomQuestions(topic);
      res.json({ data: questions });
      }
     
 catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }

});

router.post("/answers", async (req, res, next) => {
  const { student_id, score } = req.body;

  try {
    // Find the student's logbook and latest weekly entry
     const _score = 2*score
  
    const logbook = await prisma.logbook.findFirst({
      where: { student_id: Number(student_id) },
      include: { weekly: { orderBy: { createdAt: "desc" } } }

    });

    if (!logbook || !logbook.weekly.length) {
      return res.status(404).json({ message: "No weekly entry found for this student." });
    }

    const latestWeekly = logbook.weekly[0];

    if (latestWeekly.scores !== null && latestWeekly.scores !== undefined) {
      return res.status(400).json({ message: "Score already recorded for this week." });
    }

    // Update the latest weekly entry with the score
    const updatedWeekly = await prisma.weekly.update({
      where: { id: latestWeekly.id },
      data: { scores:_score }
    });

    return res.status(200).json({
      message: "Score saved successfully.",
      data: updatedWeekly
    });
  } catch (error) {
    console.error("Error saving score:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});


module.exports = router;