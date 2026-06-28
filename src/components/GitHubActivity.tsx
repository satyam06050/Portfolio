"use client";

import { GitHubCalendar } from "react-github-calendar";

export default function GitHubActivity() {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="title text-2xl sm:text-3xl">
          GitHub Activity log
        </h2>

    
      </div>

      <div className="overflow-x-auto rounded-xl border border-border/70 bg-background/70 p-4 shadow-sm sm:p-6">
        <GitHubCalendar
          username="satyam06050"
          blockSize={12}
          blockMargin={4}
          fontSize={12}
          showColorLegend
          showMonthLabels
          transformData={(contributions) =>
            contributions.filter(
              (day) => new Date(day.date) >= new Date("2025-10-01")
            )
          }
        />
      </div>
    </section>
  );
}