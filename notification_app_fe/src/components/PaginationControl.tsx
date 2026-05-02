"use client";

import MuiPagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import { Log } from "@/utils/logger";

interface PaginationControlProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function PaginationControl({
  page,
  totalPages,
  onPageChange,
}: PaginationControlProps) {
  if (totalPages <= 1) return null;

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    Log("frontend", "info", "component", `Page changed to ${value}`);
    onPageChange(value);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
      <MuiPagination
        count={totalPages}
        page={page}
        onChange={handleChange}
        color="primary"
        shape="rounded"
      />
    </Box>
  );
}
