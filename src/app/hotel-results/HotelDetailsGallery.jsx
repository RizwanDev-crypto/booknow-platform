'use client';

import * as React from 'react';
import { Box, Grid, Typography, IconButton } from '@mui/material';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { Backdrop, Fade, Modal } from '@mui/material';

export default function HotelDetailsGallery({ images, hotelName }) {
  const [open, setOpen] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  if (!images || images.length === 0) return null;

  const mainImageIndex = 1;
  const sideImageIndices = [0, 2];

  const handleOpen = (index) => {
    setCurrentIndex(index);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Box sx={{ width: '100%', mb: 4, borderRadius: 3, overflow: 'hidden' }}>
      <Grid container spacing={{xs:1, sm:1, md:2, lg:2.5}}>
        {/* Main Image (Left) */}
        <Grid item xs={12} md={10} width={{xs:400, sm:460, md:'60%' , lg:'68%' }}>
          <Box
            component="img"
            src={images[mainImageIndex]}
            alt={`${hotelName} - Main`}
            onClick={() => handleOpen(mainImageIndex)}
            sx={{
              width: '100%',
              height: { xs: 300, md: 500 },
              objectFit: 'cover',
              display: 'block',
              cursor: 'pointer'
            }}
          />
        </Grid>

        {/* Side Images (Right - Column stack) */}
        <Grid item xs={12} md={2} width={{xs:400, sm:205, md:348 , lg:'30%' }}>
          <Box sx={{ height: { xs: 'auto', md: 500 }, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {sideImageIndices.map((imgIdx, index) => (
              <Box 
                key={index} 
                sx={{ 
                  flex: 1,
                  position: 'relative',
                  height: { xs: 150, md: 'auto' },
                  cursor: 'pointer'
                }}
                onClick={() => handleOpen(imgIdx)}
              >
                <Box
                  component="img"
                  src={images[imgIdx]}
                  alt={`${hotelName} - ${index + 1}`}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
                {index === 1 && images.length > 3 && (
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 12,
                      right: 12,
                      bgcolor: 'rgba(255, 255, 255, 0.95)',
                      px: 1.5,
                      py: 0.8,
                      borderRadius: 1.5,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                      zIndex: 2,
                      '&:hover': { bgcolor: '#FFFFFF' }
                    }}
                  >
                    <PhotoLibraryIcon sx={{ fontSize: 18, color: '#4B5563' }} />
                    <Typography sx={{ fontWeight: 600, fontSize: '0.8rem', color: '#1F2937' }}>
                      {images.length - 3}+ other images
                    </Typography>
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>

      {/* Lightbox Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          sx: { backgroundColor: 'rgba(0, 0, 0, 0.9)', zIndex: 2000 }
        }}
      >
        <Fade in={open}>
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            outline: 'none',
            zIndex: 2001
          }}>
            {/* Header Controls */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              p: 2,
              color: 'white'
            }}>
              <Typography sx={{ fontWeight: 500, fontSize: '1rem' }}>
                {currentIndex + 1} / {images.length}
              </Typography>
              <Box>
                <IconButton color="inherit" size="large">
                  <ZoomInIcon />
                </IconButton>
                <IconButton color="inherit" size="large">
                  <FullscreenIcon />
                </IconButton>
                <IconButton color="inherit" size="large" onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </Box>

            {/* Main Content Area */}
            <Box sx={{ 
              flex: 1, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              position: 'relative',
              px: { xs: 2, md: 10 }
            }}>
              {/* Prev Button */}
              <IconButton 
                onClick={handlePrev}
                sx={{ 
                  position: 'absolute', 
                  left: { xs: 10, md: 40 }, 
                  color: 'white',
                  bgcolor: 'rgba(0,0,0,0.3)',
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' }
                }}
              >
                <ChevronLeftIcon sx={{ fontSize: 40 }} />
              </IconButton>

              {/* Current Image */}
              <Box
                component="img"
                src={images[currentIndex]}
                sx={{
                  maxHeight: '80vh',
                  maxWidth: '90%',
                  objectFit: 'contain',
                  boxShadow: '0 0 40px rgba(0,0,0,0.5)'
                }}
              />

              {/* Next Button */}
              <IconButton 
                onClick={handleNext}
                sx={{ 
                  position: 'absolute', 
                  right: { xs: 10, md: 40 }, 
                  color: 'white',
                  bgcolor: 'rgba(0,0,0,0.3)',
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' }
                }}
              >
                <ChevronRightIcon sx={{ fontSize: 40 }} />
              </IconButton>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}
