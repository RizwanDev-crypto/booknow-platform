"use client";

import {
  Box,
  Typography,
  Paper,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Collapse,
  IconButton
} from "@mui/material";
import {
  FilterList as FilterListIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon
} from "@mui/icons-material";
import { useState } from "react";

const FilterSection = ({ title, defaultOpen = true, children }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Box sx={{ mb: 2, overflow: "hidden", borderRadius: "6px" }}>
      <Box
        onClick={() => setOpen(!open)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          height: "38px",
          px: 2,
          bgcolor: open ? "#0058E6" : "#023669",
          color: "white",
          borderRadius: "6px",
          transition: "all 0.2s"
        }}
      >
        <Typography sx={{ fontWeight: 600, fontSize: "16px" }}>
          {title}
        </Typography>
        {open ? <ExpandLessIcon sx={{ color: "white" }} /> : <ExpandMoreIcon sx={{ color: "white" }} />}
      </Box>
      <Collapse in={open}>
        <Box sx={{ p: 2, bgcolor: "white", border: "1px solid #E5E7EB", borderTop: "none", borderBottomLeftRadius: "6px", borderBottomRightRadius: "6px" }}>
          {children}
        </Box>
      </Collapse>
    </Box>
  );
};

export default function CarFilters({ 
  carNameFilter = "", 
  onCarNameChange,
  sortLabel = "Low to High",
  onSortChange,
  selectedCategory = "All",
  onCategoryChange
}) {

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        bgcolor: "white",
        borderRadius: 2,
        p: 2,
        pb: 4,
        position: "sticky",
        top: 20,
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)"
      }}
    >
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
        <Typography sx={{ fontSize: "20px", fontWeight: 500, color: "#023669" }}>
          Filter
        </Typography>
        <FilterListIcon sx={{ color: "#023669", fontSize: 28 }} />
      </Box>

      {/* Search */}
      <TextField
        fullWidth
        value={carNameFilter}
        onChange={(e) => onCarNameChange(e.target.value)}
        placeholder="Search"
        variant="outlined"
        sx={{
          mb: 3,
          "& .MuiOutlinedInput-root": {
            borderRadius: "6px",
            height: "38px",
            fontSize: "14px",
            color: "#6B7280",
            "& fieldset": { borderColor: "#023669" },
            "&:hover fieldset": { borderColor: "#1a1918ff" },
            "&.Mui-focused fieldset": { borderColor: "#F6941C" },
          },
          "& .MuiOutlinedInput-input": {
              padding: "10px 14px"
          }
        }}
      />

      {/* Price Sort */}
      <FilterSection title="Price">
        <RadioGroup
          value={sortLabel}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <FormControlLabel 
            value="Low to High" 
            control={<Radio size="small" sx={{ color: "#023669", "&.Mui-checked": { color: "#023669" } }} />} 
            label={<Typography sx={{ fontSize: "14px", color: "#023669", fontWeight: 500 }}>Low to High</Typography>} 
          />
          <FormControlLabel 
            value="High to Low" 
            control={<Radio size="small" sx={{ color: "#023669", "&.Mui-checked": { color: "#023669" } }} />} 
            label={<Typography sx={{ fontSize: "14px", color: "#023669", fontWeight: 500 }}>High to Low</Typography>} 
          />
        </RadioGroup>
      </FilterSection>

      {/* Car Type */}
      <FilterSection title="Car Type">
        <RadioGroup
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <FormControlLabel 
            value="All" 
            control={<Radio size="small" sx={{ color: "#023669", "&.Mui-checked": { color: "#023669" } }} />} 
            label={<Typography sx={{ fontSize: "14px", color: "#023669", fontWeight: 500 }}>All</Typography>} 
          />
          <FormControlLabel 
            value="Business" 
            control={<Radio size="small" sx={{ color: "#023669", "&.Mui-checked": { color: "#023669" } }} />} 
            label={<Typography sx={{ fontSize: "14px", color: "#023669", fontWeight: 500 }}>Business</Typography>} 
          />
           <FormControlLabel 
            value="SUV's" 
            control={<Radio size="small" sx={{ color: "#023669", "&.Mui-checked": { color: "#023669" } }} />} 
            label={<Typography sx={{ fontSize: "14px", color: "#023669", fontWeight: 500 }}>SUV's</Typography>} 
          />
        </RadioGroup>
      </FilterSection>

    </Paper>
  );
}
