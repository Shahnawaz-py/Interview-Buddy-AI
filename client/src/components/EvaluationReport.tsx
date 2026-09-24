import React from 'react';
import { ReportData, InterviewSession } from '../types/interview';

interface EvaluationReportProps {
  report: ReportData;
  interview?: InterviewSession;
  onDownloadVideo?: () => void;
}

export const EvaluationReport: React.FC<EvaluationReportProps> = ({
  report,
  interview,
  onDownloadVideo
}) => {
  const getVerdictLabel = (score: number) => {
    if (score >= 80) return 'Strong Hire';
    if (score >= 65) return 'Satisfactory';
    return 'Needs Practice';
  };

  const getVerdictColor = (score: number) => {
    if (score >= 80) return 'text-tertiary';
    if (score >= 65) return 'text-primary-container';
    return 'text-error';
  };

  const downloadTranscriptFile = () => {
    if (!interview || !interview.transcript) return;

    let content = `=========================================================\n`;
    content += `INTERVIEW BUDDY - CANDIDATE EVALUATION TRANSCRIPT\n`;
    content += `Candidate: ${interview.candidateName || 'Candidate'}\n`;
    content += `Role: ${interview.role} (${interview.stack})\n`;
    content += `Level: ${interview.difficulty}\n`;
    content += `Date: ${new Date(interview.createdAt).toLocaleString()}\n`;
    content += `Overall Score: ${report.overallScore}/100\n`;
    content += `=========================================================\n\n`;

    interview.transcript.forEach((t) => {
      content += `[${new Date(t.timestamp).toLocaleTimeString()}] ${t.speaker.toUpperCase()} (${t.topic || 'General'}):\n${t.text}\n\n`;
    });

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `interview-transcript-${interview._id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Banner Ribbon */}
      <div className="w-full bg-surface-container-lowest px-gutter-lg py-space-xl border-b border-outline-variant/30">
        <div className="max-w-7xl mx-auto flex flex-col gap-space-lg">
          <div className="flex flex-wrap items-center justify-between gap-space-md">
            <div className="flex items-center gap-space-sm font-mono text-label-sm text-primary-container uppercase tracking-wider">
              <span className="flex h-2 w-2 rounded-full bg-primary-container"></span>
              <span>Interview Session Report • {interview ? interview._id : 'AI-EVAL'}</span>
            </div>

            <div className="flex items-center gap-space-sm flex-wrap">
              <button
                type="button"
                onClick={downloadTranscriptFile}
                className="px-space-md py-space-sm rounded-lg bg-surface-container-high text-on-surface font-geist text-body-md hover:bg-surface-container-highest transition-colors flex items-center gap-space-xs shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px] text-primary-container">description</span>
                <span>Download Transcript (.txt)</span>
              </button>

              {onDownloadVideo && (
                <button
                  type="button"
                  onClick={onDownloadVideo}
                  className="px-space-md py-space-sm rounded-lg bg-primary-container text-surface-container-lowest font-geist text-body-md font-semibold hover:opacity-95 transition-opacity flex items-center gap-space-xs shadow-md shadow-primary-container/20"
                >
                  <span className="material-symbols-outlined text-[18px]">download</span>
                  <span>Download Recording (WebM)</span>
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-end">
            <div className="lg:col-span-8 flex flex-col gap-space-xs">
              <div className="flex items-center gap-space-sm font-mono text-label-md text-secondary">
                <span>{interview ? `${interview.role.toUpperCase()} (${interview.stack})` : 'FULL STACK DEVELOPER (MERN)'}</span>
                <span className="text-outline">•</span>
                <span className="text-on-surface-variant">{interview ? `${interview.difficulty.toUpperCase()} TRACK` : 'MID-LEVEL TRACK'}</span>
              </div>
              <h1 className="font-geist text-headline-xl text-on-surface tracking-tight font-bold">
                Performance Evaluation
              </h1>
              <p className="font-geist text-body-md text-on-surface-variant">
                Conducted on {new Date(report.createdAt).toLocaleDateString()} • Evaluator: Gemini AI Technical Persona Engine
              </p>
            </div>

            {/* Verdict Card with Score Circle SVG */}
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <div className="bg-surface-container-high px-space-lg py-space-md rounded-xl flex items-center gap-space-md shadow-sm border border-outline-variant/30">
                <div className="relative flex items-center justify-center">
                  <svg className="w-16 h-16 transform -rotate-90">
                    <circle className="text-surface-variant" cx="32" cy="32" fill="transparent" r="26" stroke="currentColor" strokeWidth="4"></circle>
                    <circle
                      className="text-primary-container"
                      cx="32"
                      cy="32"
                      fill="transparent"
                      r="26"
                      stroke="currentColor"
                      strokeDasharray="163.36"
                      strokeDashoffset={163.36 - (163.36 * report.overallScore) / 100}
                      strokeLinecap="round"
                      strokeWidth="4"
                    ></circle>
                  </svg>
                  <span className="absolute font-mono text-code-lg text-on-surface font-bold">
                    {report.overallScore}%
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-label-sm text-primary-container uppercase tracking-wider font-semibold">
                    Consensus Verdict
                  </span>
                  <span className={`font-geist text-headline-md font-bold leading-tight ${getVerdictColor(report.overallScore)}`}>
                    {getVerdictLabel(report.overallScore)}
                  </span>
                  <span className="font-geist text-body-sm text-on-surface-variant">AI Assessed Score</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Report Body */}
      <div className="max-w-7xl mx-auto w-full px-gutter-lg py-space-xl flex flex-col gap-space-xl">
        {/* Core Competency Matrix & Strengths/Weaknesses */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
          {/* Radar & Progress Bars */}
          <div className="lg:col-span-7 bg-surface-container rounded-xl p-space-lg flex flex-col justify-between shadow-sm relative overflow-hidden border border-outline-variant/30">
            <div className="flex flex-col gap-space-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[18px] text-primary-container">query_stats</span>
                  <h2 className="font-geist text-title-md text-on-surface font-semibold">Core Competency Matrix</h2>
                </div>
                <span className="font-mono text-label-sm text-on-surface-variant bg-surface-container-high px-space-sm py-0.5 rounded">
                  Adaptive Weighting v4.2
                </span>
              </div>
              <p className="font-geist text-body-sm text-on-surface-variant">
                Multi-vector analysis scored against engineering benchmarks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-space-md my-space-md items-center">
              {/* SVG Polygon Radar */}
              <div className="md:col-span-6 flex justify-center items-center py-space-sm">
                <svg className="w-48 h-48 drop-shadow-md" viewBox="0 0 220 220">
                  <polygon className="text-surface-variant/40" fill="currentColor" points="110,20 195,80 162,175 58,175 25,80"></polygon>
                  <polygon className="text-outline-variant/60" fill="none" points="110,40 175,85 150,158 70,158 45,85" stroke="currentColor" strokeWidth="1"></polygon>
                  <polygon className="text-outline-variant/40" fill="none" points="110,65 155,95 138,142 82,142 65,95" stroke="currentColor" strokeWidth="1"></polygon>
                  <line className="text-outline-variant/50" stroke="currentColor" strokeWidth="1" x1="110" x2="110" y1="110" y2="20"></line>
                  <line className="text-outline-variant/50" stroke="currentColor" strokeWidth="1" x1="110" x2="195" y1="110" y2="80"></line>
                  <line className="text-outline-variant/50" stroke="currentColor" strokeWidth="1" x1="110" x2="162" y1="110" y2="175"></line>
                  <line className="text-outline-variant/50" stroke="currentColor" strokeWidth="1" x1="110" x2="58" y1="110" y2="175"></line>
                  <line className="text-outline-variant/50" stroke="currentColor" strokeWidth="1" x1="110" x2="25" y1="110" y2="80"></line>
                  <polygon className="text-primary-container/20" fill="currentColor" points="110,28 180,85 148,162 68,160 38,82" stroke="currentColor" strokeWidth="2"></polygon>
                  <circle className="fill-primary-container" cx="110" cy="28" r="3.5"></circle>
                  <circle className="fill-primary-container" cx="180" cy="85" r="3.5"></circle>
                  <circle className="fill-primary-container" cx="148" cy="162" r="3.5"></circle>
                  <circle className="fill-primary-container" cx="68" cy="160" r="3.5"></circle>
                  <circle className="fill-primary-container" cx="38" cy="82" r="3.5"></circle>
                </svg>
              </div>

              {/* Progress Bars */}
              <div className="md:col-span-6 flex flex-col gap-space-sm">
                {[
                  { label: 'Technical Knowledge', val: report.technicalKnowledgeScore, color: 'bg-primary-container', text: 'text-primary-container' },
                  { label: 'Problem Solving', val: report.problemSolvingScore, color: 'bg-secondary', text: 'text-secondary' },
                  { label: 'Fundamentals', val: report.depthOfKnowledgeScore, color: 'bg-tertiary-container', text: 'text-tertiary-container' },
                  { label: 'Handling Follow-ups', val: report.handlingFollowupsScore, color: 'bg-secondary-container', text: 'text-secondary-container' },
                  { label: 'Communication', val: report.communicationScore, color: 'bg-primary', text: 'text-primary' }
                ].map((m, idx) => (
                  <div key={idx} className="flex flex-col gap-1">
                    <div className="flex justify-between font-mono text-label-md">
                      <span className="text-on-surface">{m.label}</span>
                      <span className={`${m.text} font-mono font-bold`}>{m.val}%</span>
                    </div>
                    <div className="w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
                      <div className={`${m.color} h-1.5 rounded-full`} style={{ width: `${m.val}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-space-xs bg-surface-container-lowest/60 p-space-sm rounded-lg text-on-surface-variant font-geist text-body-sm border border-outline-variant/30">
              <span className="material-symbols-outlined text-[16px] text-outline">info</span>
              <span>{report.disclaimer}</span>
            </div>
          </div>

          {/* Strengths & Weaknesses Columns */}
          <div className="lg:col-span-5 flex flex-col gap-space-md">
            {/* Strengths */}
            <div className="bg-surface-container rounded-xl p-space-lg flex flex-col gap-space-sm shadow-sm border border-outline-variant/30">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[20px] text-tertiary-container">verified</span>
                <h2 className="font-geist text-title-md text-on-surface font-semibold">Identified Strengths</h2>
              </div>
              <div className="flex flex-col gap-space-xs mt-space-xs">
                {report.strongAreas.map((area, idx) => (
                  <div key={idx} className="bg-surface-container-high/60 p-space-sm rounded-lg flex items-start gap-space-sm">
                    <span className="px-space-xs py-0.5 rounded bg-tertiary-container/20 text-tertiary-container font-mono text-label-sm uppercase font-semibold">
                      Proficiency
                    </span>
                    <div className="flex flex-col min-w-0">
                      <span className="font-geist text-body-md text-on-surface font-medium">{area.topic}</span>
                      <span className="font-geist text-body-sm text-on-surface-variant">{area.details}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weaknesses */}
            <div className="bg-surface-container rounded-xl p-space-lg flex flex-col gap-space-sm shadow-sm border border-outline-variant/30">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[20px] text-error">warning</span>
                <h2 className="font-geist text-title-md text-on-surface font-semibold">Growth & Weakness Vectors</h2>
              </div>
              <div className="flex flex-col gap-space-xs mt-space-xs">
                {report.weakAreas.map((area, idx) => (
                  <div key={idx} className="bg-surface-container-high/60 p-space-sm rounded-lg flex items-start gap-space-sm">
                    <span className="px-space-xs py-0.5 rounded bg-error/20 text-error font-mono text-label-sm uppercase font-semibold">
                      Growth Area
                    </span>
                    <div className="flex flex-col min-w-0">
                      <span className="font-geist text-body-md text-on-surface font-medium">{area.topic}</span>
                      <span className="font-geist text-body-sm text-on-surface-variant">{area.details}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Curated Study Paths */}
        <div className="bg-surface-container rounded-xl p-space-lg flex flex-col gap-space-md shadow-sm border border-outline-variant/30">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-[20px] text-secondary">menu_book</span>
              <h2 className="font-geist text-title-md text-on-surface font-semibold">Recommended Curated Study Paths</h2>
            </div>
            <span className="font-mono text-label-sm text-on-surface-variant">Tailored from identified weaknesses</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
            {report.topicsToStudy.map((item, idx) => (
              <div key={idx} className="bg-surface-container-high rounded-lg p-space-md flex flex-col justify-between hover:bg-surface-container-highest transition-colors border border-outline-variant/20">
                <div className="flex flex-col gap-space-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-label-sm text-primary-container uppercase tracking-wider font-semibold">
                      {item.priority} Priority
                    </span>
                    <span className="material-symbols-outlined text-[16px] text-on-surface-variant">arrow_forward</span>
                  </div>
                  <h3 className="font-geist text-body-lg text-on-surface font-semibold">{item.topic}</h3>
                  <p className="font-geist text-body-sm text-on-surface-variant">{item.advice}</p>
                </div>
                {item.suggestedResource && (
                  <div className="mt-space-md flex items-center gap-space-xs font-mono text-label-sm text-outline">
                    <span className="material-symbols-outlined text-[14px]">auto_stories</span>
                    <span>Resource: {item.suggestedResource}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Question-by-Question Transcript Breakdown */}
        <div className="bg-surface-container rounded-xl p-space-lg flex flex-col gap-space-md shadow-sm border border-outline-variant/30">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-[20px] text-primary-container">list_alt</span>
            <h2 className="font-geist text-title-md text-on-surface font-semibold">Detailed Question-by-Question Breakdown</h2>
          </div>

          <div className="space-y-4">
            {report.questionEvaluations.map((qEval, idx) => (
              <div key={idx} className="bg-surface-container-lowest p-space-md rounded-xl border border-outline-variant/30 flex flex-col gap-space-sm">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-outline-variant/30 pb-space-xs">
                  <div className="flex items-center gap-space-xs">
                    <span className="px-2 py-0.5 rounded bg-primary-container/20 text-primary-container font-mono text-label-sm font-bold">
                      Q{idx + 1}
                    </span>
                    <span className="font-mono text-label-sm text-on-surface-variant bg-surface-container px-2 py-0.5 rounded">
                      {qEval.topic}
                    </span>
                  </div>
                  <span className="font-mono text-label-sm text-tertiary-container bg-tertiary-container/10 px-2 py-0.5 rounded">
                    Score: {qEval.score} / 100
                  </span>
                </div>

                <div>
                  <span className="font-mono text-label-sm text-primary-container uppercase tracking-wider block">Interviewer:</span>
                  <p className="font-geist text-body-md text-on-surface font-medium mt-0.5">"{qEval.question}"</p>
                </div>

                <div>
                  <span className="font-mono text-label-sm text-on-surface-variant uppercase tracking-wider block">Candidate:</span>
                  <p className="font-geist text-body-sm text-on-surface-variant bg-surface-container p-space-sm rounded italic border border-outline-variant/20 mt-0.5">
                    "{qEval.candidateAnswer}"
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-xs pt-1 text-body-sm">
                  <div className="bg-tertiary-container/10 p-space-xs rounded border border-tertiary-container/20">
                    <span className="font-mono text-label-sm text-tertiary-container font-semibold block">Strengths:</span>
                    <span className="text-on-surface block mt-0.5">{qEval.strengths}</span>
                  </div>
                  <div className="bg-error-container/20 p-space-xs rounded border border-error-container/30">
                    <span className="font-mono text-label-sm text-error font-semibold block">Weaknesses / Gaps:</span>
                    <span className="text-on-surface block mt-0.5">{qEval.weaknesses}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
