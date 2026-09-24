const mongoose = require('mongoose');

let isConnected = false;
let inMemoryStore = {
  interviews: new Map(),
  reports: new Map()
};

const connectDB = async () => {
  const connString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/interview_buddy';
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(connString, {
      serverSelectionTimeoutMS: 3000
    });
    isConnected = true;
    console.log(`[MongoDB] Connected successfully to ${mongoose.connection.host}`);
  } catch (err) {
    console.warn(`[MongoDB Warning] Could not connect to local/cloud MongoDB: ${err.message}`);
    console.warn(`[MongoDB Warning] Operating in resilient In-Memory Database Mode for interview storage.`);
    isConnected = false;
  }
};

const getDbStatus = () => isConnected;

module.exports = {
  connectDB,
  getDbStatus,
  inMemoryStore
};
