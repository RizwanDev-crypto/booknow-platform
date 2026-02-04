'use client';

import * as React from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  Button,
  Stack,
} from '@mui/material';
import FlightIcon from '@mui/icons-material/Flight';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import AirlinesOutlinedIcon from '@mui/icons-material/AirlinesOutlined';

const flights = [
  {
    id: 1,
    originCode: 'DXB',
    originName: 'Dubai',
    destCode: 'LHE',
    destName: 'Lahore',
    airline: 'Flight Unit State Airline',
    price: '400',
    type: 'One Way',
  },
  {
    id: 2,
    originCode: 'LHR',
    originName: 'London',
    destCode: 'ISB',
    destName: 'Islamabad',
    airline: 'National Airways',
    price: '550',
    type: 'One Way',
  },
  {
    id: 3,
    originCode: 'JFK',
    originName: 'New York',
    destCode: 'DXB',
    destName: 'Dubai',
    airline: 'Global Transit',
    price: '720',
    type: 'One Way',
  },

];

export default function FeaturedFlights() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            fontSize: '24px',
            color: '#111827',
            mb: 1,
            fontFamily: 'Inter, sans-serif'
          }}
        >
          Featured Flights
        </Typography>
        <Typography
          sx={{
            fontSize: '14px',
            color: '#64748B',
            mb: 4,
            fontFamily: 'Inter, sans-serif'
          }}
        >
          These alluring destinations are picked just for you
        </Typography>

        <Grid container spacing={2.5}>
          {flights.map((flight) => (
            <Grid item xs={12} md={6} lg={6} key={flight.id } sx={{width: {xs: '100%', md: '48%', lg: '32.1%'}}}>
              <Card
                sx={{
                  position: 'relative',
                  p: 1.5,
                  borderRadius: '8px',
                  boxShadow: 'none',
                 border: '1px solid #E2E8F0', 
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 4px 10px -2px rgba(0, 0, 0, 0.1)',
                    borderColor: '#2563EB',
                    '& .corner-decoration': {
                    //  bgcolor: '#dbe0e5ff',
                    },
                  },
                }}
              >
                {/* Decorative corner element */}
                <Box
                  className="corner-decoration"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '25px',
                    height: '25px',
                    bgcolor: '#EFF6FF',
                    borderRadius: '0 8px 0 0',
                    clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
                    transition: 'background-color 0.3s ease',
                    zIndex: 0,
                  }}
                />
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
                  <Box sx={{ flex: '0 0 auto' }}>
                    <Typography sx={{ fontSize: '18px', fontWeight: 600, color: '#111827', mb: 0.5 }}>
                      {flight.originCode}
                    </Typography>
                    <Typography sx={{ fontSize: '12px', color: '#4B5563' }}>
                      {flight.originName}
                    </Typography>
                  </Box>

                  <Box sx={{ flex: 1, px: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      width: '100%', 
                      mt: 0.7
                    }}>
                      <Box sx={{ flex: 1, height: '1px', bgcolor: '#2563EB' }} />
                      <FlightIcon sx={{ fontSize: 18, color: '#2563EB', mx: 0.5, transform: 'rotate(0deg)' }} />
                      <Box sx={{ flex: 1, height: '1px', bgcolor: '#2563EB' }} />
                    </Box>
                    <Typography sx={{ fontSize: '12px', color: '#6B7280', textAlign: 'center', mt: 1, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <AirlinesOutlinedIcon sx={{ fontSize: 12, color: '#6B7280' }} />
                      {flight.airline}
                    </Typography>
                  </Box>

                  <Box sx={{ textAlign: 'right', flex: '0 0 auto', }}>
                    <Typography sx={{ fontSize: '18px', fontWeight: 700, color: '#111827', mb: 0.5 }}>
                      {flight.destCode}
                    </Typography>
                    <Typography sx={{ fontSize: '12px', color: '#4B5563' }}>
                      {flight.destName}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 0.5 }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <CalendarTodayOutlinedIcon sx={{ fontSize: 12, color: '#94A3B8' }} />
                    <Typography sx={{ fontSize: '12px', color: '#64748B' }}>
                      {flight.type} 
                    </Typography>
                  </Stack>
                  <Button
                 
                    sx={{
                      textTransform: 'none',
                      bgcolor: '#2563EB',
                      fontSize: '12px',
                  color:"white",
                      px: 1,
                      py: 0.2,
                      borderRadius: '6px',
                    }}
                  >
                    from USD {flight.price}
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
