import { prisma } from "@/lib/db";
import { ProgramClient } from "./ProgramClient";

export default async function ProgramPage() {
  const [days, speakers] = await Promise.all([
    prisma.programDay.findMany({
      orderBy: { order: "asc" },
      include: {
        sessions: {
          orderBy: { order: "asc" },
          include: {
            speakers: {
              include: { speaker: true },
            },
          },
        },
      },
    }),
    prisma.speaker.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    }),
  ]);

  const serializedDays = days.map((d) => ({
    id: d.id,
    date: d.date.toISOString(),
    title: d.title,
    order: d.order,
    sessions: d.sessions.map((s) => ({
      id: s.id,
      dayId: s.dayId,
      title: s.title,
      description: s.description ?? "",
      startTime: s.startTime,
      endTime: s.endTime,
      type: s.type,
      location: s.location ?? "",
      order: s.order,
      speakers: s.speakers.map((ss) => ({
        id: ss.speaker.id,
        name: ss.speaker.name,
      })),
    })),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">Program</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage conference program and sessions
        </p>
      </div>
      <ProgramClient days={serializedDays} allSpeakers={speakers} />
    </div>
  );
}
