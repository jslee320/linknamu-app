type ProfileCardProps = {
  name: string;
  bio: string;
};

export default function ProfileCard({ name, bio }: ProfileCardProps) {
  return (
    <div className="mb-8 flex flex-col items-center text-center">
      <div className="mb-4 flex h-[120px] w-[120px] items-center justify-center rounded-full bg-gradient-to-br from-accent to-emerald-700 text-5xl shadow-lg">
        🌳
      </div>
      <h1 className="mb-1 text-xl font-bold">{name}</h1>
      <p className="max-w-xs whitespace-pre-line text-sm leading-relaxed text-muted">
        {bio}
      </p>
    </div>
  );
}
