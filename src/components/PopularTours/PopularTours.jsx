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
} from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import StarIcon from '@mui/icons-material/Star';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';

const tours = [
  {
    id: 1,
    name: 'Paris City Explorer - 5 Days',
    city: 'Paris',
    rating: '5.0',
    price: 'Contact for price',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Dubai Desert Safari Adventure',
    city: 'Dubai',
    rating: '4.8',
    price: 'Contact for price',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Tokyo Cultural Experience',
    city: 'Tokyo',
    rating: '4.9',
    price: 'Contact for price',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop',
  },
  {
    id: 4,
    name: 'Bali Island Paradise Tour',
    city: 'Denpasar',
    rating: '4.7',
    price: 'Contact for price',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop',
  },
  {
    id: 5,
    name: 'New York City Highlights',
    city: 'New York',
    rating: '4.8',
    price: 'Contact for price',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&auto=format&fit=crop',
  },
  {
    id: 6,
    name: 'Eiffel Tower & Seine Cruise',
    city: 'Paris',
    rating: '5.0',
    price: 'Contact for price',
    image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800&auto=format&fit=crop',
  },
  {
    id: 7,
    name: 'Dubai Marina Yacht Experience',
    city: 'Dubai',
    rating: '4.9',
    price: 'Contact for price',
    image: 'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=800&auto=format&fit=crop',
  },
  {
    id: 8,
    name: 'Mount Fuji Day Trip',
    city: 'Tokyo',
    rating: '4.8',
    price: 'Contact for price',
    image: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=800&auto=format&fit=crop',
  },
];

const cities = ['Paris', 'Dubai', 'Tokyo', 'Denpasar', 'New York'];

export default function PopularTours() {
  const [selectedCity, setSelectedCity] = React.useState('Paris');

  // Filter tours based on selected city
  const filteredTours = tours.filter(tour => tour.city === selectedCity);

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            fontSize: { xs: '24px', md: '24px', lg: '24px' },
            color: '#111827',
            mb: 2,
            fontFamily: 'Inter, sans-serif'
          }}
        >
          Popular Tours
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <VerifiedUserOutlinedIcon sx={{ color: '#3B82F6', fontSize: 20 }} />
            <Typography sx={{ fontSize: '14px', color: '#374151' }}>We price match</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CheckCircleOutlineOutlinedIcon sx={{ color: '#14B8A6', fontSize: 20 }} />
            <Typography sx={{ fontSize: '14px', color: '#374151' }}>Tour Booking Guarantee</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <WorkspacePremiumOutlinedIcon sx={{ color: '#F97316', fontSize: 20 }} />
            <Typography sx={{ fontSize: '14px', color: '#374151' }}>Tour Quality Guarantee</Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={1} sx={{ mb: 6, overflowX: 'auto', pb: 1, '&::-webkit-scrollbar': { display: 'none' } }}>
          {cities.map((city) => (
            <Chip
              key={city}
              label={city}
              onClick={() => setSelectedCity(city)}
              sx={{
                px: 1,
                py: 2.5,
                fontSize: '14px',
                fontWeight: 500,
                bgcolor: selectedCity === city ? '#111827' : '#fff',
                color: selectedCity === city ? '#fff' : '#4B5563',
                border: '1px solid #E2E8F0',  
                '&:hover': {
                  bgcolor: selectedCity === city ? '#1e293b' : '#F8FAFC',
                },
                borderRadius: '20px',
                transition: 'all 0.2s',
              }}
            />
          ))}
        </Stack>

        <Grid container spacing={3}>
          {filteredTours.map((tour) => (
            <Grid item xs={12} sm={6} md={3} key={tour.id} width={{xs:390,sm:345,md:300, lg:270}}>
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
                    '& .tour-name': {
                      color: '#2563EB',
                    },
                  },
                }}
              >
                <Box sx={{ position: 'relative', pt: '75%', overflow: 'hidden' }}>
                  <CardMedia
                    component="img"
                    image={tour.image}
                    alt={tour.name}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '16px 16px 0 0',
                      transition: 'transform 0.5s ease',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 12,
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
                    {tour.city}
                  </Box>
                </Box>
                <CardContent sx={{ p: 2.5, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography
                    className="tour-name"
                    sx={{
                      fontSize: '16px',
                      fontWeight: 700,
                      color: '#1F2937',
                      mb: 2,
                      fontFamily: 'Inter, sans-serif',
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {tour.name}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 'auto' }}>
                    <Typography sx={{ fontSize: '14px', color: '#6B7280', fontWeight: 500 }}>
                      {tour.price}
                    </Typography>
                    <Box
                      sx={{
                        bgcolor: '#1F2937',
                        color: '#fff',
                        px: 1,
                        py: 0.3,
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.3,
                      }}
                    >
                      <StarIcon sx={{ fontSize: 12, color: '#FBBF24' }} />
                      {tour.rating}
                    </Box>
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
