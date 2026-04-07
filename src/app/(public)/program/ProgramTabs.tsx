"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Calendar, Clock } from "lucide-react";
import type {
  ProgramDay, ProgramSession, Speaker, SpeakerSession, SessionType,
} from "@/generated/prisma/client";

type SessionWithSpeakers = ProgramSession & {
  speakers: (SpeakerSession & { speaker: Speaker })[];
};
type DayWithSessions = ProgramDay & { sessions: SessionWithSpeakers[] };

interface ProgramTabsProps { days: DayWithSessions[] }

const typeColors: Record<SessionType, string> = {
  KEYNOTE: "bg-aba-gold/20 text-aba-gold",
  PANEL: "bg-ocean-teal/20 text-ocean-teal-light",
  WORKSHOP: "bg-white/10 text-white/70",
  BREAK: "bg-white/5 text-white/30",
  NETWORKING: "bg-palm-green/20 text-palm-green-light",
  CEREMONY: "bg-bml-red/20 text-bml-red-light",
  ACTIVITY: "bg-ocean-teal/20 text-ocean-teal-light",
  EXCURSION: "bg-palm-green/20 text-palm-green-light",
};

export function ProgramTabs({ days }: ProgramTabsProps) {
  const defaultDay = days[0]?.id;

  return (
    <Tabs defaultValue={defaultDay}>
      <TabsList className="w-full justify-start mb-10 bg-dark-card border border-white/10 p-1 flex-wrap gap-1">
        {days.map((day) => (
          <TabsTrigger
            key={day.id}
            value={day.id}
            className="flex-1 min-w-[120px] data-active:bg-aba-gold data-active:text-black py-3 px-4 font-heading font-semibold text-sm text-white/50"
          >
            {day.title}
          </TabsTrigger>
        ))}
      </TabsList>

      {days.map((day) => (
        <TabsContent key={day.id} value={day.id}>
          <div className="flex items-center gap-2 text-white/40 text-sm mb-8">
            <Calendar className="w-4 h-4" />
            <span>
              {new Date(day.date).toLocaleDateString("en-US", {
                weekday: "long", year: "numeric", month: "long", day: "numeric",
              })}
            </span>
          </div>

          <div className="space-y-3">
            {day.sessions.map((session) => {
              const isBreak = session.type === "BREAK";
              return (
                <div key={session.id} className={`flex gap-4 md:gap-6 ${isBreak ? "opacity-50" : ""}`}>
                  <div className="w-20 md:w-28 shrink-0 pt-3">
                    <div className="flex items-center gap-1.5 text-sm font-heading font-medium text-white">
                      <Clock className="w-3 h-3 text-white/30" />
                      {session.startTime}
                    </div>
                    <p className="text-[10px] text-white/30 pl-4.5 mt-0.5">{session.endTime}</p>
                  </div>

                  <div className={`flex-1 p-4 md:p-5 border border-white/10 ${isBreak ? "bg-white/[0.02]" : "bg-dark-card"}`}>
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <h3 className={`font-heading font-semibold ${isBreak ? "text-white/40 text-sm" : "text-white text-base"}`}>
                        {session.title}
                      </h3>
                      <span className={`text-[10px] px-2 py-0.5 uppercase tracking-wider ${typeColors[session.type]}`}>
                        {session.type}
                      </span>
                    </div>

                    {session.description && (
                      <p className="text-white/40 text-sm leading-relaxed mb-3">{session.description}</p>
                    )}

                    {session.speakers.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {session.speakers.map(({ speaker, role }) => (
                          <div key={speaker.id} className="flex items-center gap-2 bg-white/5 px-3 py-1">
                            <div className="w-5 h-5 bg-aba-gold/20 flex items-center justify-center">
                              <span className="text-[8px] font-bold text-aba-gold">
                                {speaker.name.split(" ").map((n) => n[0]).join("")}
                              </span>
                            </div>
                            <span className="text-xs text-white/70">{speaker.name}</span>
                            {role && <span className="text-[10px] text-white/30">({role})</span>}
                          </div>
                        ))}
                      </div>
                    )}

                    {session.location && (
                      <p className="text-[10px] text-white/30 mt-2">{session.location}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
