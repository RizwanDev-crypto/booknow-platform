'use client';

import * as React from 'react';
import {
  Box,
  Grid,
  TextField,
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
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import DomainOutlinedIcon from '@mui/icons-material/DomainOutlined';
import ConnectingAirportsOutlinedIcon from '@mui/icons-material/ConnectingAirportsOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import NewReleasesOutlinedIcon from '@mui/icons-material/NewReleasesOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { useRouter } from 'next/navigation';


export default function VisaSearchForm() {
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    visaType: 'Tourist Visa',
    processingSpeed: 'Standard (7-15 days)',
    destination: '',
    destinationSearch: '',
    nationality: '',
    nationalitySearch: '',
    travelDate: dayjs(),
    travelerCount: 1,
  });

  const [errors, setErrors] = React.useState({
    destination: false,
    nationality: false
  });

  const [isVisaOpen, setIsVisaOpen] = React.useState(false);
  const [isProcessingOpen, setIsProcessingOpen] = React.useState(false);
  const [isDestinationOpen, setIsDestinationOpen] = React.useState(false);
  const [isNationalityOpen, setIsNationalityOpen] = React.useState(false);
  const [isDateOpen, setIsDateOpen] = React.useState(false);
  const [isTravelerOpen, setIsTravelerOpen] = React.useState(false);
  
  const [nationalities, setNationalities] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const dateInputRef = React.useRef(null);

  React.useEffect(() => {
    const fetchNationalities = async () => {
      try {
        const response = await fetch('/api/nationalities');
        const data = await response.json();
        setNationalities(data);
      } catch (error) {
        console.error('Error fetching nationalities:', error);
      } finally {
        setIsLoading(false);
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
    setErrors(prev => ({ ...prev, destination: false }));
    setIsDestinationOpen(false);
    if (formData.nationality) {
      setTimeout(() => setIsDateOpen(true), 100);
    }
  };

  const filteredDestinations = nationalities.filter(country =>
    country.name.toLowerCase().includes(formData.destinationSearch.toLowerCase())
  );

  const handleNationalitySelect = (country) => {
    setFormData(prev => ({
      ...prev,
      nationality: country.name,
      nationalitySearch: country.name
    }));
    setErrors(prev => ({ ...prev, nationality: false }));
    setIsNationalityOpen(false);
    if (formData.destination) {
      setTimeout(() => setIsDateOpen(true), 100);
    }
  };

  const handleDateChange = (newDate) => {
    setFormData(prev => ({ ...prev, travelDate: newDate }));
    setIsDateOpen(false);
  };

  const filteredNationalities = nationalities.filter(country =>
    country.name.toLowerCase().includes(formData.nationalitySearch.toLowerCase())
  );

  const handleIncrement = () => {
    setFormData(prev => ({ ...prev, travelerCount: Math.min(prev.travelerCount + 1, 20) }));
  };

  const handleDecrement = () => {
    setFormData(prev => ({ ...prev, travelerCount: Math.max(prev.travelerCount - 1, 1) }));
  };

  const handleSearch = () => {
    const newErrors = {
      destination: !formData.destination,
      nationality: !formData.nationality
    };

    if (newErrors.destination || newErrors.nationality) {
      setErrors(newErrors);
      return;
    }

    // Slug format: /visa-application/[destination]/[nationality]/[visaType]/[date]/[travelers]/[speed]
    const slugSegments = [
      formData.destination,
      formData.nationality,
      formData.visaType,
      formData.travelDate.toISOString(),
      formData.travelerCount.toString(),
      formData.processingSpeed
    ].map(encodeURIComponent);

    router.push(`/visa-application/${slugSegments.join('/')}`);
  };

  return (
    <>
      <Portal>
        <Backdrop
          open={isDateOpen}
          onClick={() => setIsDateOpen(false)}
          sx={{ 
            zIndex: 1400,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          }}
        />
      </Portal>
      <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Grid container spacing={2}>
        {/* Row 1 */}
        <Grid item xs={12} sm={6} md={4} sx={{ width: { xs: '100%', sm: '100%', md: '23%', lg: '24%' }, overflow: 'visible' }}>
          <Typography sx={{ mb: 0.5, fontSize: '14px',color:"#020817", fontWeight: 500, display: 'flex', alignItems: 'center', gap: 1 }}>
            <PublicOutlinedIcon sx={{ fontSize: 14, mb: 0.3, color: '#64748B' }} />
            Destination Country
          </Typography>
          <Box sx={{ position: "relative" }}>
            <TextField
              fullWidth
              placeholder="Where are you traveling?"
              variant="outlined"
              size="small"
              value={formData.destinationSearch}
              onChange={(e) => {
                const val = e.target.value;
                setFormData(prev => ({ ...prev, destinationSearch: val }));
                if (errors.destination) setErrors(prev => ({ ...prev, destination: false }));
                if (!isDestinationOpen) setIsDestinationOpen(true);
              }}
              onClick={() => setIsDestinationOpen(true)}
              autoComplete="off"
              error={errors.destination}
              InputProps={{
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
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  bgcolor: '#fff',
                  height: '38px',
                  '& fieldset': {
                    borderColor: errors.destination ? '#d32f2f' : 'rgba(0, 0, 0, 0.23)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: errors.destination ? '#d32f2f' : '#0058e6',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: errors.destination ? '#d32f2f' : '#0058e6',
                    borderWidth: '1.5px',
                  },
                },
                '& .MuiOutlinedInput-input': {
                  padding: '0 12px',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '14px',
                  color: '#1F2937',
                }
              }}
            />
            {errors.destination && (
              <Typography sx={{ color: '#d32f2f', fontSize: '12px', mt: 0.5, ml: 1 }}>
                Please select destination
              </Typography>
            )}

            {isDestinationOpen && filteredDestinations.length > 0 && (
              <ClickAwayListener onClickAway={() => setIsDestinationOpen(false)}>
                <Paper
                  sx={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    mt: 0.5,
                    maxHeight: 300,
                    overflow: "auto",
                    zIndex: 1300,
                    borderRadius: '8px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                    border: '1px solid #f1f5f9',
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
                          sx={{
                            '&:hover': { bgcolor: '#f8fafc' },
                            py: 1,
                            px: 2,
                          }}
                        >
                          <ListItemText 
                            primary={country.name} 
                            primaryTypographyProps={{ 
                              fontSize: '14px',
                              color: '#1F2937',
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

        <Grid item xs={12} sm={6} md={4} sx={{ width: { xs: '100%', sm: '100%', md: '23%', lg: '23.6%' }, overflow: 'visible' }}>
          <Typography sx={{ mb: 0.5, fontSize: '14px',color:"#020817", fontWeight: 500, display: 'flex', alignItems: 'center', gap: 1 }}>
            <FlagOutlinedIcon sx={{ fontSize: 14, mb: 0.3, color: '#64748B' }} />
            Your Nationality
          </Typography>
          <Box sx={{ position: "relative" }}>
            <TextField
              fullWidth
              placeholder="Your country"
              variant="outlined"
              size="small"
              value={formData.nationalitySearch}
              onChange={(e) => {
                const val = e.target.value;
                setFormData(prev => ({ ...prev, nationalitySearch: val }));
                if (errors.nationality) setErrors(prev => ({ ...prev, nationality: false }));
                if (!isNationalityOpen) setIsNationalityOpen(true);
              }}
              onClick={() => setIsNationalityOpen(true)}
              autoComplete="off"
              error={errors.nationality}
              InputProps={{
                endAdornment: formData.nationalitySearch && (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFormData(prev => ({ ...prev, nationality: '', nationalitySearch: '' }));
                      }}
                      sx={{ color: '#94a3b8', '&:hover': { bgcolor: 'transparent' } }}
                    >
                      <HighlightOffOutlinedIcon sx={{ fontSize: 24 }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  bgcolor: '#fff',
                  height: '38px',
                  '& fieldset': {
                    borderColor: errors.nationality ? '#d32f2f' : 'rgba(0, 0, 0, 0.23)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: errors.nationality ? '#d32f2f' : '#0058e6',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: errors.nationality ? '#d32f2f' : '#0058e6',
                    borderWidth: '1.5px',
                  },
                },
                '& .MuiOutlinedInput-input': {
                  padding: '0 12px',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '14px',
                  color: '#1F2937',
                }
              }}
            />
            {errors.nationality && (
              <Typography sx={{ color: '#d32f2f', fontSize: '12px', mt: 0.5, ml: 1 }}>
                Please select nationality
              </Typography>
            )}

            {isNationalityOpen && filteredNationalities.length > 0 && (
              <ClickAwayListener onClickAway={() => setIsNationalityOpen(false)}>
                <Paper
                  sx={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    mt: 0.5,
                    maxHeight: 300,
                    overflow: "auto",
                    zIndex: 1300,
                    borderRadius: '8px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                    border: '1px solid #f1f5f9',
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
                          sx={{
                            '&:hover': { bgcolor: '#f8fafc' },
                            py: 1,
                            px: 2,
                          }}
                        >
                          <ListItemText 
                            primary={country.name} 
                            primaryTypographyProps={{ 
                              fontSize: '14px',
                              color: '#1F2937',
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

        <Grid item xs={12} sm={6} md={4} sx={{ width: { xs: '100%', sm: '100%', md: '24%', lg: '24%' }, overflow: 'visible' }}>
          <Typography sx={{ mb: 0.5, fontSize: '14px',color:"#020817", fontWeight: 500, display: 'flex', alignItems: 'center', gap: 1 }}>
            <CalendarMonthOutlinedIcon sx={{ fontSize: 14, mb: 0.3, color: '#64748B' }} />
            Travel Date
          </Typography>
          <Box sx={{ position: "relative" }}>
            <TextField
              fullWidth
              inputRef={dateInputRef}
              value={formData.travelDate.format('DD-MM-YYYY')}
              onClick={() => setIsDateOpen(true)}
              readOnly
              variant="outlined"
              size="small"
              autoComplete="off"
              InputProps={{
                readOnly: true,
              }}
              sx={{
                cursor: 'pointer',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  bgcolor: '#fff',
                  height: '38px',
                  cursor: 'pointer',
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#0058e6',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#0058e6',
                    borderWidth: '1.5px',
                  },
                },
                '& .MuiOutlinedInput-input': {
                  padding: '0 12px',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '14px',
                  color: '#1F2937',
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
              <ClickAwayListener onClickAway={() => setIsDateOpen(false)}>
                <Paper
                  sx={{
                    mt: 0.5,
                    zIndex: 1500,
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                    border: '1px solid #f1f5f9',
                    overflow: 'hidden',
                    bgcolor: 'background.paper',
                  }}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar 
                      value={formData.travelDate} 
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

   <Grid item xs={12} md={12} sx={{ width: { xs: '100%', sm: '100%', md: '24.5%', lg: '24%' }, overflow: 'visible' }}>

  <Typography sx={{ 
 
    mb: 0.5, 
    fontSize: '14px', 
    color: "#020817", 
    fontWeight: 500, 
    display: 'flex', 
    alignItems: 'center', 
    gap: 1,
    fontFamily: 'Inter, sans-serif'
  }}>
    <DescriptionOutlinedIcon sx={{ fontSize: 14, mb: 0.3, color: '#64748B' }} />
    Visa Type
  </Typography>
  <Box sx={{ position: "relative" }}>
    <TextField
      fullWidth
      size="small"
      value={formData.visaType}
      onClick={() => setIsVisaOpen(!isVisaOpen)}
      readOnly
      autoComplete="off"
      InputProps={{
        readOnly: true,
        endAdornment: (
          <InputAdornment position="end">
            <ExpandMoreOutlinedIcon sx={{ 
              color: '#020817', 
              fontSize: '16px',
              cursor: 'pointer', 
              transition: 'transform 0.2s', 
              transform: isVisaOpen ? 'rotate(180deg)' : 'none' 
            }} />
          </InputAdornment>
        ),
      }}
      sx={{
        cursor: 'pointer',
        fontFamily: 'Inter, sans-serif',
        '& .MuiOutlinedInput-root': {
          borderRadius: '8px',
          bgcolor: '#fff',
          height: '38px',
          cursor: 'pointer',
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#0058e6',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#0058e6',
            borderWidth: '1.5px',
          },
        },
        '& .MuiOutlinedInput-input': {
          padding: '0 12px',
          display: 'flex',
          alignItems: 'center',
          fontSize: '14px',
          color: '#1F2937',
          height: '100%',
          cursor: 'pointer',
        }
      }}
    />

    {isVisaOpen && (
      <ClickAwayListener onClickAway={() => setIsVisaOpen(false)}>
        <Paper
          sx={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            mt: 0.5,
            maxHeight: 300,
            overflow: "auto",
            zIndex: 1300,
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            border: '1px solid #e2e8f0',
          }}
        >
          <List sx={{ py: 0 }}>
            {[
              { value: 'Tourist Visa', icon: <ConnectingAirportsOutlinedIcon sx={{ fontSize: 16, color: '#020817' }} /> },
              { value: 'Business Visa', icon: <DomainOutlinedIcon sx={{ fontSize: 16, color: '#020817' }} /> },
              { value: 'Transit Visa', icon: <CameraAltOutlinedIcon sx={{ fontSize: 16, color: '#020817' }} /> },
              { value: 'Student Visa', icon: <SchoolOutlinedIcon sx={{ fontSize: 16, color: '#020817' }} /> },
              { value: 'Work Visa', icon: <WorkOutlineOutlinedIcon sx={{ fontSize: 16, color: '#020817' }} /> },
              { value: 'Medical Visa', icon: <LocalHospitalOutlinedIcon sx={{ fontSize: 16, color: '#020817' }} /> },
            ].map((item, index, array) => (
              <ListItem key={item.value} disablePadding>
                <ListItemButton
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setFormData(prev => ({ ...prev, visaType: item.value }));
                    setIsVisaOpen(false);
                  }}
                  sx={{
                    '&:hover': { bgcolor: '#f8fafc' },
                    py: 1.25,
                    px: 2,
                    borderBottom: index !== array.length - 1 ? '1px solid #f1f5f9' : 'none',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {item.icon}
                    <Typography sx={{ fontSize: '14px', color: '#020817', fontFamily: 'Inter, sans-serif' }}>
                      {item.value}
                    </Typography>
                  </Box>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      </ClickAwayListener>
    )}
  </Box>
</Grid>

        {/* Row 2 */}
  <Grid item xs={12} md={5} sx={{ width: { xs: '100%', md: '30%', lg: '31%' }, overflow: 'visible' }}>
  <Typography sx={{ mb: 0.5, fontSize: '14px', color: "#020817", fontWeight: 500, display: 'flex', alignItems: 'center', gap: 1, fontFamily: 'Inter, sans-serif' }}>
    <TimerOutlinedIcon sx={{ fontSize: 14, mb: 0.3, color: '#64748B' }} />
    Processing Speed
  </Typography>

  <Box sx={{ position: "relative" }}>
    <TextField
      fullWidth
      size="small"
      value={formData.processingSpeed}
      onClick={() => setIsProcessingOpen(!isProcessingOpen)}
      readOnly
      autoComplete="off"
      InputProps={{
        readOnly: true,
        endAdornment: (
          <InputAdornment position="end">
            <ExpandMoreOutlinedIcon sx={{ 
              color: '#020817', 
              fontSize: '16px',
              cursor: 'pointer', 
              transition: 'transform 0.2s', 
              transform: isProcessingOpen ? 'rotate(180deg)' : 'none' 
            }} />
          </InputAdornment>
        ),
      }}
      sx={{
        cursor: 'pointer',
        '& .MuiOutlinedInput-root': {
          borderRadius: '8px',
          bgcolor: '#fff',
          height: '38px',
          cursor: 'pointer',
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#0058e6',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#0058e6',
            borderWidth: '1.5px',
          },
        },
        '& .MuiOutlinedInput-input': {
          padding: '0 12px',
          display: 'flex',
          alignItems: 'center',
          fontSize: '14px',
          color: '#1F2937',
          height: '100%',
          cursor: 'pointer',
        }
      }}
    />

    {isProcessingOpen && (
      <ClickAwayListener onClickAway={() => setIsProcessingOpen(false)}>
        <Paper
          sx={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            mt: 0.5,
            maxHeight: 300,
            overflow: "auto",
            zIndex: 1300,
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            border: '1px solid #e2e8f0',
          }}
        >
          <List sx={{ py: 0 }}>
            {[
              { 
                value: 'Standard (7-15 days)', 
                icon: <TimerOutlinedIcon sx={{ fontSize: 16, color: '#020817', mt: 0.3 }} />,
                description: 'Regular processing'
              },
              { 
                value: 'Express (3-5 days)', 
                icon: <BoltOutlinedIcon sx={{ fontSize: 16, color: '#020817', mt: 0.3 }} />,
                description: 'Faster processing'
              },
              { 
                value: 'Urgent (1-2 days)', 
                icon: <NewReleasesOutlinedIcon sx={{ fontSize: 16, color: '#020817', mt: 0.3 }} />,
                description: 'Rush processing'
              },
            ].map((item) => (
              <ListItem key={item.value} disablePadding>
                <ListItemButton
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setFormData(prev => ({ ...prev, processingSpeed: item.value }));
                    setIsProcessingOpen(false);
                  }}
                  sx={{
                    '&:hover': { bgcolor: '#f8fafc' },
                    py: 1,
                    px: 1,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                    {item.icon}
                    <Box>
                      <Typography sx={{ fontSize: '14px', fontWeight: 500, color: '#020817', lineHeight: 1.2 }}>
                        {item.value}
                      </Typography>
                      <Typography sx={{ fontSize: '10px', color: '#64748b' }}>
                        {item.description}
                      </Typography>
                    </Box>
                  </Box>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      </ClickAwayListener>
    )}
  </Box>
</Grid>

<Grid item xs={12} md={5} sx={{ width: { xs: '100%', md: '33%', lg: '33%' }, overflow: 'visible' }}>
  <Typography sx={{ mb: 0.5, fontSize: '14px', color: "#020817", fontWeight: 500, display: 'flex', alignItems: 'center', gap: 1, fontFamily: 'Inter, sans-serif' }}>
    <GroupsOutlinedIcon sx={{ fontSize: 14, mb: 0.3, color: '#64748B' }} />
    Travelers
  </Typography>

  <Box sx={{ position: "relative" }}>
    <TextField
      fullWidth
      size="small"
      value={`${formData.travelerCount} Traveler${formData.travelerCount > 1 ? 's' : ''}`}
      onClick={() => setIsTravelerOpen(!isTravelerOpen)}
      readOnly
      autoComplete="off"
      InputProps={{
        readOnly: true,
        endAdornment: (
          <InputAdornment position="end">
            <ExpandMoreOutlinedIcon sx={{ 
              color: '#020817', 
              fontSize: '16px',
              cursor: 'pointer', 
              transition: 'transform 0.2s', 
              transform: isTravelerOpen ? 'rotate(180deg)' : 'none' 
            }} />
          </InputAdornment>
        ),
      }}
      sx={{
        cursor: 'pointer',
        '& .MuiOutlinedInput-root': {
          borderRadius: '8px',
          bgcolor: '#fff',
          cursor: 'pointer',
          height: '38px',
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#0058e6',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#0058e6',
            borderWidth: '1.5px',
          },
        },
        '& .MuiOutlinedInput-input': {
          cursor: 'pointer',
          padding: '0 12px',
          display: 'flex',
          alignItems: 'center',
          fontSize: '14px',
          color: '#1F2937',
          height: '100%',
        }
      }}
    />

    {isTravelerOpen && (
      <ClickAwayListener onClickAway={() => setIsTravelerOpen(false)}>
        <Paper
          sx={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            mt: 1,
            zIndex: 1300,
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            border: '1px solid #f1f5f9',
            p: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 4 }}>
            <Box>
              <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#020817', mb: 0.5 }}>
                Number of Travelers
              </Typography>
              <Typography sx={{ fontSize: '12px', color: '#64748b' }}>
                Apply for multiple people
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <IconButton
                size="small"
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleDecrement();
                }}
                sx={{
                  border: '1px solid #e2e8f0',
                  width: '32px',
                  height: '32px',
                  '&:hover': { bgcolor: '#f1f5f9' },
                }}
              >
                <RemoveIcon sx={{ fontSize: 18, color: '#020817' }} />
              </IconButton>
              
              <Typography sx={{ minWidth: '20px', textAlign: 'center', fontWeight: 600, fontSize: '16px', color: '#020817' }}>
                {formData.travelerCount}
              </Typography>

              <IconButton
                size="small"
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleIncrement();
                }}
                sx={{
                  border: '1px solid #e2e8f0',
                  width: '32px',
                  height: '32px',
                  '&:hover': { bgcolor: '#f1f5f9' },
                }}
              >
                <AddIcon sx={{ fontSize: 18, color: '#020817' }} />
              </IconButton>
            </Box>
          </Box>
        </Paper>
      </ClickAwayListener>
    )}
  </Box>
</Grid>

<Grid item xs={12} md={2} sx={{ display: 'flex', alignItems: 'flex-end' , width: { xs: '100%', md: '33.2%', lg: '33%' } }}>
    <Button
      fullWidth
      variant="contained"
      startIcon={<SearchIcon />}
      onClick={handleSearch}
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
      Check Visa
    </Button>
</Grid>

      </Grid>
      </Box>
    </>
  );
}

