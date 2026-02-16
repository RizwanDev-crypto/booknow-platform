'use client';

import * as React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  TextField,
  MenuItem,
  Button,
  IconButton,
  Divider,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  Alert,
  Tabs,
  Tab,
  InputAdornment,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LoginIcon from '@mui/icons-material/Login';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import InfoIcon from '@mui/icons-material/Info';
import StarIcon from '@mui/icons-material/Star';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import NightsStayOutlinedIcon from '@mui/icons-material/NightsStayOutlined';
import PersonIcon from '@mui/icons-material/Person';
import FlagIcon from '@mui/icons-material/Flag';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import UpdateIcon from '@mui/icons-material/Update';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useGlobalContext } from '../context/GlobalContext';

const labelStyles = {
  fontSize: '13px',
  fontWeight: 600,
  color: '#334155',
  mb: 0.8,
  display: 'flex',
  alignItems: 'center',
  gap: 1,
};

const inputStyles = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    backgroundColor: '#fff',
    height: '38px',
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#0058E6',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#0058e6',
      borderWidth: '1.5px',
    },
  },
  '& .MuiOutlinedInput-input': {
    fontSize: '14px',
    padding: '0 12px',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  },
};

const sectionHeaderStyles = {
  bgcolor: '#f9fafb',
  color: '#334155',
  p: 1.5,
  borderRadius: '8px 8px 0 0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer'
};

const Checkout = ({ hotel, onBack, selectedRate }) => {
  const { setHideLayout } = useGlobalContext();
  const [activeTab, setActiveTab] = React.useState(0);
  const [paymentMethod, setPaymentMethod] = React.useState('pay-later');
  const [isGuestDetailsOpen, setIsGuestDetailsOpen] = React.useState(true);
  const [isRoomInfoOpen, setIsRoomInfoOpen] = React.useState(true);
  const [isPaymentMethodsOpen, setIsPaymentMethodsOpen] = React.useState(true);

  React.useEffect(() => {
    setHideLayout(true);
    return () => setHideLayout(false);
  }, [setHideLayout]);
  
  // Dynamic values based on selectedRate and hotel
  const roomTotal = selectedRate?.total || 100.14;
  const roomType = selectedRate?.type || 'double superior';
  const pricePerNight = selectedRate?.price || 100.14;
  const nights = 1; // This could be calculated from dates
  const qty = 1;

  return (
    <Box sx={{ 
      background: 'linear-gradient(to right, #fefefe 30%, #e4eaf1 100%)', 
      minHeight: '100vh', 
      py: 2 
    }}>
      <Container maxWidth="lg">

        <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
          {/* Left Column - Main Forms */}
          <Grid item xs={12} md={5} lg={5} width={{xs: '100%', md: 602, lg:670}}>
            {/* Header Navigation moved inside Grid for Sidebar Alignment */}
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 1 }}>
                <Box 
                  onClick={onBack}
                  sx={{ 
                    p: 1.2, 
                    borderRadius: '8px', 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    border: '1px solid #E2E8F0',
                    bgcolor: '#f1f5f9',
                    '&:hover': { bgcolor: '#F8FAFC', borderColor: '#60A5FA' }
                  }}>
                  <ArrowBackIcon sx={{ color: '#020817', fontSize: 20 }} />
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#1E293B', lineHeight: 1.2 }}>
                    Hotel Booking
                  </Typography>
                  <Typography sx={{ fontSize: '14px', color: '#475569' }}>
                    Select your hotel Booking
                  </Typography>
                </Box>
              </Box>
              <Box
                component="img"
                src="/logo.png"
                alt="Logo"
                sx={{ height: 32, width: 'auto' }}
              />
            </Box>
            
            {/* Guest Details */}
            <Paper elevation={0} sx={{ border: '1px solid #E2E8F0', borderRadius: '12px', mb: 3, overflow: 'hidden' }}>
              <Box sx={sectionHeaderStyles} onClick={() => setIsGuestDetailsOpen(!isGuestDetailsOpen)}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PersonOutlineIcon sx={{ fontSize: 20, color: '#334155' }} />
                  <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>Guest Details</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Typography sx={{ fontSize: '12px', color: '#334155', opacity: 0.9 }}>
                    Booking as: <Box component="span" sx={{ fontWeight: 700, color: '#2563EB' }}>Guest</Box>
                  </Typography>
                  <IconButton size="small" sx={{ color: '#334155', p: 0 }}>
                    {isGuestDetailsOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
                </Box>
              </Box>
              
              {isGuestDetailsOpen && (
                <Box sx={{ p: 3 }}>
                <Box sx={{ 
                  mb: 3, 
                  p: 1.5, 
                  backgroundColor: '#f1f5f9', 
                  borderRadius: '10px',
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 2
                }}>
                  <Box
                    onClick={() => setActiveTab(0)}
                    sx={{
                      p: 2,
                      flex: 1,
                      borderRadius: '10px',
                      border: `2px solid ${activeTab === 0 ? '#0058E6' : '#E2E8F0'}`,
                      bgcolor: activeTab === 0 ? '#EFF6FF' : '#fff',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 1.5,
                      transition: 'all 0.2s',
                    }}
                  >
                    <Box sx={{ 
                      width: 20, height: 20, minWidth: 20, flexShrink: 0, borderRadius: '50%', 
                      border: `2px solid ${activeTab === 0 ? '#0058e6' : '#cbd5e1'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 0.3
                    }}>
                      {activeTab === 0 && <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#0058E6' }} />}
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#1E293B', display: 'flex', alignItems: 'center', gap: 1 }}>
                        <PersonOutlineIcon sx={{ fontSize: 18 }} /> Guest Booking
                      </Typography>
                      <Typography sx={{ fontSize: '12px', color: '#64748B', mt: 0.5 }}>
                       You are booking as a guest. You can create an account after completing your booking.
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    onClick={() => setActiveTab(1)}
                    sx={{
                      p: 2,
                      flex: 1,
                      borderRadius: '10px',
                      border: `2px solid ${activeTab === 1 ? '#0058E6' : '#E2E8F0'}`,
                      bgcolor: activeTab === 1 ? '#EFF6FF' : '#fff',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 1.5,
                      transition: 'all 0.2s',
                    }}
                  >
                    <Box sx={{ 
                      width: 20, height: 20, minWidth: 20, flexShrink: 0, borderRadius: '50%', 
                      border: `2px solid ${activeTab === 1 ? '#0058e6' : '#cbd5e1'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 0.3
                    }}>
                      {activeTab === 1 && <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#0058E6' }} />}
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#1E293B', display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LoginIcon sx={{ fontSize: 18 }} /> Login Account
                      </Typography>
                      <Typography sx={{ fontSize: '12px', color: '#64748B', mt: 0.5 }}>
                      If you have an account, please log in to access your saved details and manage your bookings easily.
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {activeTab === 0 && (
                  <Grid container spacing={2.5}>
                    <Grid item xs={12} sm={4} width={192}>
                      <Typography sx={labelStyles}>Title</Typography>
                      <TextField select fullWidth defaultValue="Mr" size="small" sx={inputStyles}>
                        <MenuItem value="Mr">Mr.</MenuItem>
                        <MenuItem value="Ms">Ms.</MenuItem>
                        <MenuItem value="Mrs">Mrs.</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={4} width={192}>
                      <Typography sx={labelStyles}>First Name</Typography>
                      <TextField fullWidth placeholder="Enter First Name" size="small" sx={inputStyles} />
                    </Grid>
                    <Grid item xs={12} sm={4} width={192}>
                      <Typography sx={labelStyles}>Last Name</Typography>
                      <TextField fullWidth placeholder="Enter Last Name" size="small" sx={inputStyles} />
                    </Grid>
                    <Grid item xs={12} sm={4} width={192}>
                      <Typography sx={labelStyles}>Email</Typography>
                      <TextField fullWidth placeholder="Enter Email" size="small" sx={inputStyles} />
                    </Grid>
                    <Grid item xs={12} sm={4} width={192}>
                      <Typography sx={labelStyles}>Country Code</Typography>
                      <TextField select fullWidth defaultValue="AF" size="small" sx={inputStyles}>
                        <MenuItem value="AF">AF +93</MenuItem>
                        <MenuItem value="PK">PK +92</MenuItem>
                        <MenuItem value="US">US +1</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={4} width={192}>
                      <Typography sx={labelStyles}>Phone</Typography>
                      <TextField fullWidth placeholder="Enter Phone Number" size="small" sx={inputStyles} />
                    </Grid>
                    <Grid item xs={12}>
                      <Divider sx={{ my: 1, mx: -3 }} />
                      <FormControlLabel 
                        control={<Checkbox size="small" sx={{ color: '#E2E8F0', '&.Mui-checked': { color: '#0058E6' } }} />} 
                        label={
                          <Box>
                            <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#1E293B' }}>I&apos;m booking for someone else!</Typography>
                            <Typography sx={{ fontSize: '12px', color: '#64748B' }}>Fill in the traveler&apos;s details below.</Typography>
                          </Box>
                        } 
                      />
                    </Grid>
                  </Grid>
                )}
              </Box>
              )}
            </Paper>

            {/* Room 1 */}
            <Paper elevation={0} sx={{ border: '1px solid #E2E8F0', borderRadius: '12px', mb: 3, overflow: 'hidden' }}>
              <Box sx={sectionHeaderStyles} onClick={() => setIsRoomInfoOpen(!isRoomInfoOpen)}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <MeetingRoomIcon sx={{ fontSize: 20, color: '#334155' }} />
                  <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>Room 1 Information</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Typography sx={{ fontSize: '12px', color: '#334155', opacity: 0.9 }}>2 Adults</Typography>
                  <IconButton size="small" sx={{ color: '#334155', p: 0 }}>
                    {isRoomInfoOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
                </Box>
              </Box>
              
              {isRoomInfoOpen && (
                <Box sx={{ p: 3 }}>
                <Box sx={{ border: '1px solid #F1F5F9', borderRadius: '10px', bgcolor: '#F8FAFC', p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PersonIcon sx={{ color: '#0058E6', fontSize: 20 }} />
                      <Typography sx={{ fontWeight: 700, color: '#1E293B' }}>Adult 1 (Lead Traveler)</Typography>
                    </Box>
                    <Typography sx={{ fontSize: '11px', color: '#6B7280' }}>Synced with guest details</Typography>
                  </Box>
                  <Grid container spacing={2.5}>
                    <Grid item xs={12} sm={4} width={177}>
                      <Typography sx={labelStyles}>Title *</Typography>
                      <TextField select fullWidth defaultValue="Mr" size="small" sx={inputStyles}>
                        <MenuItem value="Mr">Mr.</MenuItem>
                        <MenuItem value="Ms">Ms.</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={4} width={176}>
                      <Typography sx={labelStyles}>First Name *</Typography>
                      <TextField fullWidth placeholder="First Name" size="small" sx={inputStyles} />
                    </Grid>
                    <Grid item xs={12} sm={4} width={176}>
                      <Typography sx={labelStyles}>Last Name *</Typography>
                      <TextField fullWidth placeholder="Last Name" size="small" sx={inputStyles} />
                    </Grid>
                  </Grid>
                  
                  <Divider sx={{ my: 3 }} />

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                    <PersonIcon sx={{ color: '#0058E6', fontSize: 20 }} />
                    <Typography sx={{ fontWeight: 700, color: '#1E293B' }}>Adult 2</Typography>
                  </Box>
                  <Grid container spacing={2.5}>
                    <Grid item xs={12} sm={4} width={177}>
                      <Typography sx={labelStyles}>Title</Typography>
                      <TextField select fullWidth defaultValue="Mr" size="small" sx={inputStyles}>
                        <MenuItem value="Mr">Mr.</MenuItem>
                        <MenuItem value="Ms">Ms.</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={4} width={176}>
                      <Typography sx={labelStyles}>First Name</Typography>
                      <TextField fullWidth placeholder="First Name" size="small" sx={inputStyles} />
                    </Grid>
                    <Grid item xs={12} sm={4} width={176}>
                      <Typography sx={labelStyles}>Last Name</Typography>
                      <TextField fullWidth placeholder="Last Name" size="small" sx={inputStyles} />
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              )}
            </Paper>

            {/* Payment Methods */}
            <Paper elevation={0} sx={{ border: '1px solid #E2E8F0', borderRadius: '12px', mb: 3, overflow: 'hidden' }}>
              <Box sx={sectionHeaderStyles} onClick={() => setIsPaymentMethodsOpen(!isPaymentMethodsOpen)}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PaymentOutlinedIcon sx={{ fontSize: 20, color: '#334155' }} />
                  <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>Payment Methods</Typography>
                </Box>
                <IconButton size="small" sx={{ color: '#334155', p: 0 }}>
                  {isPaymentMethodsOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </Box>
              
              {isPaymentMethodsOpen && (
                <Box sx={{ p: 3 }}>
                <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                  <Grid container spacing={2}>
                    {[
                      { id: 'pay-later', title: 'Pay Later', icon: <PaymentOutlinedIcon /> },
                      { id: 'paypal', title: 'Digital Wallet', subtitle: 'PayPal', icon: <PaymentOutlinedIcon /> },
                      { id: 'stripe', title: 'Credit Card', subtitle: 'Stripe', icon: <PaymentOutlinedIcon /> },
                      { id: 'bank', title: 'Bank Transfer', subtitle: 'Wire Transfer', icon: <PaymentOutlinedIcon /> }
                    ].map((method) => (
                      <Grid item xs={12} md={6} key={method.id} width={300}>
                        <Box sx={{ 
                          border: '1px solid #E2E8F0', 
                          borderRadius: '12px', 
                          p: 2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          cursor: 'pointer',
                          bgcolor: paymentMethod === method.id ? '#EFF6FF' : '#fff',
                          borderColor: paymentMethod === method.id ? '#0058E6' : '#E2E8F0'
                        }} onClick={() => setPaymentMethod(method.id)}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Radio value={method.id} size="small" sx={{ color: '#cbd5e1', '&.Mui-checked': { color: '#0058e6' } }} />
                            <Box>
                              <Typography sx={{ fontSize: '14px', fontWeight: 700 }}>{method.title}</Typography>
                              {method.subtitle && <Typography sx={{ fontSize: '12px', color: '#64748B' }}>{method.subtitle}</Typography>}
                            </Box>
                          </Box>
                          {React.cloneElement(method.icon, { sx: { color: '#94A3B8' } })}
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </RadioGroup>
              </Box>
              )}
            </Paper>

            {/* Booking Options */}
            <Paper elevation={0} sx={{ border: '1px solid #E2E8F0', borderRadius: '12px', mb: 3, overflow: 'hidden' }}>
              <Box sx={sectionHeaderStyles}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <UpdateIcon sx={{ fontSize: 20, color: '#334155' }} />
                  <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>Booking Options</Typography>
                </Box>
              </Box>
              
              <Box sx={{ p: 3 }}>
                <Typography sx={labelStyles}>Special Requests (Optional)</Typography>
                <TextField 
                  fullWidth 
                  multiline 
                  rows={1} 
                  placeholder="Any Special Requests or Notes..." 
                  sx={{ 
                    ...inputStyles,
                    '& .MuiOutlinedInput-root': { ...inputStyles['& .MuiOutlinedInput-root'], height: 'auto', py: 1 } 
                  }} 
                />

                <Alert 
                  severity="info" 
                  icon={<InfoIcon sx={{ color: '#854D0E', fontSize: 18 }} />}
                  sx={{ 
                    mt: 3, 
                    borderRadius: '8px', 
                    bgcolor: '#fefce8', 
                    color: '#374151',
                    border: '1px solid #cfd521ff',
                    '& .MuiAlert-message': { fontSize: '12px' }
                  }}
                >
                  <Box sx={{ fontWeight: 700, mb: 0.5, color: '#854D0E' , fontSize: '14px' }}>Cancellation Policy</Box>
                 Free cancellation until February 11, 2026 at 22:59. After that, a cancellation fee of 92.13 USD will apply.
                </Alert>

                <Box sx={{ mt: 3 }}>
                  <Box sx={{ bgcolor: '#fff', border: '1px solid #E2E8F0', borderRadius: '12px', p: 1.3, mb: 2 }}>
                    <FormControlLabel 
                      control={<Checkbox size="small" sx={{ color: '#E2E8F0', '&.Mui-checked': { color: '#0058E6' } }} />} 
                      label={
                        <Typography sx={{ fontSize: '14px', color: '#1E293B' }}>
                          I agree to the <Box component="span" sx={{ color: '#2563EB', fontWeight: 400 }}>Terms & Conditions</Box> and <Box component="span" sx={{ color: '#2563EB', fontWeight: 400 }}>Privacy Policy</Box>
                        </Typography>
                      } 
                    />
                  </Box>
                  <Button 
                    fullWidth 
                    variant="contained" 
                    sx={{ 
                      py: 1.5, 
                      borderRadius: '10px', 
                      bgcolor: '#0058E6',
                      fontWeight: 700,
                      textTransform: 'none',
                      boxShadow: 'none',
                      '&:hover': { bgcolor: '#0046B8', boxShadow: 'none' }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LockOutlinedIcon sx={{ fontSize: 20 }} /> Confirm Booking
                    </Box>
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Right Column - Summary Sidebar */}
          <Grid item xs={12} md={4} width={{xs: '100%', md: 350, lg:450}} sx={{ 
            position: { md: 'sticky' }, 
            top: { md: 16 }, 
            alignSelf: 'flex-start'
          }}>
            <Paper elevation={0} sx={{ border: '1px solid #E2E8F0', bgcolor: '#ffffff', borderRadius: '12px', p: 2.5, mb: 3 }}>
              <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#374151', mb: 2 }}>Booking Summary</Typography>
              
              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Box 
                  component="img" 
                  src={hotel?.images?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945'} 
                  sx={{ width: 80, height: 80, borderRadius: '8px', objectFit: 'cover' }} 
                />
                <Box>
                  <Typography sx={{ fontSize: '14px', fontWeight: 800, color: '#111827', mb: 0.5, lineHeight: 1.2 }}>
                    {hotel?.name}
                  </Typography>
                  <Box sx={{ display: 'flex', mb: 0.5 }}>
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} sx={{ fontSize: 14, color: i < (hotel?.starRating || 4) ? '#F97316' : '#D1D5DB' }} />
                    ))}
                  </Box>
                  <Typography sx={{ fontSize: '12px', color: '#4B5563', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <FlagIcon sx={{ fontSize: 12 }} /> {hotel?.location}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ bgcolor: '#F8FAFC', borderRadius: '8px', p: 1.5, mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LoginOutlinedIcon sx={{ fontSize: 16, color: '#3B82F6' }} />
                    <Typography sx={{ fontSize: '12px', fontWeight: 600 }}>15 Feb 2026</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, bgcolor: '#DBEAFE', px: 1, py: 0.2, borderRadius: '20px' }}>
                    <NightsStayOutlinedIcon sx={{ fontSize: 12, color: '#1D4ED8' }} />
                    <Typography sx={{ fontSize: '12px', color: '#1D4ED8', fontWeight: 500 }}>{nights} Night</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LogoutOutlinedIcon sx={{ fontSize: 16, color: '#3B82F6' }} />
                    <Typography sx={{ fontSize: '12px', fontWeight: 500 , color: '#374151'}}>16 Feb 2026</Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 1.5, borderStyle: 'dashed' }} />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FlagIcon sx={{ fontSize: 14, color: '#64748B' }} />
                  <Typography sx={{ fontSize: '12px', color: '#4B5563' }}>Nationality:</Typography>
                  <Typography sx={{ fontSize: '12px', fontWeight: 700, color: '#1D4ED8' }}>Afghanistan</Typography>
                </Box>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <MeetingRoomIcon sx={{ fontSize: 18, color: '#6B7280' }} />
                  <Typography sx={{ fontSize: '12px', fontWeight: 700, color: '#111827', textTransform: 'uppercase' }}>Selected Rooms</Typography>
                </Box>

                <Box sx={{ border: '1px solid #DBEAFE', borderRadius: '12px', p: 2, bgcolor: '#FFFFFF' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                    <Typography sx={{ fontSize: '14px', fontWeight: 700 }}>{roomType}</Typography>
                    <Typography sx={{ fontSize: '12px', color: '#64748B' }}>x{qty}</Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography sx={{ fontSize: '11px', color: '#6B7280' }}>Price per Night:</Typography>
                      <Typography sx={{ fontSize: '11px', fontWeight: 500 }}>USD {pricePerNight.toFixed(2)}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography sx={{ fontSize: '11px', color: '#6B7280' }}>Nights:</Typography>
                      <Typography sx={{ fontSize: '11px', fontWeight: 500 }}>{nights}</Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, pt: 1, borderTop: '1px solid #F1F5F9' }}>
                    <Typography sx={{ fontSize: '12px', fontWeight: 700 }}>Subtotal:</Typography>
                    <Typography sx={{ fontSize: '12px', fontWeight: 700 }}>USD {roomTotal.toFixed(2)}</Typography>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {['Breakfast', 'Refundable', 'free Cancellation'].map((tag) => (
                      <Box key={tag} sx={{ 
                        bgcolor: tag === 'Breakfast' ? '#FFFBEB' : tag === 'Refundable' ? '#F0FDF4' : '#E5E7EB',
                        color: tag === 'Breakfast' ? '#92400E' : tag === 'Refundable' ? '#166534' : '#475569',
                        px: 1, py: 0.2, borderRadius: '4px', fontSize: '10px', fontWeight: 600,
                        border: `1px solid ${tag === 'Breakfast' ? '#FEF3C7' : tag === 'Refundable' ? '#DCFCE7' : '#D1D5DB'}`
                      }}>
                        {tag}
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography sx={{ fontSize: '13px', color: '#374151' }}>Rooms Total:</Typography>
                  <Typography sx={{ fontSize: '13px', fontWeight: 600 }}>USD {roomTotal.toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography sx={{ fontSize: '13px', color: '#374151' }}>Taxes & Fees:</Typography>
                  <Typography sx={{ fontSize: '13px', fontWeight: 600 }}>Included</Typography>
                </Box>
                <Divider sx={{ my: 0.5 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography sx={{ fontSize: '18px', fontWeight: 800 }}>Total:</Typography>
                  <Typography sx={{ fontSize: '18px', fontWeight: 800, color: '#111827' }}>USD {roomTotal.toFixed(2)}</Typography>
                </Box>
              </Box>

              <Box sx={{ border: '1px solid #BFDBFE', borderRadius: '12px', p: 1.5, bgcolor: '#EFF6FF' }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <InfoIcon sx={{ fontSize: 14, color: '#2563EB', mt: 0.2 }} />
                  <Typography sx={{ fontSize: '11px', color: '#1E40AF', fontWeight: 500 }}>
                    Confirmation will be sent to your email. Payment is secure and encrypted.
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Checkout;
