type ProfileCardProps = {
  name: string;
  bio: string;
  imageUrl: string;
};

export default function ProfileCard({ name, bio, imageUrl }: ProfileCardProps) {
  return (
    <div className="mb-10 flex flex-col items-center text-center">
      <div className="mb-5 h-[124px] w-[124px] rounded-full bg-gradient-to-br from-white/90 via-white/40 to-accent/40 p-[3px] shadow-[0_14px_32px_-10px_rgba(120,72,40,0.45)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={`${name} 프로필 사진`}
          className="h-full w-full rounded-full object-cover shadow-inner"
        />
      </div>
      <h1 className="mb-1.5 text-xl font-bold tracking-tight">{name}</h1>
      <p className="max-w-xs whitespace-pre-line text-sm leading-relaxed text-muted">
        {bio}
      </p>
    </div>
  );
}
