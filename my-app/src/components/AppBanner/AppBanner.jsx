'use client';

import * as React from 'react';
import { Box, Typography, Container, Button } from '@mui/material';

export default function AppBanner() {
  return (
    <Container maxWidth="lg" sx={{ mb: 8, mt: 4 }}>
      <Box
        sx={{
          position: 'relative',
          borderRadius: '10px',
          overflow: 'hidden',
          height: { xs: '300px', md: '200px' },
          backgroundImage: 'url("/App/app-img.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Overlay for better text readability */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 10%, rgba(0,0,0,0) 100%)',
            zIndex: 1,
          }}
        />

        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            px: { xs: 4, md: 4 },
            maxWidth: { xs: '100%', md: '600px' },
          }}
        >
          <Typography
            variant="h3"
            sx={{
              color: '#fff',
              fontWeight: 800,
              fontSize: { xs: '22px', md: '30px' },
              mb: 0.4,
              fontFamily: 'Inter, sans-serif',
              lineHeight: 1.2,
            }}
          >
            Travel on the go with our app
          </Typography>
          <Typography
            sx={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: { xs: '16px', md: '16px' },
              mb: 2,
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Book from your phone anytime, anywhere.
          </Typography>
          <Button
            variant="contained"
            sx={{
              bgcolor: '#0058E6',
              color: '#fff',
              px: 2,
              py: 1,
              borderRadius: '8px',
              textTransform: 'none',
              fontSize: '14px',
              fontWeight: 500,
              '&:hover': {
                bgcolor: '#0052CC',
              },
            }}
          >
            Download App
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
