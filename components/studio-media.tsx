import Image from "next/image";

type StudioMediaProps = {
  imageSrc: string;
  imageAlt: string;
  videoSrc?: string;
  priority?: boolean;
  sizes: string;
  className?: string;
};

export function StudioMedia({ imageSrc, imageAlt, videoSrc, priority = false, sizes, className }: StudioMediaProps) {
  return (
    <div className={className}>
      {videoSrc ? (
        <video autoPlay muted loop playsInline className="h-full w-full object-cover">
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : (
        <Image src={imageSrc} alt={imageAlt} fill sizes={sizes} className="object-cover" priority={priority} />
      )}
    </div>
  );
}
