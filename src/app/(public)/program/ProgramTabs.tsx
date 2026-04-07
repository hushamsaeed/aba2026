"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import type {
  ProgramDay,
  ProgramSession,
  Speaker,
  SpeakerSession,
  SessionType,
} from "@/generated/prisma/client";

type SessionWithSpeakers = ProgramSession & {
  speakers: (SpeakerSession & { speaker: Speaker })[];
};

type DayWithSessions = ProgramDay & {
  sessions: SessionWithSpeakers[];
};

interface ProgramTabsProps {
  days: DayWithSessions[];
}

const sessionTypeConfig: Record<
  SessionType,
  { label: string; className: string }
> = {
  KEYNOTE: {
    label: "KEYNOTE",
    className: "bg-aba-gold/10 text-aba-gold-dark border-aba-gold/20",
  },
  PANEL: {
    label: "PANEL",
    className: "bg-ocean-teal/10 text-ocean-teal-dark border-ocean-teal/20",
  },
  WORKSHOP: {
    label: "WORKSHOP",
    className: "bg-deep-blue/10 text-deep-blue border-deep-blue/20",
  },
  BREAK: {
    label: "BREAK",
    className: "bg-sand text-muted-foreground border-sand",
  },
  NETWORKING: {
    label: "NETWORKING",
    className: "bg-palm-green/10 text-palm-green border-palm-green/20",
  },
  CEREMONY: {
    label: "CEREMONY",
    className: "bg-bml-red/10 text-bml-red border-bml-red/20",
  },
  ACTIVITY: {
    label: "ACTIVITY",
    className: "bg-ocean-teal/10 text-ocean-teal-dark border-ocean-teal/20",
  },
  EXCURSION: {
    label: "EXCURSION",
    className: "bg-palm-green/10 text-palm-green border-palm-green/20",
  },
};

export function ProgramTabs({ days }: ProgramTabsProps) {
  const defaultDay = days[0]?.id;

  return (
    <Tabs defaultValue={defaultDay}>
      <TabsList className="w-full justify-start mb-8 bg-white rounded-xl p-1 shadow-sm flex-wrap">
        {days.map((day) => (
          <TabsTrigger
            key={day.id}
            value={day.id}
            className="flex-1 min-w-[120px] data-active:bg-deep-blue data-active:text-white rounded-lg py-3 px-4 font-heading font-semibold text-sm"
          >
            <Calendar className="w-4 h-4 mr-2 hidden sm:inline-block" />
            {day.title}
          </TabsTrigger>
        ))}
      </TabsList>

      {days.map((day) => (
        <TabsContent key={day.id} value={day.id}>
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(day.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            {day.sessions.map((session) => {
              const config = sessionTypeConfig[session.type];
              const isBreak = session.type === "BREAK";

              return (
                <div
                  key={session.id}
                  className={`flex gap-4 md:gap-6 ${
                    isBreak ? "opacity-70" : ""
                  }`}
                >
                  {/* Time */}
                  <div className="w-24 md:w-32 shrink-0 pt-1">
                    <div className="flex items-center gap-1.5 text-sm font-medium text-deep-blue">
                      <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                      <span>{session.startTime}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 pl-5">
                      {session.endTime}
                    </p>
                  </div>

                  {/* Session Card */}
                  <div
                    className={`flex-1 rounded-xl p-4 md:p-5 ${
                      isBreak
                        ? "bg-sand/50 border border-sand"
                        : "bg-white border border-gray-100 shadow-sm"
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <h3
                        className={`font-heading font-semibold ${
                          isBreak
                            ? "text-muted-foreground text-sm"
                            : "text-deep-blue text-base md:text-lg"
                        }`}
                      >
                        {session.title}
                      </h3>
                      <Badge
                        variant="outline"
                        className={`shrink-0 text-xs ${config.className}`}
                      >
                        {config.label}
                      </Badge>
                    </div>

                    {session.description && (
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        {session.description}
                      </p>
                    )}

                    {session.speakers.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {session.speakers.map(({ speaker, role }) => (
                          <div
                            key={speaker.id}
                            className="flex items-center gap-2 bg-coral-white rounded-full px-3 py-1"
                          >
                            {speaker.photoUrl ? (
                              <img
                                src={speaker.photoUrl}
                                alt={speaker.name}
                                className="w-6 h-6 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-6 h-6 rounded-full bg-deep-blue/10 flex items-center justify-center">
                                <span className="text-[10px] font-bold text-deep-blue">
                                  {speaker.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </span>
                              </div>
                            )}
                            <span className="text-xs font-medium text-deep-blue">
                              {speaker.name}
                            </span>
                            {role && (
                              <span className="text-[10px] text-muted-foreground">
                                ({role})
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {session.location && (
                      <p className="text-xs text-muted-foreground mt-2">
                        {session.location}
                      </p>
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
