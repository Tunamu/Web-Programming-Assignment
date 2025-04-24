// routes/quiz.js
const router = require('express').Router();
const Question = require('../models/Question');

router.get('/start', async (req, res) => {
  try {
    // Veritabanından soruları al
    const questions = await Question.find();
    res.json(questions);  // Soruları gönder
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router; 