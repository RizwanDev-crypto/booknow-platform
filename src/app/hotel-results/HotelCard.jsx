'use client';

import * as React from 'react';
import { useState } from 'react';
import { Box, Typography, Paper, Button, Chip, Divider, IconButton } from '@mui/material';
import Link from 'next/link';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import StarIcon from '@mui/icons-material/Star';
import WifiIcon from '@mui/icons-material/Wifi';
import PoolIcon from '@mui/icons-material/Pool';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function HotelCard({ hotel }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Get first 3 amenities for display
  const displayAmenities = hotel.amenities?.slice(0, 3) || [];
  
  const getAmenityIcon = (amenity) => {
    if (amenity.includes("WiFi")) return <WifiIcon sx={{ fontSize: 14 }} />;
    if (amenity.includes("Pool")) return <PoolIcon sx={{ fontSize: 14 }} />;
    if (amenity.includes("Restaurant")) return <RestaurantIcon sx={{ fontSize: 14 }} />;
    return null;
  };

  const handlePrevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? hotel.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === hotel.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor: "white",
        borderRadius: 2,
        p: 0,
        mb: 2,
        maxWidth: "98.4%",
        width: "100%",
        mx: { xs: "auto", sm: 0 },
        ml: { xs: "auto", sm: 2, md: 2, lg: 2 },
        border: "1px solid #e0e0e0",
        overflow: "hidden",
        transition: "all 0.3s ease-in-out"
      }}
    >
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
        {/* Hotel Image with Carousel */}
        <Box 
          sx={{ 
            width: { xs: "100%", md: "280px" }, 
            height: { xs: "220px", md: "auto" },
            alignSelf: "stretch",
            flexShrink: 0,
            position: "relative",
            "&:hover .carousel-btn": {
              opacity: 1,
              visibility: "visible"
            }
          }}
        >
          <Box
            component="img"
            src={hotel.images[currentImageIndex]}
            alt={hotel.name}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 0,
              transition: "opacity 0.3s ease-in-out"
            }}
          />
          
          {/* Carousel Navigation Buttons */}
          {hotel.images && hotel.images.length > 1 && (
            <>
              <IconButton
                className="carousel-btn"
                onClick={handlePrevImage}
                sx={{
                  position: "absolute",
                  left: 8,
                  top: "50%",
                  transform: "translateY(-50%)",
                  bgcolor: "rgba(0, 0, 0, 0.4)",
                  color: "#fff",
                  width: 32,
                  height: 32,
                  opacity: 0,
                  visibility: "hidden",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": { 
                    bgcolor: "#000",
                    transform: "translateY(-50%) scale(1.1)" 
                  },
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                  zIndex: 2
                }}
              >
                <ChevronLeftIcon sx={{ fontSize: 20 }} />
              </IconButton>
              
              <IconButton
                className="carousel-btn"
                onClick={handleNextImage}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: "50%",
                  transform: "translateY(-50%)",
                  bgcolor: "rgba(0, 0, 0, 0.4)",
                  color: "#fff",
                  width: 32,
                  height: 32,
                  opacity: 0,
                  visibility: "hidden",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": { 
                    bgcolor: "#000",
                    transform: "translateY(-50%) scale(1.1)" 
                  },
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                  zIndex: 2
                }}
              >
                <ChevronRightIcon sx={{ fontSize: 20 }} />
              </IconButton>

              {/* Image Counter (Now Bottom Right) */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 10,
                  right: 10,
                  bgcolor: "rgba(0, 0, 0, 0.7)",
                  color: "white",
                  px: 1,
                  py: 0.3,
                  borderRadius: 1,
                  fontSize: "0.7rem",
                  fontWeight: 600
                }}
              >
                {currentImageIndex + 1}/{hotel.images.length}
              </Box>
            </>
          )}
          
          {/* Badge (Now Top Right) */}
          {hotel.badge && (
            <Chip
              label={hotel.badge}
              size="small"
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                bgcolor: hotel.badge === "Hot Deal" ? "#10B981" : "#0058E6",
                color: "white",
                fontWeight: 600,
                fontSize: "0.7rem",
                borderRadius: 1,
                height: 20,
                "& .MuiChip-label": { px: 1 }
              }}
            />
          )}

          {/* Rating (Now Top Left) */}
          <Chip
            label={
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
                <StarIcon sx={{ fontSize: 12, color: "#F97316" }} />
                <Typography sx={{ color: "white", fontSize: "0.7rem", fontWeight: 700 }}>
                  {hotel.rating.toFixed(1)}
                </Typography>
              </Box>
            }
            size="small"
            sx={{
              position: "absolute",
              top: 10,
              left: 10,
              bgcolor: "rgba(0, 0, 0, 0.8)",
              borderRadius: 1,
              height: 20,
              "& .MuiChip-label": { px: 1 }
            }}
          />
        </Box>

        {/* Hotel Details */}
        <Box sx={{ 
          flex: 1, 
          display: "flex", 
          flexDirection: "column", 
          justifyContent: "space-between",
          p: 1.5
        }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "1.1rem", mb: 0.5, color: "#111827" }}>
              {hotel.name}
            </Typography>
            
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}>
              <FmdGoodOutlinedIcon sx={{ fontSize: 16, color: "#4B5563" }} />
              <Typography variant="caption" sx={{ color: "#4B5563", fontSize: "0.75rem" }}>
                {hotel.location}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center"}}>
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  sx={{
                    fontSize: 14,
                    color: i < hotel.starRating ? "#F97316" : "#D1D5DB"
                  }}
                />
              ))}
              <Typography variant="caption" sx={{ color: "#6B7280", ml: 0.5, fontSize: "0.7rem" }}>
                ({hotel.reviews} reviews)
              </Typography>
            </Box>

            {/* Amenities */}
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1 }}>
              {displayAmenities.map((amenity, index) => (
                <Chip
                  key={index}
                  icon={getAmenityIcon(amenity)}
                  label={amenity}
                  size="small"
                  sx={{
                    bgcolor: "#EEF6FF",
                    color: "#1D4ED8",
                    fontSize: "0.7rem",
                    height: 22,
                    "& .MuiChip-icon": { color: "#1D4ED8" }
                  }}
                />
              ))}
              {hotel.amenities?.length > 3 && (
                <Chip
                  label={`+${hotel.amenities.length - 3} more`}
                  size="small"
                  sx={{
                    bgcolor: "#F3F4F6",
                    color: "#4B5563",
                    fontSize: "0.7rem",
                    height: 22,
                    fontWeight: 600
                  }}
                />
              )}
            </Box>
          </Box>
          
          <Divider sx={{ mt: 4, borderColor: "#F3F4F6" }} />

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 0 }}>
            <Box>
              <Typography variant="caption" sx={{ color: "#6B7280", fontSize: "0.8rem" }}>
                From
              </Typography>
              <Typography sx={{ fontSize: "1.5rem", fontWeight: 700, color: "#111827" }}>
                USD {hotel.price.toFixed(2)}
              </Typography>
              <Typography variant="caption" sx={{ color: "#6B7280", fontSize: "0.8rem" }}>
                per Night • USD {(hotel.price * 1.15).toFixed(2)} total
              </Typography>
            </Box>
            
            <Button
              component={Link}
              href={`/hotel-results/${hotel.id}`}
              variant="contained"
              endIcon={<ArrowForwardOutlinedIcon sx={{ fontSize: 18 }} />}
              sx={{
                bgcolor: "#0058E6",
                color: "white",
                textTransform: "none",
                fontSize: "0.875rem",
                fontWeight: 500,
                px: 1.5,
                borderRadius: 1.5,
                "&:hover": { bgcolor: "#0058E6" }
              }}
            >
              More Details
            </Button>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}
