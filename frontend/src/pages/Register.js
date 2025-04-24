import { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const register = async () => {
    await axios.post('/api/auth/register', { username, password });
    alert("Kayıt başarılı! Giriş yapabilirsiniz.");
  };

  return (
    <div>
      <h2>Kayıt Ol</h2>
      <input placeholder="Kullanıcı Adı" onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Şifre" onChange={e => setPassword(e.target.value)} />
      <button onClick={register}>Kayıt Ol</button>
    </div>
  );
}
