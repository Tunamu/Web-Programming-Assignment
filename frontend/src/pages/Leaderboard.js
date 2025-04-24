import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Leaderboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/api/quiz/leaderboard').then(res => setData(res.data));
  }, []);

  return (
    <div>
      <h2>Liderlik Tablosu</h2>
      <ul>
        {data.map((u, i) => (
          <li key={i}>{u.username}: {u.bestScore}</li>
        ))}
      </ul>
    </div>
  );
}
