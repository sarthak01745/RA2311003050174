import { LogLevel, LogPackage, LogPayload } from "@/types";

const LOG_ENDPOINT = "/api/logs";

export async function Log(
  stack: "frontend",
  level: LogLevel,
  pkg: LogPackage,
  message: string
): Promise<void> {
  const payload: LogPayload = {
    stack,
    level,
    package: pkg,
    message,
  };

  try {
    await fetch(LOG_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch (err) {
  }
}
