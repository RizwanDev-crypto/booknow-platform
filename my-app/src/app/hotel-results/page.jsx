'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, Typography, Menu, MenuItem, Button, CircularProgress, Paper } from '@mui/material';
import HotelSearchForm from "@/components/Hero/HotelSearchForm";
import HotelFilters from "./HotelFilters";
import HotelCard from "./HotelCard";
import { hotels } from "./hotelsData";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function HotelResults() {
  const [localStorageData, setLocalStorageData] = useState(null);
  const [showHotelSearchForm, setShowHotelSearchForm] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // Filter states
  const [hotelNameFilter, setHotelNameFilter] = useState("");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedStarRatings, setSelectedStarRatings] = useState([]);
  const [selectedAccommodationTypes, setSelectedAccommodationTypes] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [sortLabel, setSortLabel] = useState("Price: Low to High");
  const [visibleHotelsCount, setVisibleHotelsCount] = useState(7);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const openSort = Boolean(anchorEl);
  const handleSortClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSortClose = (option) => {
    if (typeof option === 'string') {
      setSortLabel(option);
    }
    setAnchorEl(null);
  };

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleHotelsCount(prev => prev + 7);
      setIsLoadingMore(false);
    }, 1500);
  };

  // Reset pagination when filters or sort change
  const handleFilterChange = (setter, value) => {
    setter(value);
    setVisibleHotelsCount(7);
  };

  // Load data from localStorage on component mount
  useEffect(() => {
    setTimeout(() => setIsMounted(true), 0);
    
    const savedData = localStorage.getItem('hotelSearchData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setLocalStorageData(parsedData);
        if (parsedData) {
          setShowHotelSearchForm(true);
          // Initialize result filters from the search data
          if (parsedData.destination) {
            setHotelNameFilter(parsedData.destination);
          }
        }
      } catch (error) {
        console.error("❌ Error parsing localStorage data:", error);
      }
    }
  }, []);

  // Filter hotels
  const filteredHotels = hotels.filter(hotel => {
    // Basic text search (Name or Location)
    const searchStr = (hotelNameFilter || "").toLowerCase();
    const hotelName = (hotel.name || "").toLowerCase();
    const hotelLocation = (hotel.location || "").toLowerCase();
    
    // Check if search matches name or location
    const matchesName = searchStr === "" || hotelName.includes(searchStr) || hotelLocation.includes(searchStr);
    
    // Price Filter
    const matchesPrice = hotel.price >= priceRange[0] && hotel.price <= priceRange[1];
    
    // Star Rating Filter
    const matchesStarRating = selectedStarRatings.length === 0 || selectedStarRatings.includes(hotel.starRating);
    
    // Accommodation Type Filter
    const matchesAccommodationType = selectedAccommodationTypes.length === 0 || selectedAccommodationTypes.includes(hotel.accommodationType);
    
    // Amenities Filter
    const matchesAmenities = selectedAmenities.length === 0 || 
      (hotel.amenities && selectedAmenities.every(amenity => hotel.amenities.includes(amenity)));
    
    return matchesName && matchesPrice && matchesStarRating && matchesAccommodationType && matchesAmenities;
  })
  .sort((a, b) => {
    if (sortLabel === "Price: Low to High") return a.price - b.price;
    if (sortLabel === "Price: High to Low") return b.price - a.price;
    if (sortLabel === "Rating: High to Low") return b.rating - a.rating;
    return 0;
  });

  // Calculate facet counts
  const starRatingCounts = hotels.reduce((acc, hotel) => {
    acc[hotel.starRating] = (acc[hotel.starRating] || 0) + 1;
    return acc;
  }, {});

  const accommodationTypeCounts = hotels.reduce((acc, hotel) => {
    acc[hotel.accommodationType] = (acc[hotel.accommodationType] || 0) + 1;
    return acc;
  }, {});

  const amenityCounts = hotels.reduce((acc, hotel) => {
    hotel.amenities?.forEach(amenity => {
      acc[amenity] = (acc[amenity] || 0) + 1;
    });
    return acc;
  }, {});

  if (!isMounted) return null;

  return (
    <Box sx={{ backgroundColor: "#f1f5f9", minHeight: "100vh", py: { xs: 2, sm: 2, md: 2 } }}>
      <Box sx={{ 
        maxWidth: "lg", 
        mx: "auto", 
        px: { xs: 1.5, sm: 2, md: 3, lg: 3 },
        pb: { xs: 4, sm: 6, md: 8, lg: 8 },
        fontFamily: "'Inter', sans-serif",
        "& .MuiTypography-root": { fontFamily: "inherit" } 
      }}>
     
      {/* Hotel Search Form */}
      {showHotelSearchForm && (
        <Box sx={{ mb: 2, backgroundColor: "#fff", border: "1px solid #e0e0e0ca", borderRadius: "12px", py: 0 }}>
          <HotelSearchForm />
        </Box>
      )}

      {/* Main Layout */}
      <Box sx={{ 
        display: "flex", 
        alignItems: "flex-start",
        flexDirection: { xs: "column", md: "row" },
        gap: 2
      }}>
        
        {/* Left: Filters Sidebar */}
        <Box sx={{ 
          width: { xs: "100%", md: "280px" }, 
          flexShrink: 0 
        }}>
          <HotelFilters 
            hotelCount={filteredHotels.length}
            hotelNameFilter={hotelNameFilter}
            onHotelNameChange={(val) => handleFilterChange(setHotelNameFilter, val)}
            priceRange={priceRange}
            onPriceChange={(val) => handleFilterChange(setPriceRange, val)}
            selectedStarRatings={selectedStarRatings}
            onStarRatingsChange={(val) => handleFilterChange(setSelectedStarRatings, val)}
            selectedAccommodationTypes={selectedAccommodationTypes}
            onAccommodationTypesChange={(val) => handleFilterChange(setSelectedAccommodationTypes, val)}
            selectedAmenities={selectedAmenities}
            onAmenitiesChange={(val) => handleFilterChange(setSelectedAmenities, val)}
            starRatingCounts={starRatingCounts}
            accommodationTypeCounts={accommodationTypeCounts}
            amenityCounts={amenityCounts}
          />
        </Box>

        {/* Right: Hotel Cards */}
        <Box sx={{ flex: 1, minWidth: 0, width: "100%" }}>
          {/* Results Header */}
          <Box sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
            maxWidth: "98.4%",
            ml: { xs: 0, md: 2 },
            width: "100%"
          }}>
            <Box>
              <Typography sx={{ fontSize: "18px", fontWeight: 700, color: "#1F2937" }}>
                {filteredHotels.length} {filteredHotels.length === 1 ? 'Hotel' : 'Hotels'}
                {hotelNameFilter && (
                  <Box component="span" sx={{ fontWeight: 400, color: '#6B7280', fontSize: '14px', ml: 1 }}>
                    for &quot;{hotelNameFilter}&quot;
                  </Box>
                )}
              </Typography>
              <Typography sx={{ color: "#6B7280", fontSize: "14px" }}>
                Found from 1 Supplier(s)
              </Typography>
            </Box>

            <Box sx={{ 
              display: "flex", 
              alignItems: "center", 
              gap: 1,
              width: "auto",
              justifyContent: "flex-end",
              whiteSpace: "nowrap",
              flexShrink: 0
            }}>
              <Box
                onClick={handleSortClick}
                sx={{
                  bgcolor: "white",
                  color: "#1F2937",
                  borderRadius: 1.5,
                  px: 1.5,
                  py: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  fontSize: "0.8rem",
                  fontWeight: 400,
                  border: "1px solid #3b82f6",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                  width: "170px",
                  whiteSpace: "nowrap",
                  flexShrink: 0
                }}
              >
                {sortLabel}
                <ExpandMoreIcon sx={{ fontSize: 16, color: "#6B7280", transform: openSort ? "rotate(180deg)" : "none", transition: "0.2s" }} />
              </Box>
              <Menu
                anchorEl={anchorEl}
                open={openSort}
                onClose={() => handleSortClose()}
                sx={{
                  "& .MuiPaper-root": {
                    borderRadius: 1,
                    mt: 0.5,
                    minWidth: 170,
                    "& .MuiMenuItem-root": {
                      fontSize: "0.8rem",
                      fontWeight: 400,
                      py: 1,
                      "&:hover": {
                        bgcolor: "#f3f4f6",
                        color: "#3b82f6"
                      }
                    }
                  }
                }}
              >
                <MenuItem onClick={() => { handleSortClose("Price: Low to High"); setVisibleHotelsCount(7); }}>Price: Low to High</MenuItem>
                <MenuItem onClick={() => { handleSortClose("Price: High to Low"); setVisibleHotelsCount(7); }}>Price: High to Low</MenuItem>
                <MenuItem onClick={() => { handleSortClose("Rating: High to Low"); setVisibleHotelsCount(7); }}>Rating: High to Low</MenuItem>
              </Menu>
            </Box>
          </Box>

          {/* Hotel Cards List */}
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            {filteredHotels.slice(0, visibleHotelsCount).map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}

            {isLoadingMore && (
              <Box sx={{ display: "flex", justifyContent: "center", py: 4, width: "100%" }}>
                <CircularProgress size={40} sx={{ color: "#3b82f6" }} />
              </Box>
            )}

            {!isLoadingMore && visibleHotelsCount < filteredHotels.length && (
              <Box sx={{ mt: 2, mb: 4, textAlign: "center", width: "100%" }}>
                <Button 
                  onClick={handleLoadMore}
                  variant="outlined"
                  sx={{ 
                    color: "#3b82f6", 
                    borderColor: "#3b82f6",
                    textTransform: "none",
                    fontWeight: 600,
                    px: 4,
                    '&:hover': {
                      borderColor: "#2563eb",
                      bgcolor: "rgba(59, 130, 246, 0.04)"
                    }
                  }}
                >
                  Show More Hotels
                </Button>
              </Box>
            )}

            {filteredHotels.length === 0 && (
              <Paper sx={{ p: 4, textAlign: "center", borderRadius: 2, width: "100%", ml: { xs: 0, md: 2 } }}>
                <Typography variant="h6" color="textSecondary" sx={{ mb: 2 }}>
                  No hotels found matching your search &quot;{hotelNameFilter}&quot;.
                </Typography>
                <Button 
                  variant="contained" 
                  onClick={() => {
                    setHotelNameFilter("");
                    setPriceRange([0, 500]);
                    setSelectedStarRatings([]);
                    setSelectedAccommodationTypes([]);
                    setSelectedAmenities([]);
                  }}
                  sx={{ bgcolor: '#3b82f6', textTransform: 'none' }}
                >
                  Clear all filters to see all hotels
                </Button>
              </Paper>
            )}
          </Box>
        </Box>
      </Box>
      </Box>
    </Box>
  );
}
