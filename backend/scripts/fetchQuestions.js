// scripts/fetchQuestions.js
const axios = require('axios');
const mongoose = require('mongoose');
const Question = require('./models/Question');

mongoose.connect('mongodb://localhost/quiz');

(async () => {
  const { data } = await axios.get('https://opentdb.com/api.php?amount=50&type=multiple');
  for (let item of data.results) {
    const question = new Question(item);
    await question.save();
  }
  console.log("Questions saved");
  process.exit();
})();
