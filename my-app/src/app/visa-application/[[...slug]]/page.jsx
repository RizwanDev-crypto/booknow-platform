'use client';

import React, { useState, useEffect, Suspense } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  IconButton,
  MenuItem,
  Checkbox,
  FormControl,
  ListItem,
  ListItemButton,
  ListItemText,
  List,
  Divider,
  ClickAwayListener,
  InputAdornment,
  FormControlLabel,
} from '@mui/material';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { useSearchParams, useRouter } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import RequestQuoteOutlinedIcon from '@mui/icons-material/RequestQuoteOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import SortIcon from '@mui/icons-material/Sort';
import dayjs from 'dayjs';

function VisaApplicationContent({ slug = [] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Extract from slug: [destination, nationality, visaType, date, travelers, processingSpeed]
  const slugTo = slug[0] ? decodeURIComponent(slug[0]) : null;
  const slugFrom = slug[1] ? decodeURIComponent(slug[1]) : null;
  const slugType = slug[2] ? decodeURIComponent(slug[2]) : null;
  const slugDate = slug[3] ? decodeURIComponent(slug[3]) : null;
  const slugTravelers = slug[4] ? decodeURIComponent(slug[4]) : null;
  const slugSpeed = slug[5] ? decodeURIComponent(slug[5]) : null;

  const to = slugTo || searchParams.get('to') || 'Destination';
  const from = slugFrom || searchParams.get('from') || 'Origin';
  const rawDate = slugDate || searchParams.get('date');
  const dateStr = rawDate ? dayjs(rawDate).format('MMM DD, YYYY') : 'Date';
  const travelers = parseInt(slugTravelers || searchParams.get('travelers') || '1');
  const type = slugType || searchParams.get('type') || 'Tourist Visa';
  const speed = slugSpeed || searchParams.get('speed') || 'Standard';

  const [bookingType, setBookingType] = useState('guest'); // 'guest' or 'login'
  const [isBookingDetailsOpen, setIsBookingDetailsOpen] = useState(true);
  const [isTravelerDetailsOpen, setIsTravelerDetailsOpen] = useState(true);
  const [isDocumentsOpen, setIsDocumentsOpen] = useState(true);
  const [isAdditionalReqOpen, setIsAdditionalReqOpen] = useState(true);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [nationalities, setNationalities] = useState([]);

  const [guestData, setGuestData] = useState({
    title: 'Mr',
    firstName: '',
    lastName: '',
    email: '',
    countryCode: 'AF',
    phone: '',
  });

  const [travelerDetails, setTravelerDetails] = useState([]);

  useEffect(() => {
    const fetchNationalities = async () => {
      try {
        const response = await fetch('/api/nationalities');
        const data = await response.json();
        setNationalities(data);
      } catch (error) {
        console.error('Error fetching nationalities:', error);
      }
    };
    fetchNationalities();
  }, []);

  useEffect(() => {
    setTravelerDetails(Array(travelers).fill().map(() => ({
      firstName: '',
      lastName: '',
      passportNumber: '',
      nationality: from !== 'Origin' ? from : '',
      passportExpiry: { day: 'Day', month: 'Month', year: 'Year' },
      dob: { day: 'Day', month: 'Month', year: 'Year' },
    })));
  }, [travelers, from]);

  const toggleDropdown = (id) => {
    setOpenDropdowns(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const closeDropdown = (id) => {
    setOpenDropdowns(prev => ({ ...prev, [id]: false }));
  };

  const updateTravelerDetail = (index, field, value) => {
    setTravelerDetails(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const updateTravelerDate = (index, dateType, part, value) => {
    setTravelerDetails(prev => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [dateType]: { ...updated[index][dateType], [part]: value }
      };
      return updated;
    });
  };

  const handleFileChange = (travelerIndex, docType, event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFiles(prev => ({
        ...prev,
        [`traveler${travelerIndex}-${docType}`]: file.name
      }));
    }
  };

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
    bgcolor: '#64748B',
    color: '#fff',
    p: 1.5,
    borderRadius: '8px 8px 0 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  };

  return (
    <Box sx={{ 
      background: 'linear-gradient(to right, #fefefe 30%, #e4eaf1 100%)', 
      minHeight: '100vh', 
      py: 2 
    }}>
      <Container maxWidth="lg">
        {/* Header Navigation */}
        <Box sx={{ mb: 3 }} width={450}>
          <Button
            startIcon={<ArrowBackIcon sx={{ fontSize: 18, color: '#4B5563' }} />}
            onClick={() => router.back()}
            sx={{ 
              textTransform: 'none', 
              color: '#4B5563',
              fontSize: '14px',
              '&:hover': { bgcolor: 'transparent', color: '#0058E6' }
            }}
          >
            Back to Search
          </Button>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 1 }}>
            <Box sx={{ p: 0.8, borderRadius: '6px', display: 'flex' }}>
              <DescriptionOutlinedIcon sx={{ color: '#2563EB', fontSize: 22 }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#111827' }}>
              Visa Application
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
          {/* Main Content */}
          <Grid item xs={12} md={5} lg={5} width={670}>
            {/* Guest Details Section */}
            <Paper elevation={0} sx={{ border: '1px solid #E2E8F0', borderRadius: '12px', mb: 3 }}>
              <Box 
                onClick={() => setIsBookingDetailsOpen(!isBookingDetailsOpen)}
                sx={{...sectionHeaderStyles, bgcolor: '#1f293780', height: '48px', cursor: 'pointer'}}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <GroupsOutlinedIcon sx={{ fontSize: 20 , color: '#9CA3AF'}} />
                  <Typography sx={{ fontSize: '14px', fontWeight: 600 , color: '#F3F4F6'}}>Guest Details</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                   <Typography sx={{ fontSize: '12px', opacity: 0.9,  color: '#6B7280' }}>Booking as: <Box component="span" sx={{ fontWeight: 700, color: '#2563EB' }}>Guest</Box></Typography>
                   <IconButton size="small" sx={{ color: '#4B5563' }}>
                     {isBookingDetailsOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                   </IconButton>
                </Box>
              </Box>
              
              {isBookingDetailsOpen && (
                <Box sx={{ p: 3 , }}>
                  {/* Booking Type Toggle */}
                  <Grid container spacing={2} sx={{p:1.5, mb: 3 ,backgroundColor: '#1f2937' , borderRadius: '10px'}}>
                    <Grid item xs={12} md={6} lg={4} width={290} >

    <Box
      onClick={() => setBookingType('guest')}
      sx={{
        p: 2,
        borderRadius: '10px',
        border: `2px solid ${bookingType === 'guest' ? '#0058E6' : '#E2E8F0'}`,
        bgcolor: bookingType === 'guest' ? '#EFF6FF' : '#fff',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 1.5,
        transition: 'all 0.2s',
      
      }}
    >
                        <Box sx={{ 
                          width: 20, 
                          height: 20, 
                          minWidth: 20,
                          flexShrink: 0,
                          borderRadius: '50%', 
                          border: `2px solid ${bookingType === 'guest' ? '#0058e6' : '#cbd5e1'}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mt: 0.3,
                        }}>
                          {bookingType === 'guest' && <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#0058E6' }} />}
                        </Box>
                        <Box>
                          <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#1E293B', display: 'flex', alignItems: 'center', gap: 1 }}>
                            <PersonOutlineOutlinedIcon sx={{ fontSize: 18 }} /> Guest Booking
                          </Typography>
                          <Typography sx={{ fontSize: '12px', color: '#64748B', mt: 0.5 }}>
                            You are booking as a guest. You can create an account during booking.
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6} width={290}>
    <Box
      onClick={() => setBookingType('login')}
      sx={{
        p: 2,
        borderRadius: '10px',
        border: `2px solid ${bookingType === 'login' ? '#0058E6' : '#E2E8F0'}`,
        bgcolor: '#ffffff',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 1.5,
        transition: 'all 0.2s',
      }}
    >
                        <Box sx={{ 
                          width: 20, 
                          height: 20, 
                          minWidth: 20,
                          flexShrink: 0,
                          borderRadius: '50%', 
                          border: `2px solid ${bookingType === 'login' ? '#0058e6' : '#cbd5e1'}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mt: 0.3
                        }}>
                          {bookingType === 'login' && <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#0058E6' }} />}
                        </Box>
                        <Box>
                          <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#1E293B', display: 'flex', alignItems: 'center', gap: 1 }}>
                            <LoginOutlinedIcon sx={{ fontSize: 18 }} /> Login your Account
                          </Typography>
                          <Typography sx={{ fontSize: '12px', color: '#64748B', mt: 0.5 }}>
                            Log in to access your saved details and manage your bookings easily.
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>

                  {bookingType === 'guest' ? (
                    <Grid container spacing={2.5}>
                      <Grid item xs={12} sm={4} width={192}>
                        <Typography sx={labelStyles}>Title</Typography>
                        <Box sx={{ position: 'relative' }}>
                          <TextField
                            fullWidth
                            value={guestData.title}
                            onClick={() => toggleDropdown('guest-title')}
                            readOnly
                            InputProps={{
                              readOnly: true,
                              endAdornment: (
                                <InputAdornment position="end">
                                  <ExpandMoreOutlinedIcon sx={{ 
                                    fontSize: 18, 
                                    transition: 'transform 0.2s',
                                    transform: openDropdowns['guest-title'] ? 'rotate(180deg)' : 'none',
                                    color: '#020817'
                                  }} />
                                </InputAdornment>
                              ),
                            }}
                            sx={inputStyles}
                          />
                          {openDropdowns['guest-title'] && (
                            <ClickAwayListener onClickAway={() => closeDropdown('guest-title')}>
                              <Paper sx={{ 
                                position: 'absolute', 
                                top: '100%', 
                                left: 0, 
                                right: 0, 
                                mt: 0.5, 
                                zIndex: 1400, 
                                borderRadius: '12px', 
                                border: '1px solid #f1f5f9', 
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
                                overflow: 'hidden'
                              }}>
                                <List sx={{ p: 0 }}>
                                  {['Mr', 'Ms', 'Mrs'].map((t) => (
                                    <ListItem key={t} disablePadding>
                                      <ListItemButton 
                                        onClick={() => { setGuestData({ ...guestData, title: t }); closeDropdown('guest-title'); }} 
                                        sx={{ py: 1, '&:hover': { bgcolor: '#F8FAFC' } }}
                                      >
                                        <ListItemText primary={t} primaryTypographyProps={{ fontSize: '14px', color: '#1F2937' }} />
                                      </ListItemButton>
                                    </ListItem>
                                  ))}
                                </List>
                              </Paper>
                            </ClickAwayListener>
                          )}
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={4} width={192}>
                        <Typography sx={labelStyles}>First Name</Typography>
                        <TextField 
                          fullWidth 
                          placeholder="Enter First Name" 
                          sx={inputStyles} 
                          value={guestData.firstName}
                          onChange={(e) => setGuestData({ ...guestData, firstName: e.target.value })}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4} width={192}>
                        <Typography sx={labelStyles}>Last Name</Typography>
                        <TextField 
                          fullWidth 
                          placeholder="Enter Last Name" 
                          sx={inputStyles} 
                          value={guestData.lastName}
                          onChange={(e) => setGuestData({ ...guestData, lastName: e.target.value })}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4} width={192}>
                        <Typography sx={labelStyles}>Email</Typography>
                        <TextField 
                          fullWidth 
                          placeholder="Enter Email" 
                          sx={inputStyles} 
                          value={guestData.email}
                          onChange={(e) => setGuestData({ ...guestData, email: e.target.value })}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4} width={192}>
                        <Typography sx={labelStyles}>Country Code</Typography>
                        <Box sx={{ position: 'relative' }}>
                          <TextField
                            fullWidth
                            value={guestData.countryCode}
                            onClick={() => toggleDropdown('guest-countryCode')}
                            readOnly
                            InputProps={{
                              readOnly: true,
                              endAdornment: (
                                <InputAdornment position="end">
                                  <ExpandMoreOutlinedIcon sx={{ 
                                    fontSize: 18, 
                                    transition: 'transform 0.2s',
                                    transform: openDropdowns['guest-countryCode'] ? 'rotate(180deg)' : 'none',
                                    color: '#020817'
                                  }} />
                                </InputAdornment>
                              ),
                            }}
                            sx={inputStyles}
                          />
                          {openDropdowns['guest-countryCode'] && (
                            <ClickAwayListener onClickAway={() => closeDropdown('guest-countryCode')}>
                              <Paper sx={{ 
                                position: 'absolute', 
                                top: '100%', 
                                left: 0, 
                                right: 0, 
                                mt: 0.5, 
                                zIndex: 1400, 
                                borderRadius: '12px', 
                                border: '1px solid #f1f5f9', 
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
                                overflow: 'auto',
                                maxHeight: '250px'
                              }}>
                                <List sx={{ p: 0 }}>
                                  {[
                                    { code: 'AF', dial: '+93' },
                                    { code: 'PK', dial: '+92' },
                                    { code: 'IN', dial: '+91' },
                                    { code: 'AE', dial: '+971' },
                                    { code: 'GB', dial: '+44' },
                                    { code: 'US', dial: '+1' },
                                  ].map((c) => (
                                    <ListItem key={c.code} disablePadding>
                                      <ListItemButton 
                                        onClick={() => { setGuestData({ ...guestData, countryCode: c.code }); closeDropdown('guest-countryCode'); }} 
                                        sx={{ py: 1, '&:hover': { bgcolor: '#F8FAFC' } }}
                                      >
                                        <ListItemText primary={`${c.code} ${c.dial}`} primaryTypographyProps={{ fontSize: '14px', color: '#1F2937' }} />
                                      </ListItemButton>
                                    </ListItem>
                                  ))}
                                </List>
                              </Paper>
                            </ClickAwayListener>
                          )}
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={4} width={192}>
                        <Typography sx={labelStyles}>Phone</Typography>
                        <TextField 
                          fullWidth 
                          placeholder="Enter Phone Number" 
                          sx={inputStyles} 
                          value={guestData.phone}
                          onChange={(e) => setGuestData({ ...guestData, phone: e.target.value })}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Divider sx={{ my: 1, mx: -3 }} />
                        <FormControlLabel
                          control={<Checkbox sx={{ color: '#E2E8F0', '&.Mui-checked': { color: '#0058E6' } }} />}
                          label={
                            <Box>
                              <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#1E293B' }}>I'm booking for someone else!</Typography>
                              <Typography sx={{ fontSize: '12px', color: '#64748B' }}>Fill in the traveler's details below if you are booking on behalf of someone else.</Typography>
                            </Box>
                          }
                        />
                      </Grid>
                    </Grid>
                  ) : (
                    <Box sx={{ 
                      p: 2, 
                      borderRadius: '12px', 
                      bgcolor: '#d2d8e8', 
                      border: '1.5px solid #0058E6',
                      mt: 1
                    }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} width={286}>
                          <Typography sx={{ ...labelStyles, color: '#020817', fontWeight: 600, fontSize: '14px' }}>Email</Typography>
                          <TextField 
                            fullWidth 
                            placeholder="Enter Email" 
                            sx={{
                              ...inputStyles,
                              '& .MuiOutlinedInput-root': {
                                ...inputStyles['& .MuiOutlinedInput-root'],
                                height: '37px',
                                bgcolor: '#fff'
                              }
                            }} 
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} width={284}>
                          <Typography sx={{ ...labelStyles, color: '#020817', fontWeight: 600, fontSize: '14px' }}>Password</Typography>
                          <TextField 
                            fullWidth 
                            type="password"
                            placeholder="Enter password" 
                            sx={{
                              ...inputStyles,
                              '& .MuiOutlinedInput-root': {
                                ...inputStyles['& .MuiOutlinedInput-root'],
                                height: '37px',
                                bgcolor: '#fff'
                              }
                            }} 
                          />
                        </Grid>
                        
                        <Grid item xs={6} width={477}>
                          <Typography sx={{ fontSize: '12px', color: '#2563EB', fontWeight: 400, cursor: 'pointer', mt: 0.5 }}>
                            Forgot Password?
                          </Typography>
                        </Grid>
                        <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                          <Button 
                            variant="contained" 
                            sx={{ 
                              bgcolor: '#0058E6', 
                              textTransform: 'none', 
                              borderRadius: '8px',
                              px: 2,
                              py: 1,
                              fontWeight: 400,
                              fontSize: '12px',
                              '&:hover': { bgcolor: '#0046b8' }
                            }}
                          >
                            <LoginOutlinedIcon sx={{ fontSize: 20, mr: 1 }} /> Login
                          </Button>
                        </Grid>
                        
                        <Grid item xs={12} width={577}>
                          <Box sx={{ textAlign: 'center', mt: 1 }}>
                            <Typography sx={{ fontSize: '12px', color: '#64748B' }}>
                              No account yet? <Box component="span" sx={{ color: '#0058E6', fontWeight: 600, cursor: 'pointer' , fontSize: '12px'}}>Sign Up</Box>
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  )}
                </Box>
              )}
            </Paper>

            {/* Travelers Information Section */}
            <Paper elevation={0} sx={{ border: '1px solid #E2E8F0', borderRadius: '12px' }}>
              <Box 
                onClick={() => setIsTravelerDetailsOpen(!isTravelerDetailsOpen)}
                sx={{ ...sectionHeaderStyles, bgcolor: '#1f293780', height: '48px', cursor: 'pointer' }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <GroupsOutlinedIcon sx={{ fontSize: 20, color: '#9CA3AF' }} />
                  <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#F3F4F6' }}>Travelers Information</Typography>
                </Box>
                <IconButton size="small" sx={{ color: '#4B5563' }}>
                   {isTravelerDetailsOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </Box>

              {isTravelerDetailsOpen && (
                <Box sx={{ p: 3 }}>
                  {travelerDetails.map((traveler, index) => (
                    <Box key={index} sx={{ border: '1px solid #F1F5F9', borderRadius: '10px', bgcolor: '#F8FAFC', p: 3, mb: index === travelers - 1 ? 0 : 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                        <PersonOutlineOutlinedIcon sx={{ color: '#0058E6' }} />
                        <Typography sx={{ fontWeight: 700, color: '#1E293B' }}>Traveler {index + 1}</Typography>
                      </Box>
                      
                      <Grid container spacing={2.5}>
                        <Grid item xs={12} sm={4} width={275}>
                          <Typography sx={labelStyles}><DescriptionOutlinedIcon sx={{ fontSize: 16 }} /> First Name</Typography>
                          <TextField 
                            fullWidth 
                            sx={inputStyles} 
                            value={traveler.firstName}
                            onChange={(e) => updateTravelerDetail(index, 'firstName', e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12} sm={4} width={275}>
                          <Typography sx={labelStyles}><DescriptionOutlinedIcon sx={{ fontSize: 16 }} /> Last Name</Typography>
                          <TextField 
                            fullWidth 
                            sx={inputStyles} 
                            value={traveler.lastName}
                            onChange={(e) => updateTravelerDetail(index, 'lastName', e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12} sm={4} width={275}>
                          <Typography sx={labelStyles}><DescriptionOutlinedIcon sx={{ fontSize: 16 }} /> Passport Number</Typography>
                          <TextField 
                            fullWidth 
                            placeholder="Enter Passport Number" 
                            sx={inputStyles} 
                            value={traveler.passportNumber}
                            onChange={(e) => updateTravelerDetail(index, 'passportNumber', e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12} sm={4} width={275}>
                          <Typography sx={labelStyles}><PublicOutlinedIcon sx={{ fontSize: 16 }} /> Nationality</Typography>
                          <Box sx={{ position: 'relative' }}>
                            <TextField
                              fullWidth
                              placeholder="Search Nationality"
                              value={traveler.nationality}
                              onClick={() => toggleDropdown(`traveler-${index}-nationality`)}
                              onChange={(e) => {
                                updateTravelerDetail(index, 'nationality', e.target.value);
                                if (!openDropdowns[`traveler-${index}-nationality`]) toggleDropdown(`traveler-${index}-nationality`);
                              }}
                              autoComplete="off"
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <ExpandMoreOutlinedIcon sx={{ 
                                      fontSize: 18, 
                                      transition: 'transform 0.2s',
                                      transform: openDropdowns[`traveler-${index}-nationality`] ? 'rotate(180deg)' : 'none',
                                      color: '#020817'
                                    }} />
                                  </InputAdornment>
                                ),
                              }}
                              sx={inputStyles}
                            />
                            {openDropdowns[`traveler-${index}-nationality`] && (
                              <ClickAwayListener onClickAway={() => closeDropdown(`traveler-${index}-nationality`)}>
                                <Paper sx={{ 
                                  position: 'absolute', 
                                  top: '100%', 
                                  left: 0, 
                                  right: 0, 
                                  mt: 0.5, 
                                  zIndex: 1400, 
                                  borderRadius: '12px', 
                                  border: '1px solid #f1f5f9', 
                                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
                                  overflow: 'auto',
                                  maxHeight: '250px'
                                }}>
                                  <List sx={{ p: 0 }}>
                                    {nationalities
                                      .filter(n => n.name.toLowerCase().includes(traveler.nationality.toLowerCase()))
                                      .map((n) => (
                                        <ListItem key={n.code} disablePadding>
                                          <ListItemButton 
                                            onClick={() => { updateTravelerDetail(index, 'nationality', n.name); closeDropdown(`traveler-${index}-nationality`); }} 
                                            sx={{ py: 1, '&:hover': { bgcolor: '#F8FAFC' } }}
                                          >
                                            <ListItemText primary={n.name} primaryTypographyProps={{ fontSize: '14px', color: '#1F2937' }} />
                                          </ListItemButton>
                                        </ListItem>
                                      ))}
                                  </List>
                                </Paper>
                              </ClickAwayListener>
                            )}
                          </Box>
                        </Grid>
                        
                        {/* Expiry Date */}
                        <Grid item xs={12}>
                          <Typography sx={labelStyles}><CalendarMonthOutlinedIcon sx={{ fontSize: 16 }} /> Passport Expiry Date</Typography>
                          <Grid container spacing={1}>
                            <Grid item xs={4} width={184}>
                              <Box sx={{ position: 'relative' }}>
                                <TextField
                                  fullWidth
                                  value={traveler.passportExpiry.day}
                                  onClick={() => toggleDropdown(`traveler-${index}-expiry-day`)}
                                  readOnly
                                  InputProps={{
                                    readOnly: true,
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <ExpandMoreOutlinedIcon sx={{ 
                                          fontSize: 16, 
                                          transition: 'transform 0.2s',
                                          transform: openDropdowns[`traveler-${index}-expiry-day`] ? 'rotate(180deg)' : 'none',
                                          color: '#020817'
                                        }} />
                                      </InputAdornment>
                                    ),
                                  }}
                                  sx={inputStyles}
                                />
                                {openDropdowns[`traveler-${index}-expiry-day`] && (
                                  <ClickAwayListener onClickAway={() => closeDropdown(`traveler-${index}-expiry-day`)}>
                                    <Paper sx={{ position: 'absolute', top: '100%', left: 0, right: 0, mt: 0.5, zIndex: 1400, borderRadius: '10px', border: '1px solid #f1f5f9', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)', maxHeight: '200px', overflow: 'auto' }}>
                                      <List sx={{ p: 0 }}>
                                        {['Day', ...Array.from({ length: 31 }, (_, i) => (i + 1).toString())].map((d) => (
                                          <ListItem key={d} disablePadding>
                                            <ListItemButton onClick={() => { updateTravelerDate(index, 'passportExpiry', 'day', d); closeDropdown(`traveler-${index}-expiry-day`); }} sx={{ py: 0.8 }}>
                                              <ListItemText primary={d} primaryTypographyProps={{ fontSize: '13px' }} />
                                            </ListItemButton>
                                          </ListItem>
                                        ))}
                                      </List>
                                    </Paper>
                                  </ClickAwayListener>
                                )}
                              </Box>
                            </Grid>
                            <Grid item xs={4} width={185}>
                              <Box sx={{ position: 'relative' }}>
                                <TextField
                                  fullWidth
                                  value={traveler.passportExpiry.month}
                                  onClick={() => toggleDropdown(`traveler-${index}-expiry-month`)}
                                  readOnly
                                  InputProps={{
                                    readOnly: true,
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <ExpandMoreOutlinedIcon sx={{ fontSize: 16, color: '#020817' }} />
                                      </InputAdornment>
                                    ),
                                  }}
                                  sx={inputStyles}
                                />
                                {openDropdowns[`traveler-${index}-expiry-month`] && (
                                  <ClickAwayListener onClickAway={() => closeDropdown(`traveler-${index}-expiry-month`)}>
                                    <Paper sx={{ position: 'absolute', top: '100%', left: 0, right: 0, mt: 0.5, zIndex: 1400, borderRadius: '10px', border: '1px solid #f1f5f9', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)', maxHeight: '200px', overflow: 'auto' }}>
                                      <List sx={{ p: 0 }}>
                                        {['Month', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m) => (
                                          <ListItem key={m} disablePadding>
                                            <ListItemButton onClick={() => { updateTravelerDate(index, 'passportExpiry', 'month', m); closeDropdown(`traveler-${index}-expiry-month`); }} sx={{ py: 0.8 }}>
                                              <ListItemText primary={m} primaryTypographyProps={{ fontSize: '13px' }} />
                                            </ListItemButton>
                                          </ListItem>
                                        ))}
                                      </List>
                                    </Paper>
                                  </ClickAwayListener>
                                )}
                              </Box>
                            </Grid>
                            <Grid item xs={4} width={185} >
                              <Box sx={{ position: 'relative' }}>
                                <TextField
                                  fullWidth
                                  value={traveler.passportExpiry.year}
                                  onClick={() => toggleDropdown(`traveler-${index}-expiry-year`)}
                                  readOnly
                                  InputProps={{
                                    readOnly: true,
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <ExpandMoreOutlinedIcon sx={{ fontSize: 16, color: '#020817' }} />
                                      </InputAdornment>
                                    ),
                                  }}
                                  sx={inputStyles}
                                />
                                {openDropdowns[`traveler-${index}-expiry-year`] && (
                                  <ClickAwayListener onClickAway={() => closeDropdown(`traveler-${index}-expiry-year`)}>
                                    <Paper sx={{ position: 'absolute', top: '100%', left: 0, right: 0, mt: 0.5, zIndex: 1400, borderRadius: '10px', border: '1px solid #f1f5f9', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)', maxHeight: '200px', overflow: 'auto' }}>
                                      <List sx={{ p: 0 }}>
                                        {['Year', ...Array.from({ length: 20 }, (_, i) => (dayjs().year() + i).toString())].map((y) => (
                                          <ListItem key={y} disablePadding>
                                            <ListItemButton onClick={() => { updateTravelerDate(index, 'passportExpiry', 'year', y); closeDropdown(`traveler-${index}-expiry-year`); }} sx={{ py: 0.8 }}>
                                              <ListItemText primary={y} primaryTypographyProps={{ fontSize: '13px' }} />
                                            </ListItemButton>
                                          </ListItem>
                                        ))}
                                      </List>
                                    </Paper>
                                  </ClickAwayListener>
                                )}
                              </Box>
                            </Grid>
                          </Grid>
                        </Grid>

                        {/* DOB */}
                        <Grid item xs={12}>
                          <Typography sx={labelStyles}><CalendarMonthOutlinedIcon sx={{ fontSize: 16 }} /> Date of Birth</Typography>
                          <Grid container spacing={1}>
                            <Grid item xs={4} width={184}>
                              <Box sx={{ position: 'relative' }}>
                                <TextField
                                  fullWidth
                                  value={traveler.dob.day}
                                  onClick={() => toggleDropdown(`traveler-${index}-dob-day`)}
                                  readOnly
                                  InputProps={{
                                    readOnly: true,
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <ExpandMoreOutlinedIcon sx={{ fontSize: 16, color: '#020817' }} />
                                      </InputAdornment>
                                    ),
                                  }}
                                  sx={inputStyles}
                                />
                                {openDropdowns[`traveler-${index}-dob-day`] && (
                                  <ClickAwayListener onClickAway={() => closeDropdown(`traveler-${index}-dob-day`)}>
                                    <Paper sx={{ position: 'absolute', top: '100%', left: 0, right: 0, mt: 0.5, zIndex: 1400, borderRadius: '10px', border: '1px solid #f1f5f9', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)', maxHeight: '200px', overflow: 'auto' }}>
                                      <List sx={{ p: 0 }}>
                                        {['Day', ...Array.from({ length: 31 }, (_, i) => (i + 1).toString())].map((d) => (
                                          <ListItem key={d} disablePadding>
                                            <ListItemButton onClick={() => { updateTravelerDate(index, 'dob', 'day', d); closeDropdown(`traveler-${index}-dob-day`); }} sx={{ py: 0.8 }}>
                                              <ListItemText primary={d} primaryTypographyProps={{ fontSize: '13px' }} />
                                            </ListItemButton>
                                          </ListItem>
                                        ))}
                                      </List>
                                    </Paper>
                                  </ClickAwayListener>
                                )}
                              </Box>
                            </Grid>
                            <Grid item xs={4} width={184}>
                              <Box sx={{ position: 'relative' }}>
                                <TextField
                                  fullWidth
                                  value={traveler.dob.month}
                                  onClick={() => toggleDropdown(`traveler-${index}-dob-month`)}
                                  readOnly
                                  InputProps={{
                                    readOnly: true,
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <ExpandMoreOutlinedIcon sx={{ fontSize: 16, color: '#020817' }} />
                                      </InputAdornment>
                                    ),
                                  }}
                                  sx={inputStyles}
                                />
                                {openDropdowns[`traveler-${index}-dob-month`] && (
                                  <ClickAwayListener onClickAway={() => closeDropdown(`traveler-${index}-dob-month`)}>
                                    <Paper sx={{ position: 'absolute', top: '100%', left: 0, right: 0, mt: 0.5, zIndex: 1400, borderRadius: '10px', border: '1px solid #f1f5f9', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)', maxHeight: '200px', overflow: 'auto' }}>
                                      <List sx={{ p: 0 }}>
                                        {['Month', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m) => (
                                          <ListItem key={m} disablePadding>
                                            <ListItemButton onClick={() => { updateTravelerDate(index, 'dob', 'month', m); closeDropdown(`traveler-${index}-dob-month`); }} sx={{ py: 0.8 }}>
                                              <ListItemText primary={m} primaryTypographyProps={{ fontSize: '13px' }} />
                                            </ListItemButton>
                                          </ListItem>
                                        ))}
                                      </List>
                                    </Paper>
                                  </ClickAwayListener>
                                )}
                              </Box>
                            </Grid>
                            <Grid item xs={4} width={184}>
                              <Box sx={{ position: 'relative' }}>
                                <TextField
                                  fullWidth
                                  value={traveler.dob.year}
                                  onClick={() => toggleDropdown(`traveler-${index}-dob-year`)}
                                  readOnly
                                  InputProps={{
                                    readOnly: true,
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <ExpandMoreOutlinedIcon sx={{ fontSize: 16, color: '#020817' }} />
                                      </InputAdornment>
                                    ),
                                  }}
                                  sx={inputStyles}
                                />
                                {openDropdowns[`traveler-${index}-dob-year`] && (
                                  <ClickAwayListener onClickAway={() => closeDropdown(`traveler-${index}-dob-year`)}>
                                    <Paper sx={{ position: 'absolute', top: '100%', left: 0, right: 0, mt: 0.5, zIndex: 1400, borderRadius: '10px', border: '1px solid #f1f5f9', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)', maxHeight: '200px', overflow: 'auto' }}>
                                      <List sx={{ p: 0 }}>
                                        {['Year', ...Array.from({ length: 100 }, (_, i) => (dayjs().year() - i).toString())].map((y) => (
                                          <ListItem key={y} disablePadding>
                                            <ListItemButton onClick={() => { updateTravelerDate(index, 'dob', 'year', y); closeDropdown(`traveler-${index}-dob-year`); }} sx={{ py: 0.8 }}>
                                              <ListItemText primary={y} primaryTypographyProps={{ fontSize: '13px' }} />
                                            </ListItemButton>
                                          </ListItem>
                                        ))}
                                      </List>
                                    </Paper>
                                  </ClickAwayListener>
                                )}
                              </Box>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Box>
                  ))}
                </Box>
              )}
            </Paper>

            {/* Document Uploads Section */}
            <Paper elevation={0} sx={{ border: '1px solid #E2E8F0', borderRadius: '12px', mb: 3, mt: 3 }}>
              <Box 
                onClick={() => setIsDocumentsOpen(!isDocumentsOpen)}
                sx={{ ...sectionHeaderStyles, bgcolor: '#1f293780', height: '48px', cursor: 'pointer' }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CloudUploadOutlinedIcon sx={{ fontSize: 20, color: '#9CA3AF' }} />
                  <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#F3F4F6' }}>Document Uploads</Typography>
                </Box>
                <IconButton size="small" sx={{ color: '#4B5563' }}>
                   {isDocumentsOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </Box>

              {isDocumentsOpen && (
                <Box sx={{ p: 3 }}>
                  {[...Array(travelers)].map((_, index) => (
                    <Box key={index} sx={{ mb: index === travelers - 1 ? 0 : 4 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <PersonOutlineOutlinedIcon sx={{ color: '#0058E6', fontSize: 20 }} />
                        <Typography sx={{ fontWeight: 700, color: '#1E293B', fontSize: '15px' }}>Traveler {index + 1} - Documents</Typography>
                      </Box>
                      
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} width={290}>
                          <Box sx={{ border: '1px solid #E2E8F0', borderRadius: '8px', p: 2 }}>
                             <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#1E293B', mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                               <DescriptionOutlinedIcon sx={{ fontSize: 16, color: '#64748B' }} /> Passport Copy
                             </Typography>
                             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, border: '1px solid #CBD5E1', borderRadius: '6px', p: 0.5 }}>
                               <Button 
                                component="label"
                                variant="outlined" 
                                size="small" 
                                sx={{ textTransform: 'none', color: '#1E293B', borderColor: '#CBD5E1', minWidth: '80px', bgcolor: '#F1F5F9' }}
                               >
                                Choose File
                                <input
                                  type="file"
                                  hidden
                                  onChange={(e) => handleFileChange(index + 1, 'passport', e)}
                                />
                               </Button>
                               <Typography sx={{ fontSize: '12px', color: '#64748B' }}>
                                 {uploadedFiles[`traveler${index + 1}-passport`] || 'No file chosen'}
                               </Typography>
                             </Box>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} width={290}>
                          <Box sx={{ border: '1px solid #E2E8F0', borderRadius: '8px', p: 2 }}>
                             <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#1E293B', mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                               <DescriptionOutlinedIcon sx={{ fontSize: 16, color: '#64748B' }} /> National ID Copy (Optional)
                             </Typography>
                             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, border: '1px solid #CBD5E1', borderRadius: '6px', p: 0.5 }}>
                               <Button 
                                component="label"
                                variant="outlined" 
                                size="small" 
                                sx={{ textTransform: 'none', color: '#1E293B', borderColor: '#CBD5E1', minWidth: '80px', bgcolor: '#F1F5F9' }}
                               >
                                Choose File
                                <input
                                  type="file"
                                  hidden
                                  onChange={(e) => handleFileChange(index + 1, 'nationalId', e)}
                                />
                               </Button>
                               <Typography sx={{ fontSize: '12px', color: '#64748B' }}>
                                 {uploadedFiles[`traveler${index + 1}-nationalId`] || 'No file chosen'}
                               </Typography>
                             </Box>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  ))}
                </Box>
              )}
            </Paper>

            {/* Additional Requirements Section */}
            <Paper elevation={0} sx={{ border: '1px solid #E2E8F0', borderRadius: '12px', mb: 3 }}>
              <Box 
                onClick={() => setIsAdditionalReqOpen(!isAdditionalReqOpen)}
                sx={{ ...sectionHeaderStyles, bgcolor: '#1f293780', height: '48px', cursor: 'pointer' }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AssignmentOutlinedIcon sx={{ fontSize: 20, color: '#9CA3AF' }} />
                  <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#F3F4F6' }}>Additional Requirements (Optional)</Typography>
                </Box>
                <IconButton size="small" sx={{ color: '#4B5563' }}>
                   {isAdditionalReqOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </Box>

              {isAdditionalReqOpen && (
                <Box sx={{ p: 3 }}>
                  <Typography sx={{ ...labelStyles, mb: 1, fontSize: '14px' }}><SortIcon sx={{ fontSize: 14,color: '#020817', mr: 1 }} /> Special Requests</Typography> 
                  <TextField 
                    fullWidth 
                    multiline 
                    rows={1} 
                    placeholder="Enter any special requests or additional requirements here..." 
                    sx={{ 
                      ...inputStyles, 
                      '& .MuiOutlinedInput-root': { 
                        ...inputStyles['& .MuiOutlinedInput-root'],
                        height: '50px', 
                        borderRadius: '8px',
                        '& textarea': {
                          resize: 'none !important'
                        }
                      },
                      '& .MuiOutlinedInput-input::placeholder': {
                        color: '#94A3B8',
                        opacity: 1
                      }
                    }} 
                  />
                </Box>
              )}
            </Paper>

             {/* Submit Section */}
            <Box sx={{ mb: 4 }}>
              <Box sx={{ bgcolor: '#fff', border: '1px solid #E2E8F0', borderRadius: '12px', p: 1.3, mb: 2 }}>
                <FormControlLabel
                  control={<Checkbox checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} sx={{ color: '#E2E8F0', '&.Mui-checked': { color: '#0058E6' } }} />}
                  label={<Typography sx={{ fontSize: '14px', color: '#1E293B' }}>I agree to the <Box component="span" sx={{ color: '#0058E6', fontWeight: 600 }}>Terms and Conditions</Box></Typography>}
                />
              </Box>
              <Button 
                variant="contained" 
                fullWidth 
                size="large"
                sx={{ 
                  bgcolor: agreedToTerms ? '#0046B8' : '#79a7ef', 
                  textTransform: 'none', 
                  fontSize: '16px', 
                  fontWeight: 600, 
                  py: 1,
                  borderRadius: '10px',
                  boxShadow: 'none',
                  '&:hover': { bgcolor: agreedToTerms ? '#00358E' : '#79a7ef', boxShadow: 'none' }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 , fontSize: '16px'}}>
                  <LockOutlinedIcon sx={{ fontSize: 24 }} /> Submit Application
                </Box>
              </Button>
            </Box>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4} width={450} sx={{ 
            position: { md: 'sticky' }, 
            top: { md: 16 }, 
            alignSelf: 'flex-start',
            maxHeight: { md: 'calc(100vh - 0px)' },
            overflowY: { md: 'auto' },
            '&::-webkit-scrollbar': {
              display: 'none'
            },
            msOverflowStyle: 'none',
            scrollbarWidth: 'none'
          }}>
            {/* Your Search Card */}
            <Paper elevation={0} sx={{ border: '1px solid #E2E8F0',bgcolor: '#ffffff', borderRadius: '12px', mb: 3, p: 2.5 }}>
              <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#374151', mb: 2 }}>Your Search</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6} width={180}>
                  <Box sx={{ display: 'flex', gap: 1.5 }}>
                    <FlightTakeoffIcon sx={{ color: '#2563eb', fontSize: 24 , mt: 0.5}} />
                    <Box>
                      <Typography sx={{ fontSize: '12px', color: '#4B5563' }}>From</Typography>
                      <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#1F2937' }}>{from}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ display: 'flex', gap: 1.5, width: 180 }}>
                    <FlightLandIcon sx={{ color: '#2563eb', fontSize: 24 , mt: 0.5}} />
                    <Box>
                      <Typography sx={{ fontSize: '12px', color: '#4B5563' }}>To</Typography>
                      <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#1F2937' }}>{to}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6} width={180}>
                  <Box sx={{ display: 'flex', gap: 1.5 }}>
                    <CalendarMonthOutlinedIcon sx={{ color: '#2563eb', fontSize: 24 , mt: 1}} />
                    <Box>
                      <Typography sx={{ fontSize: '12px', color: '#4B5563' }}>Entry Date</Typography>
                      <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#1F2937' }}>{dateStr}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ display: 'flex', gap: 1.5 }}>
                    <GroupsOutlinedIcon sx={{ color: '#2563eb', fontSize: 24 , mt: 1}} />
                    <Box>
                      <Typography sx={{ fontSize: '12px', color: '#4B5563' }}>Travelers</Typography>
                      <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#1F2937' }}>{travelers}</Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Paper>


            {/* Combined Inquiry, Application Details & Price Card */}
            <Paper elevation={0} sx={{ border: '1px solid #E2E8F0', bgcolor: '#ffffff', borderRadius: '12px', p: 2.5, mb: 3 }}>
              {/* Inquiry Note */}
              <Box sx={{ 
                bgcolor: '#EFF6FF', 
                border: '1px solid #BFDBFE', 
                borderRadius: '8px', 
                p: 2, 
                mb: 3,
                display: 'flex',
                gap: 1.5
              }}>
                <InfoOutlinedIcon sx={{ color: '#2563EB', fontSize: 16, mt: 0.2 }} />
                <Typography sx={{ fontSize: '12px', color: '#1E40AF', lineHeight: 1.5 }}>
                  <Box component="span" sx={{ fontWeight: 700 }}>Visa Inquiry:</Box> No payment is required at this stage. Our team will contact you with pricing and further details.
                </Typography>
              </Box>

              {/* Application Details */}
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <DescriptionOutlinedIcon sx={{ color: '#0058E6', fontSize: 20 }} />
                  <Typography sx={{ fontSize: '18px', fontWeight: 700, color: '#111827' }}>Application Details</Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 1.5, mb: 2.5 }}>
                  <GroupsOutlinedIcon sx={{ color: '#94A3B8', fontSize: 20 }} />
                  <Box>
                    <Typography sx={{ fontSize: '12px', color: '#4B5563' }}>Visa Type</Typography>
                    <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#111827' }}>{type}</Typography>
                    <Typography sx={{ fontSize: '12px', color: '#647280' }}>For leisure and tourism purposes</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 1.5 }}>
                  <TimerOutlinedIcon sx={{ color: '#94A3B8', fontSize: 20 }} />
                  <Box>
                    <Typography sx={{ fontSize: '12px', color: '#4B5563' }}>Processing speed</Typography>
                    <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#111827' }}>Standard</Typography>
                    <Typography sx={{ fontSize: '12px', color: '#647280' }}>7-10 business days</Typography>
                  </Box>
                </Box>
              </Box>

              {/* Price Card */}
              <Box sx={{ 
                borderRadius: '8px', 
                border: '1px solid #D1E1FF',
                bgcolor: '#F5F9FF',
                textAlign: 'center',
                p: 3
              }}>
                <RequestQuoteOutlinedIcon sx={{ color: '#2563EB', fontSize: 32, mb: 1 }} />
                <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#1E3A8A', mb: 0.5 }}>Price on Request</Typography>
                <Typography sx={{ fontSize: '12px', color: '#1D4ED8' }}>Our team will provide a quote based on your inquiry.</Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default function VisaApplicationPage({ params }) {
  const resolvedParams = React.use(params);
  const slug = resolvedParams?.slug || [];

  return (
    <Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><Typography>Loading...</Typography></Box>}>
      <VisaApplicationContent slug={slug} />
    </Suspense>
  );
}
