const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
const path = require('path');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use(session({
  secret: 'sessionSecret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // local için true olmasın
}));

// Route'ları bağla
const quizRoutes = require('./routes/quiz');
app.use('/api/quiz', quizRoutes);  // Burada "/api/quiz" ile bağlantı kuruluyor

// MongoDB bağlantısı
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB bağlantısı başarılı'))
  .catch(err => console.log('❌ MongoDB bağlantı hatası:', err));

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/quiz', require('./routes/quiz'));

// Frontend build'i üretim için (opsiyonel)
// app.use(express.static(path.join(__dirname, '../frontend/build')));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Sunucu ${PORT} portunda çalışıyor`));
