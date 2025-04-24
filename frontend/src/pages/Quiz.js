import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Quiz({ token }) {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [scoreList, setScoreList] = useState([]);
  const navigate = useNavigate(); // HATA: bu hook en üstte olmalı

  useEffect(() => {
    axios.get('http://localhost:5000/api/quiz/start').then(res => setQuestions(res.data));
  }, []);

  const answerQuestion = async (answer) => {
    const res = await axios.post('/api/quiz/answer', {
      questionId: questions[index]._id,
      answer,
      token
    });

    const newScoreList = [...scoreList, res.data.score];
    setScoreList(newScoreList);

    if (index === questions.length - 1) {
      const totalScore = newScoreList.reduce((a, b) => a + b, 0);
      navigate("/result", { state: { finalScore: totalScore } });
    } else {
      setIndex(index + 1);
    }
  };

  if (!questions.length) return <div>Yükleniyor...</div>;

  const q = questions[index];

  return (
    <div>
      <h3>{q.question}</h3>
      {q.answers.map((a, i) => (
        <button key={i} onClick={() => answerQuestion(a)}>{a}</button>
      ))}
    </div>
  );
}
