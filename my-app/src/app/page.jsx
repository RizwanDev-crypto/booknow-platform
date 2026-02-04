import * as React from 'react';
import Box from '@mui/material/Box';
import Hero from '@/components/Hero/Hero';
import FeaturedProperties from '@/components/FeaturedProperties/FeaturedProperties';
import FeaturedFlights from '@/components/FeaturedFlights/FeaturedFlights';
import PopularTours from '@/components/PopularTours/PopularTours';
import FeaturedCars from '@/components/FeaturedCars/FeaturedCars';
import AppBanner from '@/components/AppBanner/AppBanner';

export default function Home() {
  return (
    <Box component="main">
      <Hero />
      <FeaturedProperties />
      <FeaturedFlights />
      <PopularTours />
      <FeaturedCars />     
      <AppBanner />
    </Box>
  );
}
