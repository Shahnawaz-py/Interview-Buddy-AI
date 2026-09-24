export type SpeakerType = 'interviewer' | 'candidate';

export type TurnType = 'greeting' | 'question' | 'answer' | 'follow_up' | 'challenge' | 'clarification' | 'topic_switch';

export interface TranscriptItem {
  _id?: string;
  speaker: SpeakerType;
  text: string;
  timestamp: string | Date;
  type?: TurnType;
  topic?: string;
  aiAnalysisSnippet?: string;
}

export interface InterviewSession {
  _id: string;
  candidateName: string;
  role: string;
  stack: string;
  difficulty: 'Junior' | 'Mid-level' | 'Senior';
  status: 'in_progress' | 'completed' | 'cancelled';
  durationSeconds: number;
  topicsCovered: string[];
  transcript: TranscriptItem[];
  reportId?: string | ReportData;
  createdAt: string;
  updatedAt: string;
}

export interface StrongWeakArea {
  topic: string;
  details: string;
}

export interface TopicToStudy {
  topic: string;
  priority: 'High' | 'Medium' | 'Low';
  advice: string;
  suggestedResource?: string;
}

export interface QuestionEvaluation {
  question: string;
  candidateAnswer: string;
  topic: string;
  score: number;
  strengths: string;
  weaknesses: string;
  idealKeyPoints: string[];
}

export interface ReportData {
  _id: string;
  interviewId: string | InterviewSession;
  overallScore: number;
  technicalKnowledgeScore: number;
  problemSolvingScore: number;
  communicationScore: number;
  depthOfKnowledgeScore: number;
  handlingFollowupsScore: number;
  executiveSummary: string;
  strongAreas: StrongWeakArea[];
  weakAreas: StrongWeakArea[];
  topicsToStudy: TopicToStudy[];
  questionEvaluations: QuestionEvaluation[];
  disclaimer: string;
  createdAt: string;
}
