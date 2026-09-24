import { useState, useRef, useCallback, useEffect } from 'react';

export interface UseMediaRecorderReturn {
  stream: MediaStream | null;
  isRecording: boolean;
  recordingError: string | null;
  recordedBlob: Blob | null;
  recordedUrl: string | null;
  durationSeconds: number;
  videoRef: React.RefObject<HTMLVideoElement>;
  startCameraAndRecording: () => Promise<boolean>;
  stopRecording: () => void;
  downloadRecording: (filename?: string) => void;
}

export const useMediaRecorder = (): UseMediaRecorderReturn => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingError, setRecordingError] = useState<string | null>(null);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null);
  const [durationSeconds, setDurationSeconds] = useState<number>(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startCameraAndRecording = useCallback(async (): Promise<boolean> => {
    try {
      setRecordingError(null);
      const userStream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' },
        audio: true
      });

      setStream(userStream);

      if (videoRef.current) {
        videoRef.current.srcObject = userStream;
      }

      // Initialize MediaRecorder
      let mimeType = 'video/webm;codecs=vp9,opus';
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        if (MediaRecorder.isTypeSupported('video/webm')) {
          mimeType = 'video/webm';
        } else if (MediaRecorder.isTypeSupported('video/mp4')) {
          mimeType = 'video/mp4';
        } else {
          mimeType = '';
        }
      }

      const recorder = mimeType ? new MediaRecorder(userStream, { mimeType }) : new MediaRecorder(userStream);
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const finalBlob = new Blob(chunksRef.current, { type: recorder.mimeType || 'video/webm' });
        setRecordedBlob(finalBlob);
        const url = URL.createObjectURL(finalBlob);
        setRecordedUrl(url);
      };

      recorder.start(1000); // Collect slice every 1 second
      setIsRecording(true);

      // Duration ticker
      setDurationSeconds(0);
      timerIntervalRef.current = setInterval(() => {
        setDurationSeconds(prev => prev + 1);
      }, 1000);

      return true;
    } catch (err: any) {
      console.error('Camera/Mic permission error:', err);
      const errMsg = err.name === 'NotAllowedError' 
        ? 'Camera and Microphone access was denied. Please grant permissions in your browser bar.'
        : `Could not access media devices: ${err.message}`;
      setRecordingError(errMsg);
      return false;
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    setIsRecording(false);
  }, [stream]);

  const downloadRecording = useCallback((filename = 'interview-recording.webm') => {
    if (!recordedBlob) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(recordedBlob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, [recordedBlob]);

  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (stream) stream.getTracks().forEach(track => track.stop());
    };
  }, [stream]);

  return {
    stream,
    isRecording,
    recordingError,
    recordedBlob,
    recordedUrl,
    durationSeconds,
    videoRef,
    startCameraAndRecording,
    stopRecording,
    downloadRecording
  };
};
