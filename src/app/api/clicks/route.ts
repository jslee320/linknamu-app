import { NextRequest, NextResponse } from "next/server";
import { getClicksMap, incrementClick } from "@/lib/clicks";
import { LINKS } from "@/lib/links";

const VALID_IDS = new Set(LINKS.map((link) => link.id));

export async function GET() {
  try {
    const clicksMap = await getClicksMap();
    return NextResponse.json(clicksMap);
  } catch (error) {
    console.error("Failed to load click counts:", error);
    return NextResponse.json(
      { error: "Failed to load click counts" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const id = (body as { id?: unknown })?.id;
  if (typeof id !== "string" || !VALID_IDS.has(id)) {
    return NextResponse.json({ error: "Unknown link id" }, { status: 400 });
  }

  try {
    const clicks = await incrementClick(id);
    return NextResponse.json({ id, clicks });
  } catch (error) {
    console.error("Failed to record click:", error);
    return NextResponse.json(
      { error: "Failed to record click" },
      { status: 500 }
    );
  }
}
