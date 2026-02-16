'use client';

import * as React from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Stack,
  Rating,
} from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import StarIcon from '@mui/icons-material/Star';

const cars = [
  {
    id: 1,
    name: 'Porsche 911 Carrera',
    city: 'Dubai',
    location: 'Dubai Airport',
    rating: 5,
    seats: '5',
    bags: '3',
    transmission: 'Auto',
    price: '250',
    discount: '20% OFF',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'BMW X5 SUV',
    city: 'London',
    location: 'London Heathrow',
    rating: 4,
    seats: '7',
    bags: '4',
    transmission: 'Auto',
    price: '180',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Jeep Wrangler Rubicon',
    city: 'Dubai',
    location: 'Downtown Dubai',
    rating: 5,
    seats: '5',
    bags: '5',
    transmission: 'Auto',
    price: '300',
    badge: 'Premium',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop',
  },
];

export default function FeaturedCars() {
  return (
    <Container maxWidth="lg" >
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            fontSize: { xs: '24px', md: '24px', lg: '24px' },
            color: '#111827',
            mb: 1,
            fontFamily: 'Inter, sans-serif'
          }}
        >
          Featured Car Rentals
        </Typography>
        <Typography 
          sx={{ 
            fontSize: '14px', 
            color: '#6B7280', 
            mb: 4,
            fontFamily: 'Inter, sans-serif'
          }}
        >
          Best car rental deals picked just for you
        </Typography>

        <Grid container spacing={3}>
          {cars.map((car) => (
            <Grid item xs={12} sm={6} md={4} key={car.id} width={{xs:390,sm:345,md:300, lg:366}}>
              <Card
                sx={{
                  borderRadius: '16px',
                  boxShadow: 'none',
                  border: '1px solid #E2E8F0',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  '&:hover': {
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)',
                    '& .MuiCardMedia-root': {
                      transform: 'scale(1.1)',
                    },
                    '& .car-name': {
                      color: '#2563EB',
                    },
                  },
                }}
              >
                <Box sx={{ position: 'relative', pt: '65%', overflow: 'hidden' }}>
                  <CardMedia
                    component="img"
                    image={car.image}
                    alt={car.name}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                    }}
                  />
                  {car.discount && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        bgcolor: '#EF4444',
                        color: '#fff',
                        px: 1.5,
                        py: 0.3,
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 600,
                      }}
                    >
                      {car.discount}
                    </Box>
                  )}
                  {car.badge && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        bgcolor: '#10B981',
                        color: '#fff',
                        px: 1.5,
                        py: 0.3,
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 600,
                      }}
                    >
                      {car.badge}
                    </Box>
                  )}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: (car.discount || car.badge) ? 43 : 12,
                      left: 12,
                      bgcolor: 'rgba(0, 0, 0, 0.5)',
                      backdropFilter: 'blur(4px)',
                      color: '#fff',
                      px: 1.2,
                      py: 0.4,
                      borderRadius: '6px',
                      fontSize: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                    }}
                  >
                    <LocationOnOutlinedIcon sx={{ fontSize: 14 }} />
                    <Typography sx={{ fontSize: '11px', fontWeight: 600 }}>{car.location}</Typography>
                  </Box>
                </Box>
                <CardContent sx={{  flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography
                    className="car-name"
                    sx={{
                      fontSize: '16px',
                      fontWeight: 700,
                      color: '#1F2937',
                      mb: 1,
                      fontFamily: 'Inter, sans-serif',
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {car.name}
                  </Typography>

                  <Box >
                    <Rating 
                      value={car.rating} 
                      readOnly 
                      size="small" 
                      sx={{ 
                        color: '#f97519',
                        fontSize: '16px'
                      }} 
                    />
                  </Box>

                  <Stack direction="row" spacing={1} >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, bgcolor: '#F0F9FF', px: 1, py: 0.2, borderRadius: '4px' }}>
                      <PersonOutlineIcon sx={{ fontSize: 14, color: '#3377e5' }} />
                      <Typography sx={{ fontSize: '10px', color: '#3377e5', fontWeight: 600 }}>{car.seats} Seats</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, bgcolor: '#F0F9FF', px: 1, py: 0.2, borderRadius: '4px' }}>
                      <WorkOutlineIcon sx={{ fontSize: 14, color: '#3377e5' }} />
                      <Typography sx={{ fontSize: '10px', color: '#3377e5', fontWeight: 600 }}>{car.bags} Bags</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, bgcolor: '#F0F9FF', px: 1, py: 0.2, borderRadius: '4px' }}>
                      <SettingsOutlinedIcon sx={{ fontSize: 14, color: '#3377e5' }} />
                      <Typography sx={{ fontSize: '10px', color: '#3377e5', fontWeight: 600 }}>{car.transmission}</Typography>
                    </Box>
                  </Stack>
                  
                  <Box sx={{ mt: 1 }}>
                    <Typography sx={{ fontSize: '11px', color: '#50555fff' }}>
                      Per Day
                    </Typography>
                    <Typography sx={{ fontSize: '16px', fontWeight: 600, color: '#111827' }}>
                      USD {car.price}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
