import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Quiz from './pages/Quiz';
import Leaderboard from './pages/Leaderboard';

function App() {
  const [token, setToken] = useState(null);

  return (
    <Router>
      <nav>
        <Link to="/">Quiz</Link>
        <Link to="/login">Giriş</Link>
        <Link to="/register">Kayıt</Link>
        <Link to="/leaderboard">Liderlik</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Quiz token={token} />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
}

export default App;
