const router = require("express").Router();
const { default: mongoose } = require("mongoose");
const Quiz = require("../models/Quiz");

//endpoint to create a new quiz in the backend
router.post('/submit', async (req, res) => {
  try {
    console.log(req.body);
    const newQuizPost = new Quiz(req.body);
    console.log("Quiz data to the db", newQuizPost);
    await newQuizPost.save();
    res.send(`
      <h2>Form submitted successfully!</h2>
    `);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


//get all quizeslist by language.
router.get('/get-levels-list/:lang',async(req, res)=>{
  try {
    const language = req.params.lang;
    const levels = await Quiz.distinct("level", { language });
    console.log(levels);
    res.status(200).json(levels);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});



// get all total score of a level
router.get('/get-levels-score/:lang', async (req, res) => {
  try {
    const language = req.params.lang;
    const level = req.query.level;
    const quizzes = await Quiz.find({ level, language }).select('score');
    console.log(quizzes);
    const totalScore = quizzes.reduce((sum, quiz) => sum + quiz.score, 0);
    console.log(totalScore);
    res.status(200).json({ totalScore });
  } catch (error) {
    console.error("Error retrieving quizzes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});





//get all quizes by language and level.
router.get('/quiz-of-level/:lang',async(req, res)=>{
  try {
    const language = req.params.lang;
    const level = req.query.level;
    const quizzes = await Quiz.find({ level, language});
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

  module.exports = router;
