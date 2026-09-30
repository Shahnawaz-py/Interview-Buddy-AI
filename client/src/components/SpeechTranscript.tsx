import React, { useState, useEffect } from 'react';

interface SpeechTranscriptProps {
  isListening: boolean;
  transcript: string;
  interimTranscript: string;
  isSupported: boolean;
  onStartListening: () => void;
  onStopListening: () => void;
  onResetTranscript: () => void;
  onManualTextChange: (text: string) => void;
  onSubmitAnswer: (answer: string) => void;
  isSubmitting: boolean;
}

export const SpeechTranscript: React.FC<SpeechTranscriptProps> = ({
  isListening,
  transcript,
  interimTranscript,
  isSupported,
  onStartListening,
  onStopListening,
  onResetTranscript,
  onManualTextChange,
  onSubmitAnswer,
  isSubmitting
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localText, setLocalText] = useState(transcript);

  useEffect(() => {
    setLocalText(transcript);
  }, [transcript]);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalText(e.target.value);
    onManualTextChange(e.target.value);
  };

  const handleSubmit = () => {
    const textToSubmit = (transcript || interimTranscript || localText).trim();
    if (textToSubmit) {
      if (isListening) onStopListening();
      onSubmitAnswer(textToSubmit);
    }
  };

  const currentFullText = (transcript + (interimTranscript ? ' ' + interimTranscript : '')).trim() || localText;
  const wordCount = currentFullText.split(/\s+/).filter(Boolean).length;

  return (
    <div className="w-full bg-surface-container rounded-xl p-space-md shadow-md flex flex-col gap-space-sm border border-outline-variant/30">
      {/* Top Telemetry Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-[18px] text-tertiary-container">record_voice_over</span>
          <span className="font-geist text-title-md text-on-surface font-semibold">Candidate Answer Ingestion</span>
        </div>

        <div className="flex items-center gap-space-sm text-on-surface-variant font-mono text-label-sm">
          <span>{wordCount} Words Spoken</span>
          {transcript && (
            <button
              type="button"
              onClick={onResetTranscript}
              className="hover:text-error transition-colors p-1"
              title="Clear transcript"
            >
              <span className="material-symbols-outlined text-[16px]">delete</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Transcript Text Area Box */}
      <div className="min-h-[140px] max-h-[200px] overflow-y-auto bg-surface-container-lowest rounded-xl p-space-md border border-outline-variant/40">
        {isEditing ? (
          <textarea
            value={localText}
            onChange={handleTextareaChange}
            placeholder="Type or edit your verbal answer here..."
            className="w-full h-full min-h-[110px] bg-transparent text-on-surface placeholder-on-surface-variant/40 focus:outline-none resize-none font-geist text-body-md leading-relaxed"
          />
        ) : (
          <div className="font-geist text-body-md text-on-surface leading-relaxed">
            {currentFullText ? (
              <>
                <span>{transcript}</span>
                {interimTranscript && (
                  <span className="text-primary-container opacity-80 italic animate-pulse">
                    {' '}{interimTranscript}
                  </span>
                )}
              </>
            ) : (
              <span className="text-on-surface-variant/60 italic flex items-center gap-space-xs font-geist text-body-sm">
                <span className="material-symbols-outlined text-[18px] text-outline">info</span>
                Click 'Start Microphone' below and speak your technical answer verbally...
              </span>
            )}
          </div>
        )}
      </div>

      {/* Bottom Control Actions Bar */}
      <div className="flex items-center justify-between gap-space-sm pt-space-xs">
        <div className="flex items-center gap-space-xs">
          {isListening ? (
            <button
              type="button"
              onClick={onStopListening}
              className="flex items-center gap-space-xs px-space-md py-space-sm rounded bg-error-container text-on-error-container font-mono text-label-md font-semibold animate-pulse shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">mic_off</span>
              <span>Pause Microphone</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onStartListening}
              className="flex items-center gap-space-xs px-space-md py-space-sm rounded bg-surface-container-high hover:bg-surface-bright text-primary-container font-mono text-label-md font-semibold border border-outline-variant/40 transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">mic</span>
              <span>{transcript ? 'Resume Microphone' : 'Start Microphone'}</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="p-space-sm rounded bg-surface-container-high hover:bg-surface-bright text-on-surface-variant hover:text-on-surface border border-outline-variant/40 transition-colors"
            title={isEditing ? 'Done editing' : 'Edit transcript text'}
          >
            <span className="material-symbols-outlined text-[18px]">
              {isEditing ? 'check' : 'edit'}
            </span>
          </button>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!currentFullText.trim() || isSubmitting}
          className="flex items-center gap-space-xs px-space-lg py-space-sm rounded bg-primary-container text-on-primary-container font-geist text-body-md font-semibold hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all disabled:opacity-40 disabled:pointer-events-none"
        >
          <span>{isSubmitting ? 'Analyzing...' : 'Submit Verbal Answer'}</span>
          <span className="material-symbols-outlined text-[18px]">send</span>
        </button>
      </div>
    </div>
  );
};
