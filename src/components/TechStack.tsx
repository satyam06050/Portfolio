"use client";

import { stack } from "@/data/stack";
import { Layers3 } from "lucide-react";

export default function TechStack() {
  return (
    <section className="mt-0">
      <div className="mb-6 flex items-center gap-3">
        <Layers3 className="h-6 w-6" />
        <h2 className="text-3xl font-bold">Tech Stack</h2>
      </div>

      <div className="flex flex-wrap gap-3">
        {stack.map(({ name, icon: Icon }) => (
          <div
            key={name}
            className="
              flex items-center gap-2
              rounded-full
              border border-neutral-200
              bg-white
              px-4 py-2
              text-sm font-medium
              shadow-sm
              transition-all duration-200
              hover:-translate-y-1
              hover:shadow-md
              dark:border-neutral-800
              dark:bg-neutral-900
            "
          >
            <Icon className="h-5 w-5 shrink-0" />
            <span>{name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}