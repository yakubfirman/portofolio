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
      className="flex items-center gap-2 rounded border border-white/5 bg-[#0d0d0d] p-3 transition-colors hover:border-white/10 sm:gap-3 sm:p-4"
    >
      {/* Drag handle */}
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
        <p className="truncate text-sm font-medium text-white">{project.name}</p>
        <p className="mt-0.5 font-mono text-[10px] text-gray-600">/{project.slug}</p>
      </div>
      {/* Tech badges */}
      <div className="hidden shrink-0 items-center gap-1 sm:flex">
        {project.tech.slice(0, 3).map((t) => (
          <span key={t} className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] text-gray-500">
            {t}
          </span>
        ))}
        {project.tech.length > 3 && (
          <span className="text-[10px] text-gray-700">+{project.tech.length - 3}</span>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <Link
          href={`/admin/projects/${project.slug}`}
          className="flex items-center gap-1.5 rounded border border-white/10 px-2 py-1.5 text-xs text-gray-400 transition-colors hover:border-white/20 hover:text-white sm:px-3"
        >
          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125"
            />
          </svg>
          <span className="hidden sm:inline">Edit</span>
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
