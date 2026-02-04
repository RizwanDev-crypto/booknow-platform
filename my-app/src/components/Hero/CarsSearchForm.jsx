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
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';

export default function CarsSearchForm() {
  const [formData, setFormData] = React.useState({
    pickupLocation: '',
    pickupSearch: '',
    dropoffLocation: '',
    dropoffSearch: '',
    pickupDate: dayjs(),
    returnDate: dayjs().add(2, 'day'),
    carType: 'Any Type',
    driverAge: '25+ years old',
  });

  const [nationalities, setNationalities] = React.useState([]);
  const [isPickupOpen, setIsPickupOpen] = React.useState(false);
  const [isDropoffOpen, setIsDropoffOpen] = React.useState(false);
  const [isPickupDateOpen, setIsPickupDateOpen] = React.useState(false);
  const [isReturnDateOpen, setIsReturnDateOpen] = React.useState(false);
  const [isCarTypeOpen, setIsCarTypeOpen] = React.useState(false);
  const [isAgeOpen, setIsAgeOpen] = React.useState(false);

  const pickupInputRef = React.useRef(null);
  const dropoffInputRef = React.useRef(null);
  const pickupDateRef = React.useRef(null);
  const returnDateRef = React.useRef(null);

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

  const handlePickupClick = () => setIsPickupOpen(true);
  const handlePickupClose = () => setIsPickupOpen(false);
  const handlePickupSelect = (country) => {
    setFormData(prev => ({ 
      ...prev, 
      pickupLocation: country.name,
      pickupSearch: country.name 
    }));
    setIsPickupOpen(false);
    setTimeout(() => setIsDropoffOpen(true), 100);
  };

  const handleDropoffClick = () => setIsDropoffOpen(true);
  const handleDropoffClose = () => setIsDropoffOpen(false);
  const handleDropoffSelect = (country) => {
    setFormData(prev => ({ 
      ...prev, 
      dropoffLocation: country.name,
      dropoffSearch: country.name 
    }));
    setIsDropoffOpen(false);
    setTimeout(() => setIsPickupDateOpen(true), 100);
  };

  const handlePickupDateClick = () => setIsPickupDateOpen(true);
  const handlePickupDateClose = () => setIsPickupDateOpen(false);
  const handlePickupDateChange = (newDate) => {
    setFormData(prev => ({ 
      ...prev, 
      pickupDate: newDate,
      returnDate: newDate.isAfter(prev.returnDate) ? newDate.add(2, 'day') : prev.returnDate
    }));
    setIsPickupDateOpen(false);
    setTimeout(() => setIsReturnDateOpen(true), 100);
  };

  const handleReturnDateClick = () => setIsReturnDateOpen(true);
  const handleReturnDateClose = () => setIsReturnDateOpen(false);
  const handleReturnDateChange = (newDate) => {
    setFormData(prev => ({ ...prev, returnDate: newDate }));
    setIsReturnDateOpen(false);
  };

  const filteredPickups = nationalities.filter(country =>
    country.name.toLowerCase().includes(formData.pickupSearch.toLowerCase())
  );

  const filteredDropoffs = nationalities.filter(country =>
    country.name.toLowerCase().includes(formData.dropoffSearch.toLowerCase())
  );

  const openPickup = isPickupOpen;
  const openDropoff = isDropoffOpen;
  const openPickupDate = isPickupDateOpen;
  const openReturnDate = isReturnDateOpen;

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
    gap: 1 
  };

  const iconStyles = { fontSize: 14, mb: 0.3, color: '#64748B' };

  return (
    <>
      <Portal>
        <Backdrop
          open={isPickupDateOpen || isReturnDateOpen}
          onClick={() => {
            handlePickupDateClose();
            handleReturnDateClose();
          }}
          sx={{ 
            zIndex: 1400,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          }}
        />
      </Portal>
      <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Grid container spacing={2}>
        {/* Row 1: Pickup Location, Drop-off Location, Pickup Date, Return Date */}
        <Grid item xs={12} sm={6} md={3} sx={{ position: 'relative', width: { xs: '100%', sm: '100%', md: '23.6%', lg: '23%' }, overflow: 'visible' }}>
          <Typography sx={labelStyles}>
            <LocationOnOutlinedIcon sx={iconStyles} />
            Pickup Location
          </Typography>
          <Box sx={{ position: "relative" }}>
            <TextField
              fullWidth
              inputRef={pickupInputRef}
              placeholder="City or airport"
              variant="outlined"
              size="small"
              value={formData.pickupSearch}
              onChange={(e) => {
                const val = e.target.value;
                setFormData(prev => ({ ...prev, pickupSearch: val }));
                if (!isPickupOpen) setIsPickupOpen(true);
              }}
              onClick={handlePickupClick}
              autoComplete="off"
              InputProps={{
                endAdornment: formData.pickupSearch && (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFormData(prev => ({ ...prev, pickupLocation: '', pickupSearch: '' }));
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
            {isPickupOpen && filteredPickups.length > 0 && (
              <ClickAwayListener onClickAway={handlePickupClose}>
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
                    zIndex: 1300,
                    overflow: 'auto',
                  }}
                >
                  <List sx={{ py: 0 }}>
                    {filteredPickups.map((country) => (
                      <ListItem key={country.code} disablePadding>
                        <ListItemButton 
                          onMouseDown={(e) => { e.preventDefault(); handlePickupSelect(country); }}
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

        <Grid item xs={12} sm={6} md={3} sx={{ position: 'relative', width: { xs: '100%', sm: '100%', md: '23.6%', lg: '23%' }, overflow: 'visible' }}>
          <Typography sx={labelStyles}>
            <LocationOnOutlinedIcon sx={iconStyles} />
            Drop-off Location
          </Typography>
          <Box sx={{ position: "relative" }}>
            <TextField
              fullWidth
              inputRef={dropoffInputRef}
              placeholder="Same as pickup"
              variant="outlined"
              size="small"
              value={formData.dropoffSearch}
              onChange={(e) => {
                const val = e.target.value;
                setFormData(prev => ({ ...prev, dropoffSearch: val }));
                if (!isDropoffOpen) setIsDropoffOpen(true);
              }}
              onClick={handleDropoffClick}
              autoComplete="off"
              InputProps={{
                endAdornment: formData.dropoffSearch && (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFormData(prev => ({ ...prev, dropoffLocation: '', dropoffSearch: '' }));
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
            {isDropoffOpen && filteredDropoffs.length > 0 && (
              <ClickAwayListener onClickAway={handleDropoffClose}>
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
                    zIndex: 1300,
                    overflow: 'auto',
                  }}
                >
                  <List sx={{ py: 0 }}>
                    {filteredDropoffs.map((country) => (
                      <ListItem key={country.code} disablePadding>
                        <ListItemButton 
                          onMouseDown={(e) => { e.preventDefault(); handleDropoffSelect(country); }}
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

        <Grid item xs={12} sm={6} md={3} sx={{ position: 'relative', width: { xs: '100%', sm: '100%', md: '23.6%', lg: '24.8%' }, overflow: 'visible' }}>
          <Typography sx={labelStyles}>
            <CalendarMonthOutlinedIcon sx={iconStyles} />
            Pickup Date
          </Typography>
          <Box sx={{ position: "relative" }}>
            <TextField
              fullWidth
              inputRef={pickupDateRef}
              value={formData.pickupDate.format('DD-MM-YYYY')}
              onClick={handlePickupDateClick}
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
              open={isPickupDateOpen}
              anchorEl={pickupDateRef.current}
              placement="bottom-start"
              sx={{ zIndex: 1500, width: pickupDateRef.current?.offsetWidth }}
            >
              <ClickAwayListener onClickAway={handlePickupDateClose}>
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
                      value={formData.pickupDate} 
                      onChange={handlePickupDateChange} 
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

        <Grid item xs={12} sm={6} md={3} sx={{ position: 'relative', width: { xs: '100%', sm: '100%', md: '23.6%', lg: '24.8%' }, overflow: 'visible' }}>
          <Typography sx={labelStyles}>
            <CalendarMonthOutlinedIcon sx={iconStyles} />
            Return Date
          </Typography>
          <Box sx={{ position: "relative" }}>
            <TextField
              fullWidth
              inputRef={returnDateRef}
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
                  cursor: 'pointer',
                }
              }}
            />
            <Popper
              open={isReturnDateOpen}
              anchorEl={returnDateRef.current}
              placement="bottom-start"
              sx={{ zIndex: 1500, width: returnDateRef.current?.offsetWidth }}
            >
              <ClickAwayListener onClickAway={handleReturnDateClose}>
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
                      value={formData.returnDate} 
                      onChange={handleReturnDateChange} 
                      disablePast 
                      minDate={formData.pickupDate} 
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

        {/* Row 2: Car Type, Driver Age, Search Button */}
        <Grid item xs={12} md={4} sx={{ position: 'relative', width: { xs: '100%', md: '33%', lg: '33%' }, overflow: 'visible' }}>
          <Typography sx={labelStyles}>
            <DirectionsCarFilledOutlinedIcon sx={iconStyles} />
            Car Type
          </Typography>
          <Box sx={{ position: "relative" }}>
            <TextField
              fullWidth
              size="small"
              value={formData.carType}
              readOnly
              onClick={() => setIsCarTypeOpen(!isCarTypeOpen)}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <ExpandMoreOutlinedIcon sx={{ 
                      color: '#020817', 
                      fontSize: '18px',
                      transition: 'transform 0.2s', 
                      transform: isCarTypeOpen ? 'rotate(180deg)' : 'none' 
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
            {isCarTypeOpen && (
              <ClickAwayListener onClickAway={() => setIsCarTypeOpen(false)}>
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
                    zIndex: 1300,
                  }}
                >
                  <List sx={{ py: 0 }}>
                    {["Any Type", "Economy", "SUV", "Luxury", "Convertible"].map((item) => (
                      <ListItem key={item} disablePadding>
                        <ListItemButton 
                          onMouseDown={(e) => { e.preventDefault(); setFormData(prev => ({ ...prev, carType: item })); setIsCarTypeOpen(false); }}
                          sx={{ py: 0.4, px: 2, '&:hover': { bgcolor: '#f8fafc' }, display: 'flex', alignItems: 'center', gap: 1.5 }}
                        >
                          <TimeToLeaveIcon sx={{ fontSize: 14, color: '#020817' }} />
                          <ListItemText 
                            primary={item} 
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

        <Grid item xs={12} md={4} sx={{ position: 'relative', width: { xs: '100%', md: '30%', lg: '30%' }, overflow: 'visible' }}>
          <Typography sx={labelStyles}>
            <PersonOutlineOutlinedIcon sx={iconStyles} />
            Driver Age
          </Typography>
          <Box sx={{ position: "relative" }}>
            <TextField
              fullWidth
              size="small"
              value={formData.driverAge}
              readOnly
              onClick={() => setIsAgeOpen(!isAgeOpen)}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <ExpandMoreOutlinedIcon sx={{ 
                      color: '#020817', 
                      fontSize: '18px',
                      transition: 'transform 0.2s', 
                      transform: isAgeOpen ? 'rotate(180deg)' : 'none' 
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
            {isAgeOpen && (
              <ClickAwayListener onClickAway={() => setIsAgeOpen(false)}>
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
                    zIndex: 1300,
                  }}
                >
                  <List sx={{ py: 0 }}>
                    {["25+ years old", "21-24 years old", "18-20 years old"].map((item) => (
                      <ListItem key={item} disablePadding>
                        <ListItemButton 
                          onMouseDown={(e) => { e.preventDefault(); setFormData(prev => ({ ...prev, driverAge: item })); setIsAgeOpen(false); }}
                          sx={{ py: 0.4, px: 2, '&:hover': { bgcolor: '#f8fafc' }, display: 'flex', alignItems: 'center', gap: 1.5 }}
                        >
                          <PermIdentityIcon sx={{ fontSize: 14, color: '#020817' }} />
                          <ListItemText 
                            primary={item} 
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

        <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'flex-end', width: { xs: '100%', md: '33%', lg: '34%' } }}>
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
            Search Cars
          </Button>
        </Grid>
      </Grid>
      </Box>
    </>
  );
}
