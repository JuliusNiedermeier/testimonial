"use client";

import {
  ComponentProps,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  useRecorder,
  UseRecorderConfig,
} from "@/app/_shared/testimonial-form/steps/video-feedback/use-video-recorder";
import {
  RecordToggle,
  RecordToggleState,
} from "@/app/_shared/testimonial-form/steps/video-feedback/record-toggle";
import { useForm } from "@/app/_shared/testimonial-form";
import { Button } from "@/app/_shared/components/primitives/button";
import { cn } from "@/app/_shared/utils/cn";

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

  const recordedVideo = useMemo(
    () => testimonial?.answers.get(questionId)?.video,
    [testimonial?.answers, questionId]
  );

  const onVideo = useCallback<UseRecorderConfig["onVideo"]>(
    (video) => {
      updateTestimonial({ answers: new Map([[questionId, { video }]]) });
    },
    [questionId, updateTestimonial]
  );

  const recorder = useRecorder({ enabled: !recordedVideo, onVideo });

  const videoRef = useRef<HTMLVideoElement>(null);

  const [duration, setDuration] = useState(0);
  const [videoProgress, setVideoProgress] = useState(0);

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
      if (recorder.status === "ready") {
        videoRef.current.srcObject = recorder.stream;
      }
    }
  }, [recorder, recordedVideo]);

  useEffect(() => {
    if (!recorder.recording) return;
    const intervalId = setInterval(() => setDuration((prev) => prev + 1), 1000);
    return () => clearInterval(intervalId);
  }, [recorder.recording]);

  const handleRecordClick = useCallback(() => {
    if (recorder.status !== "ready") return;
    if (!recorder.recording) return recorder.start();

    if (recorder.recording) {
      recorder.stop();
      return setDuration(0);
    }
  }, [recorder]);

  const discardVideo = useCallback(() => {
    updateTestimonial({
      answers: new Map([[questionId, { video: undefined }]]),
    });
  }, [updateTestimonial, questionId]);

  const handleVideoTimeUpdate = useCallback<
    NonNullable<ComponentProps<"video">["onTimeUpdate"]>
  >(
    (e) => {
      if (!recordedVideo) return;
      setVideoProgress(e.currentTarget.currentTime / e.currentTarget.duration);
    },
    [recordedVideo]
  );

  const { question, index: questionIndex } = useMemo(
    () => getQuestion(questionId),
    [getQuestion, questionId]
  );

  const recordState = useMemo<RecordToggleState>(() => {
    if (recordedVideo) return "disabled";
    if (recorder.status === "waiting") return "loading";
    if (recorder.recording) return "recording";
    return "idle";
  }, [recordedVideo, recorder]);

  const handleVideoOverlayClick = useCallback(() => {
    if (!videoRef.current || recordState !== "disabled") return;
    if (videoRef.current.paused) videoRef.current.play();
    else videoRef.current.pause();
  }, [recordState]);

  if (!spaceConfig || !question) return null;

  return (
    <div>
      <span className="text-label text-foreground-secondary">
        {questionIndex + 1}/{spaceConfig.questions.length}
      </span>
      <h1 className="text-label mt-4">{question.content}</h1>
      <div className="aspect-square relative rounded-md bg-background-secondary mt-10 overflow-hidden">
        {recorder.status === "error" ? (
          <span className="w-full h-full grid place-content-center">
            {recorder.error.message}
          </span>
        ) : (
          <>
            <video
              ref={videoRef}
              controls={false}
              muted={!recordedVideo}
              autoPlay={!recordedVideo}
              onTimeUpdate={handleVideoTimeUpdate}
              playsInline
              className="w-full h-full object-cover -scale-x-100"
            />
            <div
              className="absolute top-0 left-0 h-full w-full flex flex-col items-center justify-end p-4 gap-4"
              onClick={handleVideoOverlayClick}
            >
              {recordState !== "disabled" && (
                <>
                  <RecordToggle
                    state={recordState}
                    onClick={handleRecordClick}
                  />
                  <div
                    className={cn("rounded-full py-1 px-2", {
                      "bg-background-primary": !recorder?.recording,
                      "bg-[red] text-background-secondary": recorder?.recording,
                    })}
                  >
                    {formattedDuration}
                  </div>
                </>
              )}

              {recordState === "disabled" && (
                <>
                  <Button onClick={discardVideo}>
                    {spaceConfig.steps.videoFeedback.discardLabel}
                  </Button>
                  <div className="h-1 w-full bg-[hsl(0deg_0%_100%/50%)]">
                    <div
                      className="h-full bg-background-secondary transition-[width] duration-[250ms] ease-linear"
                      style={{ width: `${videoProgress * 100}%` }}
                    />
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
