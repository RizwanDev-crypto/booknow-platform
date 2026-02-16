'use client';

import * as React from 'react';
import { Box, Typography, Paper, Button, Chip, Divider } from '@mui/material';
import Link from 'next/link';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import GroupIcon from '@mui/icons-material/Group';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function TourCard({ tour }) {
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
        {/* Tour Image */}
        <Box sx={{ 
          width: { xs: "100%", md: "280px" }, 
          height: { xs: "220px", md: "auto" },
          alignSelf: "stretch",
          flexShrink: 0,
          position: "relative"
        }}>
          <Box
            component="img"
            src={tour.image}
            alt={tour.name}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 0
            }}
          />
          {tour.badge && (
            <Chip
              label={tour.badge}
              size="small"
              sx={{
                position: "absolute",
                top: 10,
                left: 10,
                bgcolor: tour.badge === "Hot Deal" ? "#10B981" : "#0058E6",
                color: "white",
                fontWeight: 600,
                fontSize: "0.7rem",
                borderRadius: 1,
                height: 20,
                "& .MuiChip-label": { px: 1 }
              }}
            />
          )}
          <Chip
            label="Tour"
            size="small"
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              bgcolor: "#16A34A",
              color: "white",
              fontWeight: 600,
              fontSize: "0.7rem",
              borderRadius: 1,
              height: 20,
              "& .MuiChip-label": { px: 1 }
            }}
          />
          <Chip
            label={
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
                <StarIcon sx={{ fontSize: 12, color: "#EAB308" }} />
                <Typography sx={{ color: "white", fontSize: "0.7rem", fontWeight: 700 }}>
                  {tour.rating.toFixed(1)}
                </Typography>
              </Box>
            }
            size="small"
            sx={{
              position: "absolute",
              bottom: 10,
              left: 10,
              bgcolor: "rgba(0, 0, 0, 0.8)",
              borderRadius: 1,
              height: 20,
              "& .MuiChip-label": { px: 1 }
            }}
          />
        </Box>

        {/* Tour Details */}
        <Box sx={{ 
          flex: 1, 
          display: "flex", 
          flexDirection: "column", 
          justifyContent: "space-between",
          p: 2
        }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "1.1rem", mb: 0.5, color: "#111827" }}>
              {tour.name}
            </Typography>
            
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}>
              <LocationOnIcon sx={{ fontSize: 14, color: "#6B7280" }} />
              <Typography variant="caption" sx={{ color: "#6B7280", fontSize: "0.75rem" }}>
                {tour.location}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  sx={{
                    fontSize: 14,
                    color: i < tour.rating ? "#EAB308" : "#E5E7EB"
                  }}
                />
              ))}
              <Typography variant="caption" sx={{ color: "#6B7280", ml: 0.5, fontSize: "0.7rem" }}>
                ({tour.reviews})
              </Typography>
            </Box>
          </Box>
          
          <Divider sx={{ mt: 7, mb: 1, borderColor: "#F3F4F6" }} />

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 0 }}>
            <Box>
              <Typography variant="caption" sx={{ color: "#6B7280", fontSize: "0.8rem" }}>
                From
              </Typography>
              <Typography sx={{ fontSize: "1.5rem", fontWeight: 700, color: "#111827" }}>
                USD {tour.price.toFixed(2)}
              </Typography>
              <Typography variant="caption" sx={{ color: "#6B7280", fontSize: "0.8rem" }}>
                per Person • USD {(tour.price * 1.02).toFixed(2)}
              </Typography>
            </Box>
            
            <Button
              component={Link}
              href={`/tour-results/${tour.id}`}
              variant="contained"
              startIcon={<InfoOutlinedIcon />}
              sx={{
                bgcolor: "#3B82F6",
                color: "white",
                textTransform: "none",
                fontSize: "0.875rem",
                fontWeight: 500,
                px: 3,
                borderRadius: 1.5,
                "&:hover": { bgcolor: "#0047b3" }
              }}
            >
              More Details
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Card Footer */}
      <Divider sx={{ borderColor: "#F3F4F6" }} />
      <Box sx={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        px: 2, 
        py: 1, 
        bgcolor: "#F9FAFB" 
      }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <GroupIcon sx={{ fontSize: 16, color: "#4B5563" }} />
          <Typography variant="caption" sx={{ color: "#4B5563", fontSize: "0.75rem", fontWeight: 500 }}>
            max {tour.maxTravelers} travellers
          </Typography>
        </Box>
        <Typography variant="caption" sx={{ color: "#4B5563", fontSize: "0.75rem" }}>
          Powered by Viator . USD
        </Typography>
      </Box>
    </Paper>
  );
}
