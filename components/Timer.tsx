import React, { useEffect, useState } from 'react';

interface TimerProps {
  initialTime: number; // Initial time in seconds
  onFinish: (timeLeft: number) => void; // Callback function when timer finishes, providing the final time left
  onTick?: (timeLeft: number) => void; // Optional callback function to update time left every 10 seconds
}

const Timer: React.FC<TimerProps> = ({ initialTime, onFinish, onTick }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [lastTickTime, setLastTickTime] = useState(initialTime); // Last time parent was updated

  useEffect(() => {
    if (timeLeft <= 0) {
      onFinish(timeLeft); // Trigger callback when timer finishes
    } else {
      const timer = setTimeout(() => {
        const newTimeLeft = timeLeft - 1;
        setTimeLeft(newTimeLeft); // Decrease timeLeft every second

        if (onTick && (initialTime - newTimeLeft) % 10 === 0) {
          onTick(newTimeLeft); // Call onTick with the updated time left every 10 seconds
          setLastTickTime(newTimeLeft);
        }
      }, 1000);

      return () => clearTimeout(timer); // Cleanup timer on unmount or when timeLeft changes
    }
  }, [timeLeft, onFinish, onTick, initialTime]);

  // Format time into hours, minutes, and seconds
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours}:${minutes < 10 ? `0${minutes}` : minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
  };

  return (
    <div className="h-[2rem] w-[10rem] text-white bg-gray-800 text-md rounded-md flex items-center justify-center hover:scale-105 transition-all hover:bg-gray-600">
      <span>Time left - {formatTime(timeLeft)}</span>
    </div>
    // <div>saf</div>
  );
};

export default Timer;
