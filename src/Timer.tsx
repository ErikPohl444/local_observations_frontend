import React, { useEffect, useState } from "react";

interface TimerProps {
  initialSeconds: number;
  onTimerEnd: () => void;
  onTimerUpdate?: (currentValue: number) => void; // Optional prop for updates
}

const Timer: React.FC<TimerProps> = ({
  initialSeconds,
  onTimerEnd,
  onTimerUpdate,
}) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds <= 0) {
      onTimerEnd();
      return;
    }

    const interval = setInterval(() => {
      setSeconds((prev) => {
        const newValue = prev - 1;
        if (onTimerUpdate) {
          onTimerUpdate(newValue);
        }
        return newValue;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, onTimerEnd, onTimerUpdate]);

  return <div>Time remaining: {seconds} seconds</div>;
};

export default Timer;
