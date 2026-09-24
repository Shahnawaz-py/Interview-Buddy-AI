'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import { getReportById } from '../../../lib/api';
import { ReportData, InterviewSession } from '../../../types/interview';
import { EvaluationReport } from '../../../components/EvaluationReport';

export default function ReportPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [report, setReport] = useState<ReportData | null>(null);
  const [interview, setInterview] = useState<InterviewSession | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchReport = async () => {
      try {
        setIsLoading(true);
        const res = await getReportById(id);
        if (res.success && res.report) {
          if (isMounted) {
            setReport(res.report);
            if (typeof res.report.interviewId === 'object') {
              setInterview(res.report.interviewId as InterviewSession);
            }

            try {
              confetti({
                particleCount: 60,
                spread: 70,
                origin: { y: 0.6 }
              });
            } catch (e) {
              // Ignore
            }
          }
        }
      } catch (err: any) {
        console.error('Error fetching report:', err);
        if (isMounted) setError('Evaluation report not found.');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchReport();
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <span className="material-symbols-outlined text-primary-container text-[40px] animate-spin">
          sync
        </span>
        <p className="font-geist text-body-md text-on-surface-variant">
          Synthesizing Comprehensive Candidate Evaluation Report...
        </p>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="max-w-md mx-auto text-center py-12 space-y-4">
        <h2 className="font-geist text-headline-md font-bold text-error">Report Error</h2>
        <p className="font-geist text-body-md text-on-surface-variant">{error || 'Could not find report.'}</p>
        <button
          onClick={() => router.push('/')}
          className="px-space-lg py-space-sm rounded bg-surface-container-high text-on-surface font-geist text-body-md"
        >
          Return to Setup
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <EvaluationReport report={report} interview={interview} />
    </div>
  );
}
