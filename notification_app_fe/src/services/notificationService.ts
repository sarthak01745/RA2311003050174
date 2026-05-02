import { Notification, NotificationType } from "@/types";
import { Log } from "@/utils/logger";

const API_BASE = "/api/notifications";

export interface FetchNotificationsParams {
  limit?: number;
  page?: number;
  notification_type?: NotificationType;
}

export interface FetchNotificationsResult {
  notifications: Notification[];
  total: number;
}

export async function fetchNotifications(
  params: FetchNotificationsParams = {}
): Promise<FetchNotificationsResult> {
  const query = new URLSearchParams();

  if (params.limit) query.set("limit", String(params.limit));
  if (params.page) query.set("page", String(params.page));
  if (params.notification_type)
    query.set("notification_type", params.notification_type);

  const url = `${API_BASE}?${query.toString()}`;

  Log("frontend", "info", "api", `Fetching notifications: ${url}`);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      Log(
        "frontend",
        "error",
        "api",
        `API responded with status ${response.status}`
      );
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    const mappedNotifications = (data.notifications ?? []).map((n: any) => ({
      id: n.ID || n.id,
      type: n.Type || n.type,
      message: n.Message || n.message,
      timestamp: n.Timestamp || n.timestamp,
    }));

    Log(
      "frontend",
      "info",
      "api",
      `Fetched ${mappedNotifications.length} notifications`
    );

    return {
      notifications: mappedNotifications,
      total: data.total ?? mappedNotifications.length,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error";
    Log(
      "frontend",
      "error",
      "api",
      `Failed to fetch notifications: ${message}`
    );
    throw error;
  }
}
