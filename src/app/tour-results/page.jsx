'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, Typography, Menu, MenuItem, Button, CircularProgress, Paper, Alert } from '@mui/material';
import TourSearchForm from "@/components/Hero/TourSearchForm";
import TourFilters from "./TourFilters";
import TourCard from "./TourCard";
import { useTours } from '@/hooks/useTours';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function TourResults() {
  // React Query hook for fetching tours
  const { data: tours = [], isLoading, isError, error } = useTours();
  
  const [localStorageData, setLocalStorageData] = useState(null);
  const [showTourSearchForm, setShowTourSearchForm] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // Filter states
  const [tourNameFilter, setTourNameFilter] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedInclusions, setSelectedInclusions] = useState([]);
  const [selectedExclusions, setSelectedExclusions] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [sortLabel, setSortLabel] = useState("Price: Low to High");
  const [visibleToursCount, setVisibleToursCount] = useState(7);
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
      setVisibleToursCount(prev => prev + 7);
      setIsLoadingMore(false);
    }, 3000);
  };

  // Reset pagination when filters or sort change
  const handleFilterChange = (setter, value) => {
    setter(value);
    setVisibleToursCount(7);
  };

  // Load data from localStorage on component mount
  useEffect(() => {
    setTimeout(() => setIsMounted(true), 0);
    
    const savedData = localStorage.getItem('tourSearchData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setLocalStorageData(parsedData);
        if (parsedData) {
          setShowTourSearchForm(true);
          // Initialize result filters from the search data
          if (parsedData.destination) {
            setTourNameFilter(parsedData.destination);
          }
        }
      } catch (error) {
        console.error("❌ Error parsing localStorage data:", error);
      }
    }
  }, []);

  // Filter tours
  const filteredTours = tours.filter(tour => {
    // Basic text search (Name or Location)
    const searchStr = (tourNameFilter || "").toLowerCase();
    const tourName = (tour.name || "").toLowerCase();
    const tourLocation = (tour.location || "").toLowerCase();
    
    // Check if search matches name or location
    const matchesName = searchStr === "" || tourName.includes(searchStr) || tourLocation.includes(searchStr);
    
    // Price Filter
    const matchesPrice = tour.price >= priceRange[0] && tour.price <= priceRange[1];
    
    // Rating Filter
    const matchesRating = selectedRatings.length === 0 || selectedRatings.includes(Math.floor(tour.rating || 0));
    
    // Inclusions Filter
    const matchesInclusions = selectedInclusions.length === 0 || 
      (tour.inclusions && selectedInclusions.every(inc => tour.inclusions.includes(inc)));
    
    // Exclusions Filter
    const matchesExclusions = selectedExclusions.length === 0 ||
      (tour.exclusions && selectedExclusions.every(exc => tour.exclusions.includes(exc)));
    
    return matchesName && matchesPrice && matchesRating && matchesInclusions && matchesExclusions;
  })
  .sort((a, b) => {
    if (sortLabel === "Price: Low to High") return a.price - b.price;
    if (sortLabel === "Price: High to Low") return b.price - a.price;
    return 0;
  });

  // Calculate facet counts
  const ratingCounts = tours.reduce((acc, tour) => {
    const r = Math.floor(tour.rating);
    acc[r] = (acc[r] || 0) + 1;
    return acc;
  }, {});

  const inclusionCounts = tours.reduce((acc, tour) => {
    tour.inclusions?.forEach(inc => {
      acc[inc] = (acc[inc] || 0) + 1;
    });
    return acc;
  }, {});

  const exclusionCounts = tours.reduce((acc, tour) => {
    tour.exclusions?.forEach(exc => {
      acc[exc] = (acc[exc] || 0) + 1;
    });
    return acc;
  }, {});

  if (!isMounted) return null;

  // Show loading state
  if (isLoading) {
    return (
      <Box sx={{ backgroundColor: "#f1f5f9", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress size={60} sx={{ color: "#3b82f6", mb: 2 }} />
          <Typography sx={{ color: "#6B7280", fontSize: "16px" }}>Loading tours...</Typography>
        </Box>
      </Box>
    );
  }

  // Show error state
  if (isError) {
    return (
      <Box sx={{ backgroundColor: "#f1f5f9", minHeight: "100vh", py: 4 }}>
        <Box sx={{ maxWidth: "lg", mx: "auto", px: 3 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            <Typography variant="h6">Failed to load tours</Typography>
            <Typography>{error?.message || 'Something went wrong. Please try again later.'}</Typography>
          </Alert>
        </Box>
      </Box>
    );
  }

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
     
      {/* Tour Search Form */}
      {showTourSearchForm && (
        <Box sx={{ mb: 2, backgroundColor: "#fff", border: "1px solid #e0e0e0ca", borderRadius: "12px", py: 0 }}>
          <TourSearchForm />
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
          <TourFilters 
            tourCount={filteredTours.length}
            tourNameFilter={tourNameFilter}
            onTourNameChange={(val) => handleFilterChange(setTourNameFilter, val)}
            priceRange={priceRange}
            onPriceChange={(val) => handleFilterChange(setPriceRange, val)}
            selectedRatings={selectedRatings}
            onRatingsChange={(val) => handleFilterChange(setSelectedRatings, val)}
            selectedInclusions={selectedInclusions}
            onInclusionsChange={(val) => handleFilterChange(setSelectedInclusions, val)}
            selectedExclusions={selectedExclusions}
            onExclusionsChange={(val) => handleFilterChange(setSelectedExclusions, val)}
            ratingCounts={ratingCounts}
            inclusionCounts={inclusionCounts}
            exclusionCounts={exclusionCounts}
          />
        </Box>

        {/* Right: Tour Cards */}
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
                {filteredTours.length} {filteredTours.length === 1 ? 'Tour' : 'Tours'}
                {tourNameFilter && (
                  <Box component="span" sx={{ fontWeight: 400, color: '#6B7280', fontSize: '14px', ml: 1 }}>
                    for &quot;{tourNameFilter}&quot;
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
                <MenuItem onClick={() => { handleSortClose("Price: Low to High"); setVisibleToursCount(7); }}>Price: Low to High</MenuItem>
                <MenuItem onClick={() => { handleSortClose("Price: High to Low"); setVisibleToursCount(7); }}>Price: High to Low</MenuItem>
              </Menu>
            </Box>
          </Box>

          {/* Tour Cards List */}
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            {filteredTours.slice(0, visibleToursCount).map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}

            {isLoadingMore && (
              <Box sx={{ display: "flex", justifyContent: "center", py: 4, width: "100%" }}>
                <CircularProgress size={40} sx={{ color: "#3b82f6" }} />
              </Box>
            )}

            {!isLoadingMore && visibleToursCount < filteredTours.length && (
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
                  Show More Tours
                </Button>
              </Box>
            )}

            {filteredTours.length === 0 && (
              <Paper sx={{ p: 4, textAlign: "center", borderRadius: 2, width: "100%", ml: { xs: 0, md: 2 } }}>
                <Typography variant="h6" color="textSecondary" sx={{ mb: 2 }}>
                  No tours found matching your search &quot;{tourNameFilter}&quot;.
                </Typography>
                <Button 
                  variant="contained" 
                  onClick={() => {
                    setTourNameFilter("");
                    setPriceRange([0, 1000]);
                    setSelectedRatings([]);
                    setSelectedInclusions([]);
                    setSelectedExclusions([]);
                  }}
                  sx={{ bgcolor: '#3b82f6', textTransform: 'none' }}
                >
                  Clear all filters to see all tours
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
