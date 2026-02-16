'use client';

import * as React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MapIcon from '@mui/icons-material/Map';

const HotelLocationPolicies = ({ hotel }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 3 }}>
      {/* Location on Map Card */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 3,
          border: '1px solid #E5E7EB',
          bgcolor: '#FFFFFF'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.25rem', color: '#111827', mb: 1 }}>
              Location on Map
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <LocationOnIcon sx={{ color: '#3B82F6', fontSize: 22, mt: 0.5 }} />
              <Box>
                <Typography sx={{ fontWeight: 600, color: '#1F2937', fontSize: '1rem' }}>
                  {hotel?.name || 'Hotel Name'}
                </Typography>
                <Typography sx={{ color: '#4B5563', fontSize: '0.9rem' }}>
                  {hotel?.location || 'Main Street'}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Button
            variant="contained"
            startIcon={<MapIcon />}
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel?.name + ' ' + hotel?.location)}`}
            target="_blank"
            sx={{
              bgcolor: '#2563EB',
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: 2,
              '&:hover': { bgcolor: '#1D4ED8' }
            }}
          >
            Open in Google Maps
          </Button>
        </Box>

        {/* Map Placeholder */}
        <Box
          sx={{
            width: '100%',
            height: 300,
            borderRadius: 2,
            overflow: 'hidden',
            bgcolor: '#E5E7EB',
            position: 'relative'
          }}
        >
            {/* Visual representation of a map - replace with real map or image later */}
           <img 
             src="/App/map-placeholder.png" 
             alt="Map location" 
             style={{ width: '100%', height: '100%', objectFit: 'cover' }}
             onError={(e) => {
               e.target.style.display = 'none';
               e.target.parentElement.style.backgroundColor = '#f0f0f0';
               e.target.parentElement.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#6b7280;font-weight:500">Map Preview Unavailable</div>';
             }}
           />
           {/* Pin Overlay */}
           <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -100%)' }}>
               <LocationOnIcon sx={{ fontSize: 48, color: '#DC2626', filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.3))' }} />
           </Box>
        </Box>
      </Paper>

      {/* Cancellation Policy Card */}
      <Paper
         elevation={0}
         sx={{
           p: 3,
           borderRadius: 3,
           border: '1px solid #E5E7EB',
           bgcolor: '#FFFFFF'
         }}
      >
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.13rem', color: '#111827', mb: 1.5 }}>
            Cancellation Policy
          </Typography>
          <Typography sx={{ color: '#4B5563', fontSize: '0.9rem', lineHeight: 1.6 }}>
            Cancellation policies vary by rate and are shown during booking. Please review the specific cancellation terms for your selected room rate.
          </Typography>
      </Paper>
      
      {/* Privacy Policy Card */}
      <Paper
         elevation={0}
         sx={{
           p: 3,
           borderRadius: 3,
           border: '1px solid #E5E7EB',
           bgcolor: '#FFFFFF'
         }}
      >
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.13rem', color: '#111827', mb: 1.5 }}>
            Privacy Policy
          </Typography>
          <Typography sx={{ color: '#4B5563', fontSize: '0.9rem', lineHeight: 1.6 }}>
            Your personal information is handled in accordance with our privacy policy and GDPR regulations. We do not share your data with third parties without consent.
          </Typography>
      </Paper>
    </Box>
  );
};

export default HotelLocationPolicies;
