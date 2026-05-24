import { useEffect } from "react";
import { useProgress } from "./model/useProgress";

type ProgressBarProps = {
  duration: number;
  onFinish: () => void;
};

export const ProgressBar = ({ duration, onFinish }: ProgressBarProps) => {
  const progress = useProgress(duration, 1);
  const widthPercentage = `${100 - progress}%`;

  useEffect(() => {
    if (progress >= 100) {
      onFinish();
    }
  }, [onFinish, progress]);

  return <div className="progress" style={{ width: widthPercentage }} />;
};
