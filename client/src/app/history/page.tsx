'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllReports } from '../../lib/api';
import { ReportData, InterviewSession } from '../../types/interview';

export default function HistoryPage() {
  const [reports, setReports] = useState<ReportData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setIsLoading(true);
        const res = await getAllReports();
        if (res.success && res.reports) {
          setReports(res.reports);
        }
      } catch (err: any) {
        console.error('Error fetching history:', err);
        setError('Could not load interview history.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const getVerdictBadge = (score: number) => {
    if (score >= 80) return 'text-tertiary-container bg-tertiary-container/10 border-tertiary-container/30';
    if (score >= 65) return 'text-primary-container bg-primary-container/10 border-primary-container/30';
    return 'text-error bg-error-container/20 border-error/30';
  };

  const getVerdictLabel = (score: number) => {
    if (score >= 80) return 'Strong Hire';
    if (score >= 65) return 'Satisfactory';
    return 'Needs Practice';
  };

  const formatDuration = (secs: number) => {
    const mins = Math.floor(secs / 60);
    return mins > 0 ? `${mins} mins` : `${secs} secs`;
  };

  return (
    <div className="w-full px-gutter-lg py-space-xl flex flex-col gap-space-xl max-w-7xl mx-auto">
      {/* Top Header & Breadcrumb Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
        <div className="flex flex-col gap-space-xs">
          <div className="flex items-center gap-space-xs text-on-surface-variant font-mono text-label-md">
            <span>SIMULATOR</span>
            <span>/</span>
            <span className="text-primary-container font-semibold">HISTORY & ARCHIVES</span>
          </div>
          <h1 className="font-geist text-headline-xl text-on-surface tracking-tight font-bold">
            Interview Practice History
          </h1>
          <p className="font-geist text-body-lg text-on-surface-variant max-w-2xl">
            Track your performance evolution across previous AI interview sessions and retrospective evaluation reports.
          </p>
        </div>

        <Link
          href="/"
          className="flex items-center gap-space-xs px-space-lg py-space-sm rounded bg-primary-container text-on-primary-container font-geist text-body-md font-semibold hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span>New Technical Session</span>
        </Link>
      </div>

      {isLoading ? (
        <div className="py-12 text-center space-y-3">
          <span className="material-symbols-outlined text-primary-container text-[36px] animate-spin">
            sync
          </span>
          <p className="font-geist text-body-sm text-on-surface-variant">Loading archive records...</p>
        </div>
      ) : error ? (
        <div className="p-space-md rounded bg-error-container/80 border border-error/40 text-on-error-container font-geist text-body-md">
          {error}
        </div>
      ) : reports.length === 0 ? (
        <div className="bg-surface-container p-space-xl rounded-xl border border-outline-variant/30 text-center space-y-4">
          <span className="material-symbols-outlined text-on-surface-variant text-[48px]">folder_open</span>
          <h3 className="font-geist text-headline-md font-bold text-on-surface">No Archived Sessions Yet</h3>
          <p className="font-geist text-body-sm text-on-surface-variant max-w-sm mx-auto">
            You haven't completed any technical interviews yet. Configure your first session to receive a detailed evaluation report.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-space-xs px-space-lg py-space-md rounded bg-primary-container text-on-primary-container font-geist text-body-md font-semibold hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all"
          >
            Start Your First Interview
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {reports.map((r) => {
            const interviewObj = typeof r.interviewId === 'object' ? (r.interviewId as InterviewSession) : null;
            return (
              <div
                key={r._id}
                className="bg-surface-container p-space-md rounded-xl border border-outline-variant/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md transition-all hover:bg-surface-container-high"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-space-xs">
                    <span className="font-geist text-title-md font-bold text-on-surface">
                      {interviewObj ? `${interviewObj.role} (${interviewObj.stack})` : 'Software Engineering Interview'}
                    </span>
                    {interviewObj && (
                      <span className="px-2 py-0.5 rounded font-mono text-label-sm bg-surface-container-highest text-on-surface-variant">
                        {interviewObj.difficulty}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 font-mono text-label-sm text-on-surface-variant">
                    <span>Date: {new Date(r.createdAt).toLocaleDateString()}</span>
                    {interviewObj && (
                      <span>Duration: {formatDuration(interviewObj.durationSeconds || 0)}</span>
                    )}
                    <span>Candidate: {interviewObj?.candidateName || 'Candidate'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-space-lg w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-space-xs md:pt-0 border-outline-variant/30">
                  <div className="text-right">
                    <span className="font-mono text-label-sm text-on-surface-variant uppercase font-semibold block">
                      Overall Score
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full font-mono text-label-sm font-bold border inline-block mt-0.5 ${getVerdictBadge(
                        r.overallScore
                      )}`}
                    >
                      {r.overallScore}% • {getVerdictLabel(r.overallScore)}
                    </span>
                  </div>

                  <Link
                    href={`/report/${r._id}`}
                    className="flex items-center gap-space-xs px-space-md py-space-sm rounded bg-surface-container-high hover:bg-surface-bright text-on-surface font-geist text-body-md font-medium border border-outline-variant/40 transition-colors"
                  >
                    <span>View Report</span>
                    <span className="material-symbols-outlined text-[16px] text-primary-container">arrow_forward</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
