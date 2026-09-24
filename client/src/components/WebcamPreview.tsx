import React from 'react';

interface WebcamPreviewProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  isRecording: boolean;
  durationSeconds: number;
  error: string | null;
  candidateName?: string;
  role?: string;
}

export const WebcamPreview: React.FC<WebcamPreviewProps> = ({
  videoRef,
  isRecording,
  durationSeconds,
  error,
  candidateName = 'Candidate',
  role = 'Software Engineer'
}) => {
  const formatTime = (secs: number) => {
    const hours = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const remainingSecs = secs % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col gap-space-md">
      {/* Live Video Container Frame */}
      <div className="relative w-full aspect-[16/10] bg-surface-container-lowest rounded-xl overflow-hidden shadow-xl flex items-center justify-center border border-outline-variant/30">
        {/* Video Feed */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover transform -scale-x-100"
        />

        {/* Fallback Overlay if Error or No Stream */}
        {error && (
          <div className="absolute inset-0 bg-surface-container-lowest/95 flex flex-col items-center justify-center p-space-lg text-center z-20">
            <div className="w-12 h-12 rounded-full bg-error-container/80 flex items-center justify-center text-error mb-space-xs">
              <span className="material-symbols-outlined text-[24px]">videocam_off</span>
            </div>
            <h4 className="font-geist text-headline-md text-error font-semibold">Camera Feed Access Error</h4>
            <p className="font-geist text-body-sm text-on-surface-variant max-w-sm mt-1">{error}</p>
          </div>
        )}

        {/* Ambient Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-surface-container-lowest/40 pointer-events-none"></div>

        {/* Top Left Stream Stamp */}
        <div className="absolute top-space-md left-space-md flex items-center gap-space-xs bg-surface-container-lowest/85 backdrop-blur-md px-space-md py-space-xs rounded-full shadow-md border border-outline-variant/40">
          <span className="w-2 h-2 rounded-full bg-primary-container shadow-[0_0_8px_rgba(0,240,255,0.8)] animate-pulse"></span>
          <span className="font-mono text-label-sm uppercase tracking-wider text-primary-container font-bold">
            Candidate Feed · HD
          </span>
        </div>

        {/* Top Right Hardware Diagnostic Pills */}
        <div className="absolute top-space-md right-space-md flex items-center gap-space-xs">
          <div className="flex items-center gap-1 bg-surface-container-lowest/80 backdrop-blur-md px-space-sm py-1 rounded border border-outline-variant/30">
            <span className="material-symbols-outlined text-[14px] text-tertiary-container">check_circle</span>
            <span className="font-mono text-label-sm text-on-surface">Neural Audio Filter</span>
          </div>
        </div>

        {/* Bottom Overlay: Live Audio Frequency Oscilloscope */}
        <div className="absolute bottom-0 left-0 right-0 p-space-md bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/90 to-transparent flex flex-col gap-space-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-[16px] text-primary-container">graphic_eq</span>
              <span className="font-geist text-label-md text-on-surface font-semibold">
                Active Microphone Stream ({candidateName})
              </span>
            </div>
            <span className="font-mono text-code-md text-tertiary-container font-medium">-18.4 dB</span>
          </div>

          {/* Dynamic Audio Oscilloscope Bars Visualizer */}
          <div className="w-full h-8 flex items-end justify-between gap-1 px-1">
            {[30, 55, 75, 90, 60, 40, 65, 80, 95, 65, 45, 70, 85, 50, 30, 60, 90, 80, 40, 70, 85, 35, 55, 75].map((h, i) => (
              <div
                key={i}
                className="w-full bg-primary-container rounded-t transition-all duration-150 ease-out shadow-[0_0_8px_rgba(0,240,255,0.4)]"
                style={{ height: `${isRecording ? h : 15}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Hardware & Telemetry Engine Status Card */}
      <div className="w-full bg-surface-container rounded-xl p-space-md shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-space-md border border-outline-variant/30">
        {/* STT Engine */}
        <div className="flex items-center gap-space-sm">
          <div className="w-9 h-9 rounded bg-surface-container-high flex items-center justify-center text-primary-container">
            <span className="material-symbols-outlined text-[20px]">translate</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-mono text-label-sm text-on-surface-variant uppercase tracking-wider truncate">
              STT Engine
            </span>
            <span className="font-geist text-body-sm text-on-surface font-semibold truncate flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary-container"></span>
              Active (Web Speech API)
            </span>
          </div>
        </div>

        {/* Local Recorder */}
        <div className="flex items-center gap-space-sm">
          <div className="w-9 h-9 rounded bg-surface-container-high flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined text-[20px]">album</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-mono text-label-sm text-on-surface-variant uppercase tracking-wider truncate">
              MediaRecorder
            </span>
            <span className="font-geist text-body-sm text-on-surface font-semibold truncate flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary-container"></span>
              {isRecording ? formatTime(durationSeconds) : 'Standby'}
            </span>
          </div>
        </div>

        {/* Candidate Pacing */}
        <div className="flex items-center gap-space-sm">
          <div className="w-9 h-9 rounded bg-surface-container-high flex items-center justify-center text-tertiary-container">
            <span className="material-symbols-outlined text-[20px]">speed</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-mono text-label-sm text-on-surface-variant uppercase tracking-wider truncate">
              Speech Pacing
            </span>
            <span className="font-geist text-body-sm text-on-surface font-semibold truncate">
              138 WPM · Optimal
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
