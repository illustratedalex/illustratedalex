type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
  level?: 1 | 2;
};

export function SectionHeading({ eyebrow, title, description, centered, level = 2 }: SectionHeadingProps) {
  const Heading = level === 1 ? "h1" : "h2";

  return (
    <div className={`space-y-4 ${centered ? "text-center" : ""}`}>
      {eyebrow ? (
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#968b80]">
          {eyebrow}
        </p>
      ) : null}
      <Heading className="font-serif text-3xl font-bold tracking-tight text-[#120f0d] sm:text-4xl">
        {title}
      </Heading>
      {description ? (
        <p className={`text-base leading-7 text-[#5c5047] ${centered ? "mx-auto" : ""} max-w-2xl`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
