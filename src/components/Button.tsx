import { Link } from "react-router-dom";
import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "tertiary";
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
};

export default function Button({
  children,
  href,
  variant = "primary",
  className = "",
  disabled = false,
  type = "button",
  onClick,
}: ButtonProps) {
  const classes = `button button--${variant} ${className}`.trim();

  if (href) {
    return (
      <Link className={classes} to={href} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={disabled} type={type} onClick={onClick}>
      {children}
    </button>
  );
}
