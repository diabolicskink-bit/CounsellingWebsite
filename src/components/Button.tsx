import { Link } from "react-router-dom";
import type { ReactNode } from "react";

type SharedButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

type ButtonLinkProps = SharedButtonProps & {
  href: string;
  disabled?: never;
  type?: never;
  onClick?: () => void;
};

type ButtonControlProps = SharedButtonProps & {
  href?: never;
  disabled?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
};

type ButtonProps = ButtonLinkProps | ButtonControlProps;

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

  if (href !== undefined) {
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
