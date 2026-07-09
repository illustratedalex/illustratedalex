import type { Service } from "@/data/site-content";

type ServiceCardProps = {
  service: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="rounded-xl border border-stone-800 bg-stone-900/50 p-6">
      <h3 className="font-serif text-lg font-semibold text-stone-100">
        {service.title}
      </h3>
      <p className="mt-3 text-sm leading-7 text-stone-400">
        {service.description}
      </p>
      {service.detail ? (
        <p
          className="mt-2 text-xs leading-6 text-stone-600"
          dangerouslySetInnerHTML={{ __html: service.detail }}
        />
      ) : null}
    </article>
  );
}
