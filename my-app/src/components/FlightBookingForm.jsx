"use client";

import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
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
  Radio,
  RadioGroup,
} from '@mui/material';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
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
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import SortIcon from '@mui/icons-material/Sort';
import FlightIcon from '@mui/icons-material/Flight';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import dayjs from 'dayjs';

import { useGlobalContext } from '@/app/context/GlobalContext';

export default function FlightBookingForm({ 
  flight, 
  onBack,
  adults = 1,
  childrenCount = 0,
  infants = 0
}) {
  const { setHideLayout } = useGlobalContext();

  useEffect(() => {
    setHideLayout(true);
    return () => setHideLayout(false);
  }, [setHideLayout]);

  const travelers = adults + childrenCount + infants;
  
  const [bookingType, setBookingType] = useState('guest'); // 'guest' or 'login'
  const [isBookingDetailsOpen, setIsBookingDetailsOpen] = useState(true);
  const [isPaymentMethodsOpen, setIsPaymentMethodsOpen] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('payLater');
  const [isTravelerDetailsOpen, setIsTravelerDetailsOpen] = useState(true);
  const [isAdditionalReqOpen, setIsAdditionalReqOpen] = useState(true);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSummaryFlightOpen, setIsSummaryFlightOpen] = useState(true);
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
    const details = [];
    // Adults
    for (let i = 0; i < adults; i++) {
      details.push({
        type: 'Adult',
        title: '',
        firstName: '',
        lastName: '',
        passportNumber: '',
        nationality: '',
        passportExpiry: { day: 'Day', month: 'Month', year: 'Year' },
        dob: { day: 'Day', month: 'Month', year: 'Year' },
      });
    }
    // Children
    for (let i = 0; i < childrenCount; i++) {
      details.push({
        type: 'Child',
        title: '',
        firstName: '',
        lastName: '',
        passportNumber: '',
        nationality: '',
        passportExpiry: { day: 'Day', month: 'Month', year: 'Year' },
        dob: { day: 'Day', month: 'Month', year: 'Year' },
      });
    }
    // Infants
    for (let i = 0; i < infants; i++) {
      details.push({
        type: 'Infant',
        title: '',
        firstName: '',
        lastName: '',
        passportNumber: '',
        nationality: '',
        passportExpiry: { day: 'Day', month: 'Month', year: 'Year' },
        dob: { day: 'Day', month: 'Month', year: 'Year' },
      });
    }
    setTravelerDetails(details);
  }, [adults, childrenCount, infants]);

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

  if (!flight) return null;

  return (
    <Box sx={{ 
      background: 'linear-gradient(to right, #fefefe 30%, #e4eaf1 100%)', 
      minHeight: '100vh', 
      py: 2 
    }}>
      <Container maxWidth="lg">
        {/* Header Navigation */}
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: 670 }}>
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
                Booking
              </Typography>
              <Typography sx={{ fontSize: '14px', color: '#475569' }}>
                Select your flight Booking
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
                              <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#1E293B' }}>I&apos;m booking for someone else!</Typography>
                              <Typography sx={{ fontSize: '12px', color: '#64748B' }}>Fill in the traveler&apos;s details below if you are booking on behalf of someone else.</Typography>
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
                  <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#F3F4F6' }}>Passengers Details</Typography>
                </Box>
                <IconButton size="small" sx={{ color: '#4B5563' }}>
                   {isTravelerDetailsOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </Box>

              {isTravelerDetailsOpen && (
                <Box sx={{ p: 3 }}>
                  {travelerDetails.map((traveler, index) => {
                    const isLead = index === 0;
                    const isInfant = traveler.type === 'Infant';
                    return (
                      <Box 
                        key={index} 
                        sx={{ 
                          borderRadius: '10px', 
                          bgcolor: isLead ? '#1f2937' : '#ffffff', 
                          border: isLead ? 'none' : '1px solid #E2E8F0',
                          p: 3, 
                          mb: index === travelers - 1 ? 0 : 3 
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {isLead ? (
                              <PersonOutlineOutlinedIcon sx={{ color: '#fff', fontSize: 20 }} />
                            ) : (
                              <SentimentSatisfiedAltIcon sx={{ fontSize: 20 }} />
                            )}
                            <Typography sx={{ fontWeight: 700, color: isLead ? '#fff' : '#1E293B' }}>
                              {isLead ? 'Lead Traveler' : `${(traveler.type === 'Child' || traveler.type === 'Infant') ? 'Childs Traveller' : traveler.type} ${index}`}
                            </Typography>
                          </Box>
                          {isLead && (
                            <Typography sx={{ fontSize: '12px', color: '#9CA3AF' }}>Synced with guest details</Typography>
                          )}
                        </Box>
                        
                        <Grid container spacing={2.5}>
                          {/* Title */}
                          <Grid item xs={12} sm={4} width={isLead ? 145 : 145}>
                            <Typography sx={{...labelStyles, color: isLead ? '#020817' : '#334155', fontSize: isLead ? '14px' : labelStyles.fontSize }}>Title *</Typography>
                            <Box sx={{ position: 'relative' }}>
                              <TextField
                                fullWidth
                                value={traveler.title || ''} // Assuming title field might be needed, currently just using placeholders in original code? 
                                // Original code had firstName/lastName directly. Let's stick to the requested fields: Title, First Name, Last Name
                                onClick={() => toggleDropdown(`traveler-${index}-title`)}
                                readOnly
                                placeholder="Select"
                                InputProps={{
                                  readOnly: true,
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <ExpandMoreOutlinedIcon sx={{ 
                                        fontSize: 18, 
                                        transition: 'transform 0.2s',
                                        transform: openDropdowns[`traveler-${index}-title`] ? 'rotate(180deg)' : 'none',
                                        color: isLead ? '#9CA3AF' : '#020817'
                                      }} />
                                    </InputAdornment>
                                  ),
                                }}
                                  sx={{
                                  ...inputStyles,
                                  '& .MuiOutlinedInput-root': {
                                    ...inputStyles['& .MuiOutlinedInput-root'],
                                    bgcolor: isLead ? '#9ca3af' : '#fff', // Greyish for Lead
                                    '& fieldset': { border: isLead ? 'none' : '1px solid #cbd5e1' }, // Remove border for cleaner look if desired, or keep specific style
                                  },
                                   '& .MuiOutlinedInput-input': { color: isLead ? '#1f2937' : 'inherit' }
                                }}
                              />
                              {openDropdowns[`traveler-${index}-title`] && (
                                <ClickAwayListener onClickAway={() => closeDropdown(`traveler-${index}-title`)}>
                                  <Paper sx={{ position: 'absolute', top: '100%', left: 0, right: 0, mt: 0.5, zIndex: 1400, borderRadius: '12px', border: '1px solid #f1f5f9', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)', overflow: 'hidden' }}>
                                    <List sx={{ p: 0 }}>
                                      {['Mr', 'Ms', 'Mrs'].map((t) => (
                                        <ListItem key={t} disablePadding>
                                          <ListItemButton onClick={() => { updateTravelerDetail(index, 'title', t); closeDropdown(`traveler-${index}-title`); }} sx={{ py: 1 }}>
                                            <ListItemText primary={t} />
                                          </ListItemButton>
                                        </ListItem>
                                      ))}
                                    </List>
                                  </Paper>
                                </ClickAwayListener>
                              )}
                            </Box>
                          </Grid>

                          {/* First Name */}
                          <Grid item xs={12} sm={4} width={isLead ? 190 : 190}>
                             <Typography sx={{...labelStyles, color: isLead ? '#020817' : '#334155', fontSize: isLead ? '14px' : labelStyles.fontSize }}>First Name *</Typography>
                             <TextField 
                               fullWidth 
                               placeholder="" // Placeholder empty in dark mode image usually? Or specific
                               sx={{
                                  ...inputStyles,
                                  '& .MuiOutlinedInput-root': {
                                    ...inputStyles['& .MuiOutlinedInput-root'],
                                    bgcolor: isLead ? '#9ca3af' : '#fff',
                                    '& fieldset': { border: isLead ? 'none' : '1px solid #cbd5e1' },
                                  },
                                  '& .MuiOutlinedInput-input': { color: isLead ? '#1f2937' : 'inherit' }
                               }}
                               value={traveler.firstName}
                               onChange={(e) => updateTravelerDetail(index, 'firstName', e.target.value)}
                             />
                          </Grid>

                          {/* Last Name */}
                          <Grid item xs={12} sm={4} width={isLead ? 195 : 195}>
                             <Typography sx={{...labelStyles, color: isLead ? '#020817' : '#334155', fontSize: isLead ? '14px' : labelStyles.fontSize }}>Last Name *</Typography>
                             <TextField 
                               fullWidth 
                               sx={{
                                  ...inputStyles,
                                  '& .MuiOutlinedInput-root': {
                                    ...inputStyles['& .MuiOutlinedInput-root'],
                                    bgcolor: isLead ? '#9ca3af' : '#fff',
                                    '& fieldset': { border: isLead ? 'none' : '1px solid #cbd5e1' },
                                  },
                                  '& .MuiOutlinedInput-input': { color: isLead ? '#1f2937' : 'inherit' }
                               }}
                               value={traveler.lastName}
                               onChange={(e) => updateTravelerDetail(index, 'lastName', e.target.value)}
                             />
                          </Grid>

                          {/* Nationality - Full Width for Lead */}
                          <Grid item xs={12} sm={4} width={isLead ? 570 : 570}>
                            <Typography sx={{...labelStyles, color: '#334155', fontSize: isLead ? '14px' : labelStyles.fontSize }}>Nationality <Box component="span" sx={{ color: isLead ? '#ef4444' : '#334155' }}>*</Box></Typography> {/* Red asterisk color implied? or label color? Using red for asterisk typically */}
                            <Box sx={{ position: 'relative' }}>
                            <TextField
                              fullWidth
                              placeholder="Select"
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
                                      color: isLead ? '#1f2937' : '#020817'
                                    }} />
                                  </InputAdornment>
                                ),
                              }}
                              sx={{
                                  ...inputStyles,
                                  '& .MuiOutlinedInput-root': {
                                    ...inputStyles['& .MuiOutlinedInput-root'],
                                    bgcolor: isLead ? '#fff' : '#fff', // White for Nationality dropdown in dark mode often?
                                    '& fieldset': { border: isLead ? 'none' : '1px solid #cbd5e1' },
                                  },
                                  '& .MuiOutlinedInput-input': { color: '#1f2937' }
                               }}
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
                                    {[...nationalities]
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
                          
                          {/* DOB & Passport - In one row */}
                          <Grid item xs={12} sm={6}>
                            <Typography sx={{...labelStyles, color: '#334155', fontSize: isLead ? '14px' : labelStyles.fontSize }}>Date of Birth <Box component="span" sx={{ color: isLead ? '#ef4444' : '#334155' }}>*</Box></Typography>
                             <Grid container spacing={1}>
                                <Grid item xs={4} width={isLead ? 110 : 110}>
                                   {/* Day */}
                                   <Box sx={{ position: 'relative' }}>
                                    <TextField
                                      fullWidth
                                      value={traveler.dob.day}
                                      onClick={() => toggleDropdown(`traveler-${index}-dob-day`)}
                                      readOnly
                                      InputProps={{
                                        readOnly: true,
                                        endAdornment: <InputAdornment position="end"><ExpandMoreOutlinedIcon sx={{ fontSize: 16, color: '#020817' }} /></InputAdornment>,
                                      }}
                                      sx={{
                                        ...inputStyles, 
                                        '& .MuiOutlinedInput-root': { 
                                          ...inputStyles['& .MuiOutlinedInput-root'], 
                                          bgcolor: '#fff',
                                          '& fieldset': { border: isLead ? 'none' : '1px solid #cbd5e1' },
                                        }
                                      }} 
                                    />
                                    {openDropdowns[`traveler-${index}-dob-day`] && (
                                      <ClickAwayListener onClickAway={() => closeDropdown(`traveler-${index}-dob-day`)}>
                                        <Paper sx={{ position: 'absolute', top: '100%', left: 0, right: 0, mx: 'auto', zIndex: 1400, maxHeight: 200, overflow: 'auto' }}>
                                           <List>{Array.from({length:31},(_,i)=>i+1).map(d=><ListItemButton key={d} onClick={()=>{updateTravelerDate(index,'dob','day',d);closeDropdown(`traveler-${index}-dob-day`)}}><ListItemText primary={d}/></ListItemButton>)}</List>
                                        </Paper>
                                      </ClickAwayListener>
                                    )}
                                   </Box>
                                </Grid>
                                <Grid item xs={4} width={isLead ? 110 : 110}>
                                   {/* Month */}
                                   <Box sx={{ position: 'relative' }}>
                                    <TextField
                                      fullWidth
                                      value={traveler.dob.month}
                                      onClick={() => toggleDropdown(`traveler-${index}-dob-month`)}
                                      readOnly
                                      InputProps={{
                                        readOnly: true,
                                        endAdornment: <InputAdornment position="end"><ExpandMoreOutlinedIcon sx={{ fontSize: 16, color: '#020817' }} /></InputAdornment>,
                                      }}
                                       sx={{
                                         ...inputStyles, 
                                         '& .MuiOutlinedInput-root': { 
                                           ...inputStyles['& .MuiOutlinedInput-root'], 
                                           bgcolor: '#fff',
                                           '& fieldset': { border: isLead ? 'none' : '1px solid #cbd5e1' },
                                         }
                                       }} 
                                    />
                                    {openDropdowns[`traveler-${index}-dob-month`] && (
                                      <ClickAwayListener onClickAway={() => closeDropdown(`traveler-${index}-dob-month`)}>
                                        <Paper sx={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 1400, maxHeight: 200, overflow: 'auto' }}>
                                           <List>{['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map(m=><ListItemButton key={m} onClick={()=>{updateTravelerDate(index,'dob','month',m);closeDropdown(`traveler-${index}-dob-month`)}}><ListItemText primary={m}/></ListItemButton>)}</List>
                                        </Paper>
                                      </ClickAwayListener>
                                    )}
                                   </Box>
                                </Grid>
                                <Grid item xs={4} width={isLead ? 110 : 110}>
                                   {/* Year */}
                                   <Box sx={{ position: 'relative' }}>
                                    <TextField
                                      fullWidth
                                      value={traveler.dob.year}
                                      onClick={() => toggleDropdown(`traveler-${index}-dob-year`)}
                                      readOnly
                                      InputProps={{
                                        readOnly: true,
                                        endAdornment: <InputAdornment position="end"><ExpandMoreOutlinedIcon sx={{ fontSize: 16, color: '#020817' }} /></InputAdornment>,
                                      }}
                                       sx={{
                                         ...inputStyles, 
                                         '& .MuiOutlinedInput-root': { 
                                           ...inputStyles['& .MuiOutlinedInput-root'], 
                                           bgcolor: '#fff',
                                           '& fieldset': { border: isLead ? 'none' : '1px solid #cbd5e1' },
                                         }
                                       }} 
                                    />
                                    {openDropdowns[`traveler-${index}-dob-year`] && (
                                      <ClickAwayListener onClickAway={() => closeDropdown(`traveler-${index}-dob-year`)}>
                                        <Paper sx={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 1400, maxHeight: 200, overflow: 'auto' }}>
                                           <List>{Array.from({length:100},(_,i)=>dayjs().year()-i).map(y=><ListItemButton key={y} onClick={()=>{updateTravelerDate(index,'dob','year',y);closeDropdown(`traveler-${index}-dob-year`)}}><ListItemText primary={y}/></ListItemButton>)}</List>
                                        </Paper>
                                      </ClickAwayListener>
                                    )}
                                   </Box>
                                </Grid>
                             </Grid>
                          </Grid>
                          
                          <Grid item xs={12} sm={6} width={isLead ? 205 : 204}>
                             <Typography sx={{...labelStyles, color: '#334155', fontSize: isLead ? '14px' : labelStyles.fontSize }}>Passport or ID Number <Box component="span" sx={{ color: isLead ? '#ef4444' : '#334155' }}>*</Box></Typography>
                             <TextField 
                                fullWidth 
                                placeholder="6 - 15 Numbers"
                                sx={{
                                  ...inputStyles,
                                  '& .MuiOutlinedInput-root': {
                                    ...inputStyles['& .MuiOutlinedInput-root'],
                                    bgcolor: '#fff',
                                    '& fieldset': { border: isLead ? 'none' : '1px solid #cbd5e1' }, // Clean white look
                                  }
                               }}
                                value={traveler.passportNumber}
                                onChange={(e) => updateTravelerDetail(index, 'passportNumber', e.target.value)}
                             />
                          </Grid>
                        </Grid>
                      </Box>
                    );
                  })}
                </Box>
              )}
            </Paper>

            {/* Payment Methods Section */}
            <Paper elevation={0} sx={{ border: '1px solid #E2E8F0', borderRadius: '12px', mb: 3, mt: 3 }}>
              <Box 
                onClick={() => setIsPaymentMethodsOpen(!isPaymentMethodsOpen)}
                sx={{ ...sectionHeaderStyles, bgcolor: '#1f293780', height: '48px', cursor: 'pointer' }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PaymentOutlinedIcon sx={{ fontSize: 20, color: '#9CA3AF' }} />
                  <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#F3F4F6' }}>Payment Methods</Typography>
                </Box>
                <IconButton size="small" sx={{ color: '#4B5563' }}>
                   {isPaymentMethodsOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </Box>

              {isPaymentMethodsOpen && (
                <Box sx={{ p: 3}}>
                  <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                    <Grid container spacing={2}>
                      {[
                        { id: 'payLater', title: 'Pay Later', sub: 'Pay Later', icon: <PaymentOutlinedIcon sx={{ color: '#64748B' }} /> },
                        { id: 'wallet', title: 'Digital Wallet', sub: 'PayPal', icon: <PaymentOutlinedIcon sx={{ color: '#64748B' }} /> },
                        { id: 'card', title: 'Credit Card', sub: 'Stripe', icon: <PaymentOutlinedIcon sx={{ color: '#64748B' }} /> },
                        { id: 'bank', title: 'Bank Transfer', sub: 'Wire Transfer', icon: <PaymentOutlinedIcon sx={{ color: '#64748B' }} /> }
                      ].map((method) => (
                        <Grid item xs={6} key={method.id} width={299}>
                          <Box 
                            onClick={() => setPaymentMethod(method.id)}
                            sx={{ 
                              border: '1px solid #E2E8F0', 
                              borderRadius: '8px', 
                              p: 1.5, 
                              display: 'flex', 
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              cursor: 'pointer',
                              bgcolor: '#fff',
                              '&:hover': { bgcolor: '#F8FAFC' }
                            }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Radio 
                                checked={paymentMethod === method.id}
                                value={method.id}
                                size="small"
                                sx={{ p: 0.5, color: '#CBD5E1', '&.Mui-checked': { color: '#64748B' } }}
                              />
                               <Box>
                                <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#1E293B', lineHeight: 1.2 }}>{method.title}</Typography>
                                <Typography sx={{ fontSize: '12px', color: '#64748B' }}>{method.sub}</Typography>
                              </Box>
                            </Box>
                            {method.icon}
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </RadioGroup>
                </Box>
              )}
            </Paper>

            {/* Additional Requirements Section */}
            <Paper elevation={0} sx={{ border: '1px solid #E2E8F0', borderRadius: '12px', mb: 3, mt: 3 }}>
              <Box 
                onClick={() => setIsAdditionalReqOpen(!isAdditionalReqOpen)}
                sx={{ ...sectionHeaderStyles, bgcolor: '#1f293780', height: '48px', cursor: 'pointer' }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AssignmentOutlinedIcon sx={{ fontSize: 20, color: '#9CA3AF' }} />
                  <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#F3F4F6' }}>Booking Options</Typography>
                </Box>
                <IconButton size="small" sx={{ color: '#4B5563' }}>
                   {isAdditionalReqOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </Box>

              {isAdditionalReqOpen && (
                <Box sx={{ p: 3 }}>
                  <Typography sx={{ ...labelStyles, mb: 1, fontSize: '14px' }}><SortIcon sx={{ fontSize: 14,color: '#020817', mr: 1 }} /> Special Requests (Optional)</Typography> 
                  <TextField 
                    fullWidth 
                    multiline 
                    rows={1} 
                    placeholder="Any Special Requests or  Notes..." 
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
                  
                  <Divider sx={{ my:3, bgcolor: '#171702ff'}} />

                  <Box sx={{ mb: 2}}>
                    <FormControlLabel
                      control={<Checkbox checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} sx={{ color: '#D1D5d8', '&.Mui-checked': { color: '#0058E6' } }} />}
                      label={<Typography sx={{ fontSize: '14px', color: '#D1D5d8' }}>I agree to the <Box component="span" sx={{ color: '#2563EB', fontWeight: 400 }}>Terms and Conditions</Box></Typography>}
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
                      <LockOutlinedIcon sx={{ fontSize: 24 }} /> Confirm Booking
                    </Box>
                  </Button>
                </Box>
              )}
            </Paper>


          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4} width={400} sx={{ 
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
             <Paper elevation={0} sx={{ border: '1px solid #E2E8F0', borderRadius: '12px', overflow: 'hidden', bgcolor: '#fff' }}>
                {/* Header */}
                <Box sx={{ ...sectionHeaderStyles, bgcolor: '#1f293780', height: '48px', p: 1.5 }}>
                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <ReceiptLongOutlinedIcon sx={{ fontSize: 20, color: '#9CA3AF' }} />
                      <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#F3F4F6' }}>Booking Summary</Typography>
                   </Box>
                </Box>

                <Box sx={{ p: 3 }}>
                   <Typography sx={{ fontSize: '24px', fontWeight: 700, color: '#020817', mb: 1}}>Booking Summary</Typography>

                   {/* Flight Detail Collapsible */}
                   <Box sx={{ border: '1px solid #E2E8F0', borderRadius: '8px', mb: 3 }}>
                      <Box 
                        onClick={() => setIsSummaryFlightOpen(!isSummaryFlightOpen)}
                        sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
                      >
                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                             <FlightTakeoffIcon sx={{ color: '#020817', fontSize: 20 }} />
                            <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#374151'}}>
                               Flight {flight.from} → {flight.to}
                            </Typography>
                         </Box>
                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1}}>
                            <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#374151' }}>{flight.price}</Typography>
                            <ExpandMoreOutlinedIcon sx={{ 
                               fontSize: 20, 
                               color: '#64748B',
                               transform: isSummaryFlightOpen ? 'rotate(180deg)' : 'none',
                               transition: '0.2s'
                            }} />
                         </Box>
                      </Box>
                      
                      {isSummaryFlightOpen && (
                         <Box sx={{ px: 2, pb: 2, pt: 1, borderTop: '1px solid #F1F5F9' }}>
                            <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#1E293B', mb: 1.5 }}>{flight.airline}</Typography>
                            
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
                               <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#020817' }}>{flight.from}</Typography>
                               <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: '4px' }}>
                                  <Box sx={{ flex: 1, height: '1px', bgcolor: '#E2E8F0' }} />
                                  <ArrowForwardIcon sx={{ fontSize: 14, color: '#000' }} />
                                  <Box sx={{ flex: 1, height: '1px', bgcolor: '#E2E8F0' }} />
                               </Box>
                               <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#020817' }}>{flight.to}</Typography>
                            </Box>

                            <Typography sx={{ fontSize: '12px', color: '#64748B', mb: 0.5 }}>Departure: Feb 06, 2026</Typography>
                            <Typography sx={{ fontSize: '12px', color: '#64748B' }}>
                               {adults} Adult {childrenCount > 0 && `, ${childrenCount} Child`} {infants > 0 && `, ${infants} Infant`} • Economy Class
                            </Typography>
                         </Box>
                      )}
                   </Box>

                   {/* Price Breakdown */}
                   <Box sx={{ border: '1px solid black', borderRadius: '8px', p: 2, mb: 3 , }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                         <Typography sx={{ fontSize: '14px', color: '#94A3B8' }}>Flight Price:</Typography>
                         <Typography sx={{ fontSize: '14px', color: '#64748B' }}>{flight.price}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                         <Typography sx={{ fontSize: '14px', color: '#94A3B8' }}>Taxes & Fees:</Typography>
                         <Typography sx={{ fontSize: '14px', color: '#64748B' }}>USD 0.00</Typography>
                      </Box>
                      <Divider sx={{ mb: 2, bgcolor: 'black' }} />
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                         <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#94A3B8' }}>Total:</Typography>
                         <Typography sx={{ fontSize: '20px', fontWeight: 700, color: '#64748B' }}>{flight.price}</Typography>
                      </Box>
                   </Box>

                   {/* Confirmation Info */}
                   <Box sx={{ color: '#DBEAFE', borderRadius: '8px', p: 2, bgcolor: '#1E3A8A33' , border: '1px solid #25397efff1fff'}}>
                      <Box sx={{ display: 'flex', gap: 1.5 }}>
                         <InfoOutlinedIcon sx={{ color: '#2563EB', fontSize: 12, mt: 0.3 }} />
                         <Box>
                            {[
                               'Confirmation will be sent To Email',
                               'Payment is Secure',
                               'No Hidden Charges'
                            ].map((text, idx) => (
                               <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: idx === 2 ? 0 : 1 }}>
                                  <CheckCircleOutlineIcon sx={{ color: '#64748B', fontSize: 14 }} />
                                  <Typography sx={{ fontSize: '13px', color: '#64748B' }}>{text}</Typography>
                                </Box>
                            ))}
                         </Box>
                      </Box>
                   </Box>
                </Box>
             </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
