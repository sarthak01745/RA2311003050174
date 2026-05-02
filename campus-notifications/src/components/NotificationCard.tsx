"use client";

import { useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import { Notification } from "@/types";
import { Log } from "@/utils/logger";

interface NotificationCardProps {
  notification: Notification;
  isViewed: boolean;
}

const TYPE_COLORS: Record<
  Notification["type"],
  "success" | "warning" | "info"
> = {
  Placement: "success",
  Result: "warning",
  Event: "info",
};

export default function NotificationCard({
  notification,
  isViewed,
}: NotificationCardProps) {
  const formattedDate = new Date(notification.timestamp).toLocaleString();

  useEffect(() => {
    Log(
      "frontend",
      "debug",
      "component",
      `NotificationCard rendered: id=${notification.id} type=${notification.type} viewed=${isViewed}`
    );
  }, [notification.id, notification.type, isViewed]);

  return (
    <Card
      variant="outlined"
      sx={{
        mb: 1.5,
        opacity: isViewed ? 0.55 : 1,
        transition: "opacity 0.2s ease",
        borderLeft: isViewed
          ? "3px solid transparent"
          : "3px solid",
        borderLeftColor: isViewed
          ? "transparent"
          : "primary.main",
      }}
    >
      <CardContent sx={{ py: 1.5, "&:last-child": { pb: 1.5 } }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 1,
            mb: 0.5,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Chip
              label={notification.type}
              color={TYPE_COLORS[notification.type]}
              size="small"
              variant={isViewed ? "outlined" : "filled"}
            />
            {!isViewed && (
              <Chip
                label="New"
                color="error"
                size="small"
                sx={{ fontWeight: 700, fontSize: "0.7rem" }}
              />
            )}
          </Box>
          <Typography variant="caption" color="text.secondary">
            {formattedDate}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{ fontWeight: isViewed ? 400 : 600, mt: 0.5 }}
        >
          {notification.message}
        </Typography>
      </CardContent>
    </Card>
  );
}
