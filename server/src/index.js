const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { connectDB, getDbStatus } = require('./config/db');
const interviewRoutes = require('./routes/interviewRoutes');
const reportRoutes = require('./routes/reportRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/interview', interviewRoutes);
app.use('/api/report', reportRoutes);

// Healthcheck
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'Interview Buddy API',
    databaseConnected: getDbStatus(),
    geminiKeyConfigured: !!process.env.GEMINI_API_KEY,
    timestamp: new Date()
  });
});

// Start Server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`[Interview Buddy Server] Running on http://localhost:${PORT}`);
  });
};

startServer();
