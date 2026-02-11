'use client';

import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { Box } from '@mui/material';
import { useGlobalContext } from '@/app/context/GlobalContext';

export default function LayoutWrapper({ children }) {
  const { hideLayout } = useGlobalContext();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      {!hideLayout && <Header />}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          pt: hideLayout ? 0 : '64px' 
        }}
      >
        {children}
      </Box>
      {!hideLayout && <Footer />}
    </Box>
  );
}
