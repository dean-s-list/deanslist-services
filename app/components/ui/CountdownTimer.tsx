"use client";  

import React, { useState, useEffect, useCallback } from "react";
import { FaArrowUp } from "react-icons/fa";

interface CountdownTimerProps {
  targetDate: string; 
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const calculateTimeLeft = useCallback(() => {
    const difference = new Date(targetDate).getTime() - new Date().getTime();
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }; 
  }, [targetDate]); 

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]); 

  return (
    <div className="flex flex-col items-center text-white p-4 rounded-lg w-[300px] pt-0">
      <h2 className="text-lg font-semibold mb-2 text-[#94969C]">Deadline</h2>

      {/* Time Display */}
      <div className="flex justify-center gap-3 text-center">
        {Object.entries(timeLeft).map(([label, value]) => (
          <div
            key={label}
            className="flex flex-col items-center p-3 rounded-md w-16"
          >
             <span className="text-xs uppercase text-[#94969C]">{label}</span>
            <span className="text-2xl font-bold ">
              {String(value).padStart(2, "0")}
            </span>
           
          </div>
        ))}
      </div>

      {/* Button */}
      <button className="w-[300px] h-[40px] mt-4 bg-[#0D3A3A] hover:bg-[#044B4B] border-2 border-[#BDECC3] text-white py-2 px-4 rounded-md text-sm font-medium flex flex-row justify-center">
        Rank Up Now! <FaArrowUp className="ml-[2px] mt-[3.5px]" />
      </button>
    </div>
  );
};

export default CountdownTimer;
