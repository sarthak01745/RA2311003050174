"use client";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { NotificationType } from "@/types";
import { Log } from "@/utils/logger";

interface FilterDropdownProps {
  value: NotificationType | "";
  onChange: (value: NotificationType | "") => void;
}

export default function FilterDropdown({
  value,
  onChange,
}: FilterDropdownProps) {
  const handleChange = (event: SelectChangeEvent) => {
    const selected = event.target.value as NotificationType | "";
    Log(
      "frontend",
      "info",
      "component",
      `Filter changed to: ${selected || "All"}`
    );
    onChange(selected);
  };

  return (
    <FormControl size="small" sx={{ minWidth: 160 }}>
      <InputLabel id="filter-label">Filter by Type</InputLabel>
      <Select
        labelId="filter-label"
        id="filter-select"
        value={value}
        label="Filter by Type"
        onChange={handleChange}
      >
        <MenuItem value="">All Types</MenuItem>
        <MenuItem value="Event">Event</MenuItem>
        <MenuItem value="Result">Result</MenuItem>
        <MenuItem value="Placement">Placement</MenuItem>
      </Select>
    </FormControl>
  );
}
