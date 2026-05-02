"use client";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Log } from "@/utils/logger";

interface TopNDropdownProps {
  value: number;
  onChange: (value: number) => void;
}

export default function TopNDropdown({ value, onChange }: TopNDropdownProps) {
  const handleChange = (event: SelectChangeEvent<number>) => {
    const selected = Number(event.target.value);
    Log(
      "frontend",
      "info",
      "component",
      `Priority Top N changed to: ${selected}`
    );
    onChange(selected);
  };

  return (
    <FormControl size="small" sx={{ minWidth: 120 }}>
      <InputLabel id="top-n-label">Top N</InputLabel>
      <Select
        labelId="top-n-label"
        id="top-n-select"
        value={value}
        label="Top N"
        onChange={handleChange}
      >
        <MenuItem value={5}>Top 5</MenuItem>
        <MenuItem value={10}>Top 10</MenuItem>
        <MenuItem value={15}>Top 15</MenuItem>
        <MenuItem value={20}>Top 20</MenuItem>
      </Select>
    </FormControl>
  );
}
