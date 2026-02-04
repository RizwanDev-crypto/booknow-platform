'use client';

import * as React from 'react';
import {
  Box,
  Typography,
  Container,
  Tabs,
  Tab,
  Paper,
} from '@mui/material';
import ScreenshotMonitorOutlinedIcon from '@mui/icons-material/ScreenshotMonitorOutlined';
import FlightTakeoffOutlinedIcon from '@mui/icons-material/FlightTakeoffOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import HotelOutlinedIcon from '@mui/icons-material/HotelOutlined';
import VisaSearchForm from './VisaSearchForm';
import FlightSearchForm from './FlightSearchForm';
import TourSearchForm from './TourSearchForm';
import CarsSearchForm from './CarsSearchForm';
import HotelSearchForm from './HotelSearchForm';

export default function Hero() {
  const [activeTab, setActiveTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        zIndex: 5,
        minHeight: '540px',
        display: 'flex',
        alignItems: 'center',
        background: 'url("/Hero/HeroCoverImg.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        py: { xs: 8, md: 8 ,lg: 6},
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ color: 'white', mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '1.9rem', md: '1.9rem' },
              mb: 1,
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            Travel the Way You Love!
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 400,
              fontSize: { xs: '1rem', md: '0.90rem' },
              opacity: 0.9,
              textShadow: '0 1px 2px rgba(0,0,0,0.3)',
            }}
          >
            Let's help you plan your next journey the one that will leave a lifetime of memories.
          </Typography>
        </Box>

        <Paper
          elevation={4}
          sx={{
            borderRadius: '16px',
            overflow: 'visible',
            backgroundColor: '#ffffff',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: '#fff', borderRadius: '16px 16px 0px 0px' }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
              sx={{
                minHeight: 30,
                '& .MuiTabs-flexContainer': {
                  // Ensure it doesn't wrap and stays in a row
                  flexDirection: 'row',
                },
                '& .MuiTabs-indicator': {
                  height: 1.1,
                  borderRadius: '3px 3px 0 0',
                  backgroundColor: '#1A53ff',
                },
                // Hide scrollbar but keep functionality
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
                msOverflowStyle: 'none',
                scrollbarWidth: 'none',
              }}
            >
              <Tab
                icon={<ScreenshotMonitorOutlinedIcon sx={{ fontSize: 20, color: activeTab === 0 ? '#1A53ff' : '#6B7280' }} />}
                iconPosition="start"
                label="Visa"
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '14px',
                  minHeight: 56,
                  color: '#6B7280',
                  pl: 2.5,
                  borderTopLeftRadius: '16px',
                  '&.Mui-selected': {
                    color: '#1A53ff',
                    backgroundColor: '#1A53ff0D',
                  },
                  '&:focus': {
                    outline: 'none',
                  },
                }}
              />
              <Tab
                icon={<FlightTakeoffOutlinedIcon sx={{ fontSize: 20, color: activeTab === 1 ? '#1A53ff' : '#6B7280' }} />}
                iconPosition="start"
                label="Flights"
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '14px',
                  minHeight: 56,
                  color: '#6B7280',
                  '&.Mui-selected': {
                    color: '#1A53ff',
                    backgroundColor: '#1A53ff0D',
                  },
                }}
              />
              <Tab
                icon={<ExploreOutlinedIcon sx={{ fontSize: 20, color: activeTab === 2 ? '#1A53ff' : '#6B7280' }} />}
                iconPosition="start"
                label="Tours"
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '14px',
                  minHeight: 56,
                  color: '#6B7280',
                  '&.Mui-selected': {
                    color: '#1A53ff',
                    backgroundColor: '#1A53ff0D',
                  },
                }}
              />
              <Tab
                icon={<DirectionsCarFilledOutlinedIcon sx={{ fontSize: 20, color: activeTab === 3 ? '#1A53ff' : '#6B7280' }} />}
                iconPosition="start"
                label="Cars"
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '14px',
                  minHeight: 56,
                  color: '#6B7280',
                  '&.Mui-selected': {
                    color: '#1A53ff',
                    backgroundColor: '#1A53ff0D',
                  },
                }}
              />
              <Tab
                icon={<HotelOutlinedIcon sx={{ fontSize: 20, color: activeTab === 4 ? '#1A53ff' : '#6B7280' }} />}
                iconPosition="start"
                label="Stays"
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '14px',
                  minHeight: 56,
                  color: '#6B7280',
                  '&.Mui-selected': {
                    color: '#1A53ff',
                    backgroundColor: '#1A53ff0D',
                  },
                }}
              />
            </Tabs>
          </Box>

          <Box sx={{ p: 0 }}>
            {activeTab === 0 && <VisaSearchForm />}
            {activeTab === 1 && <FlightSearchForm />}
            {activeTab === 2 && <TourSearchForm />}
            {activeTab === 3 && <CarsSearchForm />}
            {activeTab === 4 && <HotelSearchForm />}
            {activeTab > 4 && (
              <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary">
                  {['Visa', 'Flights', 'Tours', 'Cars', 'Stays'][activeTab]} search form is coming soon!
                </Typography>
              </Box>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
