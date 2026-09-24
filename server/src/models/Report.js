const mongoose = require('mongoose');

const questionEvalSchema = new mongoose.Schema({
  question: String,
  candidateAnswer: String,
  topic: String,
  score: Number, // 0 - 100
  strengths: String,
  weaknesses: String,
  idealKeyPoints: [String]
});

const reportSchema = new mongoose.Schema({
  interviewId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Interview',
    required: true
  },
  overallScore: {
    type: Number,
    required: true
  },
  technicalKnowledgeScore: {
    type: Number,
    required: true
  },
  problemSolvingScore: {
    type: Number,
    required: true
  },
  communicationScore: {
    type: Number,
    required: true
  },
  depthOfKnowledgeScore: {
    type: Number,
    required: true
  },
  handlingFollowupsScore: {
    type: Number,
    required: true
  },
  executiveSummary: {
    type: String,
    required: true
  },
  strongAreas: [{
    topic: String,
    details: String
  }],
  weakAreas: [{
    topic: String,
    details: String
  }],
  topicsToStudy: [{
    topic: String,
    priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Medium' },
    advice: String,
    suggestedResource: String
  }],
  questionEvaluations: [questionEvalSchema],
  disclaimer: {
    type: String,
    default: 'Note: AI evaluations are estimation models designed for practice and skill assessment, not objective human hiring decisions.'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Report', reportSchema);
