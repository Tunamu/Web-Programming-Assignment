const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Quiz başlatma
router.get('/start', async (req, res) => {
  const questions = await Question.aggregate([{ $sample: { size: 10 } }]);
  req.session.quizStart = Date.now();
  req.session.questions = questions.map(q => q._id.toString());

  const formatted = questions.map(q => ({
    _id: q._id,
    question: q.question,
    answers: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5)
  }));

  res.json(formatted);
});

// Cevap gönderme ve değerlendirme
router.post('/answer', async (req, res) => {
  const { questionId, answer, token } = req.body;

  if (!req.session.quizStart) return res.status(400).json({ error: "Quiz not started." });

  const question = await Question.findById(questionId);
  const time = (Date.now() - req.session.quizStart) / 1000;
  const grade = answer === question.correct_answer ? 1 : 0;
  const score = parseFloat((100 * grade * Math.exp(-0.2 * time)).toFixed(2));

  // Session update
  req.session.quizStart = Date.now(); // bir sonraki soru için yeni zaman

  // JWT ile kullanıcıyı doğrula
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.userId);
  user.scores.push({ score, date: new Date() });
  await user.save();

  res.json({ grade, time: parseFloat(time.toFixed(2)), score });
});

// Leaderboard
router.get('/leaderboard', async (req, res) => {
  const users = await User.find();
  const leaderboard = users.map(u => ({
    username: u.username,
    bestScore: Math.max(...u.scores.map(s => s.score), 0)
  }));

  // En iyi 10 kişi
  leaderboard.sort((a, b) => b.bestScore - a.bestScore);
  res.json(leaderboard.slice(0, 10));
});

module.exports = router;
