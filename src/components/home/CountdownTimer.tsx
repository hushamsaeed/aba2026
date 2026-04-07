"use client";

import { useCountdown } from "@/hooks/useCountdown";

interface CountdownTimerProps {
  targetDate: string;
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
        <span className="text-2xl md:text-4xl font-heading font-bold text-white tabular-nums">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-white/60 text-xs md:text-sm mt-2 uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(targetDate);

  if (isExpired) {
    return (
      <p className="text-aba-gold font-heading text-xl font-semibold">
        The conference has begun!
      </p>
    );
  }

  return (
    <div className="flex items-center justify-center gap-3 md:gap-6">
      <CountdownUnit value={days} label="Days" />
      <span className="text-white/40 text-2xl md:text-3xl font-light mt-[-1.5rem]">:</span>
      <CountdownUnit value={hours} label="Hours" />
      <span className="text-white/40 text-2xl md:text-3xl font-light mt-[-1.5rem]">:</span>
      <CountdownUnit value={minutes} label="Minutes" />
      <span className="text-white/40 text-2xl md:text-3xl font-light mt-[-1.5rem]">:</span>
      <CountdownUnit value={seconds} label="Seconds" />
    </div>
  );
}
