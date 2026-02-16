'use client';

import * as React from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  Select,
  MenuItem,
  Chip,
  Paper,
  Divider,
  CircularProgress,
} from '@mui/material';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import CheckIcon from '@mui/icons-material/Check';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FreeBreakfastOutlinedIcon from '@mui/icons-material/FreeBreakfastOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { Modal, Backdrop, Fade, IconButton } from '@mui/material';

const RoomSelection = ({ onContinue }) => {
  const [selectedRate, setSelectedRate] = React.useState(null);
  const [selectedRoom, setSelectedRoom] = React.useState(null);
  const [qty, setQty] = React.useState(1);
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const [currentImage, setCurrentImage] = React.useState('');
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleSelect = (rate, room, quantity = 1) => {
    // If clicking the "Select" button (default behavior)
    if (selectedRate?.id === rate.id && quantity === 1 && !arguments[2]) {
       // Toggle off if clicking the button for the already selected rate
       setSelectedRate(null);
       setSelectedRoom(null);
       setQty(1);
       return;
    }

    if (quantity === 0) {
       setSelectedRate(null);
       setSelectedRoom(null);
       setQty(1);
    } else {
       setSelectedRate(rate);
       setSelectedRoom(room);
       setQty(quantity);
    }
  };

  const handleQtyChange = (event, rate, room) => {
    const newQty = event.target.value;
    handleSelect(rate, room, newQty);
  };

  const handleImageClick = (image) => {
    setCurrentImage(image);
    setLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setLightboxOpen(false);
  };

  const rooms = [
    {
      id: 1,
      name: 'Standard Double Or Twin',
      image: '/Hotels/imgi_3_667815a_hb_f_001.jpg', 
      capacity: '2 Adults',
      amenities: ['Tea and coffee making facilities', 'hostel'],
      rates: [
        {
          id: 'r1',
          type: 'Refundable',
          features: [
            { icon: <HomeOutlinedIcon sx={{ fontSize: 12, mr: 1, color: '#6B7280' }} />, text: 'Room only' },
            { icon: <CheckCircleOutlineIcon sx={{ fontSize: 12, mr: 1, color: '#6B7280' }} />, text: 'Free cancellation' },
          ],
          price: 155.55,
          total: 155.55,
          available: 5
        },
        {
          id: 'r2',
          type: 'Refundable',
          badge: '+ Breakfast',
          features: [
            { icon: <FreeBreakfastOutlinedIcon sx={{ fontSize: 12, mr: 1, color: '#6B7280' }} />, text: 'Breakfast Included' },
            { icon: <CheckCircleOutlineIcon sx={{ fontSize: 12, mr: 1, color: '#6B7280' }} />, text: 'Free cancellation' },
          ],
          price: 186.90,
          total: 186.90,
          available: 5
        }
      ]
    },
    {
      id: 2,
      name: 'Deluxe King Room',
      image: '/Hotels/imgi_8_667815a_hb_t_002.jpg',
      capacity: '2 Adults, 1 Child',
      amenities: ['City View', 'Bathtub', 'Work Desk'],
      rates: [
        {
          id: 'r3',
          type: 'Non-Refundable',
          features: [
            { icon: <HomeOutlinedIcon sx={{ fontSize: 12, mr: 1, color: '#6B7280' }} />, text: 'Room only' },
            { icon: <CheckCircleOutlineIcon sx={{ fontSize: 12, mr: 1, color: '#6B7280' }} />, text: 'Instant Confirmation' },
          ],
          price: 180.00,
          total: 180.00,
          available: 3
        },
        {
          id: 'r4',
          type: 'Flexible',
          badge: '+ Breakfast',
          features: [
            { icon: <FreeBreakfastOutlinedIcon sx={{ fontSize: 12, mr: 1, color: '#6B7280' }} />, text: 'Breakfast Included' },
            { icon: <CheckCircleOutlineIcon sx={{ fontSize: 12, mr: 1, color: '#6B7280' }} />, text: 'Free cancellation' },
          ],
          price: 210.00,
          total: 210.00,
          available: 3
        }
      ]
    },
    {
      id: 3,
      name: 'Family Suite',
      image: '/Hotels/imgi_2_667815a_hb_ro_001.jpg',
      capacity: '4 Adults',
      amenities: ['2 Queen Beds', 'Kitchenette', 'Living Area'],
      rates: [
        {
          id: 'r5',
          type: 'Standard',
          features: [
            { icon: <HomeOutlinedIcon sx={{ fontSize: 12, mr: 1, color: '#6B7280' }} />, text: 'Room only' },
            { icon: <CheckCircleOutlineIcon sx={{ fontSize: 12, mr: 1, color: '#6B7280' }} />, text: 'Free cancellation' },
          ],
          price: 320.00,
          total: 320.00,
          available: 2
        },
        {
          id: 'r6',
          type: 'All-Inclusive',
          badge: '+ Dinner',
          features: [
            { icon: <FreeBreakfastOutlinedIcon sx={{ fontSize: 12, mr: 1, color: '#6B7280' }} />, text: 'Breakfast & Dinner' },
            { icon: <CheckCircleOutlineIcon sx={{ fontSize: 12, mr: 1, color: '#6B7280' }} />, text: 'Free cancellation' },
          ],
          price: 450.00,
          total: 450.00,
          available: 2
        }
      ]
    },
    {
      id: 4,
      name: 'Executive Penthouse',
      image: '/Hotels/imgi_11_667815a_hb_t_003.jpg',
      capacity: '2 Adults',
      amenities: ['Panoramic View', 'Jacuzzi', 'Private Bar'],
      rates: [
        {
          id: 'r7',
          type: 'Premium',
          features: [
            { icon: <HomeOutlinedIcon sx={{ fontSize: 12, mr: 1, color: '#6B7280' }} />, text: 'Club Access' },
            { icon: <CheckCircleOutlineIcon sx={{ fontSize: 12, mr: 1, color: '#6B7280' }} />, text: 'Priority Check-in' },
          ],
          price: 550.00,
          total: 550.00,
          available: 1
        },
        {
          id: 'r8',
          type: 'Royal Package',
          badge: '+ Spa',
          features: [
            { icon: <FreeBreakfastOutlinedIcon sx={{ fontSize: 12, mr: 1, color: '#6B7280' }} />, text: 'All Meals Included' },
            { icon: <CheckCircleOutlineIcon sx={{ fontSize: 12, mr: 1, color: '#6B7280' }} />, text: 'Spa Treatment' },
          ],
          price: 700.00,
          total: 700.00,
          available: 1
        }
      ]
    },
    {
      id: 5,
      name: 'Standard Single Room',
      image: '/Hotels/imgi_5_667815a_hb_a_001.jpg',
      capacity: '1 Adult',
      amenities: ['Cozy', 'Free Wi-Fi', 'Shower'],
      rates: [
        {
          id: 'r9',
          type: 'Saver',
          features: [
            { icon: <HomeOutlinedIcon sx={{ fontSize: 12, mr: 1, color: '#6B7280' }} />, text: 'Room only' },
            { icon: <CheckCircleOutlineIcon sx={{ fontSize: 12, mr: 1, color: '#6B7280' }} />, text: 'Non-Refundable' },
          ],
          price: 95.00,
          total: 95.00,
          available: 4
        },
        {
          id: 'r10',
          type: 'Standard',
          badge: '+ Flex',
          features: [
            { icon: <HomeOutlinedIcon sx={{ fontSize: 12, mr: 1, color: '#6B7280' }} />, text: 'Room only' },
            { icon: <CheckCircleOutlineIcon sx={{ fontSize: 12, mr: 1, color: '#6B7280' }} />, text: 'Free cancellation' },
          ],
          price: 115.00,
          total: 115.00,
          available: 4
        }
      ]
    }
  ];

  return (
    <Box sx={{ mt: 3 }}>
      {rooms.map((room) => (
        <Paper
          key={room.id}
          elevation={0}
          sx={{
            border: '1px solid #E5E7EB',
            borderRadius: 3,
            overflow: 'hidden',
            mb: 3,
          }}
        >
          {/* Room Header */}
          <Box sx={{ p: 3, display: 'flex', gap: 3, alignItems: 'flex-start' ,   backgroundColor: '#f9fafb'}}>
            {/* Image */}
            <Box 
              sx={{ 
                position: 'relative', 
                width: 120, 
                height: 90, 
                borderRadius: 2, 
                overflow: 'hidden', 
                flexShrink: 0,
                cursor: 'pointer',
                '&:hover': { opacity: 0.9 }
              }}
              onClick={() => handleImageClick(room.image)}
            >
              <img
                src={room.image}
                alt={room.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 4,
                  right: 4,
                  bgcolor: 'rgba(0,0,0,0.6)',
                  color: 'white',
                  px: 0.8,
                  py: 0.2,
                  borderRadius: 1,
                  fontSize: '0.7rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5
                }}
              >
                🖼 2
              </Box>
            </Box>

            {/* Details */}
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem', color: '#111827', mb: 0.5 }}>
                  {room.name}
                </Typography>
                <Chip 
                  label={`${room.rates.length} Rates`} 
                  size="small" 
                  sx={{ 
                    bgcolor: '#EFF6FF', 
                    color: '#2563EB', 
                    fontWeight: 600, 
                    fontSize: '0.75rem',
                    height: 24
                  }} 
                />
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2, color: '#4B5563' }}>
                <PersonOutlineOutlinedIcon sx={{ fontSize: 18 , mb:0.3}} />
                <Typography sx={{ fontSize: '0.85rem', fontWeight: 500 }}>
                  {room.capacity}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {room.amenities.map((amenity, idx) => (
                  <Chip
                    key={idx}
                    icon={<CheckIcon sx={{ fontSize: '14px !important' }} />}
                    label={amenity}
                    size="small"
                    variant="outlined"
                    sx={{
                      borderColor: '#E5E7EB',
                      color: '#374151',
                      fontSize: '0.75rem',
                      height: 26,
                      '& .MuiChip-icon': { color: '#6B7280' }
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Box>

          {/* Rates Table Header */}
          <Box sx={{ bgcolor: '#f3f4f6', px: 3, py: 1.5, borderTop: '1px solid #E5E7EB', borderBottom: '1px solid #E5E7EB' }}>
            <Grid container>
              <Grid item xs={3} width={200}> 
                <Typography sx={{ fontSize: '12px', fontWeight: 700, color: '#374151', textTransform: 'uppercase' }}>
                  RATE TYPE
                </Typography>
              </Grid>
              <Grid item xs={5} width={200}>
                <Typography sx={{ fontSize: '12px', fontWeight: 700, color: '#374151', textTransform: 'uppercase' }}>
                  FEATURES
                </Typography>
              </Grid>
              <Grid item xs={2} sx={{ textAlign: 'right', pr: 6 }}  width={{xs:20, sm:7, md:230, lg:400}}>
                <Typography sx={{ fontSize: '12px', fontWeight: 700, color: '#374151', textTransform: 'uppercase' }}>
                  PRICE
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography sx={{ fontSize: '12px', fontWeight: 700, color: '#374151', textTransform: 'uppercase' }}>
                  QTY
                </Typography>
              </Grid>
               <Grid item xs={2} /> {/* Spacer for Select Button */}
            </Grid>
          </Box>

          {/* Rates Rows */}
          {room.rates.map((rate, index) => {
            const isSelected = selectedRate?.id === rate.id;
            return (
            <React.Fragment key={rate.id}>
              <Box sx={{ px: 3, py: 2.5, bgcolor: isSelected ? '#EFF6FF' : 'transparent', transition: 'background-color 0.2s' }}>
                <Grid container alignItems="center">
                  {/* Rate Type */}
                  <Grid item xs={3} width={200}>
                    <Typography sx={{ fontWeight: 500, fontSize: '1rem', color: '#111827', mb: 0.5 }}>
                      {rate.type}
                    </Typography>
                    {rate.badge && (
                      <Typography sx={{ fontSize: '0.75rem', color: '#16A34A', fontWeight: 600 }}>
                        {rate.badge}
                      </Typography>
                    )}
                  </Grid>

                  {/* Features */}
                  <Grid item xs={5} width={200}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8 }}>
                      {rate.features.map((feature, i) => (
                        <Box key={i} sx={{ display: 'flex', alignItems: 'center' , fontSize: '0.75rem'}}>
                          {feature.icon}
                          <Typography sx={{ fontSize: '0.75rem', color: '#4B5563' }}>
                            {feature.text}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Grid>

                  {/* Price */}
                  <Grid item xs={2} sx={{ textAlign: 'right', pr: 6 }} width={{xs:20, sm:70, md:230, lg:400}}>
                    <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#111827' }}>
                      ${rate.price.toFixed(2)}
                    </Typography>
                    <Typography sx={{ fontSize: '0.75rem', color: '#6B7280' }}>
                      per night
                    </Typography>
                    <Typography sx={{ fontSize: '0.75rem', color: '#6B7280', mt: 0.5 }}>
                      ${rate.total.toFixed(2)} Total
                    </Typography>
                  </Grid>

                  {/* Qty */}
                  <Grid item xs={1}>
                    <Select
                        value={isSelected ? qty : 0}
                        onChange={(e) => handleQtyChange(e, rate, room)}
                        size="small"
                        MenuProps={{ disableScrollLock: true }}
                        IconComponent={ExpandMoreOutlinedIcon}
                        sx={{
                          height: 36,
                          width: 60,
                          fontSize: '0.9rem',
                          borderRadius: 1.5,
                          bgcolor: '#FFFFFF',
                          '& .MuiOutlinedInput-notchedOutline': { borderColor: '#E5E7EB' },
                           '& .MuiSelect-icon': { fontSize: 16 },
                        }}
                    >
                      {[0, 1, 2, 3].map(num => (
                        <MenuItem key={num} value={num}>{num}</MenuItem>
                      ))}
                    </Select>
                  </Grid>

                   {/* Select Button */}
                   <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'flex-end' }} width={{xs:20, sm:106, md:169, lg:175}}>
                       <Button
                        variant="contained"
                        onClick={() => handleSelect(rate, room)}
                        startIcon={isSelected ? <CheckIcon /> : null}
                        sx={{
                          bgcolor: isSelected ? '#2563EB' : '#E5E7EB',
                          color: isSelected ? '#FFFFFF' : '#374151',
                          textTransform: 'none',
                          fontWeight: 500,
                          boxShadow: 'none',
                          height: 36,
                          width: 120, // Fixed width for consistency
                          borderRadius: 1.5,
                          '&:hover': { 
                            bgcolor: isSelected ? '#1D4ED8' : '#D1D5DB', 
                            boxShadow: 'none' 
                          }
                        }}
                      >
                        {isSelected ? 'Selected' : 'Select'}
                      </Button>
                   </Grid>
                </Grid>
              </Box>
              {index < room.rates.length - 1 && <Divider />}
            </React.Fragment>
          );
          })}
        </Paper>
      ))}

      {/* Sticky Bottom Bar */}
      {selectedRate && selectedRoom && (
        <Paper 
          elevation={4} 
          sx={{ 
            position: 'fixed', 
            bottom: 0, 
            left: 0, 
            right: 0, 
            zIndex: 1000, 
            borderTop: '1px solid #E5E7EB',
            borderRadius: 0 
          }}
        >
          <Box sx={{ maxWidth: 'lg', mx: 'auto', p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography sx={{ fontSize: '0.8rem', color: '#6B7280', mb: 0.5 }}>
                Selected Rooms
              </Typography>
              <Typography sx={{ fontWeight: 700, color: '#111827', fontSize: '1.1rem' }}>
                {qty} Room{qty > 1 ? 's' : ''} selected
              </Typography>
              <Typography sx={{ fontSize: '0.85rem', color: '#4B5563' }}>
                {qty}x {selectedRoom.name}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Box sx={{ textAlign: 'right' }}>
                 <Typography sx={{ fontSize: '0.8rem', color: '#6B7280', mb: 0.5 }}>
                    Total Price
                  </Typography>
                  <Typography sx={{ fontWeight: 700, color: '#111827', fontSize: '1.25rem' }}>
                    ${(selectedRate.price * qty).toFixed(2)}
                  </Typography>
                  <Typography sx={{ fontSize: '0.75rem', color: '#6B7280' }}>
                    for 1 Night
                  </Typography>
              </Box>
              
              <Button
                variant="contained"
                disabled={isProcessing}
                startIcon={isProcessing ? <CircularProgress size={20} color="inherit" /> : <LockOutlinedIcon />}
                onClick={() => {
                  setIsProcessing(true);
                  setTimeout(() => {
                    if (onContinue) {
                      onContinue(selectedRate);
                    }
                  }, 3000);
                }}
                sx={{
                  bgcolor: '#3B82F6',
                  color: 'white',
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '1rem',
                  py: 1.5,
                  px: 4,
                  borderRadius: 1.5,
                  '&:hover': { bgcolor: '#2563EB' },
                  '&.Mui-disabled': {
                    bgcolor: '#93C5FD',
                    color: 'white'
                  }
                }}
              >
                {isProcessing ? 'Processing' : 'Continue Booking'}
              </Button>
            </Box>
          </Box>
        </Paper>
      )}

      {/* Lightbox Modal */}
      <Modal
        open={lightboxOpen}
        onClose={handleCloseLightbox}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          sx: { backgroundColor: 'rgba(0, 0, 0, 0.9)', zIndex: 2000 }
        }}
      >
        <Fade in={lightboxOpen}>
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            outline: 'none',
            zIndex: 2001,
            justifyContent: 'center', // Center vertically
            alignItems: 'center', // Center horizontally
          }}>
             {/* Close Button */}
             <IconButton 
                onClick={handleCloseLightbox}
                sx={{ 
                  position: 'absolute', 
                  top: 20, 
                  right: 20, 
                  color: 'white',
                  bgcolor: 'rgba(255,255,255,0.1)',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
                }}
              >
                <CloseIcon sx={{ fontSize: 30 }} />
              </IconButton>

            <Box
              component="img"
              src={currentImage}
              onClick={(e) => e.stopPropagation()} 
              sx={{
                maxHeight: '90vh',
                maxWidth: '90vw',
                objectFit: 'contain',
                boxShadow: '0 0 40px rgba(0,0,0,0.5)',
                borderRadius: 1
              }}
            />
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default RoomSelection;
