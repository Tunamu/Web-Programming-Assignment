import { useLocation, Link } from 'react-router-dom';

export default function Result() {
  const location = useLocation();
  const { finalScore } = location.state || { finalScore: 0 };

  return (
    <div>
      <h2>Quiz Bitti 🎉</h2>
      <p>Toplam Skorunuz: {finalScore.toFixed(2)}</p>
      <Link to="/">Yeniden Quiz'e Başla</Link>
      <br />
      <Link to="/leaderboard">Liderlik Tablosu</Link>
    </div>
  );
}
