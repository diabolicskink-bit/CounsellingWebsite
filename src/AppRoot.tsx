import { StrictMode } from "react";
import type { PropsWithChildren } from "react";

export function AppRoot({ children }: PropsWithChildren) {
  return <StrictMode>{children}</StrictMode>;
}
