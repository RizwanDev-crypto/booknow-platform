'use client';
import React from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FlightIcon from '@mui/icons-material/Flight';
import HotelIcon from '@mui/icons-material/Hotel';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import TourIcon from '@mui/icons-material/Tour';

export default function DashboardPage() {
  const stats = [
    { title: 'Total Bookings', value: '24', icon: <DashboardIcon />, color: '#2563EB' },
    { title: 'Flight Bookings', value: '8', icon: <FlightIcon />, color: '#10B981' },
    { title: 'Hotel Bookings', value: '10', icon: <HotelIcon />, color: '#F59E0B' },
    { title: 'Car Rentals', value: '6', icon: <DirectionsCarIcon />, color: '#EF4444' },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#1F2937', mb: 1 }}>
            Dashboard
          </Typography>
          <Typography variant="body1" color="#6B7280">
            Welcome to your BookNow dashboard
          </Typography>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  borderRadius: 2,
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #f0f0f0',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box 
                      sx={{ 
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        backgroundColor: `${stat.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2,
                      }}
                    >
                      {React.cloneElement(stat.icon, { sx: { color: stat.color, fontSize: 24 } })}
                    </Box>
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#1F2937', mb: 0.5 }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="#6B7280">
                    {stat.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Recent Activity */}
        <Box sx={{ mt: 4 }}>
          <Paper 
            sx={{ 
              p: 3,
              borderRadius: 2,
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #f0f0f0',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1F2937', mb: 2 }}>
              Recent Activity
            </Typography>
            <Typography variant="body2" color="#6B7280">
              Your recent booking activity will appear here.
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
}
