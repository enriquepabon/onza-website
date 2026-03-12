import { clsx } from "clsx";
import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
};

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  const classes = clsx(
    "inline-flex items-center justify-center font-sans transition-all duration-200",
    "tracking-wide uppercase text-sm",
    {
      "bg-brand-red text-white hover:bg-red-600": variant === "primary",
      "bg-brand-dark text-white hover:bg-black": variant === "secondary",
      "border border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white":
        variant === "outline",
    },
    {
      "px-5 py-2.5 text-xs": size === "sm",
      "px-8 py-3.5": size === "md",
      "px-10 py-4 text-base": size === "lg",
    },
    "disabled:opacity-50 disabled:cursor-not-allowed",
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
