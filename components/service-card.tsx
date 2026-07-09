import type { Service } from "@/data/site-content";

type ServiceCardProps = {
  service: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="border border-[#ddd4c4] bg-[#ece5d8] p-6">
      <h3 className="font-serif text-lg font-semibold text-[#1a1511]">
        {service.title}
      </h3>
      <p className="mt-3 text-sm leading-7 text-[#5c5047]">
        {service.description}
      </p>
      {service.detail ? (
        <p
          className="mt-2 text-xs leading-6 text-[#968b80]"
          dangerouslySetInnerHTML={{ __html: service.detail }}
        />
      ) : null}
    </article>
  );
}
