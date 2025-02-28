import { useEffect, useMemo, useRef, useState } from "react";

export interface UseRecorderConfig {
  enabled: boolean;
  onVideo: (video: Blob) => void;
}

export type UseRecorderWaitingResult = {
  status: "waiting";
  recording: false;
};

export type UseRecorderSuccessResult = {
  status: "ready";
  stream: MediaStream;
  recording: boolean;
  start: () => void;
  stop: () => void;
};

export type UseRecorderErrorResult = {
  status: "error";
  error: Error;
  recording: false;
};

export type UseRecorderResult =
  | UseRecorderWaitingResult
  | UseRecorderSuccessResult
  | UseRecorderErrorResult;

const closeStream = (stream: MediaStream) => {
  stream.getTracks().forEach((track) => track.stop());
};

export const useRecorder = ({
  enabled,
  onVideo,
}: UseRecorderConfig): UseRecorderResult => {
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
  const [recording, setRecording] = useState(false);
  const [error, setError] = useState<Error | null>(null);
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
        video: { facingMode: { exact: "user" } },
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
      })
      .catch((error) => {
        if (error instanceof Error) return setError(error);
        setError(new Error("Failed accessing the camera."));
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

  return useMemo(() => {
    if (error) return { status: "error", error, recording: false };
    if (!recorder) return { status: "waiting", recording: false };

    return {
      status: "ready",
      stream: recorder.stream,
      recording,
      start: () => recorder.start(),
      stop: () => recorder.stop(),
    };
  }, [recorder, recording, error]);
};
