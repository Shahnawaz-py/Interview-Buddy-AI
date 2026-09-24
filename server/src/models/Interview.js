const mongoose = require('mongoose');

const transcriptItemSchema = new mongoose.Schema({
  speaker: {
    type: String,
    enum: ['interviewer', 'candidate'],
    required: true
  },
  text: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String,
    default: 'question'
  },
  topic: {
    type: String,
    default: 'General'
  },
  aiAnalysisSnippet: {
    type: String
  }
});

const interviewSchema = new mongoose.Schema({
  candidateName: {
    type: String,
    default: 'Candidate'
  },
  role: {
    type: String,
    required: true
  },
  stack: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['in_progress', 'completed', 'cancelled'],
    default: 'in_progress'
  },
  durationSeconds: {
    type: Number,
    default: 0
  },
  topicsCovered: [{
    type: String
  }],
  transcript: [transcriptItemSchema],
  reportId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Report'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Interview', interviewSchema);
