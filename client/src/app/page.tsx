'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { startInterview } from '../lib/api';

export default function Home() {
  const router = useRouter();

  const [candidateName, setCandidateName] = useState('');
  const [role, setRole] = useState('Full Stack Developer');
  const [stack, setStack] = useState('MERN');
  const [difficulty, setDifficulty] = useState('Mid-level');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Hardware Diagnostic Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStartInterview = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await startInterview({
        candidateName: candidateName.trim() || 'Candidate',
        role,
        stack,
        difficulty
      });

      if (res.success && res.interview && res.interview._id) {
        router.push(`/interview/${res.interview._id}`);
      } else {
        setError('Failed to create interview session.');
      }
    } catch (err: any) {
      console.error('Error starting interview:', err);
      setError(
        err.response?.data?.error ||
        'Could not connect to backend server. Make sure server is running on port 5001.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full px-gutter-lg py-space-xl flex flex-col gap-space-xl max-w-7xl mx-auto">
      {/* Top Header & Breadcrumb Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
        <div className="flex flex-col gap-space-xs">
          <div className="flex items-center gap-space-xs text-on-surface-variant font-mono text-label-md">
            <span>SIMULATOR</span>
            <span>/</span>
            <span className="text-primary-container font-semibold">STAGE 01 : PARAMETERS</span>
          </div>
          <h1 className="font-geist text-headline-xl text-on-surface tracking-tight font-bold">
            Technical Session Configuration
          </h1>
          <p className="font-geist text-body-lg text-on-surface-variant max-w-2xl">
            Calibrate difficulty constraints, active stack, and telemetry diagnostics prior to activating the adaptive AI evaluation loop.
          </p>
        </div>

        {/* Quick Hardware Diagnostic Trigger Button */}
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-space-xs px-space-md py-space-sm rounded bg-surface-container-high border border-outline-variant/40 text-on-surface hover:bg-surface-bright transition-colors text-body-md font-medium"
        >
          <span className="material-symbols-outlined text-primary-container text-[18px]">videocam</span>
          <span>Hardware & Mic Diagnostic</span>
        </button>
      </div>

      {error && (
        <div className="p-space-md rounded bg-error-container/80 border border-error/40 text-on-error-container text-body-md">
          {error}
        </div>
      )}

      {/* Main Form Setup Workspace Grid */}
      <form onSubmit={handleStartInterview} className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
        {/* Left Configuration Column (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-space-xl">
          {/* Candidate Name Input */}
          <div className="flex flex-col gap-space-xs">
            <label className="font-mono text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">
              Candidate Identity
            </label>
            <input
              type="text"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              placeholder="Enter your name (e.g. Alex Johnson)"
              className="w-full px-space-md py-space-sm rounded bg-surface-container-low border border-outline-variant/50 text-on-surface font-geist text-body-md placeholder-on-surface-variant/50 focus:outline-none focus:border-primary-container transition-colors"
            />
          </div>

          {/* Section 1: Target Role Selection Cards */}
          <div className="flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <span className="w-2 h-2 rounded-full bg-primary-container"></span>
                <h2 className="font-geist text-title-md text-on-surface font-semibold">Target Engineering Role</h2>
              </div>
              <span className="font-mono text-label-sm text-on-surface-variant">REQ-P-01</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
              {/* Full Stack Developer Card */}
              <div
                onClick={() => setRole('Full Stack Developer')}
                className={`cursor-pointer transition-all duration-200 p-space-lg rounded-xl shadow-md flex flex-col justify-between gap-space-lg relative overflow-hidden ${role === 'Full Stack Developer'
                    ? 'bg-surface-container ring-2 ring-primary-container'
                    : 'bg-surface-container-low hover:bg-surface-container'
                  }`}
              >
                <div className="flex flex-col gap-space-sm">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary-container shadow-inner">
                      <span className="material-symbols-outlined text-[22px]">layers</span>
                    </div>
                    {role === 'Full Stack Developer' && (
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary-container text-on-primary-container font-bold text-[12px]">
                        <span className="material-symbols-outlined text-[14px]">check</span>
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-geist text-headline-md text-on-surface font-semibold">Full Stack Developer</h3>
                    <p className="font-geist text-body-md text-on-surface-variant mt-1">
                      End-to-end architecture, API contracts, state lifecycle, and relational/document database schema design.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-space-xs pt-space-xs">
                  <span className="font-mono text-label-sm text-on-surface-variant uppercase tracking-wider">Evaluation Focus:</span>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="font-mono text-label-sm bg-surface-container-lowest text-primary-container px-space-xs py-0.5 rounded">REST/GraphQL</span>
                    <span className="font-mono text-label-sm bg-surface-container-lowest text-primary-container px-space-xs py-0.5 rounded">Reactive State</span>
                    <span className="font-mono text-label-sm bg-surface-container-lowest text-primary-container px-space-xs py-0.5 rounded">ORM & Indexing</span>
                  </div>
                </div>
              </div>

              {/* Software Engineer Card */}
              <div
                onClick={() => setRole('Software Engineer')}
                className={`cursor-pointer transition-all duration-200 p-space-lg rounded-xl shadow-md flex flex-col justify-between gap-space-lg relative overflow-hidden ${role === 'Software Engineer'
                    ? 'bg-surface-container ring-2 ring-primary-container'
                    : 'bg-surface-container-low hover:bg-surface-container'
                  }`}
              >
                <div className="flex flex-col gap-space-sm">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-secondary shadow-inner">
                      <span className="material-symbols-outlined text-[22px]">terminal</span>
                    </div>
                    {role === 'Software Engineer' && (
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary-container text-on-primary-container font-bold text-[12px]">
                        <span className="material-symbols-outlined text-[14px]">check</span>
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-geist text-headline-md text-on-surface font-semibold">Software Engineer</h3>
                    <p className="font-geist text-body-md text-on-surface-variant mt-1">
                      Core systems, algorithmic efficiency, clean patterns, and concurrency principles.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-space-xs pt-space-xs">
                  <span className="font-mono text-label-sm text-on-surface-variant uppercase tracking-wider">Evaluation Focus:</span>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="font-mono text-label-sm bg-surface-container-lowest text-secondary px-space-xs py-0.5 rounded">DSA & Big-O</span>
                    <span className="font-mono text-label-sm bg-surface-container-lowest text-secondary px-space-xs py-0.5 rounded">Memory Locality</span>
                    <span className="font-mono text-label-sm bg-surface-container-lowest text-secondary px-space-xs py-0.5 rounded">Modular Architecture</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Technology & Stack Multi-Select */}
          <div className="flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                <h2 className="font-geist text-title-md text-on-surface font-semibold">Active Technology Stack</h2>
              </div>
              <span className="font-geist text-body-sm text-on-surface-variant">Select target stack context</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm">
              {[
                { name: 'MERN', icon: 'dns', desc: 'React, Node, Mongo' },
                { name: 'Java', icon: 'coffee', desc: 'Spring Boot, JPA' },
                { name: 'SQL', icon: 'database', desc: 'Queries & Indexing' },
                { name: 'JavaScript', icon: 'javascript', desc: 'Async & ES6' },
                { name: 'React', icon: 'view_in_ar', desc: 'Hooks & VDOM' },
                { name: 'Node.js', icon: 'developer_board', desc: 'Event Loop & Express' },
                { name: 'MongoDB', icon: 'dataset', desc: 'Documents & Aggregation' },
                { name: 'Spring Boot', icon: 'settings_suggest', desc: 'Microservices & Beans' }
              ].map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setStack(item.name)}
                  className={`flex items-center justify-between p-space-sm rounded-lg transition-colors text-left ${stack === item.name
                      ? 'bg-surface-container ring-1 ring-primary-container text-on-surface'
                      : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                    }`}
                >
                  <div className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-[16px] text-primary-container">{item.icon}</span>
                    <span className="font-mono text-code-md font-medium text-on-surface">{item.name}</span>
                  </div>
                  {stack === item.name && (
                    <span className="material-symbols-outlined text-[16px] text-primary-container">check_circle</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Section 3: Target Difficulty Matrix */}
          <div className="flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                <h2 className="font-geist text-title-md text-on-surface font-semibold">Experience Difficulty Level</h2>
              </div>
              <span className="font-mono text-label-sm text-on-surface-variant">REQ-P-03</span>
            </div>

            <div className="grid grid-cols-2 gap-space-md">
              {['Junior', 'Mid-level'].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setDifficulty(lvl)}
                  className={`p-space-md rounded-xl border text-left transition-all ${difficulty === lvl
                      ? 'bg-surface-container border-primary-container text-on-surface shadow-md'
                      : 'bg-surface-container-low border-outline-variant/30 text-on-surface-variant hover:bg-surface-container'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-geist text-headline-md font-semibold text-on-surface">{lvl} Track</span>
                    {difficulty === lvl && (
                      <span className="font-mono text-label-sm px-2 py-0.5 rounded bg-primary-container/20 text-primary-container font-semibold">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <p className="font-geist text-body-sm text-on-surface-variant mt-1">
                    {lvl === 'Junior'
                      ? 'Focus on fundamentals, language syntax, basic algorithms, and standard APIs.'
                      : 'Evaluates production trade-offs, security vulnerabilities, database performance, and follow-up probes.'}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Summary & Launch Drawer Column (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-space-lg">
          <div className="bg-surface-container rounded-xl p-space-lg shadow-xl border border-outline-variant/30 flex flex-col justify-between gap-space-lg">
            <div className="flex flex-col gap-space-md">
              <div className="flex items-center justify-between border-b border-outline-variant/30 pb-space-sm">
                <span className="font-mono text-label-sm uppercase text-on-surface-variant">Session Summary</span>
                <span className="font-mono text-label-sm text-tertiary-container bg-tertiary-container/10 px-space-xs py-0.5 rounded">
                  READY
                </span>
              </div>

              <div className="space-y-3 font-geist text-body-md">
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Target Role:</span>
                  <span className="font-semibold text-on-surface">{role}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Active Stack:</span>
                  <span className="font-mono text-primary-container font-semibold">{stack}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Difficulty Level:</span>
                  <span className="font-semibold text-on-surface">{difficulty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Question Limit:</span>
                  <span className="font-mono text-tertiary font-semibold">Dynamic / Adaptive</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Recording:</span>
                  <span className="font-mono text-error font-semibold">Local MediaRecorder</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-space-sm pt-space-md border-t border-outline-variant/30">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-space-md bg-primary-container text-on-primary-container font-geist text-body-lg font-bold rounded-lg hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all flex items-center justify-center gap-space-xs disabled:opacity-50"
              >
                {isLoading ? (
                  <span>Initializing Engine...</span>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[20px]">play_arrow</span>
                    <span>Activate Adaptive AI Simulator</span>
                  </>
                )}
              </button>

              <p className="font-geist text-body-sm text-on-surface-variant text-center">
                Camera & mic permissions will be requested in the room.
              </p>
            </div>
          </div>
        </div>
      </form>

      {/* Hardware Diagnostic Modal / Drawer overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface-container-lowest/80 backdrop-blur-md p-space-md">
          <div className="bg-surface-container w-full max-w-2xl rounded-xl shadow-2xl p-space-lg flex flex-col gap-space-lg relative border border-outline-variant/40">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-primary-container text-[24px]">videocam</span>
                <div>
                  <h3 className="font-geist text-headline-md text-on-surface font-semibold tracking-tight">
                    Audio & Video Diagnostic
                  </h3>
                  <p className="font-geist text-body-sm text-on-surface-variant">
                    Verify high-definition capture devices before commencing simulation
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
              {/* Video Test */}
              <div className="relative rounded-xl overflow-hidden bg-surface-container-lowest aspect-video flex items-center justify-center border border-outline-variant/30">
                <div className="text-center p-4">
                  <span className="material-symbols-outlined text-primary-container text-[36px] mb-2">
                    videocam
                  </span>
                  <p className="font-geist text-body-sm text-on-surface font-medium">
                    Integrated Camera Feed Ready
                  </p>
                  <span className="font-mono text-label-sm text-tertiary-container block mt-1">
                    60 FPS • 1080p HD
                  </span>
                </div>
              </div>

              {/* Mic Diagnostics & Waveform */}
              <div className="bg-surface-container-high rounded-xl p-space-md flex flex-col justify-between">
                <div className="flex flex-col gap-space-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-label-md text-on-surface font-medium">
                      Input Signal Amplitude
                    </span>
                    <span className="font-mono text-label-sm text-tertiary">-14 dB</span>
                  </div>
                  <p className="font-geist text-body-sm text-on-surface-variant">
                    Speak clearly to test audio input levels.
                  </p>
                </div>

                <div className="flex items-end gap-1.5 h-20 px-space-xs py-space-sm bg-surface-container-lowest rounded-lg justify-center border border-outline-variant/30">
                  <span className="w-1.5 rounded-full bg-tertiary-container animate-pulse h-4"></span>
                  <span className="w-1.5 rounded-full bg-tertiary-container animate-pulse h-8"></span>
                  <span className="w-1.5 rounded-full bg-tertiary h-14"></span>
                  <span className="w-1.5 rounded-full bg-tertiary animate-pulse h-16"></span>
                  <span className="w-1.5 rounded-full bg-tertiary h-10"></span>
                  <span className="w-1.5 rounded-full bg-tertiary animate-pulse h-12"></span>
                  <span className="w-1.5 rounded-full bg-tertiary-container h-6"></span>
                  <span className="w-1.5 rounded-full bg-tertiary-container animate-pulse h-3"></span>
                </div>

                <div className="flex items-center justify-between pt-space-xs">
                  <div className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-tertiary text-[18px]">mic</span>
                    <span className="font-mono text-label-md text-on-surface">Default Microphone</span>
                  </div>
                  <span className="font-mono text-label-sm text-tertiary bg-tertiary/10 px-space-xs py-0.5 rounded">
                    Calibrated
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-space-sm pt-space-xs">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-space-lg py-space-sm bg-primary-container text-on-primary-container font-geist text-body-md font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all"
              >
                Done & Return to Setup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
