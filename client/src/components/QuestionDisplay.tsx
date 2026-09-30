import React from 'react';
import { TurnType } from '../types/interview';

interface QuestionDisplayProps {
  question: string;
  topic?: string;
  turnType?: TurnType;
  isSpeaking: boolean;
  onReplaySpeech: () => void;
  isLoadingNext: boolean;
}

export const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  question,
  topic = 'General',
  turnType = 'question',
  isSpeaking,
  onReplaySpeech,
  isLoadingNext
}) => {
  const getBadgeStyle = (type?: TurnType) => {
    switch (type) {
      case 'follow_up':
        return 'bg-amber-500/10 border-amber-500/30 text-amber-400';
      case 'challenge':
        return 'bg-error-container/80 border-error/40 text-error';
      case 'clarification':
        return 'bg-secondary-container/60 border-secondary/40 text-secondary';
      case 'topic_switch':
        return 'bg-tertiary-container/10 border-tertiary-container/30 text-tertiary-container';
      default:
        return 'bg-surface-container-highest text-primary-container border-outline-variant/40';
    }
  };

  const getBadgeLabel = (type?: TurnType) => {
    switch (type) {
      case 'follow_up':
        return 'Probing Follow-up';
      case 'challenge':
        return 'Deep Challenge';
      case 'clarification':
        return 'Clarification Request';
      case 'topic_switch':
        return 'Topic Transition';
      default:
        return 'Technical Question';
    }
  };

  return (
    <div className="w-full bg-surface-container rounded-xl p-space-md shadow-md flex flex-col gap-space-md relative overflow-hidden border border-outline-variant/30">
      {/* Accent Aura Glow */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary-container/10 rounded-full blur-2xl pointer-events-none"></div>

      {/* Header: Agent Identity & Adaptive Context Badge */}
      <div className="flex items-start justify-between gap-space-sm flex-wrap">
        <div className="flex items-center gap-space-sm">
          <div className="w-10 h-10 rounded bg-primary-container/15 flex items-center justify-center text-primary-container shadow-[0_0_12px_rgba(37,99,235,0.25)] border border-primary-container/30">
            <span className="material-symbols-outlined text-[24px]">psychology</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-space-xs">
              <span className="font-geist text-title-md text-on-surface font-semibold">Senior Tech Interviewer</span>
              <span className="px-1.5 py-0.5 rounded bg-surface-container-highest font-mono text-label-sm text-primary-container">
                AI v2.4
              </span>
            </div>
            <span className="font-geist text-body-sm text-on-surface-variant">Autonomous Technical Rigor Engine</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-surface-container-highest px-space-sm py-1 rounded-full text-secondary">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
          <span className="font-mono text-label-sm font-semibold tracking-wide">{getBadgeLabel(turnType)}</span>
        </div>
      </div>

      {/* Topic Banner */}
      <div className="w-full bg-surface-container-high px-space-md py-space-xs rounded flex items-center justify-between border border-outline-variant/30">
        <div className="flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-[16px] text-tertiary-container">tune</span>
          <span className="font-geist text-label-md text-tertiary-container font-medium">
            Active Topic: {topic}
          </span>
        </div>
        <span className={`px-2 py-0.5 rounded font-mono text-label-sm border ${getBadgeStyle(turnType)}`}>
          {turnType.toUpperCase()}
        </span>
      </div>

      {/* Question Body Area */}
      <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-inner flex flex-col gap-space-sm border border-outline-variant/30">
        <div className="flex items-center justify-between">
          <span className="font-mono text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
            Current Prompt
          </span>
          <button
            onClick={onReplaySpeech}
            className="flex items-center gap-1 text-primary-container hover:text-primary font-mono text-label-sm bg-surface-container px-2 py-1 rounded transition-colors"
          >
            <span className="material-symbols-outlined text-[14px]">volume_up</span>
            <span>Replay Voice</span>
          </button>
        </div>

        {isLoadingNext ? (
          <div className="py-6 flex items-center gap-3 text-on-surface-variant font-geist text-body-md">
            <span className="material-symbols-outlined text-primary-container text-[20px] animate-spin">
              sync
            </span>
            <span>Analyzing your response and synthesizing next technical question...</span>
          </div>
        ) : (
          <p className="font-geist text-body-lg text-on-surface font-normal leading-relaxed">
            “{question}”
          </p>
        )}
      </div>

      {/* AI Agent Status Bar */}
      <div className="w-full bg-surface-container-high rounded p-space-sm flex items-center justify-between border border-outline-variant/30">
        <div className="flex items-center gap-space-sm">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-container opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-container shadow-[0_0_8px_rgba(37,99,235,0.8)]"></span>
          </span>
          <span className="font-mono text-label-md text-on-surface font-semibold tracking-wide">
            {isSpeaking ? 'AI Speaking Question...' : 'Listening & Analyzing Answer...'}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <span className="w-1.5 h-3 bg-primary-container rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-1.5 h-4 bg-primary-container rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-1.5 h-2 bg-primary-container rounded-full animate-bounce"></span>
        </div>
      </div>
    </div>
  );
};
