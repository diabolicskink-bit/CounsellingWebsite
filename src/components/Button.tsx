import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type ButtonProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
} & (
  // Link mode is internal navigation; native button attributes do not apply to it.
  | { href: string; disabled?: never; type?: never }
  | { href?: never; disabled?: boolean; type?: "button" | "submit" }
);

export default function Button(props: ButtonProps) {
  const { children, className = "", onClick, variant = "primary" } = props;
  const classes = `button button--${variant} ${className}`.trim();

  if (props.href !== undefined) {
    return (
      <Link className={classes} to={props.href} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={props.disabled} type={props.type ?? "button"} onClick={onClick}>
      {children}
    </button>
  );
}
