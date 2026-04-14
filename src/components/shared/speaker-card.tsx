import Image from "next/image";

interface SpeakerCardProps {
  name: string;
  title: string;
  organization?: string;
  photoUrl?: string;
  className?: string;
}

export function SpeakerCard({
  name,
  title,
  organization,
  photoUrl,
  className,
}: SpeakerCardProps) {
  return (
    <div className={`flex flex-col bg-white w-[300px] ${className ?? ""}`}>
      <div className="relative w-full h-[280px] bg-speaker-bg">
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={name}
            fill
            className="object-contain"
            sizes="300px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-text-secondary text-sm">
            Photo
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1.5 p-5">
        <h3 className="font-[family-name:var(--font-heading)] text-[18px] font-bold text-text">
          {name}
        </h3>
        <p className="font-[family-name:var(--font-body)] text-[13px] text-text-secondary">
          {title}
        </p>
        {organization && (
          <p className="font-[family-name:var(--font-body)] text-[13px] text-gold">
            {organization}
          </p>
        )}
      </div>
    </div>
  );
}
