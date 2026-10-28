import ProfileCard from "@/components/ProfileCard";
import LinkList from "@/components/LinkList";
import ThemeToggle from "@/components/ThemeToggle";
import { getClicksMap } from "@/lib/clicks";
import { LINKS, PROFILE, type LinkWithClicks } from "@/lib/links";

export const dynamic = "force-dynamic";

async function getLinksWithClicks(): Promise<LinkWithClicks[]> {
  let clicksMap: Record<string, number> = {};
  try {
    clicksMap = await getClicksMap();
  } catch (error) {
    // MongoDB not configured yet (e.g. local dev without .env.local) —
    // fall back to showing 0 clicks instead of crashing the page.
    console.warn("Could not load click counts:", (error as Error).message);
  }

  return LINKS.map((link) => ({ ...link, clicks: clicksMap[link.id] ?? 0 }));
}

export default async function Home() {
  const links = await getLinksWithClicks();

  return (
    <main className="flex min-h-screen justify-center px-5 pb-12 pt-[72px]">
      <ThemeToggle />
      <div className="w-full max-w-[440px]">
        <ProfileCard name={PROFILE.name} bio={PROFILE.bio} />
        <LinkList links={links} />
        <footer className="mt-8 text-center text-xs text-muted">
          © 2026 링크나무
        </footer>
      </div>
    </main>
  );
}
