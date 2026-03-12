import { clsx } from "clsx";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
  cream?: boolean;
  narrow?: boolean;
  id?: string;
};

export function Section({
  children,
  className,
  dark,
  cream,
  narrow,
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={clsx(
        "section-padding",
        {
          "bg-brand-black text-white": dark,
          "bg-brand-cream": cream,
          "bg-white": !dark && !cream,
        },
        className
      )}
    >
      <div className={narrow ? "container-narrow" : "container-wide"}>
        {children}
      </div>
    </section>
  );
}
