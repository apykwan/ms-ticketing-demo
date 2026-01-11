'use client';

import { useEffect, useState } from 'react';

interface TimerProps {
  expiresAt: string;
}

export default function Timer({ expiresAt }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(expiresAt).getTime() - new Date().getTime();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
 
    const timerId = setInterval(findTimeLeft, 1000);

    return () => clearInterval(timerId);
  }, [expiresAt]);

  if (timeLeft <= 0) {
    return <div className="text-warning">Order Expired</div>;
  }

  return <div className="text-danger">{timeLeft} seconds until order expires</div>;
}