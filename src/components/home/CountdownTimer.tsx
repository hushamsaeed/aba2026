"use client";

import { useCountdown } from "@/hooks/useCountdown";

interface CountdownTimerProps {
  targetDate: string;
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-white tabular-nums leading-none">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-editorial text-white/40 text-[9px] md:text-[10px] mt-2 tracking-[0.2em]">
        {label}
      </span>
    </div>
  );
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(targetDate);

  if (isExpired) {
    return (
      <p className="font-heading text-aba-gold text-2xl font-semibold uppercase tracking-wider">
        The conference has begun
      </p>
    );
  }

  return (
    <div className="flex items-end gap-4 md:gap-8 lg:gap-12">
      <CountdownUnit value={days} label="Days" />
      <span className="text-white/20 text-3xl md:text-5xl font-light mb-1">:</span>
      <CountdownUnit value={hours} label="Hours" />
      <span className="text-white/20 text-3xl md:text-5xl font-light mb-1">:</span>
      <CountdownUnit value={minutes} label="Min" />
      <span className="text-white/20 text-3xl md:text-5xl font-light mb-1">:</span>
      <CountdownUnit value={seconds} label="Sec" />
    </div>
  );
}
