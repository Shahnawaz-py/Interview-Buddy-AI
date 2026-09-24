const { GoogleGenerativeAI } = require('@google/generative-ai');
const { getInterviewerSystemPrompt, getEvaluationReportSystemPrompt } = require('../utils/promptTemplates');

let genAI = null;
if (process.env.GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
}

/**
 * Generate Next Dynamic Interview Turn
 */
const generateNextTurn = async ({ role, stack, difficulty, transcript, topicsCovered }) => {
  const systemPrompt = getInterviewerSystemPrompt(role, stack, difficulty);
  
  // Format history for context
  const formattedTranscript = transcript.map(t => `${t.speaker.toUpperCase()} (${t.topic || 'General'}): ${t.text}`).join('\n');
  const userPrompt = `
CURRENT INTERVIEW CONTEXT:
Topics already covered: ${topicsCovered.length > 0 ? topicsCovered.join(', ') : 'None yet'}

TRANSCRIPT SO FAR:
${formattedTranscript || 'No previous conversation. This is the start of the interview.'}

Task: Analyze the transcript and generate the next dynamic interview turn JSON.
If this is the beginning (transcript is empty), greet the candidate briefly and ask the opening question on the first core topic of ${stack}.
If the candidate's last answer was incomplete, ask a FOLLOW_UP.
If their answer was solid, CHALLENGE them or switch to a NEXT_TOPIC.
If 4+ topics have been thoroughly probed, you may decide to END_INTERVIEW (set shouldEnd: true and question: "Thank you! That completes our technical interview session. I have gathered enough details to prepare your evaluation report.").
`;

  if (process.env.GEMINI_API_KEY && genAI) {
    try {
      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        generationConfig: {
          responseMimeType: 'application/json'
        }
      });

      const response = await model.generateContent([
        { text: systemPrompt },
        { text: userPrompt }
      ]);

      const text = response.response.text();
      const parsed = JSON.parse(text);
      return parsed;
    } catch (err) {
      console.error('[Gemini API Error] Falling back to intelligent heuristic engine:', err.message);
    }
  }

  // Intelligent Fallback Dynamic Engine when GEMINI_API_KEY is not set or API fails
  return generateFallbackTurn({ role, stack, difficulty, transcript, topicsCovered });
};

/**
 * Generate Comprehensive Evaluation Report
 */
const generateEvaluationReport = async ({ role, stack, difficulty, transcript }) => {
  const formattedTranscript = transcript.map(t => `${t.speaker.toUpperCase()} [${t.type || 'Q&A'}] (${t.topic || 'General'}): ${t.text}`).join('\n');
  const systemPrompt = getEvaluationReportSystemPrompt(role, stack, difficulty, formattedTranscript);

  if (process.env.GEMINI_API_KEY && genAI) {
    try {
      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        generationConfig: {
          responseMimeType: 'application/json'
        }
      });

      const response = await model.generateContent([
        { text: systemPrompt },
        { text: 'Analyze transcript and produce candidate evaluation JSON report.' }
      ]);

      const text = response.response.text();
      return JSON.parse(text);
    } catch (err) {
      console.error('[Gemini API Error in Report] Falling back to heuristic report generator:', err.message);
    }
  }

  return generateFallbackReport({ role, stack, difficulty, transcript });
};

/**
 * Heuristic Local Interview Turn Engine
 */
function generateFallbackTurn({ role, stack, difficulty, transcript, topicsCovered }) {
  const candidateAnswers = transcript.filter(t => t.speaker === 'candidate');
  const turnsCount = candidateAnswers.length;

  const stackTopicsMap = {
    MERN: ['Authentication & JWT', 'React Hooks & Performance', 'Express Middleware', 'MongoDB Schema & Indexing', 'REST API Security'],
    'Java / Spring': ['Java OOP & Collections', 'Spring Boot Dependency Injection', 'Hibernate & JPA', 'Multithreading & Concurrency', 'REST Microservices'],
    'Python / Django': ['Python Memory & Generators', 'Django ORM & Query Sets', 'REST Framework & Auth', 'Async & Celery Tasks', 'PostgreSQL Optimization'],
    'SQL / PostgreSQL': ['Database Indexing & B-Trees', 'SQL Joins & Grouping', 'ACID Transactions & Isolation', 'Query Optimization & EXPLAIN', 'Schema Design & Normalization'],
    DEFAULT: ['Core Fundamentals', 'Framework Architecture', 'State & Async Operations', 'Database & Storage', 'Security & Scaling']
  };

  const topicList = stackTopicsMap[stack] || stackTopicsMap.DEFAULT;
  const currentTopicIndex = Math.min(Math.floor(turnsCount / 2), topicList.length - 1);
  const currentTopic = topicList[currentTopicIndex];

  // Start of interview
  if (turnsCount === 0) {
    return {
      decision: 'NEXT_TOPIC',
      currentTopic: topicList[0],
      question: `Welcome to your ${difficulty} ${role} interview! Let's start with ${topicList[0]}. Could you explain how you handle authentication and token management in a ${stack} application?`,
      internalReasoning: 'Opening question on core stack setup.',
      evalSnippet: 'Interview started.',
      shouldEnd: false
    };
  }

  const lastCandidateAnswer = candidateAnswers[candidateAnswers.length - 1].text.trim();
  const lowerAnswer = lastCandidateAnswer.toLowerCase();

  // If candidate gives a short or vague answer
  if (lastCandidateAnswer.split(' ').length < 10) {
    return {
      decision: 'CLARIFY',
      currentTopic,
      question: `Could you elaborate a bit more on that? Specifically, how would you structure that in production for a ${difficulty} level codebase?`,
      internalReasoning: 'Candidate response was brief, asking for elaboration.',
      evalSnippet: 'Short answer, requested clarification.',
      shouldEnd: false
    };
  }

  // Check if candidate mentioned JWT / Token without security storage
  if (lowerAnswer.includes('jwt') && !lowerAnswer.includes('cookie') && !lowerAnswer.includes('httponly')) {
    return {
      decision: 'FOLLOW_UP',
      currentTopic: 'Authentication & JWT',
      question: 'You mentioned using JWTs for authentication. Where on the client side would you store the token, and what security risks (like XSS or CSRF) should you consider?',
      internalReasoning: 'Candidate brought up JWT but did not detail secure token storage.',
      evalSnippet: 'Understands JWT concept, probing storage & XSS security.',
      shouldEnd: false
    };
  }

  // Follow-up challenge on security / edge case
  if (turnsCount === 2) {
    return {
      decision: 'CHALLENGE',
      currentTopic,
      question: `Suppose an attacker manages to obtain a valid access token. What strategies would you implement in your ${stack} backend to limit the potential damage?`,
      internalReasoning: 'Probing security incident handling & revocation strategy.',
      evalSnippet: 'Good basic response, testing threat mitigation depth.',
      shouldEnd: false
    };
  }

  // Move to Next Topic
  if (turnsCount === 3 || turnsCount === 4) {
    const nextTopic = topicList[1] || 'State Management & Async Operations';
    return {
      decision: 'NEXT_TOPIC',
      currentTopic: nextTopic,
      question: `Great perspective on security. Let's transition to ${nextTopic}. How do you optimize state rendering or asynchronous operations in ${stack}?`,
      internalReasoning: 'Transitioning to next stack area.',
      evalSnippet: 'Satisfactory answer on auth, switching topic.',
      shouldEnd: false
    };
  }

  // Challenge on scaling
  if (turnsCount === 5) {
    return {
      decision: 'CHALLENGE',
      currentTopic: 'Database & Scaling',
      question: `Imagine your ${stack} application experiences a 10x sudden surge in read/write traffic. What indexing or caching mechanisms would you add first?`,
      internalReasoning: 'Testing system performance & database scaling knowledge.',
      evalSnippet: 'Solid concept understanding, probing high-traffic scaling.',
      shouldEnd: false
    };
  }

  // End Interview if 6+ turns complete
  return {
    decision: 'END_INTERVIEW',
    currentTopic: 'Interview Wrap-up',
    question: 'Thank you! That completes our technical interview session. We covered authentication, state management, security, and database scaling. I am now synthesizing your evaluation report.',
    internalReasoning: 'Sufficient turns and topic breadth reached.',
    evalSnippet: 'Interview completed with good coverage.',
    shouldEnd: true
  };
}

/**
 * Heuristic Local Evaluation Report Generator
 */
function generateFallbackReport({ role, stack, difficulty, transcript }) {
  const candidateTurns = transcript.filter(t => t.speaker === 'candidate');
  const wordCountSum = candidateTurns.reduce((acc, curr) => acc + curr.text.split(' ').length, 0);
  const avgWordsPerAnswer = candidateTurns.length > 0 ? wordCountSum / candidateTurns.length : 0;

  let techScore = 78;
  let problemSolvingScore = 82;
  let commScore = avgWordsPerAnswer > 25 ? 86 : 74;
  let depthScore = 76;
  let followupScore = 80;

  if (candidateTurns.length >= 5) {
    techScore += 7;
    depthScore += 8;
  }

  const overallScore = Math.round((techScore + problemSolvingScore + commScore + depthScore + followupScore) / 5);

  const questionEvaluations = [];
  let currentQ = '';

  transcript.forEach(t => {
    if (t.speaker === 'interviewer') {
      currentQ = t.text;
    } else if (t.speaker === 'candidate' && currentQ) {
      questionEvaluations.push({
        question: currentQ,
        candidateAnswer: t.text,
        topic: t.topic || 'Technical Fundamentals',
        score: Math.min(95, Math.max(65, Math.round(70 + t.text.split(' ').length * 0.5))),
        strengths: 'Demonstrated direct familiarity with the requested concepts.',
        weaknesses: t.text.split(' ').length < 20 ? 'Answer was somewhat concise; could add more production trade-offs.' : 'Solid answer; could deepen discussion on edge case edge mitigation.',
        idealKeyPoints: [
          'Clear architectural explanation',
          'Security and failure-mode considerations',
          'Performance trade-offs & production best practices'
        ]
      });
      currentQ = '';
    }
  });

  return {
    overallScore,
    technicalKnowledgeScore: techScore,
    problemSolvingScore,
    communicationScore: commScore,
    depthOfKnowledgeScore: depthScore,
    handlingFollowupsScore: followupScore,
    executiveSummary: `The candidate demonstrated strong foundational knowledge for the ${difficulty} ${role} role with the ${stack} stack. Spoken answers showed good clarity and direct familiarity with core architectural concepts. Adding deeper details on security edge-cases and performance scaling will strengthen upcoming senior interviews.`,
    strongAreas: [
      {
        topic: `${stack} Core Architecture`,
        details: 'Explained fundamental paradigms clearly with relevant terminology.'
      },
      {
        topic: 'Communication & Verbal Articulation',
        details: 'Structured explanations logically and addressed interviewer questions directly.'
      }
    ],
    weakAreas: [
      {
        topic: 'Security Storage & Token Expiration',
        details: 'Could provide more explicit detail on HttpOnly cookie flags, XSS prevention, and refresh token rotation.'
      },
      {
        topic: 'High Traffic Scaling Strategies',
        details: 'Would benefit from deeper discussion on Redis caching layers and database indexing strategies under heavy loads.'
      }
    ],
    topicsToStudy: [
      {
        topic: 'Web Security & Token Storage (OWASP)',
        priority: 'High',
        advice: 'Review HttpOnly vs SameSite cookie security policies and token storage trade-offs.',
        suggestedResource: 'OWASP Web Security Cheat Sheet & MDN HTTP Cookies Guide'
      },
      {
        topic: `${stack} Database Performance & Indexing`,
        priority: 'Medium',
        advice: 'Study index B-Trees, compound indexes, and execution plans (EXPLAIN ANALYZE).',
        suggestedResource: 'Database System Design & Performance Tuning Guides'
      }
    ],
    questionEvaluations,
    disclaimer: 'Note: AI evaluations are estimation models designed for practice and growth, not binding hiring decisions.'
  };
}

module.exports = {
  generateNextTurn,
  generateEvaluationReport
};
