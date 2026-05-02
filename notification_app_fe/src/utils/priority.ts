import { Notification } from "@/types";

const PRIORITY_WEIGHTS: Record<Notification["type"], number> = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

export function getPriorityNotifications(
  notifications: Notification[],
  topN: number = 10
): Notification[] {
  const scored = notifications.map((n) => ({
    notification: n,
    score:
      PRIORITY_WEIGHTS[n.type] +
      new Date(n.timestamp).getTime() / 1e13,
  }));

  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, topN).map((s) => s.notification);
}
