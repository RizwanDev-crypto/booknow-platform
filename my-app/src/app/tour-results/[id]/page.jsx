'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import { 
  Box, 
  Typography, 
  Container, 
  Breadcrumbs, 
  Link, 
  Grid, 
  Paper, 
  Button, 
  Chip, 
  Avatar, 
  Divider,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Popper,
  ClickAwayListener,
  Portal,
  Backdrop,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from '@mui/material';
import { useState, useRef } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import StarIcon from '@mui/icons-material/Star';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupIcon from '@mui/icons-material/Group';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import TranslateIcon from '@mui/icons-material/Translate';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { tours } from '../toursData';

export default function TourDetailsPage() {
  const { id } = useParams();
  const tourId = parseInt(id);
  const tour = tours.find(t => t.id === tourId);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [startDate, setStartDate] = useState(dayjs());
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [dateAnchor, setDateAnchor] = useState(null);
  const dateInputRef = useRef(null);

  const [adultsCount, setAdultsCount] = useState(1);
  const [isAdultsOpen, setIsAdultsOpen] = useState(false);
  const [childrenCount, setChildrenCount] = useState(0);
  const [isChildrenOpen, setIsChildrenOpen] = useState(false);
  const [adultsAnchor, setAdultsAnchor] = useState(null);
  const [childrenAnchor, setChildrenAnchor] = useState(null);
  const adultsRef = useRef(null);
  const childrenRef = useRef(null);
  
  const tourImages = tour?.images || (tour?.image ? [tour.image] : []);

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % tourImages.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + tourImages.length) % tourImages.length);
  };

  if (!tour) {
    return (
      <Container sx={{ py: 10, textAlign: 'center' }}>
        <Typography variant="h4">Tour not found</Typography>
        <Button href="/tour-results" component={Link} variant="contained" sx={{ mt: 2 }}>Back to Tours</Button>
      </Container>
    );
  }

  return (
    <Box sx={{ 
      background: 'linear-gradient(to right, #fefefe 30%, #e4eaf1 100%)', 
      minHeight: '100vh', 
      pb: 8 
    }}>
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
      <Container maxWidth="lg">
        {/* Header Navigation - Matching Flight Layout */}
        <Box sx={{ mb: 3, pt: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: { md: 670, xs: '100%' } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box 
              component={Link}
              href="/tour-results"
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
              <ChevronLeftIcon sx={{ color: '#020817', fontSize: 20 }} />
            </Box>
            <Box>
              <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#1E293B', lineHeight: 1.2 }}>
                Tour Details
              </Typography>
              <Typography sx={{ fontSize: '14px', color: '#475569' }}>
                Explore tour information & book
              </Typography>
            </Box>
          </Box>
          <Box
            component="img"
          
         
            sx={{ height: 32, width: 'auto', display: { xs: 'none', sm: 'block' } }}
          />
        </Box>

        <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
          {/* Main Content (Left) */}
          <Grid item xs={12} md={5} lg={5} sx={{ width: { md: 750, xs: '100%' }, flexBasis: { md: 750 } }}>
            <Paper elevation={0} sx={{ p: 2, borderRadius: 3, border: "1px solid #e2e8f0", bgcolor: 'white' }}>
              {/* Header Info */}
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Chip 
                    label="Tour" 
                    size="small" 
                    sx={{ bgcolor: '#dbeafe', color: '#1d4ed8', fontWeight: 600, borderRadius: 1.5 }} 
                  />
                  <Box sx={{ display: 'flex' }}>
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} sx={{ fontSize: 18, color: i < Math.floor(tour.rating) ? '#f59e0b' : '#e2e8f0' }} />
                    ))}
                  </Box>
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#1e293b', mb: 2, fontSize: { xs: '1.5rem', md: '1.9rem' } }}>
                  {tour.name}
                </Typography>
                
                <Grid container spacing={2} sx={{ color: '#64748b', fontSize: '0.85rem' }}>
                  <Grid item sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <AccessTimeIcon sx={{ fontSize: 16 }} />
                    <Typography variant="body2">{tour.badge || "0 Nights - 1 Day"}</Typography>
                  </Grid>
                  <Grid item sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <CalendarMonthIcon sx={{ fontSize: 16 }} />
                    <Typography variant="body2">Departure: 13 Feb 2026</Typography>
                  </Grid>
                  <Grid item sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <StarIcon sx={{ fontSize: 16, color: '#f59e0b' }} />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{tour.rating.toFixed(1)}</Typography>
                    <Typography variant="body2">({tour.reviews} Reviews)</Typography>
                  </Grid>
                </Grid>
                <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 0.5, color: '#64748b' }}>
                  <GroupIcon sx={{ fontSize: 16 }} />
                  <Typography variant="body2">Travelers: 1 Adults</Typography>
                </Box>
              </Box>

              {/* Main Image Slider Mock */}
              <Box sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden', mb: 4, height: { xs: 250, md: 400 } }}>
                <Box 
                  component="img"
                  src={tourImages[currentImageIndex]}
                  sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: '0.3s' }}
                />
                {tourImages.length > 1 && (
                  <>
                    <Box 
                      sx={{ 
                        position: 'absolute', top: 15, right: 15, zIndex: 10,
                        bgcolor: 'rgba(0,0,0,0.6)', color: 'white', px: 1.5, py: 0.5,
                        borderRadius: '20px', display: 'flex', alignItems: 'center', gap: 1,
                        fontSize: '12px', fontWeight: 600, backdropFilter: 'blur(4px)'
                      }}
                    >
                      <PhotoLibraryIcon sx={{ fontSize: 16 }} />
                      {currentImageIndex + 1} / {tourImages.length}
                    </Box>
                    <Button 
                      onClick={handlePrevImage}
                      sx={{ 
                        position: 'absolute', left: 15, top: '50%', transform: 'translateY(-50%)',
                        bgcolor: 'white', minWidth: 40, height: 40, borderRadius: '50%',
                        color: '#1e293b', '&:hover': { bgcolor: '#f8fafc' }, p: 0,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        zIndex: 10,
                        '&:active': { transform: 'translateY(-50%) scale(0.9)' }
                      }}
                    >
                      <ChevronLeftIcon sx={{ fontSize: 28 }} />
                    </Button>
                    <Button 
                      onClick={handleNextImage}
                      sx={{ 
                        position: 'absolute', right: 15, top: '50%', transform: 'translateY(-50%)',
                        bgcolor: 'white', minWidth: 40, height: 40, borderRadius: '50%',
                        color: '#1e293b', '&:hover': { bgcolor: '#f8fafc' }, p: 0,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        zIndex: 10,
                        '&:active': { transform: 'translateY(-50%) scale(0.9)' }
                      }}
                    >
                      <ChevronRightIcon sx={{ fontSize: 28 }} />
                    </Button>
                  </>
                )}
                <Box sx={{ position: 'absolute', left: 15, bottom: 15, zIndex: 5 }}>
                   <Chip 
                    icon={<PhotoLibraryIcon sx={{ fontSize: '14px !important', color: 'white !important' }} />}
                    label="Tour Gallery"
                    size="small"
                    sx={{ bgcolor: 'rgba(30, 41, 59, 0.8)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}
                   />
                </Box>
                <Box sx={{ position: 'absolute', right: 15, bottom: 15 }}>
                  <Avatar sx={{ bgcolor: 'rgba(30, 41, 59, 0.7)', width: 32, height: 32 }}>
                    <TranslateIcon sx={{ fontSize: 16, color: 'white' }} />
                  </Avatar>
                </Box>
              </Box>

              {/* About this tour */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
                  About this tour
                </Typography>
                <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.7 }}>
                  {tour.description || "The CIC travel 100 million years of nature and human history in Patagonia. The montage of dinosaurian and mega mammal illuminate the show of the evolution that this region was. Videos, photos and audios are to understand and remember the genocide of Aonikenk people and the Patagonics strikes. Re-discover the Tehueche culture understanding the process of large duration. Immerse in five halls powered of solar energy were the past speck."}
                </Typography>
              </Box>

              {/* Inclusions / Exclusions */}
              <Box sx={{ p: 3, border: '1px solid #E2E8F0', borderRadius: 3, mb: 4 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, fontSize: '1rem' }}>What&apos;s Included</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                        <CheckCircleIcon sx={{ color: '#10b981', fontSize: 20, mt: 0.2 }} />
                        <Typography variant="body2" sx={{ color: '#475569' }}>
                          All taxes, fees and handling charges
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, fontSize: '1rem' }}>What&apos;s Excluded</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                      {tour.exclusions?.map((item, idx) => (
                        <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                          <InfoOutlinedIcon sx={{ color: '#94a3b8', fontSize: 20, mt: 0.2 }} />
                          <Typography variant="body2" sx={{ color: '#475569' }}>{item}</Typography>
                        </Box>
                      )) || (
                        <Typography variant="body2" sx={{ color: '#94a3b8', fontStyle: 'italic' }}>No exclusions listed</Typography>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              {/* Cancellation Policy */}
              <Box sx={{ p: 3, border: '1px solid #E2E8F0', borderRadius: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, fontSize: '1rem' }}>
                  Cancellation Policy
                </Typography>
                <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.6 }}>
                  For a full refund, cancel at least 24 hours before the scheduled departure time.
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Sidebar (Right) - Scrollable & Specific Width */}
          <Grid item xs={12} md={4} sx={{ 
            width: { md: 378, xs: '100%' },
            flexBasis: { md: 378 },
            position: { md: 'sticky' }, 
            top: { md: 16 }, 
            alignSelf: 'flex-start',
            maxHeight: { md: 'calc(100vh - 32px)' },
            overflowY: { md: 'auto' },
            '&::-webkit-scrollbar': { display: 'none' },
            msOverflowStyle: 'none',
            scrollbarWidth: 'none'
          }}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                bgcolor: '#1F2937', 
                color: 'white', 
                borderRadius: 3,
                border: '1px solid #E2E8F0'
              }}
            >
              <Typography variant="subtitle2" sx={{ mb: 1, color: 'white', display: 'flex', alignItems: 'center', gap: 1 }}>
                <CalendarMonthOutlinedIcon sx={{ fontSize: 16, color: 'white' }} />
                Start Date
              </Typography>
              <Box sx={{ position: "relative" }}>
                <TextField
                  fullWidth
                  inputRef={dateInputRef}
                  value={startDate.format('DD-MM-YYYY')}
                  onClick={(e) => {
                    setDateAnchor(e.currentTarget);
                    setIsDateOpen(true);
                  }}
                  readOnly
                  variant="outlined"
                  size="small"
                  autoComplete="off"
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{
                    mb: 3,
                    cursor: 'pointer',
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      height: '45px',
                      cursor: 'pointer',
                      '& fieldset': { borderColor: 'white' },
                      '&:hover fieldset': { borderColor: '#3B82F6' },
                      '&.Mui-focused fieldset': { borderColor: '#3B82F6' },
                    },
                    '& .MuiOutlinedInput-input': {
                      cursor: 'pointer',
                    }
                  }}
                />

                <Popper
                  open={isDateOpen}
                  anchorEl={dateAnchor}
                  placement="bottom-start"
                  sx={{ zIndex: 1500, width: dateAnchor?.offsetWidth }}
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
                            bgcolor: 'white',
                            color: 'black'
                          }}
                        >
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateCalendar 
                              value={startDate} 
                              onChange={(newDate) => {
                                setStartDate(newDate);
                                setIsDateOpen(false);
                              }}
                              disablePast
                              sx={{
                                width: '100%',
                                '& .MuiPickersCalendarHeader-root': {
                                  color: 'black',
                                },
                                '& .MuiPickersCalendarHeader-label': {
                                  color: 'black',
                                  fontWeight: 600
                                },
                                '& .MuiTypography-root': {
                                  color: '#334155',
                                },
                                '& .MuiPickersArrowSwitcher-root .MuiIconButton-root': {
                                  color: '#1e293b',
                                },
                                '& .MuiPickersDay-root': {
                                  color: '#1e293b',
                                  '&:hover': {
                                    bgcolor: '#f1f5f9',
                                  }
                                },
                                '& .MuiPickersDay-root.Mui-selected': {
                                  backgroundColor: '#2563eb',
                                  color: 'white',
                                  '&:hover': {
                                    backgroundColor: '#1d4ed8',
                                  },
                                },
                                '& .MuiPickersDay-today': {
                                  borderColor: '#2563eb',
                                }
                              }}
                            />
                          </LocalizationProvider>
                        </Paper>
                  </ClickAwayListener>
                </Popper>
              </Box>

              <Box sx={{ mb: 2.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="subtitle2" sx={{ color: 'white', lineHeight: 1.2 }}>Adults</Typography>
                  <Typography variant="caption" sx={{ color: '#94a3b8' }}>Age 18+</Typography>
                </Box>
                <Box sx={{ position: 'relative' }}>
                  <Box
                    ref={adultsRef}
                    onClick={(e) => {
                      setAdultsAnchor(e.currentTarget);
                      setIsAdultsOpen(!isAdultsOpen);
                    }}
                    sx={{
                      width: '100px',
                      height: '38px',
                      border: '1px solid white',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      px: 2,
                      cursor: 'pointer',
                      transition: '0.2s',
                      '&:hover': { borderColor: '#3B82F6', bgcolor: 'rgba(255,255,255,0.05)' },
                      ...(isAdultsOpen && { borderColor: '#3B82F6', boxShadow: '0 0 0 1px #3B82F6' })
                    }}
                  >
                    <Typography sx={{ color: 'white', fontSize: '14px', fontWeight: 500 }}>{adultsCount}</Typography>
                    <ExpandMoreIcon sx={{ color: '#94a3b8', fontSize: 18, transition: '0.2s', transform: isAdultsOpen ? 'rotate(180deg)' : 'none' }} />
                  </Box>
                  <Popper
                    open={isAdultsOpen}
                    anchorEl={adultsAnchor}
                    placement="bottom-end"
                    sx={{ zIndex: 1500 }}
                  >
                    <ClickAwayListener onClickAway={() => setIsAdultsOpen(false)}>
                      <Paper sx={{ 
                        mt: 0.5, 
                        width: '100px', 
                        maxHeight: '200px', 
                        overflow: 'auto',
                        borderRadius: '8px',
                        bgcolor: 'white',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                        border: '1px solid #f1f5f9',
                        '&::-webkit-scrollbar': { width: '4px' },
                        '&::-webkit-scrollbar-thumb': { bgcolor: '#e2e8f0', borderRadius: '10px' }
                      }}>
                        <List sx={{ p: 0 }}>
                          {Array.from({ length: 50 }, (_, i) => i + 1).map((n) => (
                            <ListItem key={n} disablePadding>
                              <ListItemButton 
                                onClick={() => { setAdultsCount(n); setIsAdultsOpen(false); }}
                                sx={{ py: 1, '&:hover': { bgcolor: '#f8fafc' }, bgcolor: adultsCount === n ? '#eff6ff' : 'transparent' }}
                              >
                                <ListItemText primary={n} primaryTypographyProps={{ fontSize: '14px', textAlign: 'center', fontWeight: adultsCount === n ? 700 : 400 }} />
                              </ListItemButton>
                            </ListItem>
                          ))}
                        </List>
                      </Paper>
                    </ClickAwayListener>
                  </Popper>
                </Box>
              </Box>

              <Box sx={{ mb: 3.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="subtitle2" sx={{ color: 'white', lineHeight: 1.2 }}>Children</Typography>
                  <Typography variant="caption" sx={{ color: '#94a3b8' }}>Age 2-17</Typography>
                </Box>
                <Box sx={{ position: 'relative' }}>
                  <Box
                    ref={childrenRef}
                    onClick={(e) => {
                      setChildrenAnchor(e.currentTarget);
                      setIsChildrenOpen(!isChildrenOpen);
                    }}
                    sx={{
                      width: '100px',
                      height: '38px',
                      border: '1px solid white',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      px: 2,
                      cursor: 'pointer',
                      transition: '0.2s',
                      '&:hover': { borderColor: '#3B82F6', bgcolor: 'rgba(255,255,255,0.05)' },
                      ...(isChildrenOpen && { borderColor: '#3B82F6', boxShadow: '0 0 0 1px #3B82F6' })
                    }}
                  >
                    <Typography sx={{ color: 'white', fontSize: '14px', fontWeight: 500 }}>{childrenCount}</Typography>
                    <ExpandMoreIcon sx={{ color: '#94a3b8', fontSize: 18, transition: '0.2s', transform: isChildrenOpen ? 'rotate(180deg)' : 'none' }} />
                  </Box>
                  <Popper
                    open={isChildrenOpen}
                    anchorEl={childrenAnchor}
                    placement="bottom-end"
                    sx={{ zIndex: 1500 }}
                  >
                    <ClickAwayListener onClickAway={() => setIsChildrenOpen(false)}>
                      <Paper sx={{ 
                        mt: 0.5, 
                        width: '100px', 
                        maxHeight: '200px', 
                        overflow: 'auto',
                        borderRadius: '8px',
                        bgcolor: 'white',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                        border: '1px solid #f1f5f9',
                        '&::-webkit-scrollbar': { width: '4px' },
                        '&::-webkit-scrollbar-thumb': { bgcolor: '#e2e8f0', borderRadius: '10px' }
                      }}>
                        <List sx={{ p: 0 }}>
                          {Array.from({ length: 21 }, (_, i) => i).map((n) => (
                            <ListItem key={n} disablePadding>
                              <ListItemButton 
                                onClick={() => { setChildrenCount(n); setIsChildrenOpen(false); }}
                                sx={{ py: 1, '&:hover': { bgcolor: '#f8fafc' }, bgcolor: childrenCount === n ? '#eff6ff' : 'transparent' }}
                              >
                                <ListItemText primary={n} primaryTypographyProps={{ fontSize: '14px', textAlign: 'center', fontWeight: childrenCount === n ? 700 : 400 }} />
                              </ListItemButton>
                            </ListItem>
                          ))}
                        </List>
                      </Paper>
                    </ClickAwayListener>
                  </Popper>
                </Box>
              </Box>

              <Button 
                fullWidth 
                variant="contained" 
                size="large"
                startIcon={<CalendarMonthIcon />}
                sx={{ 
                  bgcolor: '#2563eb', 
                  py: 1.5, 
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  mb: 3,
                  '&:hover': { bgcolor: '#1d4ed8' }
                }}
              >
                Book Now
              </Button>

              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 2 }}>
                <CheckCircleIcon sx={{ color: '#10b981', mt: 0.3 }} />
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Reserve Now, Pay Later</Typography>
                  <Typography variant="caption" sx={{ color: '#94a3b8', lineHeight: 1.4 }}>
                    Secure your spot with a flexible reservation
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <ShieldOutlinedIcon sx={{ color: '#94a3b8', fontSize: 20 }} />
                <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                  Free cancellation available
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
