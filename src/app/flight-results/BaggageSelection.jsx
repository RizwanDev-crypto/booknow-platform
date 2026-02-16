'use client';

import React from 'react';
import { Box, Typography, Button, Paper, Grid, Radio } from '@mui/material';

export default function BaggageSelection({ flight, onSelect, onClose }) {
  const options = [
    { id: 'saver', name: 'Economy Saver', baggage: '20kg', price: '+$0' },
    { id: 'flex', name: 'Economy Flex', baggage: '30kg', price: '+$45' },
    { id: 'plus', name: 'Economy Flex Plus', baggage: '40kg', price: '+$80' }
  ];

  return (
    <Box sx={{ p: 2, bgcolor: '#f0f9ff', borderRadius: 2, mt: 2 }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>Select Your Fare & Baggage</Typography>
      <Grid container spacing={2}>
        {options.map((option) => (
          <Grid item xs={12} key={option.id}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 2, 
                border: '1px solid #bfdbfe', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                cursor: 'pointer',
                '&:hover': { bgcolor: '#e0f2fe' }
              }}
              onClick={() => onSelect(option)}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Radio color="primary" />
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>{option.name}</Typography>
                  <Typography variant="caption" color="textSecondary">Baggage: {option.baggage}</Typography>
                </Box>
              </Box>
              <Typography variant="body2" sx={{ fontWeight: 700, color: '#1e40af' }}>{option.price}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button onClick={onClose} size="small">Cancel</Button>
      </Box>
    </Box>
  );
}
