import ProfileCard from "@/components/ProfileCard";
import LinkList from "@/components/LinkList";
import ThemeToggle from "@/components/ThemeToggle";
import { LINKS, PROFILE } from "@/lib/links";

export default function Home() {
  return (
    <main className="flex min-h-screen justify-center px-6 pb-16 pt-20">
      <ThemeToggle />
      <div className="w-full max-w-[420px]">
        <ProfileCard name={PROFILE.name} bio={PROFILE.bio} imageUrl={PROFILE.imageUrl} />
        <LinkList links={LINKS} />
        <footer className="mt-10 text-center text-xs tracking-wide text-muted">
          © 2026 링크나무
        </footer>
      </div>
    </main>
  );
}
