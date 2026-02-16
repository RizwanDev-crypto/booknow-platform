'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import {
  Box,
  Container,
  Typography,
  Breadcrumbs,
  Link as MuiLink,
  Grid,
  Chip,
  Divider,
  Button,
  Slider,
  Select,
  MenuItem,
  Paper
} from '@mui/material';
import Link from 'next/link';
import StarIcon from '@mui/icons-material/Star';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { hotels } from '../hotelsData';
import ModifyHotelSearch from '../ModifyHotelSearch';
import HotelDetailsGallery from '../HotelDetailsGallery';
import RoomSelection from '../RoomSelection';
import HotelLocationPolicies from '../HotelLocationPolicies';
import Checkout from '../Checkout';

export default function HotelDetailsPage() {
  const { id } = useParams();
  const hotel = hotels.find(h => h.id === parseInt(id)) || hotels[0];
  const [priceRange, setPriceRange] = React.useState([100, 200]);
  const [step, setStep] = React.useState('details'); // 'details' or 'checkout'
  const [selectedRate, setSelectedRate] = React.useState(null);

  const handleContinue = (rate) => {
    setSelectedRate(rate);
    setStep('checkout');
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setStep('details');
    window.scrollTo(0, 0);
  };

  if (step === 'checkout') {
    return <Checkout hotel={hotel} onBack={handleBack} selectedRate={selectedRate} />;
  }

  return (
    <Box sx={{ bgcolor: '#F9FAFB', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 2, fontSize: '0.8rem' }}>
          <MuiLink component={Link} href="/" underline="hover" sx={{ color: '#9333EA' }}>
            Stays
          </MuiLink>
          <MuiLink component={Link} href="/hotel-results" underline="hover" sx={{ color: '#9333EA' }}>
            Details
          </MuiLink>
          <Typography color="text.primary" sx={{ fontSize: '0.8rem', fontWeight: 500, color: '#374151' }}>
            {hotel.name}
          </Typography>
        </Breadcrumbs>

        {/* Modify Search Section */}
        <ModifyHotelSearch hotelName={hotel.name} />

        {/* Hotel Details Content */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, md: 4 },
            borderRadius: 3,
            border: '1px solid #E5E7EB',
            overflow: 'hidden'
          }}
        >
          {/* Header */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  sx={{
                    fontSize: 18,
                    color: i < hotel.starRating ? '#F97316' : '#D1D5DB'
                  }}
                />
              ))}
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: '#1F2937', fontSize: '24px' }}>
              {hotel.name}
            </Typography>
            <Typography sx={{ color: '#6B7280', fontSize: '13px' }}>
              {hotel.location}
            </Typography>
          </Box>

          {/* Gallery */}
          <HotelDetailsGallery images={hotel.images} hotelName={hotel.name} />

          {/* About and Amenities */}
          <Grid container spacing={6}>
            <Grid item xs={12} md={8} width={720}>
              <Typography sx={{ fontWeight: 700, mb: 2, color: '#000000', fontSize: '1.1rem' }}>
                About this stay
              </Typography>
              <Typography sx={{ color: '#4B5563',  textAlign: 'justify', fontSize: '0.9rem' }} width={{xs:400, sm:460, md:'75%' , lg:'100%'}}>
                {hotel.description}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography sx={{ fontWeight: 700, mb: 2, color: '#000000', fontSize: '1.1rem' }} width={{xs:400, sm:460, md:'100%' , lg:'100%'}}>
                Key amenities
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }} width={{xs:400, sm:460, md:'100%' , lg:'100%'}}>
                {hotel.keyAmenities?.map((amenity, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <CheckCircleIcon sx={{ color: '#4B5563', fontSize: 18 }} />
                    <Typography sx={{ color: '#4B5563', fontSize: '0.85rem', fontWeight: 500 }}>
                      {amenity}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>

          {/* Filter Rooms Section */}
          <Box
            sx={{
              mt: 6,
              p: 2,
              borderRadius: 2.5,
              border: '1px solid #E5E7EB',
              bgcolor: '#FFFFFF',
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 3
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{ p: 1, bgcolor: '#F5F3FF', borderRadius: 1.5 }}>
                <FilterListOutlinedIcon sx={{ color: '#8B5CF6', fontSize: 18 }} />
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 700, fontSize: '0.8rem', color: '#1F2937' }}>
                  Filter Rooms
                </Typography>
                <Typography sx={{ color: '#6B7280', fontSize: '0.75rem' }}>
                  1 rooms available
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', flex: 1, gap: 3, alignItems: 'center', width: '100%' }}>
              <Select
                defaultValue="All Types"
                size="small"
                IconComponent={ExpandMoreOutlinedIcon}
                sx={{
                  flex: 1,
                  height: 40,
                  borderRadius: 2,
                  fontSize: '0.8rem',
                  '& .MuiSelect-icon': { fontSize: 20 },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#1A53ff' }
                }}
              >
                <MenuItem value="All Types">All Types</MenuItem>
                <MenuItem value="Standard">Standard</MenuItem>
                <MenuItem value="Deluxe">Deluxe</MenuItem>
              </Select>

              <Box sx={{ 
                display: 'flex', 
                flex: 1, 
                alignItems: 'center', 
                gap: 2, 
                border: '1px solid #E5E7EB', 
                borderRadius: 2, 
                height: 40, 
                px: 2,
                bgcolor: '#F9FAFB',
                cursor: 'pointer',
                '&:hover': { borderColor: '#1A53ff' }
              }}>
                <Typography sx={{ fontSize: '0.75rem', color: '#6B7280', whiteSpace: 'nowrap' }}>$100</Typography>
                <Slider
                  value={priceRange}
                  onChange={(e, val) => setPriceRange(val)}
                  min={100}
                  max={200}
                  size="small"
                  sx={{
                    color: '#8B5CF6',
                    height: 4,
                    '& .MuiSlider-thumb': {
                      width: 14,
                      height: 14,
                      bgcolor: '#FFFFFF',
                      border: '2px solid #8B5CF6'
                    }
                  }}
                />
                <Typography sx={{ fontSize: '0.75rem', color: '#6B7280', whiteSpace: 'nowrap' }}>$200</Typography>
              </Box>

              <Select
                defaultValue="Default"
                size="small"
                IconComponent={ExpandMoreOutlinedIcon}
                sx={{
                  flex: 1,
                  height: 40,
                  borderRadius: 2,
                  fontSize: '0.8rem',
                  '& .MuiSelect-icon': { fontSize: 20 },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#1A53ff' }
                }}
              >
                <MenuItem value="Default">Default</MenuItem>
                <MenuItem value="Price: Low to High">Price: Low to High</MenuItem>
              </Select>
            </Box>

            <Button
              variant="outlined"
              startIcon={<RestartAltOutlinedIcon sx={{ fontSize: 18 }} />}
              sx={{
                height: 40,
                color: '#4B5563',
                borderColor: '#E5E7EB',
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: 2,
                px: 3,
                bgcolor: '#F9FAFB',
                
                '&:hover': { bgcolor: '#F3F4F6', borderColor: '#D1D5DB' }
              }}
            >
              Reset
            </Button>
          </Box>

           {/* Room Selection List */}
           <RoomSelection onContinue={handleContinue} />
           
           {/* Location and Policies */}
           <HotelLocationPolicies hotel={hotel} />
        </Paper>
      </Container>
    </Box>
  );
}


