"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/Icons";
import type { LinkItem } from "@/lib/links";

export default function LinkList({ links }: { links: LinkItem[] }) {
  const [clicks, setClicks] = useState<Record<string, number>>(
    Object.fromEntries(links.map((link) => [link.id, 0]))
  );

  useEffect(() => {
    async function loadClicks() {
      try {
        const res = await fetch("/api/clicks");
        if (!res.ok) return;
        const data: Record<string, number> = await res.json();
        setClicks((prev) => ({ ...prev, ...data }));
      } catch {
        // Best-effort: counts just stay at 0 if this fails.
      }
    }
    loadClicks();
  }, []);

  async function handleClick(id: string) {
    setClicks((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
    try {
      await fetch("/api/clicks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
    } catch {
      // Best-effort: the visitor still reaches the link even if the
      // click couldn't be recorded (e.g. MongoDB not configured yet).
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {links.map((link) => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleClick(link.id)}
          className="flex items-center gap-3.5 rounded-[1.75rem] border border-border bg-card px-5 py-4 shadow-[0_8px_24px_-8px_rgba(120,72,40,0.18)] backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-8px_rgba(120,72,40,0.24)]"
        >
          <span className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-2xl bg-accent-soft text-accent">
            <Icon name={link.icon} className="h-5 w-5" />
          </span>
          <span className="min-w-0 flex-1">
            <p className="truncate text-[15px] font-semibold">{link.title}</p>
            <p className="truncate text-[12.5px] text-muted">{link.desc}</p>
          </span>
          <span className="flex-none whitespace-nowrap rounded-full bg-accent-soft px-2.5 py-1 text-[11.5px] text-muted">
            {clicks[link.id] ?? 0}회
          </span>
        </a>
      ))}
    </div>
  );
}
