const mongoose = require('mongoose');
const Interview = require('../models/Interview');
const Report = require('../models/Report');
const { getDbStatus, inMemoryStore } = require('../config/db');
const { generateNextTurn, generateEvaluationReport } = require('../services/geminiService');

/**
 * Helper to generate unique ID string for in-memory mode
 */
const generateId = () => (Math.random().toString(36).substring(2, 9) + Date.now().toString(36));

/**
 * Helper to map Gemini decision to standard turn type string
 */
const mapDecisionToTurnType = (decision) => {
  if (!decision) return 'question';
  const d = String(decision).toUpperCase();
  if (d === 'FOLLOW_UP') return 'follow_up';
  if (d === 'CHALLENGE') return 'challenge';
  if (d === 'CLARIFY' || d === 'CLARIFICATION') return 'clarification';
  if (d === 'NEXT_TOPIC' || d === 'TOPIC_SWITCH') return 'topic_switch';
  if (d === 'END_INTERVIEW') return 'question';
  return 'question';
};

/**
 * 1. Create a new Interview session
 */
const createInterview = async (req, res) => {
  try {
    const { candidateName, role, stack, difficulty } = req.body;

    if (!role || !stack || !difficulty) {
      return res.status(400).json({ error: 'Role, Stack, and Difficulty are required fields.' });
    }

    // Initial greeting turn from AI
    const initialTurn = await generateNextTurn({
      role,
      stack,
      difficulty,
      transcript: [],
      topicsCovered: []
    });

    const firstQuestionItem = {
      speaker: 'interviewer',
      text: initialTurn.question,
      timestamp: new Date(),
      type: 'greeting',
      topic: initialTurn.currentTopic || 'General',
      aiAnalysisSnippet: initialTurn.evalSnippet
    };

    if (getDbStatus()) {
      const newInterview = new Interview({
        candidateName: candidateName || 'Candidate',
        role,
        stack,
        difficulty,
        status: 'in_progress',
        topicsCovered: [initialTurn.currentTopic || 'General'],
        transcript: [firstQuestionItem]
      });

      await newInterview.save();
      return res.status(201).json({
        success: true,
        interview: newInterview,
        currentTurn: initialTurn
      });
    } else {
      // In-Memory Mode
      const id = generateId();
      const mockInterview = {
        _id: id,
        candidateName: candidateName || 'Candidate',
        role,
        stack,
        difficulty,
        status: 'in_progress',
        durationSeconds: 0,
        topicsCovered: [initialTurn.currentTopic || 'General'],
        transcript: [{ ...firstQuestionItem, _id: generateId() }],
        createdAt: new Date(),
        updatedAt: new Date()
      };

      inMemoryStore.interviews.set(id, mockInterview);
      return res.status(201).json({
        success: true,
        interview: mockInterview,
        currentTurn: initialTurn
      });
    }
  } catch (err) {
    console.error('Error creating interview:', err);
    return res.status(500).json({ error: 'Failed to initialize interview session.' });
  }
};

/**
 * 2. Get Interview by ID
 */
const getInterview = async (req, res) => {
  try {
    const { id } = req.params;

    if (getDbStatus() && mongoose.Types.ObjectId.isValid(id)) {
      const interview = await Interview.findById(id).populate('reportId');
      if (!interview) {
        return res.status(404).json({ error: 'Interview session not found.' });
      }
      return res.json({ success: true, interview });
    } else {
      const interview = inMemoryStore.interviews.get(id);
      if (!interview) {
        return res.status(404).json({ error: 'Interview session not found.' });
      }
      return res.json({ success: true, interview });
    }
  } catch (err) {
    console.error('Error fetching interview:', err);
    return res.status(500).json({ error: 'Failed to retrieve interview session.' });
  }
};

/**
 * 3. Submit candidate answer and generate dynamic AI next turn
 */
const submitAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const { candidateAnswer, durationSeconds } = req.body;

    if (!candidateAnswer || typeof candidateAnswer !== 'string') {
      return res.status(400).json({ error: 'Candidate answer text is required.' });
    }

    let interview = null;
    if (getDbStatus() && mongoose.Types.ObjectId.isValid(id)) {
      interview = await Interview.findById(id);
    } else {
      interview = inMemoryStore.interviews.get(id);
    }

    if (!interview) {
      return res.status(404).json({ error: 'Interview session not found.' });
    }

    if (interview.status === 'completed') {
      return res.status(400).json({ error: 'Interview is already completed.' });
    }

    // 1. Add candidate answer to transcript
    const lastQuestionTurn = interview.transcript.filter(t => t.speaker === 'interviewer').slice(-1)[0];
    const currentTopic = lastQuestionTurn ? lastQuestionTurn.topic : 'General';

    const candidateTurnItem = {
      speaker: 'candidate',
      text: candidateAnswer.trim(),
      timestamp: new Date(),
      type: 'answer',
      topic: currentTopic
    };

    interview.transcript.push(candidateTurnItem);
    if (durationSeconds) {
      interview.durationSeconds = durationSeconds;
    }

    // 2. Call Gemini Service for Next Dynamic Turn
    const nextTurn = await generateNextTurn({
      role: interview.role,
      stack: interview.stack,
      difficulty: interview.difficulty,
      transcript: interview.transcript,
      topicsCovered: interview.topicsCovered
    });

    // 3. Add Interviewer Question turn item
    const interviewerTurnItem = {
      speaker: 'interviewer',
      text: nextTurn.question || 'Could you elaborate on that architectural decision?',
      timestamp: new Date(),
      type: mapDecisionToTurnType(nextTurn.decision),
      topic: nextTurn.currentTopic || currentTopic,
      aiAnalysisSnippet: nextTurn.evalSnippet || ''
    };

    interview.transcript.push(interviewerTurnItem);

    if (nextTurn.currentTopic && !interview.topicsCovered.includes(nextTurn.currentTopic)) {
      interview.topicsCovered.push(nextTurn.currentTopic);
    }

    if (nextTurn.shouldEnd) {
      interview.status = 'completed';
    }

    // 4. Save
    if (getDbStatus() && mongoose.Types.ObjectId.isValid(id)) {
      await interview.save();
    } else {
      interview.updatedAt = new Date();
      inMemoryStore.interviews.set(id, interview);
    }

    return res.json({
      success: true,
      interview,
      nextTurn
    });
  } catch (err) {
    console.error('Error processing answer turn:', err);
    return res.status(500).json({ error: 'Failed to process answer and generate next turn.' });
  }
};

/**
 * 4. End Interview & Trigger Evaluation Report
 */
const endInterview = async (req, res) => {
  try {
    const { id } = req.params;
    const { durationSeconds } = req.body;

    let interview = null;
    if (getDbStatus() && mongoose.Types.ObjectId.isValid(id)) {
      interview = await Interview.findById(id);
    } else {
      interview = inMemoryStore.interviews.get(id);
    }

    if (!interview) {
      return res.status(404).json({ error: 'Interview session not found.' });
    }

    interview.status = 'completed';
    if (durationSeconds) {
      interview.durationSeconds = durationSeconds;
    }

    // Generate evaluation report
    const reportData = await generateEvaluationReport({
      role: interview.role,
      stack: interview.stack,
      difficulty: interview.difficulty,
      transcript: interview.transcript
    });

    let savedReport = null;
    if (getDbStatus() && mongoose.Types.ObjectId.isValid(id)) {
      const newReport = new Report({
        interviewId: interview._id,
        ...reportData
      });
      savedReport = await newReport.save();
      interview.reportId = savedReport._id;
      await interview.save();
    } else {
      const reportId = generateId();
      savedReport = {
        _id: reportId,
        interviewId: interview._id,
        ...reportData,
        createdAt: new Date()
      };
      inMemoryStore.reports.set(reportId, savedReport);
      interview.reportId = reportId;
      interview.updatedAt = new Date();
      inMemoryStore.interviews.set(id, interview);
    }

    return res.json({
      success: true,
      interview,
      report: savedReport
    });
  } catch (err) {
    console.error('Error ending interview:', err);
    return res.status(500).json({ error: 'Failed to generate interview report.' });
  }
};

module.exports = {
  createInterview,
  getInterview,
  submitAnswer,
  endInterview
};
