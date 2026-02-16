'use client';

import * as React from 'react';
import { Box, Typography, Paper, Chip, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import LocalGasStationOutlinedIcon from '@mui/icons-material/LocalGasStationOutlined';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CloseIcon from '@mui/icons-material/Close';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AirlineSeatReclineExtraOutlinedIcon from '@mui/icons-material/AirlineSeatReclineExtraOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import OpacityOutlinedIcon from '@mui/icons-material/OpacityOutlined';

export default function CarCard({ car }) {
  const router = useRouter();

  const handleBookClick = () => {
    localStorage.setItem('selectedCarForBooking', JSON.stringify(car));
    router.push('/car-booking');
  };

  return (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        gap: 3,
        p: 2,
        mb: 2,
        borderRadius: 3,
        border: '1px solid #E5E7EB',
        ml: { xs: 0, md: 2 },
        maxWidth: '98.4%',
        width: '100%',
        transition: 'all 0.2s',
        '&:hover': {
          borderColor: '#3B82F6',
          boxShadow: '0 4px 12px rgba(59, 130, 246, 0.1)',
        },
      }}
    >
      {/* Car Image */}
      <Box
        sx={{
          position: 'relative',
          width: 200,
          height: 120,
          flexShrink: 0,
          borderRadius: 2,
          overflow: 'hidden',
          bgcolor: '#F9FAFB',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src={car.image || '/Cars/default-car.png'}
          alt={car.model}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </Box>

      {/* Car Details */}
      <Box sx={{ flex: 1 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1 }}>
          <Box>
            <Typography sx={{ fontSize: '20px', fontWeight: 700, color: '#023669'}}>
              {car.model}
            </Typography>
            <Typography sx={{ fontSize: '12px', color: '#023669', mb: 0}}>
              {car.variant}
            </Typography>
          </Box>
        </Box>

        {/* Specs Icons */}
        <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box
              component="img"
              src="/cars/car icons.svg"
              alt="seats"
              sx={{ width: 16, height: 16 }}
            />
            <Typography sx={{ fontSize: '14px', color: '#000000' }}>{car.seats}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <AirlineSeatReclineExtraOutlinedIcon sx={{ fontSize: 18, color: '#f6941c' }} />
            <Typography sx={{ fontSize: '14px', color: '#000000' }}>{car.doors}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <SettingsOutlinedIcon sx={{ fontSize: 18, color: '#f6941c' }} />
            <Typography sx={{ fontSize: '14px', color: '#000000' }}>{car.transmission}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <OpacityOutlinedIcon sx={{ fontSize: 18, color: '#f6941c' }} />
            <Typography sx={{ fontSize: '14px', color: '#000000' }}>{car.fuelType}</Typography>
          </Box>
        </Box>

        {/* Features */}
        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', maxWidth: '300px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <CloseIcon sx={{ fontSize: 14, color: '#EF4444' }} />
            <Typography sx={{ fontSize: '11px', color: '#4B5563' }}>Fuel</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <CloseIcon sx={{ fontSize: 14, color: '#EF4444' }} />
            <Typography sx={{ fontSize: '11px', color: '#4B5563' }}>chauffeur food</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <CloseIcon sx={{ fontSize: 14, color: '#EF4444' }} />
            <Typography sx={{ fontSize: '11px', color: '#4B5563' }}>toll tax</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <CloseIcon sx={{ fontSize: 14, color: '#EF4444' }} />
            <Typography sx={{ fontSize: '11px', color: '#4B5563' }}>overtime charges</Typography>
          </Box>
        </Box>
      </Box>

      {/* Price & Book Button */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1}}>
        <Chip
          label={car.badge}
          size="small"
          sx={{
            bgcolor: '#497DCA',
            color: 'white',
            fontWeight: 600,
            fontSize: '0.75rem',
            height: 24,
            minWidth: 50,
            width: '60%',
            py: 1
          }}
        />
        <Box sx={{ textAlign: 'right' }}>
          <Typography sx={{ fontSize: '20px', fontWeight: 600, color: '#023669' }}>
            RS {car.price.toLocaleString()}
          </Typography>
        </Box>
        <Button
          onClick={handleBookClick}
          variant="contained"
          sx={{
            bgcolor: '#023669',
            color: 'white',
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '14px',
            py: 1,
            borderRadius: 1.5,
            minWidth: 140,
            '&:hover': { bgcolor: '#082044' },
          }}
        >
          BOOKKARU
        </Button>
      </Box>
    </Paper>
  );
}
