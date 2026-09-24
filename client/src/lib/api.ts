import axios from 'axios';
import { InterviewSession, ReportData } from '../types/interview';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface ApiResponse<T> {
  success: boolean;
  interview?: InterviewSession;
  report?: ReportData;
  reports?: ReportData[];
  currentTurn?: any;
  nextTurn?: any;
}

export const startInterview = async (data: {
  candidateName?: string;
  role: string;
  stack: string;
  difficulty: string;
}): Promise<ApiResponse<InterviewSession>> => {
  const res = await api.post('/interview/start', data);
  return res.data;
};

export const getInterviewSession = async (id: string): Promise<ApiResponse<InterviewSession>> => {
  const res = await api.get(`/interview/${id}`);
  return res.data;
};

export const submitCandidateAnswer = async (
  id: string,
  data: { candidateAnswer: string; durationSeconds?: number }
): Promise<ApiResponse<InterviewSession>> => {
  const res = await api.post(`/interview/${id}/answer`, data);
  return res.data;
};

export const finishInterview = async (
  id: string,
  data: { durationSeconds?: number }
): Promise<ApiResponse<InterviewSession>> => {
  const res = await api.post(`/interview/${id}/end`, data);
  return res.data;
};

export const getReportByInterviewId = async (interviewId: string): Promise<ApiResponse<ReportData>> => {
  const res = await api.get(`/report/interview/${interviewId}`);
  return res.data;
};

export const getReportById = async (reportId: string): Promise<ApiResponse<ReportData>> => {
  const res = await api.get(`/report/${reportId}`);
  return res.data;
};

export const getAllReports = async (): Promise<ApiResponse<ReportData[]>> => {
  const res = await api.get('/report/all');
  return res.data;
};
