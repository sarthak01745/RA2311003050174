"use client";

import { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import NotificationCard from "@/components/NotificationCard";
import { Notification } from "@/types";
import { Log } from "@/utils/logger";

interface NotificationListProps {
  notifications: Notification[];
  viewedIds: Set<string>;
  loading: boolean;
  error: string | null;
}

export default function NotificationList({
  notifications,
  viewedIds,
  loading,
  error,
}: NotificationListProps) {
  useEffect(() => {
    if (loading) {
      Log("frontend", "debug", "component", "NotificationList: loading state");
    } else if (error) {
      Log("frontend", "warn", "component", `NotificationList: error — ${error}`);
    } else if (notifications.length === 0) {
      Log("frontend", "info", "component", "NotificationList: empty state rendered");
    } else {
      Log(
        "frontend",
        "info",
        "component",
        `NotificationList: rendered ${notifications.length} notifications`
      );
    }
  }, [loading, error, notifications]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ my: 2 }}>
        {error}
      </Alert>
    );
  }

  if (notifications.length === 0) {
    return (
      <Typography
        variant="body1"
        color="text.secondary"
        align="center"
        sx={{ py: 6 }}
      >
        No notifications found.
      </Typography>
    );
  }

  return (
    <Box>
      {notifications.map((n) => (
        <NotificationCard
          key={n.id}
          notification={n}
          isViewed={viewedIds.has(n.id)}
        />
      ))}
    </Box>
  );
}
