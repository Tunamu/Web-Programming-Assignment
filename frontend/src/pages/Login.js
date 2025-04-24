import { useState } from 'react';
import axios from 'axios';

export default function Login({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const res = await axios.post('/api/auth/login', { username, password });
    setToken(res.data.token);
  };

  return (
    <div>
      <h2>Giriş Yap</h2>
      <input placeholder="Kullanıcı Adı" onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Şifre" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Giriş</button>
    </div>
  );
}
