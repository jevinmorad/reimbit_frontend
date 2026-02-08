/**
 * Error Logger Framework - Type Definitions
 * A lightweight client-side error logging system similar to Sentry
 */

export type ErrorLevel = "error" | "warning" | "info" | "debug";

export type ErrorCategory =
  | "javascript"
  | "network"
  | "promise"
  | "react"
  | "manual";

export interface BrowserInfo {
  userAgent: string;
  language: string;
  platform: string;
  screenResolution: string;
  viewportSize: string;
  timezone: string;
  cookiesEnabled: boolean;
  onlineStatus: boolean;
}

export interface Breadcrumb {
  timestamp: number;
  category: string;
  message: string;
  level: ErrorLevel;
  data?: Record<string, unknown>;
}

export interface CustomContext {
  [key: string]: unknown;
}

export interface ErrorContext {
  url: string;
  userAgent: string;
  timestamp: number;
  browserInfo: BrowserInfo;
  breadcrumbs: Breadcrumb[];
  custom?: CustomContext;
}

export interface ErrorEvent {
  id: string;
  message: string;
  stack?: string;
  level: ErrorLevel;
  category: ErrorCategory;
  context: ErrorContext;
  fingerprint?: string;
}

export interface ErrorLoggerConfig {
  endpoint: string;
  enabled?: boolean;
  batchSize?: number;
  batchInterval?: number;
  maxBreadcrumbs?: number;
  maxQueueSize?: number;
  sampleRate?: number;
  beforeSend?: (event: ErrorEvent) => ErrorEvent | null;
  onError?: (error: Error) => void;
  ignoreErrors?: Array<string | RegExp>;
  environment?: string;
  release?: string;
}

export interface ErrorPayload {
  errors: ErrorEvent[];
  environment?: string;
  release?: string;
}
