"use client";

import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "../..";
import { useRecorder } from "./video-recorder";
import { cn } from "@/utils/cn";

const formatDuration = (durationInSeconds: number) => {
  const minutes = String(Math.floor(durationInSeconds / 60)).padStart(2, "0");
  const seconds = String(durationInSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
};

export const VideoFeedbackStep: FC<{ questionId: string }> = ({
  questionId,
}) => {
  const { spaceConfig, testimonial, updateTestimonial, getQuestion } =
    useForm();

  const recordedVideo = testimonial?.answers[questionId].video;

  const recorder = useRecorder({
    enabled: !recordedVideo,
    onVideo: (video) => {
      updateTestimonial({ answers: { [questionId]: { video } } });
    },
  });

  const videoRef = useRef<HTMLVideoElement>(null);

  const [duration, setDuration] = useState(0);

  const formattedDuration = useMemo(() => formatDuration(duration), [duration]);

  // Handle switching video source between recorded video and live stream
  useEffect(() => {
    if (!videoRef.current) return;
    if (recordedVideo) {
      const objectUrl = URL.createObjectURL(recordedVideo);
      videoRef.current.srcObject = null;
      videoRef.current.src = objectUrl;
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      videoRef.current.src = "";
      videoRef.current.srcObject = recorder?.stream || null;
    }
  }, [recorder?.stream, recordedVideo]);

  useEffect(() => {
    if (!recorder) return;

    let intervalId: NodeJS.Timeout | null = null;

    if (recorder.recording) {
      intervalId = setInterval(() => setDuration((prev) => prev + 1), 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [recorder?.recording]);

  const handleRecordClick = useCallback(() => {
    if (recordedVideo) {
      updateTestimonial({ answers: { [questionId]: { video: undefined } } });
      return;
    }

    if (!recorder) return;
    if (!recorder.recording) return recorder.start();

    if (recorder.recording) {
      recorder.stop();
      return setDuration(0);
    }
  }, [recordedVideo, questionId, recorder?.start, recorder?.stop]);

  const { question, index: questionIndex } = useMemo(
    () => getQuestion(questionId),
    [getQuestion, questionId]
  );

  if (!spaceConfig || !question) return null;

  return (
    <div>
      <span className="text-label text-foreground-secondary">
        {questionIndex + 1}/{spaceConfig.questions.length}
      </span>
      <h1 className="text-label mt-4">{question.content}</h1>
      <div className="aspect-square relative rounded-md bg-background-secondary mt-10 grid overflow-hidden">
        <div className="relative h-full w-full">
          <video
            ref={videoRef}
            controls={false}
            muted={!recordedVideo}
            autoPlay={!recordedVideo}
            playsInline
            className="w-full h-full object-cover -scale-x-100"
          />
          <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center gap-4 pointer-events-none">
            <button
              className={cn(
                "size-20 rounded-full border-[3px] border-background-primary grid place-items-center transition-colors pointer-events-auto",
                {
                  "bg-[red]": recorder?.recording,
                  "h-14 w-36": recordedVideo,
                }
              )}
              onClick={handleRecordClick}
            >
              {recordedVideo ? (
                <span className="text-background-secondary">Rerecord</span>
              ) : (
                <div
                  className={cn("size-6 bg-background-primary transition-all", {
                    "rounded-full": !recorder?.recording,
                    "rounded-md": recorder?.recording,
                  })}
                />
              )}
            </button>
            {!recordedVideo && (
              <div
                className={cn("rounded-full py-1 px-2", {
                  "bg-background-primary": !recorder?.recording,
                  "bg-[red] text-background-secondary": recorder?.recording,
                })}
              >
                {formattedDuration}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
