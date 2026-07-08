/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ANALYTICS_ENABLED?: string;
  readonly VITE_ANALYTICS_ALLOWED_HOSTS?: string;
  readonly VITE_GA_MEASUREMENT_ID?: string;
  readonly VITE_CLARITY_PROJECT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

type GoogleTagArguments =
  | [command: "js", date: Date]
  | [command: "config", targetId: string, config?: Record<string, unknown>]
  | [command: "event", eventName: string, params?: Record<string, unknown>];

type ClarityArguments = [command: string, ...args: unknown[]];

interface ClarityFunction {
  (...args: ClarityArguments): void;
  q?: ClarityArguments[];
}

interface Window {
  clarity?: ClarityFunction;
  dataLayer?: GoogleTagArguments[];
  gtag?: (...args: GoogleTagArguments) => void;
}
