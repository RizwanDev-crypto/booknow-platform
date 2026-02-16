"use client";

import {
  Box,
  Typography,
  Paper,
  IconButton,
  Chip,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Slider,
  Divider,
  Collapse
} from "@mui/material";
import {
  Tune as TuneIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  StarOutlineOutlined as StarOutlineOutlinedIcon,
  CheckCircleOutlineOutlined as CheckCircleOutlineOutlinedIcon,
  CancelOutlined as CancelOutlinedIcon,
  SearchOutlined as SearchOutlinedIcon,
  PaymentsOutlined as PaymentsOutlinedIcon
} from "@mui/icons-material";

import { useState } from "react";

const FilterSection = ({ title, icon, defaultOpen = true, children, hasDivider = true }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Box sx={{ mb: hasDivider ? 0 : 0 }}>
      <Box
        onClick={() => setOpen(!open)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          py: 1,
          "&:hover": { opacity: 1 }
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {icon && <Box sx={{ color: "#9CA3AF", display: "flex" }}>{icon}</Box>}
          <Typography component="div" sx={{ fontWeight: 600, fontSize: "14px", color: "#1F2937" }}>
            {title}
          </Typography>
        </Box>
        {open ? <KeyboardArrowUpIcon sx={{ fontSize: 18, color: "#9CA3AF" }} /> : <KeyboardArrowDownIcon sx={{ fontSize: 18, color: "#9CA3AF" }} />}
      </Box>
      <Collapse in={open}>
        <Box sx={{ pt: 1 }}>{children}</Box>
      </Collapse>
      {hasDivider && <Divider sx={{ my: "2px", borderColor: "#E5E7EB" }} />}
    </Box>
  );
};

export default function TourFilters({ 
  tourCount = 0, 
  tourNameFilter = "", 
  onTourNameChange = () => {},
  priceRange = [100, 500],
  onPriceChange = () => {},
  selectedRatings = [],
  onRatingsChange = () => {},
  selectedInclusions = [],
  onInclusionsChange = () => {},
  selectedExclusions = [],
  onExclusionsChange = () => {},
  ratingCounts = {},
  inclusionCounts = {},
  exclusionCounts = {}
}) {

  const handlePriceChange = (event, newValue) => {
    onPriceChange(newValue);
  };

  const handleRatingChange = (rating) => {
    const newRatings = selectedRatings.includes(rating)
      ? selectedRatings.filter(r => r !== rating)
      : [...selectedRatings, rating];
    onRatingsChange(newRatings);
  };

  const handleInclusionChange = (inclusion) => {
    const newInclusions = selectedInclusions.includes(inclusion)
      ? selectedInclusions.filter(i => i !== inclusion)
      : [...selectedInclusions, inclusion];
    onInclusionsChange(newInclusions);
  };

  const handleExclusionChange = (exclusion) => {
    const newExclusions = selectedExclusions.includes(exclusion)
      ? selectedExclusions.filter(e => e !== exclusion)
      : [...selectedExclusions, exclusion];
    onExclusionsChange(newExclusions);
  };

  const handleClear = () => {
    onPriceChange([100, 500]);
    onTourNameChange("");
    onRatingsChange([]);
    onInclusionsChange([]);
    onExclusionsChange([]);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        bgcolor: "white",
        borderRadius: 2,
        p: 2,
        pb: 1,
        color: "black",
        border: "1px solid #E5E7EB",
        position: "sticky",
        top: 0,
        mb: 4,
      }}
    >
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <TuneIcon sx={{ color: "#1A53FF", fontSize: 20 }} />
          <Typography variant="h6" sx={{ fontSize: "1.1rem", fontWeight: 700, color: "#1F2937" }}>
            Filters
          </Typography>
          <Chip
            label={tourCount}
            size="small"
            sx={{
              color: "#1E40AF",
              fontWeight: 700,
              background: "#DBEAFE",
              height: 20,
              width: 24,
              minWidth: 20,
              p: 0,
              fontSize: "0.7rem",
              borderRadius: "50%",
              "& .MuiChip-label": {
                px: 0,
              }
            }}
          />
        </Box>
        <Button
          size="small"
          onClick={handleClear}
          sx={{
            color: "#2563EB",
            textTransform: "none",
            fontWeight: 700,
            fontSize: "0.85rem",
            px: 0,
            minWidth: "auto",
            "&:hover": { bgcolor: "transparent", opacity: 0.8 }
          }}
        >
          Clear
        </Button>
      </Box>

      <Divider sx={{ my: "2px", borderColor: "rgba(75, 85, 99, 0.3)" }} />

      {/* Search by Name */}
      <FilterSection title="Search by Name" icon={<SearchOutlinedIcon sx={{ fontSize: 18, color: "#6B7280" }} />}>
        <TextField
          fullWidth
          size="small"
          value={tourNameFilter}
          onChange={(e) => onTourNameChange(e.target.value)}
          placeholder="Type Tour Name..."
          sx={{
            mb: 1.5,
            "& .MuiOutlinedInput-root": {
              bgcolor: "#F9FAFB",
              color: "#1F2937",
              fontSize: "0.8rem",
              "& fieldset": { borderColor: "#E5E7EB" },
              "&:hover fieldset": { borderColor: "#3B82F6" },
              "&.Mui-focused fieldset": { borderColor: "#3B82F6" },
            }
          }}
        />
      </FilterSection>

      {/* Price Range */}
      <FilterSection  
        title={
          <>
            Price Range
            <Box component="span" sx={{ 
              ml: 1,
              fontSize: "0.8rem", 
              bgcolor: "#F3F4F6", 
              borderRadius: 3, 
              px: { xs: 1, sm: 0, md: 0, lg: 1 },
              py: 0.5,
              color: "#4B5563",
              fontWeight: 500
            }}>
              ${priceRange[0]} - ${priceRange[1]}
            </Box>
          </>
        } 
        icon={<PaymentsOutlinedIcon sx={{ fontSize: 18, color: "#6B7280" }} />}
      >
        <Box sx={{ px: 1, mt: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="caption" sx={{ color: "#9CA3AF" }}>$100</Typography>
            <Typography variant="caption" sx={{ color: "#9CA3AF" }}>$500</Typography>
          </Box>
          <Slider
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={100}
            max={500}
            sx={{
              height: 6,
              "& .MuiSlider-track": {
                border: "none",
                background: "linear-gradient(to right, #10b981, #6366f1, #8b5cf6)",
              },
              "& .MuiSlider-thumb": {
                width: 18,
                height: 18,
                backgroundColor: "#fff",
                border: "2px solid #10b981",
              },
              "& .MuiSlider-rail": { opacity: 0.3, backgroundColor: "#D1D5DB" },
            }}
          />
        </Box>
      </FilterSection>

      {/* Star Rating */}
      <FilterSection title="Star Rating" icon={<StarOutlineOutlinedIcon sx={{ fontSize: 18, color: "#6B7280" }} />}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          {[5, 4, 3, 2, 1].map((rating) => (
            <Box key={rating} sx={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "space-between",
              cursor: "pointer",
              "&:hover": {
                "& .MuiCheckbox-root": {
                  color: "#3B82F6",
                }
              }
            }}>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    disableRipple
                    checked={selectedRatings.includes(rating)}
                    onChange={() => handleRatingChange(rating)}
                    sx={{
                      color: "#D1D5DB",
                      "&.Mui-checked": { color: "#3B82F6" },
                      padding: "4px",
                      "& .MuiSvgIcon-root": { fontSize: 18 },
                      "&:hover": { bgcolor: "transparent" }
                    }}
                  />
                }
                label={
                  <Typography component="span" sx={{ fontSize: "0.85rem", color: "#4B5563" }}>
                    {rating} Stars
                  </Typography>
                }
                sx={{ margin: 0 }}
              />
              <Typography sx={{ fontSize: "0.75rem", color: "#9CA3AF", fontWeight: 500 }}>
                {ratingCounts[rating] || 0}
              </Typography>
            </Box>
          ))}
        </Box>
      </FilterSection>

      {/* Inclusions */}
      <FilterSection title="Inclusions" icon={<CheckCircleOutlineOutlinedIcon sx={{ fontSize: 18, color: "#6B7280" }} />}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          {[
            "Complimentary Breakfast",
            "Lunch",
            "Dinner",
            "Transportation",
            "Professional Tour Guide",
            "Hotel Pickup and Drop-off",
            "Entrance Fees",
            "WiFi Access",
            "Air Conditioning",
            "Parking"
          ].map((inclusion) => (
            <Box key={inclusion} sx={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "space-between",
              cursor: "pointer",
              "&:hover": {
                "& .MuiCheckbox-root": {
                  color: "#3B82F6",
                }
              }
            }}>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    disableRipple
                    checked={selectedInclusions.includes(inclusion)}
                    onChange={() => handleInclusionChange(inclusion)}
                    sx={{
                      color: "#D1D5DB",
                      "&.Mui-checked": { color: "#3B82F6" },
                      padding: "4px",
                      "& .MuiSvgIcon-root": { fontSize: 18 },
                      "&:hover": { bgcolor: "transparent" }
                    }}
                  />
                }
                label={
                  <Typography component="span" sx={{ fontSize: "0.85rem", color: "#4B5563" }}>
                    {inclusion}
                  </Typography>
                }
                sx={{ margin: 0 }}
              />
              <Typography sx={{ fontSize: "0.75rem", color: "#9CA3AF", fontWeight: 500 }}>
                {inclusionCounts[inclusion] || 0}
              </Typography>
            </Box>
          ))}
        </Box>
      </FilterSection>

      {/* Exclusions */}
      <FilterSection title="Exclusions" icon={<CancelOutlinedIcon sx={{ fontSize: 18, color: "#6B7280" }} />} hasDivider={false}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          {[
            "Airfare & Airport Taxes",
            "Visa Charges",
            "Travel Insurance",
            "Tips and Gratuities",
            "Personal Expenses",
            "Optional Tours",
            "Alcoholic Beverages"
          ].map((exclusion) => (
            <Box key={exclusion} sx={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "space-between",
              cursor: "pointer",
              "&:hover": {
                "& .MuiCheckbox-root": {
                  color: "#3B82F6",
                }
              }
            }}>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    disableRipple
                    checked={selectedExclusions.includes(exclusion)}
                    onChange={() => handleExclusionChange(exclusion)}
                    sx={{
                      color: "#D1D5DB",
                      "&.Mui-checked": { color: "#3B82F6" },
                      padding: "4px",
                      "& .MuiSvgIcon-root": { fontSize: 18 },
                      "&:hover": { bgcolor: "transparent" }
                    }}
                  />
                }
                label={
                  <Typography component="span" sx={{ fontSize: "0.85rem", color: "#4B5563" }}>
                    {exclusion}
                  </Typography>
                }
                sx={{ margin: 0 }}
              />
              <Typography sx={{ fontSize: "0.75rem", color: "#9CA3AF", fontWeight: 500 }}>
                {exclusionCounts[exclusion] || 0}
              </Typography>
            </Box>
          ))}
        </Box>
      </FilterSection>
    </Paper>
  );
}
