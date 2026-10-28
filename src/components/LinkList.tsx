"use client";

import { useState } from "react";
import { Icon } from "@/components/Icons";
import type { LinkWithClicks } from "@/lib/links";

export default function LinkList({ links }: { links: LinkWithClicks[] }) {
  const [clicks, setClicks] = useState<Record<string, number>>(
    Object.fromEntries(links.map((link) => [link.id, link.clicks]))
  );

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
    <div className="flex flex-col gap-5">
      {links.map((link) => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleClick(link.id)}
          className="flex items-center gap-3.5 rounded-2xl border border-border bg-card px-4 py-3.5 shadow-sm transition-transform hover:-translate-y-0.5 hover:border-accent"
        >
          <span className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-[10px] bg-accent-soft text-accent">
            <Icon name={link.icon} className="h-5 w-5" />
          </span>
          <span className="min-w-0 flex-1">
            <p className="truncate text-[15px] font-semibold">{link.title}</p>
            <p className="truncate text-[12.5px] text-muted">{link.desc}</p>
          </span>
          <span className="flex-none whitespace-nowrap rounded-full bg-accent-soft px-2.5 py-1 text-[11.5px] text-muted">
            클릭 {clicks[link.id] ?? 0}
          </span>
        </a>
      ))}
    </div>
  );
}
