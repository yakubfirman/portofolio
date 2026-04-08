import { notFound } from "next/navigation";
import type { SpeakingEvent } from "@/lib/data";
import SpeakingForm from "../SpeakingForm";

export const dynamic = "force-dynamic";

async function fetchSpeaking(): Promise<SpeakingEvent[]> {
  const res = await fetch(`${process.env.API_URL}/api/speaking`, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

export default async function EditSpeakingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const events = await fetchSpeaking();
  const event = events.find((e) => e.id === Number(id));
  if (!event) notFound();

  return (
    <div>
      <h1 className="mb-6 text-xl font-bold text-white">Edit: {event.title}</h1>
      <SpeakingForm initialData={event} />
    </div>
  );
}
