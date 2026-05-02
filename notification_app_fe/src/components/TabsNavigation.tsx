"use client";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Log } from "@/utils/logger";

interface TabsNavigationProps {
  activeTab: number;
  onTabChange: (newTab: number) => void;
}

export default function TabsNavigation({
  activeTab,
  onTabChange,
}: TabsNavigationProps) {
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    Log(
      "frontend",
      "info",
      "component",
      `Tab changed to ${newValue === 0 ? "All" : "Priority"}`
    );
    onTabChange(newValue);
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
      <Tabs
        value={activeTab}
        onChange={handleChange}
        centered
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label="All Notifications" id="tab-all" />
        <Tab label="Priority Notifications" id="tab-priority" />
      </Tabs>
    </Box>
  );
}
