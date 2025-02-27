import { useEffect, useRef, useState } from "react";

export interface UseRecorderConfig {
  enabled: boolean;
  onVideo: (video: Blob) => void;
}

const closeStream = (stream: MediaStream) => {
  stream.getTracks().forEach((track) => track.stop());
};

export const useRecorder = ({ enabled, onVideo }: UseRecorderConfig) => {
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
  const [recording, setRecording] = useState(false);
  const recordedChunks = useRef<Blob[]>([]);

  useEffect(() => {
    if (!enabled) return;

    if (!window.navigator.mediaDevices) {
      return console.warn(
        "MediaDevices is only available in a secure context."
      );
    }

    let internalRecorderReference: MediaRecorder | null = null;

    const abortController = new AbortController();
    abortController.signal.addEventListener("abort", () => {
      if (internalRecorderReference) {
        closeStream(internalRecorderReference.stream);
      }
    });

    window.navigator.mediaDevices
      .getUserMedia({
        video: { facingMode: "user" },
        audio: true,
      })
      .then((stream) => {
        if (abortController.signal.aborted) return closeStream(stream);

        const recorder = new MediaRecorder(stream);
        internalRecorderReference = recorder;
        setRecorder(recorder);

        recorder.addEventListener(
          "dataavailable",
          ({ data }) => {
            if (data.size) recordedChunks.current.push(data);
          },
          { signal: abortController.signal }
        );

        recorder.addEventListener("start", () => setRecording(true), {
          signal: abortController.signal,
        });
      });

    return () => {
      abortController.abort();
      setRecorder(null);
    };
  }, [enabled]);

  useEffect(() => {
    if (!recorder) return;

    const abortController = new AbortController();

    recorder.addEventListener(
      "stop",
      () => {
        onVideo?.(new Blob(recordedChunks.current, { type: "video/webm" }));
        recordedChunks.current = [];
        setRecording(false);
      },
      { signal: abortController.signal }
    );

    return () => abortController.abort();
  }, [recorder, onVideo]);

  if (!recorder) return null;

  return {
    stream: recorder.stream,
    start: () => recorder.start(),
    stop: () => recorder.stop(),
    recording,
  };
};
