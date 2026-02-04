'use client';

import * as React from 'react';
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
  Divider,
  Select,
  FormControl,
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
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import OutlinedFlagOutlinedIcon from '@mui/icons-material/OutlinedFlagOutlined';

export default function HotelSearchForm() {
  const [formData, setFormData] = React.useState({
    destination: '',
    destinationSearch: '',
    checkInDate: dayjs(),
    checkOutDate: dayjs().add(1, 'day'),
    rooms: [{ id: 1, adults: 2, children: 0, childAges: [] }],
    nationality: '',
    nationalitySearch: '',
  });

  const [nationalities, setNationalities] = React.useState([]);
  const [isDestinationOpen, setIsDestinationOpen] = React.useState(false);
  const [isCheckInOpen, setIsCheckInOpen] = React.useState(false);
  const [isCheckOutOpen, setIsCheckOutOpen] = React.useState(false);
  const [isGuestsOpen, setIsGuestsOpen] = React.useState(false);
  const [isNationalityOpen, setIsNationalityOpen] = React.useState(false);
  const [isAgeSelectOpen, setIsAgeSelectOpen] = React.useState(false);

  const destinationInputRef = React.useRef(null);
  const checkInInputRef = React.useRef(null);
  const checkOutInputRef = React.useRef(null);
  const guestsInputRef = React.useRef(null);
  const nationalityInputRef = React.useRef(null);

  React.useEffect(() => {
    const fetchNationalities = async () => {
      try {
        const response = await fetch('/api/nationalities');
        const data = await response.json();
        setNationalities(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchNationalities();
  }, []);

  const handleDestinationSelect = (country) => {
    setFormData(prev => ({ 
      ...prev, 
      destination: country.name,
      destinationSearch: country.name 
    }));
    setIsDestinationOpen(false);
    setTimeout(() => setIsCheckInOpen(true), 100);
  };

  const handleCheckInClick = () => setIsCheckInOpen(!isCheckInOpen);
  const handleCheckInClose = () => setIsCheckInOpen(false);
  const handleCheckInChange = (newDate) => {
    setFormData(prev => ({ 
      ...prev, 
      checkInDate: newDate,
      checkOutDate: newDate.isAfter(prev.checkOutDate) || newDate.isSame(prev.checkOutDate) 
        ? newDate.add(1, 'day') 
        : prev.checkOutDate
    }));
    setIsCheckInOpen(false);
    setTimeout(() => setIsCheckOutOpen(true), 100);
  };

  const handleCheckOutClick = () => setIsCheckOutOpen(!isCheckOutOpen);
  const handleCheckOutClose = () => setIsCheckOutOpen(false);
  const handleCheckOutChange = (newDate) => {
    setFormData(prev => ({ ...prev, checkOutDate: newDate }));
    setIsCheckOutOpen(false);
  };

  const handleGuestsClick = () => setIsGuestsOpen(!isGuestsOpen);
  const handleGuestsClose = () => {
    if (isAgeSelectOpen) return;
    setIsGuestsOpen(false);
  };

  const addRoom = () => {
    setFormData(prev => ({
      ...prev,
      rooms: [...prev.rooms, { id: prev.rooms.length + 1, adults: 2, children: 0, childAges: [] }]
    }));
  };

  const removeRoom = () => {
    if (formData.rooms.length > 1) {
      setFormData(prev => ({
        ...prev,
        rooms: prev.rooms.slice(0, -1)
      }));
    }
  };

  const updateRoomCount = (roomId, type, increment) => {
    setFormData(prev => ({
      ...prev,
      rooms: prev.rooms.map(room => {
        if (room.id === roomId) {
          let newValue = increment ? Math.min(room[type] + 1, 10) : Math.max(room[type] - 1, type === 'adults' ? 1 : 0);
          
          let newChildAges = [...room.childAges];
          if (type === 'children') {
            if (increment && room.children < 10) {
              newChildAges.push('0'); // Default age 7
            } else if (!increment && room.children > 0) {
              newChildAges.pop();
            }
          }
          
          return { ...room, [type]: newValue, childAges: newChildAges };
        }
        return room;
      })
    }));
  };

  const updateChildAge = (roomId, childIndex, age) => {
    setFormData(prev => ({
      ...prev,
      rooms: prev.rooms.map(room => {
        if (room.id === roomId) {
          const newChildAges = [...room.childAges];
          newChildAges[childIndex] = age;
          return { ...room, childAges: newChildAges };
        }
        return room;
      })
    }));
  };

  const getTotalGuests = () => {
    return formData.rooms.reduce((acc, room) => acc + room.adults + room.children, 0);
  };

  const handleNationalityClick = () => setIsNationalityOpen(!isNationalityOpen);
  const handleNationalityClose = () => setIsNationalityOpen(false);
  const handleNationalitySelect = (country) => {
    setFormData(prev => ({ 
      ...prev, 
      nationality: country.name,
      nationalitySearch: country.name 
    }));
    setIsNationalityOpen(false);
  };

  const filteredDestinations = nationalities.filter(country =>
    country.name.toLowerCase().includes(formData.destinationSearch.toLowerCase())
  );

  const filteredNationalities = nationalities.filter(country =>
    country.name.toLowerCase().includes(formData.nationalitySearch.toLowerCase())
  );

  const textFieldStyles = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      bgcolor: '#fff',
      height: '38px',
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
    gap: 1,
    fontFamily: 'Inter, sans-serif'
  };

  const iconStyles = { fontSize: 14, mb: 0.3, color: '#64748B' };

  return (
    <>
      <Portal>
        <Backdrop
          open={isCheckInOpen || isCheckOutOpen}
          onClick={() => {
            handleCheckInClose();
            handleCheckOutClose();
          }}
          sx={{ 
            zIndex: 1400,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          }}
        />
      </Portal>
      <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Grid container spacing={2}>
        {/* Row 1: Destination, Check-in, Check-out */}
        <Grid item xs={12} md={6} sx={{ position: 'relative', width: { xs: '100%', md: '49%', lg: '50%' }, overflow: 'visible' }}>
          <Typography sx={labelStyles}>
            <LocationOnOutlinedIcon sx={iconStyles} />
            Destination or Hotel Name
          </Typography>
          <Box sx={{ position: "relative" }}>
            <TextField
              fullWidth
              inputRef={destinationInputRef}
              placeholder="Search By City"
              variant="outlined"
              size="small"
              value={formData.destinationSearch}
              onChange={(e) => {
                const val = e.target.value;
                setFormData(prev => ({ ...prev, destinationSearch: val }));
                if (!isDestinationOpen) setIsDestinationOpen(true);
              }}
              onClick={() => setIsDestinationOpen(!isDestinationOpen)}
              autoComplete="off"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnOutlinedIcon sx={{ fontSize: 18, color: '#6B7280' }} />
                  </InputAdornment>
                ),
                endAdornment: formData.destinationSearch && (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFormData(prev => ({ ...prev, destination: '', destinationSearch: '' }));
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

            {isDestinationOpen && filteredDestinations.length > 0 && (
              <ClickAwayListener onClickAway={() => setIsDestinationOpen(false)}>
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
                    zIndex: 1300,
                  }}
                >
                  <List sx={{ py: 0 }}>
                    {filteredDestinations.map((country) => (
                      <ListItem key={country.code} disablePadding>
                        <ListItemButton 
                          onMouseDown={(e) => {
                            e.preventDefault();
                            handleDestinationSelect(country);
                          }}
                          sx={{ py: 0.4, px: 2, '&:hover': { bgcolor: '#f8fafc' }, display: 'flex', alignItems: 'center', gap: 1.5 }}
                        >
                          <LocationOnOutlinedIcon sx={{ fontSize: 14, color: '#020817' }} />
                          <ListItemText 
                            primary={country.name} 
                            primaryTypographyProps={{ 
                              fontSize: '14px', 
                              color: '#020817',
                              fontWeight: 400
                            }} 
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

        <Grid item xs={12} sm={6} md={3} sx={{ position: 'relative', width: { xs: '100%', sm: '100%', md: '24%', lg: '23.5%' }, pl: { xs: 0, md: 0.4 }, overflow: 'visible' }}>
          <Typography sx={labelStyles}>
            <CalendarMonthOutlinedIcon sx={iconStyles} />
            Check-in
          </Typography>
          <Box sx={{ position: "relative" }}>
            <TextField
              fullWidth
              inputRef={checkInInputRef}
              value={formData.checkInDate.format('DD-MM-YYYY')}
              onClick={handleCheckInClick}
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
                  cursor: 'pointer',
                }
              }}
            />
            <Popper
              open={isCheckInOpen}
              anchorEl={checkInInputRef.current}
              placement="bottom-start"
              sx={{ zIndex: 1500, width: checkInInputRef.current?.offsetWidth }}
            >
              <ClickAwayListener onClickAway={handleCheckInClose}>
                <Paper
                  sx={{ 
                    mt: 0.5, 
                    borderRadius: '12px', 
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
                    border: '1px solid #f1f5f9',
                    width: '100%',
                    bgcolor: 'background.paper',
                  }} 
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar 
                      value={formData.checkInDate} 
                      onChange={handleCheckInChange} 
                      disablePast 
                      sx={{ 
                        width: '100%', 
                        maxHeight: '260px',
                        '& .MuiDateCalendar-root': {
                          width: '100%',
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
        </Grid>

        <Grid item xs={12} sm={6} md={3} sx={{ position: 'relative', width: { xs: '100%', sm: '100%', md: '23.5%', lg: '23.5%' }, overflow: 'visible' }}>
          <Typography sx={labelStyles}>
            <CalendarMonthOutlinedIcon sx={iconStyles} />
            Check-out
          </Typography>
          <Box sx={{ position: "relative" }}>
            <TextField
              fullWidth
              inputRef={checkOutInputRef}
              value={formData.checkOutDate.format('DD-MM-YYYY')}
              onClick={handleCheckOutClick}
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
                  cursor: 'pointer',
                }
              }}
            />
            <Popper
              open={isCheckOutOpen}
              anchorEl={checkOutInputRef.current}
              placement="bottom-start"
              sx={{ zIndex: 1500, width: checkOutInputRef.current?.offsetWidth }}
            >
              <ClickAwayListener onClickAway={handleCheckOutClose}>
                <Paper
                  sx={{ 
                    mt: 0.5, 
                    borderRadius: '12px', 
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
                    border: '1px solid #f1f5f9',
                    width: '100%',
                    bgcolor: 'background.paper',
                  }} 
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar 
                      value={formData.checkOutDate} 
                      onChange={handleCheckOutChange} 
                      disablePast 
                      minDate={formData.checkInDate}
                      sx={{ 
                        width: '100%', 
                        maxHeight: '260px',
                        '& .MuiDateCalendar-root': {
                          width: '100%',
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
        </Grid>

        {/* Row 2: Guests & Rooms, Nationality, Search Button */}
        <Grid item xs={12} md={3} sx={{ position: 'relative', width: { xs: '100%', md: '24%', lg: '24%' }, overflow: 'visible' }}>
          <Typography sx={labelStyles}>
            <GroupOutlinedIcon sx={iconStyles} />
            Guests & Rooms
          </Typography>
          <Box sx={{ position: "relative" }}>
            <TextField
              fullWidth
              inputRef={guestsInputRef}
              size="small"
              value={`${getTotalGuests()} Guest${getTotalGuests() > 1 ? 's' : ''}, ${formData.rooms.length} Room${formData.rooms.length > 1 ? 's' : ''}`}
              onClick={handleGuestsClick}
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
                      transform: isGuestsOpen ? 'rotate(180deg)' : 'none' 
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
            {isGuestsOpen && (
              <ClickAwayListener onClickAway={handleGuestsClose}>
                <Paper
                  sx={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    mt: 1,
                    borderRadius: '12px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
                    border: '1px solid #f1f5f9',
                    p: 0,
                    zIndex: 1300,
                    minWidth: '280px',
                  }}
                >
                  <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: '12px 12px 0 0' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography sx={{ fontSize: '15px', fontWeight: 600, color: '#020817' }}>Rooms</Typography>
                        <Typography sx={{ fontSize: '10px', color: '#64748b' }}>Add or remove rooms</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <IconButton 
                          size="small" 
                          onMouseDown={(e) => { e.preventDefault(); removeRoom(); }}
                          disabled={formData.rooms.length <= 1}
                          sx={{ 
                            bgcolor: '#fff',
                            border: '1.5px solid #e2e8f0',
                            '&:hover': { bgcolor: '#f1f5f9' },
                            '&.Mui-disabled': { opacity: 0.5 }
                          }}
                        >
                          <RemoveIcon sx={{ fontSize: 18, color: '#020817' }} />
                        </IconButton>
                        <Typography sx={{ minWidth: '14px', textAlign: 'center', fontWeight: 700, fontSize: '14px' }}>{formData.rooms.length}</Typography>
                        <IconButton 
                          size="small" 
                          onMouseDown={(e) => { e.preventDefault(); addRoom(); }}
                          sx={{ 
                            bgcolor: '#fff',
                            border: '1.5px solid #e2e8f0',
                            '&:hover': { bgcolor: '#f1f5f9' }
                          }}
                        >
                          <AddIcon sx={{ fontSize: 18, color: '#020817' }} />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>

                  <Box sx={{ p: 2, maxHeight: '350px', overflowY: 'auto' }}>
                    {formData.rooms.map((room, index) => (
                      <Box 
                        key={room.id} 
                        sx={{ 
                          p: 2, 
                          mb: index === formData.rooms.length - 1 ? 0 : 2,
                          borderRadius: '12px',
                          border: '1.5px solid #E2E8F0',
                          bgcolor: '#fff'
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                          <Box component="span" sx={{ display: 'flex', bgcolor: '#f1f5f9', p: 0.5, borderRadius: '4px' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M3 20v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8" />
                              <path d="M5 10V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4" />
                              <path d="M3 18h18" />
                            </svg>
                          </Box>
                          <Typography sx={{ fontWeight: 600, fontSize: '12px', color: '#020817' }}>
                            Room {room.id} - Travellers
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                          <Box>
                            <Typography sx={{ fontSize: '12px', fontWeight: 600, color: '#020817' }}>Adults</Typography>
                            <Typography sx={{ fontSize: '12px', color: '#64748b' }}>18+ years</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <IconButton 
                              size="small" 
                              onMouseDown={(e) => { e.preventDefault(); updateRoomCount(room.id, 'adults', false); }}
                              sx={{ border: '1.5px solid #e2e8f0' }}
                            >
                              <RemoveIcon sx={{ fontSize: 16 }} />
                            </IconButton>
                            <Typography sx={{ minWidth: '16px', textAlign: 'center', fontWeight: 700 }}>{room.adults}</Typography>
                            <IconButton 
                              size="small" 
                              onMouseDown={(e) => { e.preventDefault(); updateRoomCount(room.id, 'adults', true); }}
                              sx={{ border: '1.5px solid #e2e8f0' }}
                            >
                              <AddIcon sx={{ fontSize: 16 }} />
                            </IconButton>
                          </Box>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: room.children > 0 ? 2 : 0 }}>
                          <Box>
                            <Typography sx={{ fontSize: '12px', fontWeight: 600, color: '#020817' }}>Children</Typography>
                            <Typography sx={{ fontSize: '12px', color: '#64748b' }}>0-17 years</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <IconButton 
                              size="small" 
                              onMouseDown={(e) => { e.preventDefault(); updateRoomCount(room.id, 'children', false); }}
                              sx={{ border: '1.5px solid #e2e8f0' }}
                            >
                              <RemoveIcon sx={{ fontSize: 16 }} />
                            </IconButton>
                            <Typography sx={{ minWidth: '16px', textAlign: 'center', fontWeight: 700 }}>{room.children}</Typography>
                            <IconButton 
                              size="small" 
                              onMouseDown={(e) => { e.preventDefault(); updateRoomCount(room.id, 'children', true); }}
                              sx={{ border: '1.5px solid #e2e8f0' }}
                            >
                              <AddIcon sx={{ fontSize: 16 }} />
                            </IconButton>
                          </Box>
                        </Box>

                        {room.children > 0 && (
                          <Box sx={{ mt: 1, pt: 1, borderTop: '1px solid #f1f5f9' }}>
                            <Typography sx={{ fontSize: '12px', fontWeight: 600, color: '#020817', mb: 1 }}>
                              Child Ages
                            </Typography>
                            <Grid container spacing={1}>
                              {room.childAges.map((age, childIndex) => (
                                <Grid item xs={12} key={childIndex} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: 6, mb: 1 }}>
                                  <Typography sx={{ fontSize: '12px', color: '#64748b' }}>
                                    Child {childIndex + 1}:
                                  </Typography>
                                  <Select
                                    value={age}
                                    onChange={(e) => updateChildAge(room.id, childIndex, e.target.value)}
                                    onOpen={() => setIsAgeSelectOpen(true)}
                                    onClose={() => setTimeout(() => setIsAgeSelectOpen(false), 200)}
                                    size="small"
                                    IconComponent={ExpandMoreOutlinedIcon }
                                    MenuProps={{
                                      onClick: (e) => e.stopPropagation(),
                                      PaperProps: {
                                        sx: {
                                          borderRadius: '8px',
                                          mt: 1,
                                          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
                                          border: '1px solid #f1f5f9',
                                        }
                                      },
                                      anchorOrigin: {
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                      },
                                      transformOrigin: {
                                        vertical: 'top',
                                        horizontal: 'left',
                                      },
                                    }}
                                    sx={{
                                      width: '110px',
                                      height: '32px',
                                      fontSize: '11px',
                                      borderRadius: '8px',
                                      backgroundColor: '#fff',
                                      '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e2e8f0' },
                                      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#cbd5e1' },
                                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#0058e6' },
                                      '& .MuiSelect-icon': {
                                        fontSize: '18px',
                                        color: '#020817',
                                        right: '4px'
                                      }
                                    }}
                                  >
                                    {[...Array(18)].map((_, ageIndex) => (
                                      <MenuItem 
                                        key={ageIndex} 
                                        value={ageIndex.toString()}
                                        sx={{ fontSize: '11px' }}
                                      >
                                        {ageIndex} {ageIndex <= 1 ? 'year' : 'years'}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </Grid>
                              ))}
                            </Grid>
                          </Box>
                        )}
                      </Box>
                    ))}
                  </Box>
                </Paper>
              </ClickAwayListener>
            )}
          </Box>
        </Grid>

        <Grid item xs={12} md={3} sx={{ position: 'relative', width: { xs: '100%', md: '23.2%', lg: '24.5%' }, overflow: 'visible' }}>
          <Typography sx={labelStyles}>
            <PublicOutlinedIcon sx={iconStyles} />
            Nationality
          </Typography>
          <Box sx={{ position: "relative" }}>
            <TextField
              fullWidth
              inputRef={nationalityInputRef}
              placeholder="Select Nationality"
              variant="outlined"
              size="small"
              value={formData.nationalitySearch}
              onChange={(e) => {
                const val = e.target.value;
                setFormData(prev => ({ ...prev, nationalitySearch: val }));
                if (!isNationalityOpen) setIsNationalityOpen(true);
              }}
              onClick={handleNationalityClick}
              autoComplete="off"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <ExpandMoreOutlinedIcon sx={{ 
                      color: '#020817', 
                      fontSize: '14px',
                      transition: 'transform 0.2s', 
                      transform: isNationalityOpen ? 'rotate(180deg)' : 'none' 
                    }} />
                  </InputAdornment>
                ),
              }}
              sx={textFieldStyles}
            />
            {isNationalityOpen && filteredNationalities.length > 0 && (
              <ClickAwayListener onClickAway={handleNationalityClose}>
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
                    zIndex: 1300,
                  }}
                >
                  <List sx={{ py: 0 }}>
                    {filteredNationalities.map((country) => (
                      <ListItem key={country.code} disablePadding>
                        <ListItemButton 
                          onMouseDown={(e) => {
                            e.preventDefault();
                            handleNationalitySelect(country);
                          }}
                          sx={{ py: 0.4, px: 2, '&:hover': { bgcolor: '#f8fafc' }, display: 'flex', alignItems: 'center', gap: 1.5 }}
                        >
                          <OutlinedFlagOutlinedIcon sx={{ fontSize: 14, color: '#020817' }} />
                          <ListItemText 
                            primary={country.name} 
                            primaryTypographyProps={{ 
                              fontSize: '14px', 
                              color: '#020817',
                              fontWeight: 400
                            }} 
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

        <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'flex-end', width: { xs: '100%', md: '49.2%', lg: '48.5%' }, pl: { xs: 0, md: 0.5 }}}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<SearchIcon />}
            sx={{
              height: 38,
              borderRadius: '8px',
              textTransform: 'none',
              fontSize: '14px',
              fontWeight: 500,
              bgcolor: '#0058E6',
              '&:hover': { bgcolor: '#0047b3' },
            }}
          >
            Search Hotels
          </Button>
        </Grid>
      </Grid>
      </Box>
    </>
  );
}
