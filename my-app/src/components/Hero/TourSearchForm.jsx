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
  Divider,
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
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import HikingOutlinedIcon from '@mui/icons-material/HikingOutlined';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import BeachAccessOutlinedIcon from '@mui/icons-material/BeachAccessOutlined';
import FortOutlinedIcon from '@mui/icons-material/FortOutlined';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import TodayIcon from '@mui/icons-material/Today';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export default function TourSearchForm() {
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    destination: '',
    destinationSearch: '',
    startDate: dayjs(),
    duration: 'Any Duration',
    tourType: 'Any Type',
    travelers: { adults: 2, children: 0 },
  });
  const [error, setError] = React.useState(false);

  const [isDateOpen, setIsDateOpen] = React.useState(false);
  const [isDestinationOpen, setIsDestinationOpen] = React.useState(false);
  const [isTravelersOpen, setIsTravelersOpen] = React.useState(false);
  const [isDurationOpen, setIsDurationOpen] = React.useState(false);
  const [isTypeOpen, setIsTypeOpen] = React.useState(false);
  
  const [nationalities, setNationalities] = React.useState([]); // Using same API for city search
  const travelerClickTimestamp = React.useRef(0);
  const dateInputRef = React.useRef(null);

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

  const handleDestinationClick = () => setIsDestinationOpen(true);
  const handleDestinationClose = () => setIsDestinationOpen(false);
  const handleDestinationSelect = (country) => {
    setFormData(prev => ({
      ...prev,
      destination: country.name,
      destinationSearch: country.name
    }));
    setIsDestinationOpen(false);
    setError(false);
    // Auto open calendar
    setTimeout(() => setIsDateOpen(true), 100);
  };

  const handleDateClick = () => setIsDateOpen(true);
  const handleDateClose = () => setIsDateOpen(false);
  const handleDateChange = (newDate) => {
    setFormData(prev => ({ ...prev, startDate: newDate }));
    setIsDateOpen(false);
  };

  const handleTravelerClick = () => setIsTravelersOpen(!isTravelersOpen);
  const handleTravelerClose = () => setIsTravelersOpen(false);

  const updateTravelerCount = (type, increment) => {
    setFormData(prev => ({
      ...prev,
      travelers: {
        ...prev.travelers,
        [type]: increment 
          ? Math.min(prev.travelers[type] + 1, 10) 
          : Math.max(prev.travelers[type] - 1, type === 'adults' ? 1 : 0)
      }
    }));
  };

  const getTotalTravelers = () => {
    return formData.travelers.adults + formData.travelers.children;
  };

  const filteredDestinations = nationalities.filter(country =>
    country.name.toLowerCase().includes(formData.destinationSearch.toLowerCase())
  );

  const openDate = isDateOpen;
  const openDestination = isDestinationOpen;
  const openTraveler = isTravelersOpen;

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
          open={isDateOpen}
          onClick={handleDateClose}
          sx={{ 
            zIndex: 1400,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          }}
        />
      </Portal>
      <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Grid container rowSpacing={2} columnSpacing={2}>
        {/* Row 1: Destination, Start Date, Duration */}
        <Grid item xs={12} md={5} sx={{ position: 'relative', width: { xs: '100%', md: '49%', lg: '50%' }, overflow: 'visible' }}>
          <Typography sx={labelStyles}>
            <LocationOnOutlinedIcon sx={iconStyles} />
            Destination
          </Typography>
          <Box sx={{ position: 'relative' }}>
            <TextField
              fullWidth
              placeholder="Search By City"
              variant="outlined"
              size="small"
              value={formData.destinationSearch}
              onChange={(e) => {
                const val = e.target.value;
                setFormData(prev => ({ ...prev, destinationSearch: val }));
                if (error) setError(false);
                if (!isDestinationOpen) setIsDestinationOpen(true);
              }}
              onClick={handleDestinationClick}
              error={error}
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
            {error && (
              <Typography sx={{ color: '#d32f2f', fontSize: '12px', mt: 0.5, ml: 1 }}>
                Please select destination
              </Typography>
            )}
            {isDestinationOpen && filteredDestinations.length > 0 && (
              <ClickAwayListener onClickAway={handleDestinationClose}>
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
                    {filteredDestinations.map((country) => (
                      <ListItem key={country.code} disablePadding>
                        <ListItemButton 
                          onMouseDown={(e) => { e.preventDefault(); handleDestinationSelect(country); }}
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

        <Grid item xs={12} md={3.5} sx={{ position: 'relative', width: { xs: '100%', sm: '100%', md: '23%', lg: '23%' }, overflow: 'visible' }}>
          <Typography sx={labelStyles}>
            <CalendarMonthOutlinedIcon sx={iconStyles} />
            Start Date
          </Typography>
          <Box sx={{ position: "relative" }}>
            <TextField
              fullWidth
              inputRef={dateInputRef}
              value={formData.startDate.format('DD-MM-YYYY')}
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
                  cursor: 'pointer',
                }
              }}
            />
            <Popper
              open={isDateOpen}
              anchorEl={dateInputRef.current}
              placement="bottom-start"
              sx={{ zIndex: 1500, width: dateInputRef.current?.offsetWidth }}
            >
              <ClickAwayListener onClickAway={handleDateClose}>
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
                      value={formData.startDate} 
                      onChange={handleDateChange} 
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

        <Grid item xs={12} md={3.5} sx={{ position: 'relative', width:{ xs: '100%', sm: '100%', md: '24%', lg: '24%' }, overflow: 'visible' }}>
          <Typography sx={labelStyles}>
            <AccessTimeOutlinedIcon sx={iconStyles} />
            Duration
          </Typography>
          <Box sx={{ position: "relative" }}>
            <TextField
              fullWidth
              size="small"
              value={formData.duration}
              readOnly
              onClick={() => setIsDurationOpen(!isDurationOpen)}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <ExpandMoreOutlinedIcon sx={{ 
                      color: '#020817', 
                      fontSize: '18px',
                      transition: 'transform 0.2s', 
                      transform: isDurationOpen ? 'rotate(180deg)' : 'none' 
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
            {isDurationOpen && (
              <ClickAwayListener onClickAway={() => setIsDurationOpen(false)}>
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
                    {[
                      { label: "Any Duration", icon: <AccessTimeOutlinedIcon sx={{ fontSize: '14px' }} /> },
                      { label: "1 Day", icon: <TodayIcon sx={{ fontSize: '14px' }} /> },
                      { label: "2-3 Days", icon: <InsertInvitationIcon sx={{ fontSize: '14px' }} /> },
                      { label: "4-7 Days", icon: <DateRangeIcon sx={{ fontSize: '14px' }} /> },
                      { label: "1-2 Weeks", icon: <CalendarViewWeekIcon sx={{ fontSize: '14px' }} /> },
                      { label: "15+ Days", icon: <CalendarMonthIcon sx={{ fontSize: '14px' }} /> },
                    ].map((item) => (
                      <ListItem key={item.label} disablePadding>
                        <ListItemButton 
                          onMouseDown={(e) => { e.preventDefault(); setFormData(prev => ({ ...prev, duration: item.label })); setIsDurationOpen(false); }}
                          sx={{ py: 0.3, px: 2, '&:hover': { bgcolor: '#f8fafc' }, display: 'flex', alignItems: 'center', gap: 1.5 }}
                        >
                          {item.icon && <Box sx={{ display: 'flex', color: '#020817' }}>{item.icon}</Box>}
                          <ListItemText 
                            primary={item.label} 
                            sx={{ ml: item.icon ? 0 : 3.25 }} // Offset items without icons to align with icon items
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

        {/* Row 2: Tour Type, Travelers, Search Button */}
        
        <Grid item xs={12} md={3.5} sx={{ position: 'relative', width: { xs: '100%', md: '23.5%', lg: '24%' }, overflow: 'visible' }}>
          <Typography sx={labelStyles}>
            <CategoryOutlinedIcon sx={iconStyles} />
            Tour Type
          </Typography>
          <Box sx={{ position: "relative" }}>
            <TextField
              fullWidth
              size="small"
              value={formData.tourType}
              readOnly
              onClick={() => setIsTypeOpen(!isTypeOpen)}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <ExpandMoreOutlinedIcon sx={{ 
                      color: '#020817', 
                      fontSize: '18px',
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
                    zIndex: 1300,
                  }}
                >
                  <List sx={{ py: 0 }}>
                    {[
                      { label: "Any Type", icon: <CategoryOutlinedIcon sx={{ fontSize: '14px' }} /> },
                      { label: "cultural ", icon: <AccountBalanceOutlinedIcon sx={{ fontSize: '14px' }} /> },
                      { label: "Adventure", icon: <HikingOutlinedIcon sx={{ fontSize: '14px' }} /> },
                      { label: "Wildlife", icon: <PetsOutlinedIcon sx={{ fontSize: '14px' }} /> },
                      { label: "City Tours", icon: <LocationCityOutlinedIcon sx={{ fontSize: '14px' }} /> },
                      { label: "Beach", icon: <BeachAccessOutlinedIcon sx={{ fontSize: '14px' }} /> },
                      { label: "Historical", icon: <FortOutlinedIcon sx={{ fontSize: '14px' }} /> },
                      { label: "Food & Drink", icon: <RestaurantOutlinedIcon sx={{ fontSize: '14px' }} /> },
                      { label: "Shopping", icon: <ShoppingBagOutlinedIcon sx={{ fontSize: '14px' }} /> }
                    ].map((item) => (
                      <ListItem key={item.label} disablePadding>
                        <ListItemButton 
                          onMouseDown={(e) => { e.preventDefault(); setFormData(prev => ({ ...prev, tourType: item.label })); setIsTypeOpen(false); }}
                          sx={{ py: 0.4, px: 2, '&:hover': { bgcolor: '#f8fafc' }, display: 'flex', alignItems: 'center', gap: 1.5 }}
                        >
                          <Box sx={{ display: 'flex', color: '#020817' }}>{item.icon}</Box>
                          <ListItemText 
                            primary={item.label} 
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

        <Grid item xs={12} md={3.5} sx={{ position: 'relative', width: { xs: '100%', md: '23.8%', lg: '24.5%' }, overflow: 'visible' }}>
          <Typography sx={labelStyles}>
            <GroupsOutlinedIcon sx={iconStyles} />
            Travelers
          </Typography>
          <Box sx={{ position: "relative" }}>
            <TextField
              fullWidth
              size="small"
              value={`${getTotalTravelers()} Traveler${getTotalTravelers() > 1 ? 's' : ''}`}
              onClick={handleTravelerClick}
              readOnly
              autoComplete="off"
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <ExpandMoreOutlinedIcon sx={{ 
                      color: '#020817', 
                      fontSize: '18px',
                      transition: 'transform 0.2s', 
                      transform: isTravelersOpen ? 'rotate(180deg)' : 'none' 
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
            {isTravelersOpen && (
              <ClickAwayListener onClickAway={handleTravelerClose}>
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
                    zIndex: 1300,
                    minWidth: '280px',
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    {[
                      { type: 'adults', label: 'Adults', sublabel: '18+ years' },
                      { type: 'children', label: 'Children', sublabel: '2-17 years' }
                    ].map((item, index) => (
                      <Box key={item.type} sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        pb: index === 1 ? 0 : 0.8,
                        borderBottom: index === 1 ? 'none' : '1px solid #f1f5f9'
                      }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Box>
                            <Typography sx={{ fontWeight: 600, fontSize: '12px', color: '#1F2937' }}>{item.label}</Typography>
                            <Typography sx={{ fontSize: '12px', color: '#64748B' }}>{item.sublabel}</Typography>
                          </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <IconButton 
                            size="small" 
                            onMouseDown={(e) => { e.preventDefault(); updateTravelerCount(item.type, false); }}
                            disabled={item.type === 'adults' ? formData.travelers.adults <= 1 : formData.travelers[item.type] <= 0}
                            sx={{ border: '1.5px solid #E2E8F0', p: 0.5 }}
                          >
                            <RemoveIcon sx={{ fontSize: 16 }} />
                          </IconButton>
                          <Typography sx={{ minWidth: '16px', textAlign: 'center', fontWeight: 700, fontSize: '12px' }}>
                            {formData.travelers[item.type]}
                          </Typography>
                          <IconButton 
                            size="small" 
                            onMouseDown={(e) => { e.preventDefault(); updateTravelerCount(item.type, true); }}
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

        <Grid item xs={12} md={5} sx={{position: 'relative',left:{xs:0,md:3, lg:1}, display: 'flex', alignItems: 'flex-end', width: { xs: '100%', sm: '100%', md: '48.2%', lg: '48.2%' } }}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<SearchIcon />}
            onClick={() => {
              if (!formData.destination) {
                setError(true);
                return;
              }
              localStorage.setItem('tourSearchData', JSON.stringify(formData));
              router.push('/tour-results');
            }}
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
            Search Tours
          </Button>
        </Grid>

      </Grid>
    </Box>
    </>
  );
}
