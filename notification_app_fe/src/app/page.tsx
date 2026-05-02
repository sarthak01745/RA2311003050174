"use client";

import { useEffect, useState, useCallback } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Header from "@/components/Header";
import TabsNavigation from "@/components/TabsNavigation";
import NotificationList from "@/components/NotificationList";
import FilterDropdown from "@/components/FilterDropdown";
import PaginationControl from "@/components/PaginationControl";
import TopNDropdown from "@/components/TopNDropdown";
import { fetchNotifications } from "@/services/notificationService";
import { getPriorityNotifications } from "@/utils/priority";
import { Log } from "@/utils/logger";
import { Notification, NotificationType } from "@/types";

const ITEMS_PER_PAGE = 10;

export default function HomePage() {
  const [activeTab, setActiveTab] = useState(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [filterType, setFilterType] = useState<NotificationType | "">("");
  const [topN, setTopN] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [viewedIds, setViewedIds] = useState<Set<string>>(new Set());

  const loadNotifications = useCallback(async () => {
    setLoading(true);
    setError(null);

    Log("frontend", "info", "page", "Loading notifications");

    try {
      const result = await fetchNotifications({
        limit: ITEMS_PER_PAGE,
        page,
        notification_type: filterType || undefined,
      });

      setNotifications(result.notifications);
      setTotal(result.total);

      Log(
        "frontend",
        "info",
        "state",
        `State updated: ${result.notifications.length} notifications loaded`
      );
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load notifications";
      setError(message);
      Log("frontend", "error", "page", `Page error: ${message}`);
    } finally {
      setLoading(false);
    }
  }, [page, filterType]);

  useEffect(() => {
    Log("frontend", "info", "page", "Home page mounted");
    loadNotifications();
  }, [loadNotifications]);

  const markAsViewed = useCallback(
    (ids: string[]) => {
      setViewedIds((prev) => {
        const next = new Set(prev);
        ids.forEach((id) => next.add(id));
        Log(
          "frontend",
          "debug",
          "state",
          `Marked ${ids.length} notifications as viewed`
        );
        return next;
      });
    },
    []
  );

  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        markAsViewed(notifications.map((n) => n.id));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notifications, markAsViewed]);

  const handleTabChange = (newTab: number) => {
    setActiveTab(newTab);
    Log(
      "frontend",
      "info",
      "state",
      `Active tab changed to ${newTab === 0 ? "All" : "Priority"}`
    );
  };

  const handleFilterChange = (value: NotificationType | "") => {
    setFilterType(value);
    setPage(1);
    Log("frontend", "info", "state", `Filter updated to: ${value || "All"}`);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    Log("frontend", "info", "state", `Page changed to ${newPage}`);
  };

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  const priorityNotifications = getPriorityNotifications(notifications, topN);

  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ py: 3 }}>
        <TabsNavigation activeTab={activeTab} onTabChange={handleTabChange} />

        {activeTab === 0 && (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                All Notifications
              </Typography>
              <FilterDropdown value={filterType} onChange={handleFilterChange} />
            </Box>

            <NotificationList
              notifications={notifications}
              viewedIds={viewedIds}
              loading={loading}
              error={error}
            />

            <PaginationControl
              page={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}

        {activeTab === 1 && (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  Top {topN} Priority Notifications
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Sorted by type weight (Placement &gt; Result &gt; Event) and
                  recency
                </Typography>
              </Box>
              <TopNDropdown
                value={topN}
                onChange={(val) => {
                  setTopN(val);
                  Log("frontend", "info", "state", `Top N updated to: ${val}`);
                }}
              />
            </Box>

            <NotificationList
              notifications={priorityNotifications}
              viewedIds={viewedIds}
              loading={loading}
              error={error}
            />
          </>
        )}
      </Container>
    </>
  );
}
