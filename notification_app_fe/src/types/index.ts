export interface Notification {
  id: string;
  type: "Event" | "Result" | "Placement";
  message: string;
  timestamp: string;
}

export interface NotificationsResponse {
  notifications: Notification[];
  total: number;
  page: number;
  limit: number;
}

export type NotificationType = "Event" | "Result" | "Placement";

export type LogLevel = "debug" | "info" | "warn" | "error" | "fatal";

export type LogPackage =
  | "component"
  | "api"
  | "page"
  | "state"
  | "style"
  | "hook"
  | "auth"
  | "config"
  | "middleware"
  | "utils";

export interface LogPayload {
  stack: "frontend";
  level: LogLevel;
  package: LogPackage;
  message: string;
}
