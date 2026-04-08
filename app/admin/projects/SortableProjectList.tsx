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
import { reorderProjects } from "@/app/admin/actions";
import type { Project } from "@/lib/data";
import DeleteProjectButton from "./DeleteProjectButton";

function SortableRow({ project }: { project: Project }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: project.slug,
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
      className="flex items-center gap-3 rounded border border-white/5 bg-[#0f0f0f] p-4"
    >
      {/* Drag handle */}
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab touch-none px-1 text-gray-600 hover:text-gray-400 active:cursor-grabbing"
        aria-label="Drag to reorder"
      >
        ⠿
      </button>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-white">{project.name}</p>
        <p className="mt-0.5 text-xs text-gray-500">{project.slug}</p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <Link
          href={`/admin/projects/${project.slug}`}
          className="rounded border border-white/10 px-3 py-1.5 text-sm text-gray-400 transition-colors hover:text-white"
        >
          Edit
        </Link>
        <DeleteProjectButton slug={project.slug} name={project.name} />
      </div>
    </div>
  );
}

export default function SortableProjectList({ initialProjects }: { initialProjects: Project[] }) {
  const [projects, setProjects] = useState(initialProjects);
  const [saved, setSaved] = useState(false);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = projects.findIndex((p) => p.slug === active.id);
    const newIndex = projects.findIndex((p) => p.slug === over.id);
    const newOrder = arrayMove(projects, oldIndex, newIndex);
    setProjects(newOrder);
    setSaved(false);

    startTransition(async () => {
      await reorderProjects(newOrder.map((p) => p.slug));
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
        <SortableContext items={projects.map((p) => p.slug)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {projects.map((project) => (
              <SortableRow key={project.slug} project={project} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
