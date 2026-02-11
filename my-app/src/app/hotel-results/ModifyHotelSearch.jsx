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
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import OutlinedFlagOutlinedIcon from '@mui/icons-material/OutlinedFlagOutlined';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined';

export default function ModifyHotelSearch({ hotelName }) {
  const [formData, setFormData] = React.useState({
    checkInDate: dayjs('2026-02-17'),
    checkOutDate: dayjs('2026-02-19'),
    rooms: [{ id: 1, adults: 2, children: 0, childAges: [] }],
    nationality: 'Afghanistan',
    nationalitySearch: 'Afghanistan',
  });

  const [nationalities, setNationalities] = React.useState([]);
  const [isCheckInOpen, setIsCheckInOpen] = React.useState(false);
  const [isCheckOutOpen, setIsCheckOutOpen] = React.useState(false);
  const [isGuestsOpen, setIsGuestsOpen] = React.useState(false);
  const [isNationalityOpen, setIsNationalityOpen] = React.useState(false);
  const [isAgeSelectOpen, setIsAgeSelectOpen] = React.useState(false);

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
              newChildAges.push('0');
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

  const filteredNationalities = nationalities.filter(country =>
    country.name.toLowerCase().includes(formData.nationalitySearch.toLowerCase())
  );

  const textFieldStyles = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      bgcolor: '#FCFCFD',
      height: '40px',
      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#1A53ff' },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#1A53ff', borderWidth: '1.5px' },
    },
    '& .MuiOutlinedInput-input': { 
      fontSize: '14px',
      padding: '0 12px',
    },
  };

  const labelStyles = {
    mb: 0.5, 
    fontSize: '0.75rem', 
    color: "#4B5563", 
    fontWeight: 600, 
    display: 'flex', 
    alignItems: 'center', 
    gap: 1,
  };

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        border: '1px solid #E5E7EB',
        bgcolor: '#FFFFFF',
        mb: 3,
        minHeight: 160
      }}
    >
      <Portal>
        <Backdrop
          open={isCheckInOpen || isCheckOutOpen}
          onClick={() => {
            handleCheckInClose();
            handleCheckOutClose();
          }}
          sx={{ zIndex: 1400, backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
        />
      </Portal>

      {/* Header Box */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        px: 2,
        py: 1.5,
        borderTopLeftRadius: '12px',
        borderTopRightRadius: '12px',
        bgcolor: '#f9fafb',
        borderBottom: '1px solid #E5E7EB'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <EditCalendarIcon sx={{ color: '#4B5563', fontSize: 18 }} />
          <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', color: '#374151' }}>
            Modify Search
          </Typography>
        </Box>
        <Typography sx={{ color: '#6B7280', fontSize: '0.75rem', fontWeight: 500 }}>
          {hotelName}
        </Typography>
      </Box>

      {/* Fields Row */}
      <Box sx={{ p: 3 }}>
        <Grid container spacing={2} alignItems="flex-end">
          {/* Check-in */}
          <Grid item xs={12} md={2.5}>
            <Typography sx={labelStyles}>Check-in</Typography>
            <Box sx={{ position: "relative" }}>
              <TextField
                fullWidth
                inputRef={checkInInputRef}
                value={formData.checkInDate.format('DD-MM-YYYY')}
                onClick={handleCheckInClick}
                readOnly
                size="small"
                InputProps={{ readOnly: true }}
                sx={textFieldStyles}
              />
              <Popper
                open={isCheckInOpen}
                anchorEl={checkInInputRef.current}
                placement="bottom-start"
                sx={{ zIndex: 1500, width: 280 }}
              >
                <ClickAwayListener onClickAway={handleCheckInClose}>
                  <Paper sx={{ mt: 0.5, borderRadius: '12px', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)', border: '1px solid #f1f5f9' }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateCalendar 
                        value={formData.checkInDate} 
                        onChange={handleCheckInChange} 
                        disablePast 
                        sx={{ transform: 'scale(0.9)', transformOrigin: 'top left' }}
                      />
                    </LocalizationProvider>
                  </Paper>
                </ClickAwayListener>
              </Popper>
            </Box>
          </Grid>

          {/* Check-out */}
          <Grid item xs={12} md={2.5}>
            <Typography sx={labelStyles}>Check-out</Typography>
            <Box sx={{ position: "relative" }}>
              <TextField
                fullWidth
                inputRef={checkOutInputRef}
                value={formData.checkOutDate.format('DD-MM-YYYY')}
                onClick={handleCheckOutClick}
                readOnly
                size="small"
                InputProps={{ readOnly: true }}
                sx={textFieldStyles}
              />
              <Popper
                open={isCheckOutOpen}
                anchorEl={checkOutInputRef.current}
                placement="bottom-start"
                sx={{ zIndex: 1500, width: 280 }}
              >
                <ClickAwayListener onClickAway={handleCheckOutClose}>
                  <Paper sx={{ mt: 0.5, borderRadius: '12px', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)', border: '1px solid #f1f5f9' }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateCalendar 
                        value={formData.checkOutDate} 
                        onChange={handleCheckOutChange} 
                        disablePast 
                        minDate={formData.checkInDate}
                        sx={{ transform: 'scale(0.9)', transformOrigin: 'top left' }}
                      />
                    </LocalizationProvider>
                  </Paper>
                </ClickAwayListener>
              </Popper>
            </Box>
          </Grid>

          {/* Guests & Rooms */}
          <Grid item xs={12} md={2.5}>
            <Typography sx={labelStyles}>Guests & Rooms</Typography>
            <Box sx={{ position: "relative" }}>
              <TextField
                fullWidth
                inputRef={guestsInputRef}
                size="small"
                value={`${getTotalGuests()} Guest${getTotalGuests() > 1 ? 's' : ''}, ${formData.rooms.length} Room${formData.rooms.length > 1 ? 's' : ''}`}
                onClick={handleGuestsClick}
                readOnly
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <ExpandMoreOutlinedIcon sx={{ fontSize: '14px', transform: isGuestsOpen ? 'rotate(180deg)' : 'none' }} />
                    </InputAdornment>
                  ),
                }}
                sx={textFieldStyles}
              />
              <Popper
                open={isGuestsOpen}
                anchorEl={guestsInputRef.current}
                placement="bottom-start"
                sx={{ zIndex: 1500, width: 320 }}
              >
                <ClickAwayListener onClickAway={handleGuestsClose}>
                  <Paper sx={{ mt: 1, borderRadius: '16px', boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)', border: '1px solid #E5E7EB', p: 0, bgcolor: '#FFFFFF' }}>
                    <Box sx={{ p: 2.5, maxHeight: '420px', overflowY: 'auto' }}>
                      {formData.rooms.map((room, index) => (
                        <Box key={room.id} sx={{ mb: index === formData.rooms.length - 1 ? 0 : 3 }}>
                          <Typography sx={{ fontWeight: 700, fontSize: '1.05rem', color: '#111827', mb: 2 }}>
                            Room {room.id}
                          </Typography>
                          
                          {/* Adults Row */}
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5 }}>
                            <Typography sx={{ fontSize: '1rem', fontWeight: 500, color: '#374151' }}>Adults</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
                              <IconButton 
                                size="small" 
                                onClick={() => updateRoomCount(room.id, 'adults', false)} 
                                disabled={room.adults <= 1}
                                sx={{ border: '1px solid #D1D5DB', width: 36, height: 36 }}
                              >
                                <RemoveIcon sx={{ fontSize: 18, color: '#111827' }} />
                              </IconButton>
                              <Typography sx={{ fontSize: '1.1rem', fontWeight: 600, minWidth: 16, textAlign: 'center' }}>{room.adults}</Typography>
                              <IconButton 
                                size="small" 
                                onClick={() => updateRoomCount(room.id, 'adults', true)} 
                                sx={{ border: '1px solid #D1D5DB', width: 36, height: 36 }}
                              >
                                <AddIcon sx={{ fontSize: 18, color: '#111827' }} />
                              </IconButton>
                            </Box>
                          </Box>

                          {/* Children Row */}
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: room.children > 0 ? 2 : 0 }}>
                            <Typography sx={{ fontSize: '1rem', fontWeight: 500, color: '#374151' }}>Children</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
                              <IconButton 
                                size="small" 
                                onClick={() => updateRoomCount(room.id, 'children', false)} 
                                sx={{ border: '1px solid #D1D5DB', width: 36, height: 36 }}
                              >
                                <RemoveIcon sx={{ fontSize: 18, color: '#111827' }} />
                              </IconButton>
                              <Typography sx={{ fontSize: '1.1rem', fontWeight: 600, minWidth: 16, textAlign: 'center' }}>{room.children}</Typography>
                              <IconButton 
                                size="small" 
                                onClick={() => updateRoomCount(room.id, 'children', true)} 
                                sx={{ border: '1px solid #D1D5DB', width: 36, height: 36 }}
                              >
                                <AddIcon sx={{ fontSize: 18, color: '#111827' }} />
                              </IconButton>
                            </Box>
                          </Box>

                          {/* Child Ages Dropdowns */}
                          {room.children > 0 && (
                            <Box sx={{ mt: 3 }}>
                              <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, color: '#6B7280', mb: 2 }}>
                                Child Ages
                              </Typography>
                              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                {room.childAges.map((age, childIdx) => (
                                  <Select
                                    key={childIdx}
                                    value={age}
                                    onChange={(e) => updateChildAge(room.id, childIdx, e.target.value)}
                                    size="small"
                                    fullWidth
                                    sx={{
                                      height: 44,
                                      borderRadius: '10px',
                                      bgcolor: '#FFFFFF',
                                      '& .MuiOutlinedInput-notchedOutline': { borderColor: '#E5E7EB' },
                                      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#D1D5DB' },
                                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#2563EB' },
                                      fontSize: '0.95rem'
                                    }}
                                  >
                                    {[...Array(18)].map((_, i) => (
                                      <MenuItem key={i} value={i.toString()}>{i}</MenuItem>
                                    ))}
                                  </Select>
                                ))}
                              </Box>
                            </Box>
                          )}
                        </Box>
                      ))}
                    </Box>
                  </Paper>
                </ClickAwayListener>
              </Popper>
            </Box>
          </Grid>

          {/* Nationality */}
          <Grid item xs={12} md={2.5}>
            <Typography sx={labelStyles}>Nationality</Typography>
            <Box sx={{ position: "relative" }}>
              <TextField
                fullWidth
                placeholder="Select Nationality"
                size="small"
                value={formData.nationalitySearch}
                onChange={(e) => {
                  const val = e.target.value;
                  setFormData(prev => ({ ...prev, nationalitySearch: val }));
                  if (!isNationalityOpen) setIsNationalityOpen(true);
                }}
                onClick={() => setIsNationalityOpen(!isNationalityOpen)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <ExpandMoreOutlinedIcon sx={{ fontSize: '14px', transform: isNationalityOpen ? 'rotate(180deg)' : 'none' }} />
                    </InputAdornment>
                  ),
                }}
                sx={textFieldStyles}
              />
              <Popper
                open={isNationalityOpen}
                anchorEl={nationalityInputRef.current}
                placement="bottom-start"
                sx={{ zIndex: 1510, width: 280 }}
              >
                <ClickAwayListener onClickAway={() => setIsNationalityOpen(false)}>
                  <Paper sx={{ mt: 0.5, borderRadius: '8px', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)', border: '1px solid #f1f5f9', maxHeight: '200px', overflow: 'auto', bgcolor: 'background.paper' }}>
                    <List sx={{ py: 0 }}>
                      {filteredNationalities.map((country) => (
                        <ListItem key={country.code} disablePadding>
                          <ListItemButton onClick={() => handleNationalitySelect(country)}>
                            <ListItemText primary={country.name} primaryTypographyProps={{ fontSize: '13px' }} />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                </ClickAwayListener>
              </Popper>
            </Box>
          </Grid>

          {/* Update Button */}
          <Grid item xs={12} md={2} sx={{ width: 105 }}  >
            <Button
              fullWidth
              variant="contained"
              startIcon={<UpdateOutlinedIcon />}
              sx={{
                height: 40,
                bgcolor: '#2563EB',
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: 2,
                '&:hover': { bgcolor: '#1D4ED8' }
              }}
            >
              Update
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
