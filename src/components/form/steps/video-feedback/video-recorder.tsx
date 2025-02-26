import { useEffect, useMemo, useRef, useState } from "react";

export interface UseRecorderConfig {
  enabled: boolean;
  onVideo: (video: Blob) => void;
}

export const useRecorder = ({ enabled, onVideo }: UseRecorderConfig) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recording, setRecording] = useState(false);
  const [duration, setDuration] = useState(0); // Track recording duration
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // Ref to store interval ID

  useEffect(() => {
    if (!enabled) return;

    if (!window.navigator.mediaDevices) {
      return console.warn(
        "MediaDevices is only available in a secure context."
      );
    }

    let internalStream: MediaStream | null = null;

    window.navigator.mediaDevices
      .getUserMedia({
        video: { facingMode: "user" },
        audio: true,
      })
      .then((stream) => setStream((internalStream = stream)));

    return () => {
      internalStream?.getTracks().forEach((track) => track.stop());
    };
  }, [enabled]);

  const recorder = useMemo(() => {
    if (!stream) return null;

    let recordedChunks: Blob[] = [];

    const recorder = new MediaRecorder(stream);

    recorder.ondataavailable = (e) => {
      if (e.data.size) recordedChunks.push(e.data);
    };

    recorder.onstart = () => {
      setRecording(true);
      setDuration(0); // Reset duration when recording starts

      // Start timer
      intervalRef.current = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
    };

    recorder.onstop = () => {
      setRecording(false);
      onVideo?.(new Blob(recordedChunks, { type: "video/webm" }));
      recordedChunks = [];
      // Stop timer
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setDuration(0); // Reset duration when recording starts
    };

    const start = () => recorder.start();
    const stop = () => recorder.stop();

    return { start, stop };
  }, [stream, onVideo]);

  if (!recorder) return null;

  return {
    start: recorder.start,
    stop: recorder.stop,
    recording,
    duration,
    stream,
  };
};
