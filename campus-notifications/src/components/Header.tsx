"use client";

import { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import Box from "@mui/material/Box";
import { Log } from "@/utils/logger";

export default function Header() {
  useEffect(() => {
    Log("frontend", "info", "component", "Header component mounted");
  }, []);

  return (
    <AppBar position="static" elevation={1}>
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <NotificationsActiveIcon />
          <Typography variant="h6" component="h1" sx={{ fontWeight: 600 }}>
            Campus Notifications
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
