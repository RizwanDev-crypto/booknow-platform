'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, Typography, Menu, MenuItem, Button, CircularProgress, Paper } from '@mui/material';
import CarsSearchForm from "@/components/Hero/CarsSearchForm";
import CarFilters from "./CarFilters";
import CarCard from "./CarCard";
import { cars } from "./carsData";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function CarResults() {
  const [localStorageData, setLocalStorageData] = useState(null);
  const [showCarSearchForm, setShowCarSearchForm] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // Filter states
  // Filter states
  const [carNameFilter, setCarNameFilter] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [anchorEl, setAnchorEl] = useState(null);
  const [sortLabel, setSortLabel] = useState("Low to High");
  const [visibleCarsCount, setVisibleCarsCount] = useState(7);
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
      setVisibleCarsCount(prev => prev + 7);
      setIsLoadingMore(false);
    }, 1500);
  };

  // Pagination reset is now handled in the filter change handlers passed to CarFilters

  // Load data from localStorage on component mount
  useEffect(() => {
    setTimeout(() => setIsMounted(true), 0);
    
    const savedData = localStorage.getItem('carSearchData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setLocalStorageData(parsedData);
        if (parsedData) {
          setShowCarSearchForm(true);
          if (parsedData.pickupLocation) {
            setCarNameFilter(parsedData.pickupLocation);
          }
        }
      } catch (error) {
        console.error("❌ Error parsing localStorage data:", error);
      }
    }
  }, []);

  // Filter cars
  const filteredCars = cars.filter(car => {
    const searchStr = (carNameFilter || "").toLowerCase();
    const carName = (car.model || "").toLowerCase();
    const carLocation = (car.location || "").toLowerCase();
    
    const matchesName = searchStr === "" || carName.includes(searchStr) || carLocation.includes(searchStr);
    
    let matchesCategory = true;
    if (selectedCategory === "Business") {
      matchesCategory = car.badge === "Business";
    } else if (selectedCategory === "SUV's") {
      matchesCategory = car.type === "SUV" || car.badge === "SUV";
    }

    return matchesName && matchesCategory;
  })
  .sort((a, b) => {
    if (sortLabel === "Low to High") return a.price - b.price;
    if (sortLabel === "High to Low") return b.price - a.price;
    return 0;
  });

  // Calculate facet counts
  const carTypeCounts = cars.reduce((acc, car) => {
    acc[car.type] = (acc[car.type] || 0) + 1;
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
     
      {/* Car Search Form */}
      {showCarSearchForm && (
        <Box sx={{ mb: 2, backgroundColor: "#fff", border: "1px solid #e0e0e0ca", borderRadius: "12px", py: 0 }}>
          <CarsSearchForm />
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
          <CarFilters 
            carNameFilter={carNameFilter}
            onCarNameChange={(val) => {
              setCarNameFilter(val);
              setVisibleCarsCount(7);
            }}
            sortLabel={sortLabel}
            onSortChange={(val) => {
              setSortLabel(val);
              setVisibleCarsCount(7);
            }}
            selectedCategory={selectedCategory}
            onCategoryChange={(val) => {
              setSelectedCategory(val);
              setVisibleCarsCount(7);
            }}
          />
        </Box>

        {/* Right: Car Cards */}
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
                {filteredCars.length} {filteredCars.length === 1 ? 'Car' : 'Cars'}
                {carNameFilter && (
                  <Box component="span" sx={{ fontWeight: 400, color: '#6B7280', fontSize: '14px', ml: 1 }}>
                    for &quot;{carNameFilter}&quot;
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
                <MenuItem onClick={() => handleSortClose("Price: Low to High")}>Price: Low to High</MenuItem>
                <MenuItem onClick={() => handleSortClose("Price: High to Low")}>Price: High to Low</MenuItem>
              </Menu>
            </Box>
          </Box>

          {/* Car Cards List */}
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            {filteredCars.slice(0, visibleCarsCount).map((car) => (
              <CarCard key={car.id} car={car} />
            ))}

            {isLoadingMore && (
              <Box sx={{ display: "flex", justifyContent: "center", py: 4, width: "100%" }}>
                <CircularProgress size={40} sx={{ color: "#3b82f6" }} />
              </Box>
            )}

            {!isLoadingMore && visibleCarsCount < filteredCars.length && (
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
                  Show More Cars
                </Button>
              </Box>
            )}

            {filteredCars.length === 0 && (
              <Paper sx={{ p: 4, textAlign: "center", borderRadius: 2, width: "100%", ml: { xs: 0, md: 2 } }}>
                <Typography variant="h6" color="textSecondary" sx={{ mb: 2 }}>
                  No cars found matching your search &quot;{carNameFilter}&quot;.
                </Typography>
                <Button 
                  variant="contained" 
                  onClick={() => {
                    setCarNameFilter("");
                    setPriceRange([0, 30000]);
                    setSelectedCarTypes([]);
                  }}
                  sx={{ bgcolor: '#3b82f6', textTransform: 'none' }}
                >
                  Clear all filters to see all cars
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
