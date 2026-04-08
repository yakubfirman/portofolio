"use client";

import { useState, useTransition } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { reorderSpeaking } from "@/app/admin/actions";
import type { SpeakingEvent } from "@/lib/data";
import DeleteSpeakingButton from "./DeleteSpeakingButton";

function SortableRow({ event }: { event: SpeakingEvent }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: event.id!,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 rounded border border-white/5 bg-[#0d0d0d] p-4 transition-colors hover:border-white/10"
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab touch-none text-gray-700 hover:text-gray-500 active:cursor-grabbing"
        aria-label="Drag to reorder"
      >
        <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
          <circle cx="5" cy="4" r="1.2" />
          <circle cx="5" cy="8" r="1.2" />
          <circle cx="5" cy="12" r="1.2" />
          <circle cx="11" cy="4" r="1.2" />
          <circle cx="11" cy="8" r="1.2" />
          <circle cx="11" cy="12" r="1.2" />
        </svg>
      </button>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-white">{event.title}</p>
        <p className="mt-0.5 text-xs text-gray-600">
          <span className="text-gray-500">{event.event}</span>
          <span className="mx-1.5 text-gray-700">·</span>
          <span className="font-mono text-[10px]">{event.date}</span>
        </p>
      </div>
      {/* Topics */}
      <div className="hidden shrink-0 items-center gap-1 sm:flex">
        {event.topics?.slice(0, 2).map((t) => (
          <span key={t} className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] text-gray-500">
            {t}
          </span>
        ))}
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <Link
          href={`/admin/speaking/${event.id}`}
          className="rounded border border-white/10 px-3 py-1.5 text-xs text-gray-400 transition-colors hover:border-white/20 hover:text-white"
        >
          Edit
        </Link>
        <DeleteSpeakingButton id={event.id!} title={event.title} />
      </div>
    </div>
  );
}

export default function SortableSpeakingList({
  initialEvents,
}: {
  initialEvents: SpeakingEvent[];
}) {
  const [events, setEvents] = useState(initialEvents);
  const [saved, setSaved] = useState(false);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    if (!over || active.id === over.id) return;

    const oldIndex = events.findIndex((ev) => ev.id === active.id);
    const newIndex = events.findIndex((ev) => ev.id === over.id);
    const newOrder = arrayMove(events, oldIndex, newIndex);
    setEvents(newOrder);
    setSaved(false);

    startTransition(async () => {
      await reorderSpeaking(newOrder.map((ev) => ev.id!));
      setSaved(true);
      router.refresh();
      setTimeout(() => setSaved(false), 2000);
    });
  }

  return (
    <div>
      {saved && <p className="mb-3 text-xs text-green-400">Urutan tersimpan ✓</p>}
      {pending && <p className="mb-3 text-xs text-gray-500">Menyimpan urutan...</p>}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={events.map((ev) => ev.id!)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {events.map((ev) => (
              <SortableRow key={ev.id} event={ev} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
