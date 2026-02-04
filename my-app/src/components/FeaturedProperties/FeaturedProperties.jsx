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
  IconButton,
} from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import StarIcon from '@mui/icons-material/Star';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

const properties = [
  {
    id: 1,
    name: 'Azure Bay Resort & Spa',
    location: 'Tokyo, FL',
    city: 'Tokyo',
    address: '2501 Collins Ave, tokyo',
    rating: '4.9',
    price: '349.00',
    discount: '10% OFF',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
    amenities: ['Oceanfront', 'Spa', '3 Pools', 'Fine Dining']
  },
  {
    id: 2,
    name: 'Rocky Peaks Alpine Lodge',
    location: 'Aspen, CO',
    city: 'Dubai',
    address: '311 Prospector Rd, Aspen',
    rating: '4.6',
    price: '275.00',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    amenities: ['Ski-in/Ski-out', 'Fireplace', 'Hot Tub', 'Mountain Views']
  },
  {
    id: 3,
    name: 'Golden Dunes Palace',
    location: 'Pc Hotel ',
    city: 'Lahore',
    address: 'Jumeirah Beach , Dubai',
    rating: '4.8',
     discount: '25% OFF',
    price: '420.00',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    amenities: ['Private Beach', 'Butler Service', 'Helipad', 'Infinity Pool']
  },
  {
    id: 4,
    name: 'Sakura Heights Hotel',
    location: 'Maldives',
    city: 'Maldives',
    address: '2-1-2 Nihonbashi, Tokyo',
    rating: '4.7',
    price: '320.00',
    image: 'https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?auto=format&fit=crop&w=800&q=80',
    amenities: ['City Views', 'Traditional Tea Room', 'Rooftop Bar', 'Concierge']
  },
  {
    id: 5,
    name: 'Coral Reef Overwater',
    location: 'Bora Bora, French Polynesia',
    city: 'Bora Bora',
    address: 'Motu Piti Aau, Bora Bora',
    rating: '5.0',
    price: '890.00',
    discount: '25% OFF',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    amenities: ['Glass Floor', 'Private Deck', 'Snorkeling', 'Sunset Views']
  },

  {
    id: 7,
    name: 'Lakeside Mountain Chalet',
    location: 'Barcelona, Switzerland',
    city: 'Barcelona',
    address: 'Höheweg 115, Switzerland',
    rating: '4.9',
    price: '520.00',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=60',
    amenities: ['Lake Access', 'Sauna', 'Hiking Trails', 'Alpine Views']
  },

  {
    id: 9,
    name: 'Rainforest Eco Retreat',
    location: 'Costa Rica',
    city: 'Santorini',
    address: 'Santa Elena, Puntarenas',
    rating: '4.8',
    price: '195.00',
    image: 'https://images.unsplash.com/photo-1516496636080-14fb876e029d?auto=format&fit=crop&w=800&q=80',
    amenities: ['Canopy Tours', 'Wildlife Viewing', 'Yoga Deck', 'Organic Garden']
  },
  {
    id: 10,
    name: 'Urban Loft Downtown',
    location: 'Costa Rice, NY',
    city: 'Barcelona',
    address: '125 Greenwich St, New York',
    rating: '4.6',
    price: '310.00',
    image: 'https://images.unsplash.com/photo-1499916078039-922301b0eb9b?auto=format&fit=crop&w=800&q=80',
    amenities: ['Skyline Views', 'Gym Access', 'Smart Home', 'Concierge']
  },
   {
    id: 11,
    name: 'Azure Bay Resort & Spa',
    location: 'Tokyo, FL',
    city: 'New York',
    address: '2501 Collins Ave, tokyo',
    rating: '4.9',
    price: '349.00',
    discount: '10% OFF',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
    amenities: ['Oceanfront', 'Spa', '3 Pools', 'Fine Dining']
  },
];

const cities = ['Barcelona', 'Lahore', 'Dubai', 'New York', 'Santorini', 'Tokyo', 'Maldives'];

export default function FeaturedProperties() {
  const [selectedCity, setSelectedCity] = React.useState('Barcelona');

  // Filter properties based on selected city
  const filteredProperties = properties.filter(property => property.city === selectedCity);

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
          Featured Properties
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <VerifiedUserOutlinedIcon sx={{ color: '#3B82F6', fontSize: 20 }} />
            <Typography sx={{ fontSize: '14px', color: '#374151' }}>We price match</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CheckCircleOutlineOutlinedIcon sx={{ color: '#14B8A6', fontSize: 20 }} />
            <Typography sx={{ fontSize: '14px', color: '#374151' }}>Hotel Booking Guarantee</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <WorkspacePremiumOutlinedIcon sx={{ color: '#F97316', fontSize: 20 }} />
            <Typography sx={{ fontSize: '14px', color: '#374151' }}>Hotel Stay Guarantee</Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={1} sx={{ mb: 6, overflowX: 'auto', pb: 1, position: 'relative', zIndex: 1, '&::-webkit-scrollbar': { display: 'none' } }}>
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
          {filteredProperties.map((property) => (
            <Grid item xs={12} sm={6} md={3} key={property.id} width={{xs:390,sm:345,md:300, lg:270}}>
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
                    '& .property-name': {
                      color: '#2563EB',
                    },
                  },
                }}
              >
                <Box sx={{ position: 'relative', pt: '75%', overflow: 'hidden' }}>
                  <CardMedia
                    component="img"
                    image={property.image}
                    alt={property.name}
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
                  {property.discount && (
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
                      {property.discount}
                    </Box>
                  )}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: property.discount ? 43 : 12,
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
                    {property.city}
                  </Box>
                </Box>
                <CardContent sx={{ p: 2.5, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography
                    className="property-name"
                    sx={{
                      fontSize: '16px',
                      fontWeight: 700,
                      color: '#1F2937',
                      mb: 0.5,
                      fontFamily: 'Inter, sans-serif',
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {property.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'start', gap: 0.5, mb: 1.3 }}>
                    <HomeOutlinedIcon sx={{ fontSize: 16, color: '#94A3B8', mt: 0.2 }} />
                    <Typography sx={{ fontSize: '13px', color: '#94A3B8' }}>{property.address}</Typography>
                  </Box>
                  
                  <Box sx={{ mt: 'auto', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography sx={{ fontSize: '12px', color: '#64748B', mb: 0.5 }}>From</Typography>
                      <Typography sx={{ fontSize: '17px', fontWeight: 700, color: '#1F2937' }}>
                        USD {property.price}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        bgcolor: '#1E293B',
                        color: '#fff',
                        px: 1,
                        py: 0.3,
                        borderRadius: '4px',
                      }}
                    >
                      <StarIcon sx={{ fontSize: 14, color: '#F59E0B' }} />
                      <Typography sx={{ fontSize: '12px', fontWeight: 600 }}>{property.rating}</Typography>
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
