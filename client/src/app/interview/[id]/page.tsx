'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getInterviewSession, submitCandidateAnswer, finishInterview } from '../../../lib/api';
import { InterviewSession, TurnType } from '../../../types/interview';
import { useMediaRecorder } from '../../../hooks/useMediaRecorder';
import { useSpeechRecognition } from '../../../hooks/useSpeechRecognition';
import { useSpeechSynthesis } from '../../../hooks/useSpeechSynthesis';
import { WebcamPreview } from '../../../components/WebcamPreview';
import { QuestionDisplay } from '../../../components/QuestionDisplay';
import { SpeechTranscript } from '../../../components/SpeechTranscript';

export default function InterviewRoomPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [interview, setInterview] = useState<InterviewSession | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<string>('');
  const [currentTopic, setCurrentTopic] = useState<string>('General');
  const [turnType, setTurnType] = useState<TurnType>('greeting');
  const [isLoadingSession, setIsLoadingSession] = useState<boolean>(true);
  const [isSubmittingAnswer, setIsSubmittingAnswer] = useState<boolean>(false);
  const [isFinishing, setIsFinishing] = useState<boolean>(false);
  const [sessionError, setSessionError] = useState<string | null>(null);
  const [turnError, setTurnError] = useState<string | null>(null);

  // Hooks
  const {
    isRecording,
    recordingError,
    durationSeconds,
    videoRef,
    startCameraAndRecording,
    stopRecording
  } = useMediaRecorder();

  const {
    isListening,
    transcript,
    interimTranscript,
    isSupported: isSttSupported,
    startListening,
    stopListening,
    resetTranscript,
    setTranscriptManual
  } = useSpeechRecognition();

  const { isSpeaking, speak, stop: stopSpeaking } = useSpeechSynthesis();

  // Load Session and initialize
  useEffect(() => {
    let isMounted = true;
    const loadSession = async () => {
      try {
        setIsLoadingSession(true);
        const res = await getInterviewSession(id);
        if (res.success && res.interview) {
          if (isMounted) {
            setInterview(res.interview);

            const interviewerTurns = res.interview.transcript.filter(t => t.speaker === 'interviewer');
            if (interviewerTurns.length > 0) {
              const latestTurn = interviewerTurns[interviewerTurns.length - 1];
              setCurrentQuestion(latestTurn.text);
              setCurrentTopic(latestTurn.topic || 'General');
              setTurnType((latestTurn.type as TurnType) || 'question');

              // Speak question verbally
              speak(latestTurn.text);
            }
          }
        } else {
          if (isMounted) setSessionError('Interview session not found.');
        }
      } catch (err: any) {
        console.error('Error fetching interview room:', err);
        if (isMounted) setSessionError('Could not load interview session.');
      } finally {
        if (isMounted) setIsLoadingSession(false);
      }
    };

    loadSession();
    startCameraAndRecording();

    return () => {
      isMounted = false;
      stopSpeaking();
    };
  }, [id]);

  // Submit Answer
  const handleSubmitAnswer = async (spokenText: string) => {
    if (!spokenText.trim() || isSubmittingAnswer) return;

    setIsSubmittingAnswer(true);
    setTurnError(null);
    stopListening();
    stopSpeaking();

    try {
      const res = await submitCandidateAnswer(id, {
        candidateAnswer: spokenText.trim(),
        durationSeconds
      });

      if (res.success && res.interview) {
        setInterview(res.interview);
        resetTranscript();

        const nextTurn = res.nextTurn;
        if (nextTurn) {
          setCurrentQuestion(nextTurn.question);
          setCurrentTopic(nextTurn.currentTopic || 'General');
          setTurnType(nextTurn.decision ? (nextTurn.decision.toLowerCase() as TurnType) : 'question');

          speak(nextTurn.question);

          if (nextTurn.shouldEnd) {
            handleCompleteInterview();
            return;
          }
        }
      } else {
        setTurnError('Failed to process turn. Please try submitting again.');
      }
    } catch (err: any) {
      console.error('Error submitting answer:', err);
      setTurnError('Failed to process turn. Please check connection and try submitting again.');
    } finally {
      setIsSubmittingAnswer(false);
    }
  };

  // Complete Interview
  const handleCompleteInterview = async () => {
    if (isFinishing) return;
    setIsFinishing(true);
    setTurnError(null);
    stopListening();
    stopSpeaking();
    stopRecording();

    try {
      const res = await finishInterview(id, { durationSeconds });
      if (res.success && res.report && res.report._id) {
        router.push(`/report/${res.report._id}`);
      } else {
        setTurnError('Failed to generate report.');
        setIsFinishing(false);
      }
    } catch (err: any) {
      console.error('Error finishing interview:', err);
      setTurnError('Could not finalize interview session.');
      setIsFinishing(false);
    }
  };

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remaining.toString().padStart(2, '0')}`;
  };

  if (isLoadingSession) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <span className="material-symbols-outlined text-primary-container text-[40px] animate-spin">
          sync
        </span>
        <p className="font-geist text-body-md text-on-surface-variant">
          Entering Adaptive AI Simulator Workbench...
        </p>
      </div>
    );
  }

  if (sessionError || !interview) {
    return (
      <div className="max-w-md mx-auto text-center py-12 space-y-4">
        <h2 className="font-geist text-headline-md font-bold text-error">Interview Room Error</h2>
        <p className="font-geist text-body-md text-on-surface-variant">{sessionError || 'Session not found.'}</p>
        <button
          onClick={() => router.push('/')}
          className="px-space-lg py-space-sm rounded bg-surface-container-high text-on-surface text-body-md font-semibold"
        >
          Return to Setup
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Workbench Header Ribbon */}
      <div className="w-full bg-surface-container-low px-gutter-lg py-space-sm flex flex-wrap items-center justify-between gap-space-md shadow-sm border-b border-outline-variant/30">
        <div className="flex items-center gap-space-md flex-wrap">
          {/* Recording Status Pill */}
          <div className="flex items-center gap-space-xs bg-surface-container px-space-md py-space-xs rounded-full border border-outline-variant/30">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-80"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-error"></span>
            </span>
            <span className="font-mono text-label-md text-error tracking-wider uppercase font-bold">REC</span>
            <span className="font-mono text-code-md text-on-surface ml-1 font-semibold">
              {formatTimer(durationSeconds)}
            </span>
          </div>

          {/* Domain Track Metadata */}
          <div className="flex items-center gap-space-xs bg-surface-container-high px-space-md py-space-xs rounded-full border border-outline-variant/30">
            <span className="material-symbols-outlined text-[16px] text-primary-container">security</span>
            <span className="font-mono text-label-sm uppercase tracking-wider text-on-surface-variant">Track:</span>
            <span className="font-geist text-label-md text-on-surface font-medium">
              {interview.role} ({interview.stack})
            </span>
          </div>

          <div className="hidden xl:flex items-center gap-space-xs text-on-surface-variant font-mono text-code-md">
            <span>Latency:</span>
            <span className="text-tertiary-container font-medium">42ms</span>
            <span className="text-outline mx-1">/</span>
            <span>Video:</span>
            <span className="text-on-surface font-medium">1080p HD</span>
          </div>
        </div>

        {/* Quick Controls & End Session */}
        <div className="flex items-center gap-space-sm">
          <button
            type="button"
            onClick={handleCompleteInterview}
            disabled={isFinishing}
            className="flex items-center gap-space-xs px-space-md py-space-xs rounded bg-error-container hover:bg-on-error hover:text-error-container text-on-error-container transition-all shadow-sm font-mono text-label-md font-semibold tracking-wide uppercase disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[18px]">call_end</span>
            <span>{isFinishing ? 'Synthesizing Report...' : 'End Interview'}</span>
          </button>
        </div>
      </div>

      {/* Dismissible Turn Error Banner */}
      {turnError && (
        <div className="max-w-7xl mx-auto w-full px-gutter-lg pt-space-md">
          <div className="p-space-sm rounded bg-error-container/80 border border-error/40 text-on-error-container flex items-center justify-between text-body-sm font-medium">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">warning</span>
              <span>{turnError}</span>
            </div>
            <button
              onClick={() => setTurnError(null)}
              className="text-on-error-container hover:text-on-error p-1"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
        </div>
      )}

      {/* Primary Simulator Stage (Split Pane Grid Layout) */}
      <div className="w-full px-gutter-lg py-space-md grid grid-cols-1 lg:grid-cols-12 gap-space-lg max-w-7xl mx-auto">
        {/* Left Column: Candidate Video Stream & Telemetry */}
        <div className="lg:col-span-6 xl:col-span-7 flex flex-col gap-space-md">
          <WebcamPreview
            videoRef={videoRef}
            isRecording={isRecording}
            durationSeconds={durationSeconds}
            error={recordingError}
            candidateName={interview.candidateName}
            role={interview.role}
          />

          {/* Topics Covered Summary Card */}
          <div className="w-full bg-surface-container rounded-xl p-space-md shadow-sm border border-outline-variant/30 flex flex-col gap-space-xs">
            <span className="font-mono text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
              Technical Topics Evaluated ({interview.topicsCovered.length})
            </span>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {interview.topicsCovered.map((t, idx) => (
                <span
                  key={idx}
                  className="font-mono text-code-md bg-surface-container-lowest text-primary-container px-space-xs py-0.5 rounded border border-outline-variant/30"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: AI Technical Interviewer & Dynamic Speech Ingestion */}
        <div className="lg:col-span-6 xl:col-span-5 flex flex-col gap-space-md">
          <QuestionDisplay
            question={currentQuestion}
            topic={currentTopic}
            turnType={turnType}
            isSpeaking={isSpeaking}
            onReplaySpeech={() => speak(currentQuestion)}
            isLoadingNext={isSubmittingAnswer}
          />

          <SpeechTranscript
            isListening={isListening}
            transcript={transcript}
            interimTranscript={interimTranscript}
            isSupported={isSttSupported}
            onStartListening={startListening}
            onStopListening={stopListening}
            onResetTranscript={resetTranscript}
            onManualTextChange={setTranscriptManual}
            onSubmitAnswer={handleSubmitAnswer}
            isSubmitting={isSubmittingAnswer}
          />
        </div>
      </div>
    </div>
  );
}
