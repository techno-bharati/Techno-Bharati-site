"use client";

import React, { useEffect, useState } from 'react';

const Countdown = () => {
  const targetDate = new Date('2025-02-28T00:00:00'); // Target date
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();
    
    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      setTimeLeft({ days, hours, minutes, seconds });
    } else {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    }
  };

  useEffect(() => {
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-center space-x-4">
      <div className="bg-primary p-4 rounded-lg text-white text-center">
        <h2 className="text-4xl font-bold">{timeLeft.days}</h2>
        <p>Days</p>
      </div>
      <div className="bg-primary p-4 rounded-lg text-white text-center">
        <h2 className="text-4xl font-bold">{timeLeft.hours}</h2>
        <p>Hours</p>
      </div>
      <div className="bg-primary p-4 rounded-lg text-white text-center">
        <h2 className="text-4xl font-bold">{timeLeft.minutes}</h2>
        <p>Minutes</p>
      </div>
      <div className="bg-primary p-4 rounded-lg text-white text-center">
        <h2 className="text-4xl font-bold">{timeLeft.seconds}</h2>
        <p>Seconds</p>
      </div>
    </div>
  );
};

export default Countdown;
