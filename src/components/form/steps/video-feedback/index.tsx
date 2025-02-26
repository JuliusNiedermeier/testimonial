"use client";

import { FC, useEffect, useRef } from "react";
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

  const videoRef = useRef<HTMLVideoElement>(null);

  const recorder = useRecorder({
    enabled: !recordedVideo,
    onVideo: (video) => {
      updateTestimonial({ answers: { [questionId]: { video } } });
    },
  });

  // Handle switching video source between recorded video and live stream
  useEffect(() => {
    if (!videoRef.current) return;
    if (recordedVideo) {
      videoRef.current.srcObject = null;
      videoRef.current.src = URL.createObjectURL(recordedVideo);
    } else {
      videoRef.current.src = "";
      videoRef.current.srcObject = recorder?.stream || null;
    }
  }, [recorder?.stream, recordedVideo, recorder?.recording]);

  const handleRecordControlClick = () => {
    if (recordedVideo) {
      updateTestimonial({ answers: { [questionId]: { video: undefined } } });
    } else if (recorder?.recording) recorder?.stop();
    else recorder?.start();
  };

  const { question, index: questionIndex } = getQuestion(questionId);

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
              onClick={handleRecordControlClick}
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
                {formatDuration(recorder?.duration || 0)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
