"use client";

import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Slider,
  Divider,
  Collapse,
  Chip
} from "@mui/material";
import {
  Tune as TuneIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  StarOutlineOutlined as StarOutlineOutlinedIcon,
  SearchOutlined as SearchOutlinedIcon,
  PaymentsOutlined as PaymentsOutlinedIcon,
  HomeOutlined as HomeOutlinedIcon,
  WifiOutlined as WifiOutlinedIcon
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

export default function HotelFilters({ 
  hotelCount = 0, 
  hotelNameFilter = "", 
  onHotelNameChange = () => {},
  priceRange = [0, 500],
  onPriceChange = () => {},
  selectedStarRatings = [],
  onStarRatingsChange = () => {},
  selectedAccommodationTypes = [],
  onAccommodationTypesChange = () => {},
  selectedAmenities = [],
  onAmenitiesChange = () => {},
  starRatingCounts = {},
  accommodationTypeCounts = {},
  amenityCounts = {}
}) {

  const handlePriceChange = (event, newValue) => {
    onPriceChange(newValue);
  };

  const handleStarRatingChange = (rating) => {
    const newRatings = selectedStarRatings.includes(rating)
      ? selectedStarRatings.filter(r => r !== rating)
      : [...selectedStarRatings, rating];
    onStarRatingsChange(newRatings);
  };

  const handleAccommodationTypeChange = (type) => {
    const newTypes = selectedAccommodationTypes.includes(type)
      ? selectedAccommodationTypes.filter(t => t !== type)
      : [...selectedAccommodationTypes, type];
    onAccommodationTypesChange(newTypes);
  };

  const handleAmenityChange = (amenity) => {
    const newAmenities = selectedAmenities.includes(amenity)
      ? selectedAmenities.filter(a => a !== amenity)
      : [...selectedAmenities, amenity];
    onAmenitiesChange(newAmenities);
  };

  const handleClear = () => {
    onPriceChange([0, 500]);
    onHotelNameChange("");
    onStarRatingsChange([]);
    onAccommodationTypesChange([]);
    onAmenitiesChange([]);
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
            label={hotelCount}
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
            color: "#374151",
            bgcolor: "#F9FAFB",
            textTransform: "none",
            fontWeight: 700,
            fontSize: "12px",
            px: 1.5,
            border:"1px solid #E5E7EB",
            minWidth: "auto",
            "&:hover": { bgcolor: "transparent", opacity: 0.8 }
          }}
        >
          Clear Filter
        </Button>
      </Box>

      <Divider sx={{ my: "2px", borderColor: "rgba(75, 85, 99, 0.3)" }} />

      {/* Search by Name */}
      <FilterSection title="Search by Name" icon={<SearchOutlinedIcon sx={{ fontSize: 18, color: "#6B7280" }} />}>
        <TextField
          fullWidth
          size="small"
          value={hotelNameFilter}
          onChange={(e) => onHotelNameChange(e.target.value)}
          placeholder="Type Hotel Name..."
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
            <Typography variant="caption" sx={{ color: "#9CA3AF" }}>$0</Typography>
            <Typography variant="caption" sx={{ color: "#9CA3AF" }}>$500</Typography>
          </Box>
          <Slider
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={0}
            max={500}
            sx={{
              height: 6,
              "& .MuiSlider-track": {
                border: "none",
                background: "linear-gradient(to right, #3b82f6, #6366f1, #8b5cf6)",
              },
              "& .MuiSlider-thumb": {
                width: 18,
                height: 18,
                backgroundColor: "#fff",
                border: "2px solid #3b82f6",
              },
              "& .MuiSlider-rail": { opacity: 0.3, backgroundColor: "#D1D5DB" },
            }}
          />
        </Box>
      </FilterSection>

      {/* Accommodation Type */}
      <FilterSection title="Accommodation Type" icon={<HomeOutlinedIcon sx={{ fontSize: 18, color: "#6B7280" }} />}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          {[
            "Hotel",
            "Apartment",
            "Villa",
            "Resort",
            "Guest House",
            "Chalet",
            "Cottage",
            "Bungalow"
          ].map((type) => (
            <Box key={type} sx={{ 
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
                    checked={selectedAccommodationTypes.includes(type)}
                    onChange={() => handleAccommodationTypeChange(type)}
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
                    {type}
                  </Typography>
                }
                sx={{ margin: 0 }}
              />
              <Typography sx={{ fontSize: "0.75rem", color: "#9CA3AF", fontWeight: 500 }}>
                {accommodationTypeCounts[type] || 0}
              </Typography>
            </Box>
          ))}
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
                    checked={selectedStarRatings.includes(rating)}
                    onChange={() => handleStarRatingChange(rating)}
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
                {starRatingCounts[rating] || 0}
              </Typography>
            </Box>
          ))}
        </Box>
      </FilterSection>

      {/* Amenities */}
      <FilterSection title="Amenities" icon={<WifiOutlinedIcon sx={{ fontSize: 18, color: "#6B7280" }} />} hasDivider={false}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          {[
            "Free WiFi",
            "Swimming Pool",
            "Restaurant",
            "Parking",
            "24-Hour Front Desk",
            "Bar/Lounge",
            "Gym/Fitness Center",
            "Conference Rooms",
            "Airport Shuttle",
            "Beach Access",
            "Complimentary Breakfast"
          ].map((amenity) => (
            <Box key={amenity} sx={{ 
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
                    checked={selectedAmenities.includes(amenity)}
                    onChange={() => handleAmenityChange(amenity)}
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
                    {amenity}
                  </Typography>
                }
                sx={{ margin: 0 }}
              />
              <Typography sx={{ fontSize: "0.75rem", color: "#9CA3AF", fontWeight: 500 }}>
                {amenityCounts[amenity] || 0}
              </Typography>
            </Box>
          ))}
        </Box>
      </FilterSection>
    </Paper>
  );
}
