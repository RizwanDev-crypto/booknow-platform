'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Grid,
  TextField,
  MenuItem,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  ClickAwayListener,
  Backdrop,
  Portal,
  Popper,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import FlightTakeoffOutlinedIcon from '@mui/icons-material/FlightTakeoffOutlined';
import FlightLandOutlinedIcon from '@mui/icons-material/FlightLandOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import AirlineSeatReclineNormalRoundedIcon from '@mui/icons-material/AirlineSeatReclineNormalRounded';
import CorporateFareRoundedIcon from '@mui/icons-material/CorporateFareRounded';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';

import nationalitiesData from '@/data/nationalities.json';

export default function FlightSearchForm() {
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    departure: '',
    arrival: '',
    departureDate: dayjs(),
    returnDate: dayjs().add(1, 'day'),
    flightType: 'One Way',
    flightClass: 'Economy',
    adults: 1,
    children: 0,
    infants: 0,
    departureSearch: '',
    arrivalSearch: '',
  });

  // Initialize with imported data
  const [nationalities, setNationalities] = React.useState(nationalitiesData);
  const [isDepartureOpen, setIsDepartureOpen] = React.useState(false);
  const [isArrivalOpen, setIsArrivalOpen] = React.useState(false);
  const [isDateOpen, setIsDateOpen] = React.useState(false);
  const [isReturnDateOpen, setIsReturnDateOpen] = React.useState(false);
  const [isPassengersOpen, setIsPassengersOpen] = React.useState(false);
  const [isClassOpen, setIsClassOpen] = React.useState(false);
  const [isTypeOpen, setIsTypeOpen] = React.useState(false);
  const [departureAnchor, setDepartureAnchor] = React.useState(null);
  const [returnAnchor, setReturnAnchor] = React.useState(null);
  const dateInputRef = React.useRef(null);
  const returnDateInputRef = React.useRef(null);

  React.useEffect(() => {
    const savedData = localStorage.getItem('flightSearchData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        // Convert strings back to dayjs objects
        if (parsed.departureDate) parsed.departureDate = dayjs(parsed.departureDate);
        if (parsed.returnDate) parsed.returnDate = dayjs(parsed.returnDate);
        setFormData(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error('Error loading flight search data from localStorage:', error);
      }
    }
    // Removed fetchNationalities call
  }, []);

  const handleDepartureClick = () => setIsDepartureOpen(true);
  const handleDepartureClose = () => setIsDepartureOpen(false);
  const handleDepartureSelect = (country) => {
    setFormData(prev => ({ 
      ...prev, 
      departure: country.name,
      departureSearch: country.name 
    }));
    setIsDepartureOpen(false);
    if (!formData.arrival) {
      setTimeout(() => setIsArrivalOpen(true), 100);
    } else {
      setDepartureAnchor(dateInputRef.current);
      setTimeout(() => setIsDateOpen(true), 100);
    }
  };

  const handleArrivalClick = () => setIsArrivalOpen(true);
  const handleArrivalClose = () => setIsArrivalOpen(false);
  const handleArrivalSelect = (country) => {
    setFormData(prev => ({ 
      ...prev, 
      arrival: country.name,
      arrivalSearch: country.name 
    }));
    setIsArrivalOpen(false);
    if (formData.departure) {
      setDepartureAnchor(dateInputRef.current);
      setTimeout(() => setIsDateOpen(true), 100);
    }
  };

  const handleDateClick = (event) => {
    setDepartureAnchor(event.currentTarget);
    setIsDateOpen(!isDateOpen);
  };
  const handleDateClose = () => setIsDateOpen(false);
  const handleDateChange = (newDate) => {
    setFormData(prev => ({ 
      ...prev, 
      departureDate: newDate,
      returnDate: (prev.flightType === 'Round Trip' && newDate.isAfter(prev.returnDate)) 
        ? newDate.add(1, 'day') 
        : prev.returnDate
    }));
    setIsDateOpen(false);
    if (formData.flightType === 'Round Trip') {
      setReturnAnchor(returnDateInputRef.current);
      setTimeout(() => setIsReturnDateOpen(true), 100);
    }
  };

  const handleReturnDateClick = (event) => {
    setReturnAnchor(event.currentTarget);
    setIsReturnDateOpen(!isReturnDateOpen);
  };
  const handleReturnDateClose = () => setIsReturnDateOpen(false);
  const handleReturnDateChange = (newDate) => {
    setFormData(prev => ({ ...prev, returnDate: newDate }));
    setIsReturnDateOpen(false);
  };

  const handleSwap = () => {
    setFormData(prev => ({
      ...prev,
      departure: prev.arrival,
      departureSearch: prev.arrival,
      arrival: prev.departure,
      arrivalSearch: prev.departure
    }));
  };

  const handlePassengersClick = () => setIsPassengersOpen(!isPassengersOpen);
  const handlePassengersClose = () => setIsPassengersOpen(false);

  const updatePassengerCount = (type, increment) => {
    setFormData(prev => {
      const currentVal = prev[type];
      const newVal = increment ? currentVal + 1 : Math.max(0, currentVal - 1);
      
      // Validation: Each category max 9
      if (increment && newVal > 9) return prev;

      // Ensure at least one adult if there are children or infants
      if (type === 'adults' && !increment && newVal === 0 && (prev.children > 0 || prev.infants > 0)) {
        return prev;
      }
      
      return { ...prev, [type]: newVal };
    });
  };

  const getPassengerText = () => {
    const total = formData.adults + formData.children + formData.infants;
    return `${total} Passenger${total > 1 ? 's' : ''}`;
  };

  const filteredDepartures = nationalities.filter(country =>
    country.name.toLowerCase().includes(formData.departureSearch.toLowerCase())
  );

  const filteredArrivals = nationalities.filter(country =>
    country.name.toLowerCase().includes(formData.arrivalSearch.toLowerCase())
  );

  const openDate = isDateOpen;
  const openDeparture = isDepartureOpen;
  const openArrival = isArrivalOpen;
  const openPassengers = isPassengersOpen;

  const textFieldStyles = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      bgcolor: '#fff',
      height: '38px', // Matched to VisaSearchForm
      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#1A53ff' },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#1A53ff', borderWidth: '1.5px' },
    },
    '& .MuiOutlinedInput-input': { 
      fontSize: '14px',
      padding: '0 12px',
    },
    '& .MuiInputAdornment-root': {
      marginRight: '-4px'
    }
  };

  const labelStyles = {
    mb: 0.5, 
    fontSize: '14px', 
    color: "#020817", 
    fontWeight: 500, 
    display: 'flex', 
    alignItems: 'center', 
    gap: 1 
  };

  return (
    <>
      <Portal>
        <Backdrop
          open={isDateOpen || isReturnDateOpen}
          onClick={() => {
            setIsDateOpen(false);
            setIsReturnDateOpen(false);
          }}
          sx={{ 
            zIndex: 99,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          }}
        />
      </Portal>
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Grid container spacing={2}>
        {/* Row 1: Departure, Swap, Arrival, Date */}
        <Grid item xs={12} md={3.8} sx={{ position: 'relative', width: { xs: '100%', sm: '100%', md: '32%', lg: '32%' }, overflow: 'visible' }}>
          <Typography sx={labelStyles}>
            <FlightTakeoffOutlinedIcon sx={{ fontSize: 14, mb: 0.3, color: '#64748B' }} />
            Departure From
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
            <Box sx={{ position: 'relative', width: '100%' }}>
              <TextField
                fullWidth
                placeholder="Departure City or Airport"
                variant="outlined"
                size="small"
                value={formData.departureSearch}
                onChange={(e) => {
                  const val = e.target.value;
                  setFormData(prev => ({ ...prev, departureSearch: val }));
                  if (!isDepartureOpen) setIsDepartureOpen(true);
                }}
                onClick={handleDepartureClick}
                autoComplete="off"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FlightTakeoffOutlinedIcon sx={{ fontSize: 18, color: '#6B7280' }} />
                    </InputAdornment>
                  ),
                  endAdornment: formData.departureSearch && (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFormData(prev => ({ ...prev, departure: '', departureSearch: '' }));
                        }}
                        sx={{ color: '#94a3b8', '&:hover': { bgcolor: 'transparent' } }}
                      >
                        <HighlightOffOutlinedIcon sx={{ fontSize: 24 }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={textFieldStyles}
              />
              {isDepartureOpen && filteredDepartures.length > 0 && (
                <ClickAwayListener onClickAway={handleDepartureClose}>
                  <Paper
                    sx={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      right: 0,
                      mt: 0.5,
                      borderRadius: '12px',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
                      border: '1px solid #f1f5f9',
                      maxHeight: '300px',
                      overflow: 'auto',
                      zIndex: 100,
                    }}
                  >
                    <List sx={{ py: 0 }}>
                      {filteredDepartures.map((country) => (
                        <ListItem key={country.code} disablePadding>
                          <ListItemButton 
                            onMouseDown={(e) => { e.preventDefault(); handleDepartureSelect(country); }}
                            sx={{ py: 1, px: 2, '&:hover': { bgcolor: '#f8fafc' } }}
                          >
                            <ListItemText 
                              primary={country.name} 
                              primaryTypographyProps={{ fontSize: '14px', color: '#1F2937' }} 
                            />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                </ClickAwayListener>
              )}
            </Box>
            <IconButton
              onClick={handleSwap}
              sx={{
                position: 'absolute',
                right: '-27px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                bgcolor: '#0058E6',
                color: 'white',
                width: 34,
                height: 34,
                border: '2px solid white',
                '&:hover': { bgcolor: '#0058E6' },
                display: { xs: 'none', md: 'flex' },
              }}
            >
              <SwapHorizIcon sx={{ fontSize: 14 }} />
            </IconButton>
          </Box>
        </Grid>

        <Grid item xs={12} md={3.8} sx={{ position: 'relative', width: { xs: '100%', sm: '100%', md: '32%', lg: '32%' }, overflow: 'visible' }}>
          <Typography sx={labelStyles}>
            <FlightLandOutlinedIcon sx={{ fontSize: 14, mb: 0.3, color: '#64748B' }} />
            Arrival To
          </Typography>
          <Box sx={{ position: "relative" }}>
            <TextField
              fullWidth
              placeholder="Arrival City or Airport"
              variant="outlined"
              size="small"
              value={formData.arrivalSearch}
              onChange={(e) => {
                const val = e.target.value;
                setFormData(prev => ({ ...prev, arrivalSearch: val }));
                if (!isArrivalOpen) setIsArrivalOpen(true);
              }}
              onClick={handleArrivalClick}
              autoComplete="off"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FlightLandOutlinedIcon sx={{ fontSize: 18, color: '#6B7280' }} />
                  </InputAdornment>
                ),
                endAdornment: formData.arrivalSearch && (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFormData(prev => ({ ...prev, arrival: '', arrivalSearch: '' }));
                      }}
                      sx={{ color: '#94a3b8', '&:hover': { bgcolor: 'transparent' } }}
                    >
                      <HighlightOffOutlinedIcon sx={{ fontSize: 24 }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={textFieldStyles}
            />
            {isArrivalOpen && filteredArrivals.length > 0 && (
              <ClickAwayListener onClickAway={handleArrivalClose}>
                <Paper
                  sx={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    mt: 0.5,
                    borderRadius: '12px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
                    border: '1px solid #f1f5f9',
                    maxHeight: '300px',
                    overflow: 'auto',
                    zIndex: 100,
                  }}
                >
                  <List sx={{ py: 0 }}>
                    {filteredArrivals.map((country) => (
                      <ListItem key={country.code} disablePadding>
                        <ListItemButton 
                          onMouseDown={(e) => { e.preventDefault(); handleArrivalSelect(country); }}
                          sx={{ py: 1, px: 2, '&:hover': { bgcolor: '#f8fafc' } }}
                        >
                          <ListItemText 
                            primary={country.name} 
                            primaryTypographyProps={{ fontSize: '14px', color: '#1F2937' }} 
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </ClickAwayListener>
            )}
          </Box>
        </Grid>

        <Grid item xs={12} md={4.4} sx={{ position: 'relative', width: { xs: '100%',sm: '100%', md: '32.3%', lg: '33%' }, overflow: 'visible' }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Typography sx={labelStyles}>
                <CalendarMonthOutlinedIcon sx={{ fontSize: 14, mb: 0.3, color: '#64748B' }} />
                Departure Date
              </Typography>
              <Box>
                <TextField
                  fullWidth
                  inputRef={dateInputRef}
                  value={formData.departureDate.format('DD-MM-YYYY')}
                  onClick={handleDateClick}
                  readOnly
                  size="small"
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{
                    ...textFieldStyles,
                    cursor: 'pointer',
                    '& .MuiOutlinedInput-root': {
                      ...textFieldStyles['& .MuiOutlinedInput-root'],
                      cursor: 'pointer'
                    },
                    '& .MuiOutlinedInput-input': {
                      ...textFieldStyles['& .MuiOutlinedInput-input'],
                      cursor: 'pointer'
                    }
                  }}
                />
                <Popper
                  open={isDateOpen}
                  anchorEl={departureAnchor}
                  placement="bottom-start"
                  sx={{ zIndex: 100 }}
                >
                  <ClickAwayListener onClickAway={handleDateClose}>
                      <Paper
                        sx={{ 
                          mt: 0.5,
                          maxWidth: '280px',
                          borderRadius: '12px', 
                          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
                          border: '1px solid #f1f5f9',
                          bgcolor: 'background.paper',
                          overflow: 'hidden',
                        }} 
                      >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateCalendar 
                        value={formData.departureDate} 
                        onChange={handleDateChange} 
                        disablePast 
                        sx={{ 
                          width: '100%', 
                          maxHeight: '260px',
                          '& .MuiDateCalendar-root': {
                            width: '100%',
                            minWidth: '100%',
                            height: '260px',
                            maxHeight: '260px',
                          },
                          '& .MuiDayCalendar-monthContainer': {
                            minHeight: 'auto',
                          },
                          '& .MuiPickersCalendarHeader-root': {
                            px: 1,
                            mt: 0.5,
                            mb: 0,
                            minHeight: '40px',
                          },
                          '& .MuiPickersDay-root.Mui-selected': {
                            backgroundColor: '#0058E6',
                            borderRadius: '50%',
                            width: '32px',
                            height: '32px',
                            minWidth: '32px',
                            '&:hover': {
                              backgroundColor: '#0047b3',
                            },
                          },
                          '& .MuiPickersDay-root': {
                            borderRadius: '50%',
                            width: '32px',
                            height: '32px',
                            minWidth: '32px',
                          },
                          '& .MuiPickersDay-today': {
                            borderColor: '#0058E6',
                          },
                        }} 
                      />
                    </LocalizationProvider>
                  </Paper>
                </ClickAwayListener>
              </Popper>
              </Box>
            </Box>

            {formData.flightType === 'Round Trip' && (
              <Box sx={{ flex: 1 }}>
                <Typography sx={labelStyles}>
                  <CalendarMonthOutlinedIcon sx={{ fontSize: 14, mb: 0.3, color: '#64748B' }} />
                  Return Date
                </Typography>
                <Box>
                  <TextField
                    fullWidth
                    inputRef={returnDateInputRef}
                    value={formData.returnDate.format('DD-MM-YYYY')}
                    onClick={handleReturnDateClick}
                    readOnly
                    size="small"
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{
                      ...textFieldStyles,
                      cursor: 'pointer',
                      '& .MuiOutlinedInput-root': {
                        ...textFieldStyles['& .MuiOutlinedInput-root'],
                        cursor: 'pointer'
                      },
                      '& .MuiOutlinedInput-input': {
                        ...textFieldStyles['& .MuiOutlinedInput-input'],
                        cursor: 'pointer'
                      }
                    }}
                  />
                  <Popper
                    open={isReturnDateOpen}
                    anchorEl={returnAnchor}
                    placement="bottom-end"
                    sx={{ zIndex: 100 }}
                  >
                    <ClickAwayListener onClickAway={handleReturnDateClose}>
                      <Paper
                        sx={{ 
                          mt: 0.5,
                          maxWidth: '280px',
                          borderRadius: '12px', 
                          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
                          border: '1px solid #f1f5f9',
                          bgcolor: 'background.paper',
                          overflow: 'hidden',
                        }} 
                      >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DateCalendar 
                            value={formData.returnDate} 
                            onChange={handleReturnDateChange} 
                            disablePast 
                            minDate={formData.departureDate} 
                            sx={{ 
                              width: '100%', 
                              maxHeight: '260px',
                              '& .MuiDateCalendar-root': {
                                width: '100%',
                                minWidth: '100%',
                                height: '260px',
                                maxHeight: '260px',
                              },
                              '& .MuiDayCalendar-monthContainer': {
                                minHeight: 'auto',
                              },
                              '& .MuiPickersCalendarHeader-root': {
                                px: 1,
                                mt: 0.5,
                                mb: 0,
                                minHeight: '40px',
                              },
                              '& .MuiPickersDay-root.Mui-selected': {
                                backgroundColor: '#0058E6',
                                borderRadius: '50%',
                                width: '32px',
                                height: '32px',
                                minWidth: '32px',
                                '&:hover': {
                                  backgroundColor: '#0047b3',
                                },
                              },
                              '& .MuiPickersDay-root': {
                                borderRadius: '50%',
                                width: '32px',
                                height: '32px',
                                minWidth: '32px',
                              },
                              '& .MuiPickersDay-today': {
                                borderColor: '#0058E6',
                              },
                            }} 
                          />
                        </LocalizationProvider>
                      </Paper>
                    </ClickAwayListener>
                  </Popper>
                </Box>
              </Box>
            )}
          </Box>
        </Grid>

        {/* Row 2: Flight Type & Class (Combined to 32%), Passengers (32%), Search Button */}
        <Grid item xs={12} md={3.8} sx={{ position: 'relative', width: { xs: '100%', sm: '100%', md: '32%', lg: '32%' } }}>
          <Box sx={{ display: 'flex', gap: 2.5 }}>
            <Box sx={{ flex: 1, position: 'relative' }}>
              <Typography sx={labelStyles}>
                <SyncAltIcon sx={{ fontSize: 14, mb: 0.3, color: '#64748B' }} />
                Flight Type
              </Typography>
              <Box sx={{ position: "relative" }}>
                <TextField
                  fullWidth
                  size="small"
                  value={formData.flightType}
                  readOnly
                  onClick={() => setIsTypeOpen(!isTypeOpen)}
                  InputProps={{
                    readOnly: true,
                    endAdornment: (
                      <InputAdornment position="end">
                        <ExpandMoreOutlinedIcon sx={{ 
                          color: '#020817', 
                          fontSize: '14px',
                          transition: 'transform 0.2s', 
                          transform: isTypeOpen ? 'rotate(180deg)' : 'none' 
                        }} />

                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    ...textFieldStyles,
                    cursor: 'pointer',
                    '& .MuiOutlinedInput-root': {
                      ...textFieldStyles['& .MuiOutlinedInput-root'],
                      cursor: 'pointer'
                    },
                    '& .MuiOutlinedInput-input': {
                      ...textFieldStyles['& .MuiOutlinedInput-input'],
                      cursor: 'pointer'
                    }
                  }}
                />
                {isTypeOpen && (
                  <ClickAwayListener onClickAway={() => setIsTypeOpen(false)}>
                    <Paper
                      sx={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        right: 0,
                        mt: 0.5,
                        borderRadius: '12px',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
                        border: '1px solid #f1f5f9',
                        zIndex: 100,
                      }}
                    >
                      <List sx={{ py: 0 }}>
                        <ListItem disablePadding>
                          <ListItemButton 
                            onMouseDown={(e) => { e.preventDefault(); setFormData(prev => ({ ...prev, flightType: 'One Way' })); setIsTypeOpen(false); }}
                            sx={{ py: 1, px: 2, '&:hover': { bgcolor: '#f8fafc' } }}
                          >
                            <FlightTakeoffOutlinedIcon sx={{ fontSize: 18, color: '#020817', mr: 1.5 }} />
                            <ListItemText primary="One Way" primaryTypographyProps={{ fontSize: '14px', color: '#1F2937' }} />
                          </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                          <ListItemButton 
                            onMouseDown={(e) => { e.preventDefault(); setFormData(prev => ({ ...prev, flightType: 'Round Trip' })); setIsTypeOpen(false); }}
                            sx={{ py: 1, px: 2, '&:hover': { bgcolor: '#f8fafc' } }}
                          >
                            <CompareArrowsOutlinedIcon sx={{ fontSize: 18, color: '#020817', mr: 1.5 }} />
                            <ListItemText primary="Round Trip" primaryTypographyProps={{ fontSize: '14px', color: '#1F2937' }} />
                          </ListItemButton>
                        </ListItem>
                      </List>
                    </Paper>
                  </ClickAwayListener>
                )}
              </Box>
            </Box>
            <Box sx={{ flex: 1, position: 'relative' }}>
              <Typography sx={labelStyles}>
                <CorporateFareRoundedIcon sx={{ fontSize: 14, mb: 0.3, color: '#64748B' }} />
                Flight Class
              </Typography>
              <Box sx={{ position: "relative" }}>
                <TextField
                  fullWidth
                  size="small"
                  value={formData.flightClass}
                  readOnly
                  onClick={() => setIsClassOpen(!isClassOpen)}
                  InputProps={{
                    readOnly: true,
                    endAdornment: (
                      <InputAdornment position="end">
                        <ExpandMoreOutlinedIcon sx={{ 
                          color: '#020817', 
                          fontSize: '14px',
                          transition: 'transform 0.2s', 
                          transform: isClassOpen ? 'rotate(180deg)' : 'none' 
                        }} />

                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    ...textFieldStyles,
                    cursor: 'pointer',
                    '& .MuiOutlinedInput-root': {
                      ...textFieldStyles['& .MuiOutlinedInput-root'],
                      cursor: 'pointer'
                    },
                    '& .MuiOutlinedInput-input': {
                      ...textFieldStyles['& .MuiOutlinedInput-input'],
                      cursor: 'pointer'
                    }
                  }}
                />
                {isClassOpen && (
                  <ClickAwayListener onClickAway={() => setIsClassOpen(false)}>
                    <Paper
                      sx={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        right: 0,
                        mt: 0.5,
                        borderRadius: '12px',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
                        border: '1px solid #f1f5f9',
                        zIndex: 100,
                        minWidth: '150px'
                      }}
                    >
                      <List sx={{ py: 0 }}>
                        {[
                          { value: 'Economy', icon: <AirlineSeatReclineNormalRoundedIcon sx={{ fontSize: 18, color: '#020817' }} /> },
                          { value: 'Premium', icon: <AirlineSeatReclineNormalRoundedIcon sx={{ fontSize: 18, color: '#020817' }} /> },
                          { value: 'Business', icon: <CorporateFareRoundedIcon sx={{ fontSize: 18, color: '#020817' }} /> },
                          { value: 'First Class', icon: <WorkspacePremiumRoundedIcon sx={{ fontSize: 18, color: '#020817' }} /> }
                        ].map((item) => (
                          <ListItem key={item.value} disablePadding>
                            <ListItemButton 
                              onMouseDown={(e) => { e.preventDefault(); setFormData(prev => ({ ...prev, flightClass: item.value })); setIsClassOpen(false); }}
                              sx={{ py: 1, px: 2, '&:hover': { bgcolor: '#f8fafc' } }}
                            >
                              <Box sx={{ mr: 1.5, display: 'flex' }}>{item.icon}</Box>
                              <ListItemText primary={item.value} primaryTypographyProps={{ fontSize: '14px', color: '#1F2937' }} />
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </List>
                    </Paper>
                  </ClickAwayListener>
                )}
              </Box>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={3.8} sx={{ position: 'relative', width: { xs: '100%', sm: '100%', md: '32%', lg: '32%' }, overflow: 'visible' }}>
          <Typography sx={labelStyles}>
            <GroupsOutlinedIcon sx={{ fontSize: 14, mb: 0.3, color: '#64748B' }} />
            Passengers
          </Typography>
          <Box sx={{ position: "relative" }}>
            <TextField
              fullWidth
              size="small"
              value={getPassengerText()}
              onClick={handlePassengersClick}
              readOnly
              autoComplete="off"
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <ExpandMoreOutlinedIcon sx={{ 
                      color: '#020817', 
                      fontSize: '14px',
                      transition: 'transform 0.2s', 
                      transform: isPassengersOpen ? 'rotate(180deg)' : 'none' 
                    }} />

                  </InputAdornment>
                ),
              }}
              sx={{
                ...textFieldStyles,
                cursor: 'pointer',
                '& .MuiOutlinedInput-root': {
                  ...textFieldStyles['& .MuiOutlinedInput-root'],
                  cursor: 'pointer'
                },
                '& .MuiOutlinedInput-input': {
                  ...textFieldStyles['& .MuiOutlinedInput-input'],
                  cursor: 'pointer'
                }
              }}
            />
            {isPassengersOpen && (
              <ClickAwayListener onClickAway={handlePassengersClose}>
                <Paper
                  sx={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    mt: 1,
                    p: 2,
                    borderRadius: '12px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
                    border: '1px solid #f1f5f9',
                    zIndex: 100,
                    minWidth: '280px',
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {[
                      { type: 'adults', label: 'Adults', sublabel: '12+ years', icon: <PersonOutlineOutlinedIcon sx={{ fontSize: 20 }} /> },
                      { type: 'children', label: 'Children', sublabel: '2-12 years', icon: <PersonOutlineOutlinedIcon sx={{ fontSize: 20 }} /> },
                      { type: 'infants', label: 'Infants', sublabel: '0-2 years', icon: <PersonOutlineOutlinedIcon sx={{ fontSize: 20 }} /> }
                    ].map((item, index) => (
                      <Box key={item.type} sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        pb: index === 2 ? 0 : 2,
                        borderBottom: index === 2 ? 'none' : '1px solid #f1f5f9'
                      }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Box sx={{ color: '#64748B', display: 'flex' }}>{item.icon}</Box>
                          <Box>
                            <Typography sx={{ fontWeight: 600, fontSize: '14px', color: '#1F2937' }}>{item.label}</Typography>
                            <Typography sx={{ fontSize: '12px', color: '#64748B' }}>{item.sublabel}</Typography>
                          </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <IconButton 
                            size="small" 
                            onMouseDown={(e) => { e.preventDefault(); updatePassengerCount(item.type, false); }}
                            disabled={item.type === 'adults' ? formData.adults <= 1 : formData[item.type] <= 0}
                            sx={{ border: '1.5px solid #E2E8F0', p: 0.5 }}
                          >
                            <RemoveIcon sx={{ fontSize: 16 }} />
                          </IconButton>
                          <Typography sx={{ minWidth: '16px', textAlign: 'center', fontWeight: 700, fontSize: '15px' }}>
                            {formData[item.type]}
                          </Typography>
                          <IconButton 
                            size="small" 
                            onMouseDown={(e) => { e.preventDefault(); updatePassengerCount(item.type, true); }}
                            sx={{ border: '1.5px solid #E2E8F0', p: 0.5 }}
                          >
                            <AddIcon sx={{ fontSize: 16 }} />
                          </IconButton>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Paper>
              </ClickAwayListener>
            )}
          </Box>
        </Grid>

        <Grid item xs={12} md={4.4} sx={{ width: { xs: '100%', md: '32.5%', lg: '33%' } }}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<SearchIcon />}
            onClick={() => {
              localStorage.setItem('flightSearchData', JSON.stringify(formData));
              router.push('/flight-results');
            }}
            sx={{
              height: '38px',
              mt: { md: 3 }, // Align with inputs
              borderRadius: '8px',
              bgcolor: '#0058E6',
              textTransform: 'none',
              fontSize: '14px',
              fontWeight: 500,
              boxShadow: 'none',
              '&:hover': { bgcolor: '#0041eb', boxShadow: '0 4px 12px rgba(0,97,255,0.2)' }
            }}
          >
            Search Flights
          </Button>
        </Grid>

      </Grid>
    </Box>
  </>
  );
}
