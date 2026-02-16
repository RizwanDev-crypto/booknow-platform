'use client';
import * as React from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import LanguageIcon from '@mui/icons-material/Language';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import LoginIcon from '@mui/icons-material/Login';
import CheckIcon from '@mui/icons-material/Check';

export default function Header() {
  const [servicesAnchor, setServicesAnchor] = React.useState(null);
  const [companyAnchor, setCompanyAnchor] = React.useState(null);
  const [languageAnchor, setLanguageAnchor] = React.useState(null);
  const [currencyAnchor, setCurrencyAnchor] = React.useState(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = React.useState(false);
  const [mobileCompanyOpen, setMobileCompanyOpen] = React.useState(false);
  const [mobileLanguageOpen, setMobileLanguageOpen] = React.useState(false);
  const [mobileCurrencyOpen, setMobileCurrencyOpen] = React.useState(false);
  const [language, setLanguage] = React.useState('English');
  const [currency, setCurrency] = React.useState('USD');
  const [languages, setLanguages] = React.useState([]);
  const [currencies, setCurrencies] = React.useState([]);

  React.useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const response = await fetch('/api/header');
        const data = await response.json();
        setLanguages(data.languages || []);
        setCurrencies(data.currencies || []);
      } catch (error) {
        console.error('Error fetching header data:', error);
      }
    };
    fetchHeaderData();
  }, []);

  const handleServicesOpen = (event) => {
    setCompanyAnchor(null);
    setServicesAnchor(event.currentTarget);
  };

  const handleServicesClose = () => {
    setServicesAnchor(null);
  };

  const handleCompanyOpen = (event) => {
    setServicesAnchor(null);
    setCompanyAnchor(event.currentTarget);
  };

  const handleCompanyClose = () => {
    setCompanyAnchor(null);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleCurrencyOpen = (event) => {
    setCurrencyAnchor(event.currentTarget);
  };

  const handleCurrencyClose = () => {
    setCurrencyAnchor(null);
  };

  const selectCurrency = (val) => {
    setCurrency(val);
    handleCurrencyClose();
  };

  const handleLanguageOpen = (event) => {
    setLanguageAnchor(event.currentTarget);
  };

  const handleLanguageClose = () => {
    setLanguageAnchor(null);
  };

  const selectLanguage = (val) => {
    setLanguage(val);
    handleLanguageClose();
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMobileServicesToggle = () => {
    setMobileServicesOpen(!mobileServicesOpen);
  };

  const handleMobileCompanyToggle = () => {
    setMobileCompanyOpen(!mobileCompanyOpen);
  };

  const handleMobileLanguageToggle = () => {
    setMobileLanguageOpen(!mobileLanguageOpen);
  };

  const handleMobileCurrencyToggle = () => {
    setMobileCurrencyOpen(!mobileCurrencyOpen);
  };

  const services = [
    "Visa Booking",
    "Flights Booking",
    "Tours Booking",
    "Cars Booking",
    "Stays Booking"
  ];

  const companyItems = [
    "Contact Us",
    "About Us",
    "Cookies Policy",
    "Privacy Policy",
    "Become a Supplier",
    "Terms of Use"
  ];

  const languagesList = languages.length > 0 ? languages : [
    "English",
    "Arabic",
    "Turkish",
    "Russian",
    "French",
    "Chinese",
    "Germany"
  ];

  const currenciesList = currencies.length > 0 ? currencies : [
    { code: "USD", name: "United States" },
    { code: "GBP", name: "United Kingdom" },
    { code: "SAR", name: "Saudi Arabia" },
    { code: "EUR", name: "European Union" },
    { code: "NGN", name: "Nigeria" }
  ];

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: '100%',
        backgroundColor: 'white',
        borderBottom: '1px solid #e0e0e0',
        zIndex: 1100,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            minHeight: 64,
          }}
        >
          {/* Logo Section */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <Box
                component="img"
                src="/logo.png"
                alt="Logo"
                sx={{ height: 32, width: 'auto', cursor: 'pointer' }}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </Link>
          </Box>

        {/* Navigation Menu - Center */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            gap: 1,
            alignItems: 'center',
          }}
        >
          {/* Services Dropdown */}
          <Box
            onMouseEnter={handleServicesOpen}
            onMouseLeave={handleServicesClose}
          >
            <Button
              endIcon={Boolean(servicesAnchor) ? 
                <KeyboardArrowUpIcon sx={{ color: '#0058E6' }} /> : 
                <KeyboardArrowDownIcon sx={{ color: '#717C8E' }} />
              }
              sx={{
                color: Boolean(servicesAnchor) ? '#0058E6' : '#717C8E',
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '14px',
                transition: 'all 0.2s',
                '&:hover': {
                  backgroundColor: 'transparent',
                }
              }}
            >
              Services
            </Button>
            <Menu
              anchorEl={servicesAnchor}
              open={Boolean(servicesAnchor)}
              onClose={handleServicesClose}
              autoFocus={false}
              disableRestoreFocus
              disableAutoFocus
              hideBackdrop
              sx={{ pointerEvents: 'none' }}
              MenuListProps={{
                autoFocus: false,
                onMouseEnter: () => {}, // Keep open when moving to menu
                onMouseLeave: handleServicesClose,
                sx: { py: 1, px: 0 }
              }}
              PaperProps={{
                elevation: 3,
                sx: {
                  mt: 0.5,
                  minWidth: 200,
                  borderRadius: '12px',
                  border: '1px solid #E5E7EB',
                  pointerEvents: 'auto'
                }
              }}
            >
              {services.map((service) => (
                <MenuItem 
                  key={service} 
                  onClick={handleServicesClose}
                  sx={{
                    px: 2,
                    py: 1.2,
                    color: '#374151',
                    fontSize: '14px',
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    '&:hover': {
                      backgroundColor: '#F9FAFB',
                      color: '#0058E6',
                    }
                  }}
                >
                  <ChevronRightIcon sx={{ fontSize: 18, color: '#0058E6' }} />
                  {service}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Company Dropdown */}
          <Box
            onMouseEnter={handleCompanyOpen}
            onMouseLeave={handleCompanyClose}
          >
            <Button
              endIcon={Boolean(companyAnchor) ? 
                <KeyboardArrowUpIcon sx={{ color: '#0058E6' }} /> : 
                <KeyboardArrowDownIcon sx={{ color: '#717C8E' }} />
              }
              sx={{
                color: Boolean(companyAnchor) ? '#0058E6' : '#717C8E',
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '14px',
                transition: 'all 0.2s',
                '&:hover': {
                  backgroundColor: 'transparent',
                }
              }}
            >
              Company
            </Button>
            <Menu
              anchorEl={companyAnchor}
              open={Boolean(companyAnchor)}
              onClose={handleCompanyClose}
              autoFocus={false}
              disableRestoreFocus
              disableAutoFocus
              hideBackdrop
              sx={{ pointerEvents: 'none' }}
              MenuListProps={{
                autoFocus: false,
                onMouseEnter: () => {}, // Keep open when moving to menu
                onMouseLeave: handleCompanyClose,
                sx: { py: 1, px: 0 }
              }}
              PaperProps={{
                elevation: 3,
                sx: {
                  mt: 0.5,
                  minWidth: 220,
                  borderRadius: '12px',
                  border: '1px solid #E5E7EB',
                  pointerEvents: 'auto'
                }
              }}
            >
              {companyItems.map((item) => (
                <MenuItem 
                  key={item} 
                  onClick={handleCompanyClose}
                  sx={{
                    px: 2,
                    py: 1.2,
                    color: '#374151',
                    fontSize: '14px',
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    '&:hover': {
                      backgroundColor: '#F9FAFB',
                      color: '#0058E6',
                    }
                  }}
                >
                  <ChevronRightIcon sx={{ fontSize: 18, color: '#0058E6' }} />
                  {item}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Button
            sx={{
              color: '#717C8E',
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '14px',
              '&:hover': { backgroundColor: 'transparent', color: '#0058E6' }
            }}
          >
            Blogs
          </Button>
        </Box>

        {/* Right Section - Desktop Only */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
          {/* Language Selector */}
          <Box
            onMouseEnter={handleLanguageOpen}
            onMouseLeave={handleLanguageClose}
            sx={{
              display: { xs: 'none', sm: 'flex' },
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                backgroundColor: '#F9FAFB',
                padding: '8px 12px',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                transition: 'all 0.2s',
                color: '#374151',
                '&:hover': {
                  backgroundColor: '#F3F4F6',
                },
              }}
            >
              <LanguageIcon sx={{ fontSize: 18, color: '#374151' }} />
              <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>{language}</Typography>
              <KeyboardArrowDownIcon sx={{ fontSize: '16px', color: '#374151', ml: 0.5 }} />
            </Box>

            <Menu
              anchorEl={languageAnchor}
              open={Boolean(languageAnchor)}
              onClose={handleLanguageClose}
              disableRestoreFocus
              disableAutoFocus
              hideBackdrop
              sx={{ pointerEvents: 'none' }}
              MenuListProps={{
                onMouseEnter: () => {},
                onMouseLeave: handleLanguageClose,
                sx: { py: 1, px: 1 }
              }}
              PaperProps={{
                elevation: 3,
                sx: {
                  mt: 0.5,
                  minWidth: 200,
                  borderRadius: '12px',
                  border: '1px solid #E5E7EB',
                  pointerEvents: 'auto'
                }
              }}
            >
              {languagesList.map((lang) => (
                <MenuItem 
                  key={lang} 
                  onClick={() => selectLanguage(lang)}
                  sx={{
                    px: 1.5,
                    py: 1,
                    borderRadius: '8px',
                    mb: 0.5,
                    color: lang === language ? '#0058E6' : '#475569',
                    backgroundColor: lang === language ? '#EBF5FF' : 'transparent',
                    fontSize: '14px',
                    fontWeight: lang === language ? 600 : 400,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    '&:hover': {
                      backgroundColor: lang === language ? '#EBF5FF' : '#F9FAFB',
                    }
                  }}
                >
                  {lang}
                  {lang === language && <CheckIcon sx={{ fontSize: 18, color: '#0058E6' }} />}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Currency Selector */}
          <Box
            onMouseEnter={handleCurrencyOpen}
            onMouseLeave={handleCurrencyClose}
            sx={{
              display: { xs: 'none', sm: 'flex' },
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                backgroundColor: '#F9FAFB',
                padding: '8px 12px',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                transition: 'all 0.2s',
                color: '#374151',
                '&:hover': {
                  backgroundColor: '#F3F4F6',
                },
              }}
            >
              <PaymentsOutlinedIcon sx={{ fontSize: 18, color: '#374151' }} />
              <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>{currency}</Typography>
              <KeyboardArrowDownIcon sx={{ fontSize: '16px', color: '#374151', ml: 0.5 }} />
            </Box>

            <Menu
              anchorEl={currencyAnchor}
              open={Boolean(currencyAnchor)}
              onClose={handleCurrencyClose}
              disableRestoreFocus
              disableAutoFocus
              hideBackdrop
              sx={{ pointerEvents: 'none' }}
              MenuListProps={{
                onMouseEnter: () => {},
                onMouseLeave: handleCurrencyClose,
                sx: { py: 1, px: 1 }
              }}
              PaperProps={{
                elevation: 3,
                sx: {
                  mt: 0.5,
                  minWidth: 220,
                  borderRadius: '12px',
                  border: '1px solid #E5E7EB',
                  pointerEvents: 'auto'
                }
              }}
            >
              {currenciesList.map((curr) => (
                <MenuItem 
                  key={curr.code} 
                  onClick={() => selectCurrency(curr.code)}
                  sx={{
                    px: 1.5,
                    py: 1,
                    borderRadius: '8px',
                    mb: 0.5,
                    backgroundColor: curr.code === currency ? '#ECFDF5' : 'transparent',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    '&:hover': {
                      backgroundColor: curr.code === currency ? '#ECFDF5' : '#F9FAFB',
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ 
                      fontSize: '14px', 
                      fontWeight: 600,
                      color: curr.code === currency ? '#10B981' : '#1F2937' 
                    }}>
                      {curr.code}
                    </Typography>
                    <Typography sx={{ 
                      fontSize: '12px', 
                      color: '#6B7280',
                      fontWeight: 500
                    }}>
                      {curr.name}
                    </Typography>
                  </Box>
                  {curr.code === currency && <CheckIcon sx={{ fontSize: 18, color: '#10B981', ml: 1 }} />}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Login Button */}
          <Button
            component={Link}
            href="/login"
            variant="contained"
            startIcon={<LoginIcon />}
            sx={{
              textTransform: 'none',
              backgroundColor: '#0058E6',
              color: 'white',
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: 500,
                 borderRadius: '8px',
              '&:hover': {
                backgroundColor: '#0047b3',
              },
            }}
          >
            Login
          </Button>

          {/* Signup */}
          <Button
            component={Link}
            href="/signup"
            startIcon={<PersonAddAltIcon />}
            sx={{
              textTransform: 'none',
              color: '#374151',
              display: { xs: 'none', md: 'inline-flex' },
              fontSize: '14px',
              fontWeight: 500,
              backgroundColor: '#F9FAFB',
              padding: '6px 18px',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              transition: 'all 0.2s duration-200',
              '&:hover': {
                backgroundColor: '#F3F4F6',
                color: '#111827',
                '& .MuiButton-startIcon': { color: '#111827' }
              },
              '& .MuiButton-startIcon': { color: '#374151' }
            }}
          >
            Signup
          </Button>

          {/* Agent Signup */}
          <Button
            component={Link}
            href="/agent-signup"
            startIcon={<BusinessCenterOutlinedIcon />}
            sx={{
              textTransform: 'none',
              color: '#374151',
              display: { xs: 'none', lg: 'inline-flex' },
              fontSize: '14px',
              fontWeight: 500,  
              backgroundColor: '#F9FAFB',
              padding: '6px 18px',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              transition: 'all 0.2s duration-200',
              '&:hover': {
                backgroundColor: '#F3F4F6',
                color: '#111827',
                '& .MuiButton-startIcon': { color: '#111827' }
              },
              '& .MuiButton-startIcon': { color: '#374151' }
            }}
          >
            Agent Signup
          </Button>
        </Box>

        {/* Mobile Menu Icon - Right Side */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="end"
          onClick={handleDrawerToggle}
          sx={{ 
            display: { md: 'none' },
            color: '#374151'
          }}
        >
          <MenuIcon />
        </IconButton>

        {/* Mobile Drawer */}
        <Drawer
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }} 
          PaperProps={{
            sx: { width: '100%', p: 2 }
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box
              component="img"
              src="/logo.png"
              alt="Logo"
              sx={{ height: 24, width: 'auto' }}
            />
            <IconButton onClick={handleDrawerToggle}>
              <CloseIcon sx={{ color: '#374151' }} />
            </IconButton>
          </Box>

          <List sx={{ p: 0 }}>
            {/* Services Mobile */}
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton 
                onClick={handleMobileServicesToggle}
                sx={{ 
                  py: 1.5, 
                  px: 0,
                  '&:hover': { backgroundColor: 'transparent' } 
                }}
              >
                <ListItemText 
                  primary="Services" 
                  primaryTypographyProps={{ 
                    fontSize: '15px', 
                    fontWeight: 600, 
                    color: mobileServicesOpen ? '#0058E6' : '#111827' 
                  }} 
                />
                {mobileServicesOpen ? 
                  <ExpandLess sx={{ color: '#0058E6' }} /> : 
                  <ExpandMore sx={{ color: '#374151' }} />
                }
              </ListItemButton>
              <Collapse in={mobileServicesOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {services.map((item) => (
                    <ListItemButton 
                      key={item} 
                      sx={{ 
                        pl: 2, 
                        py: 1,
                        borderRadius: '8px',
                        mb: 0.5,
                        '&:hover': { backgroundColor: '#F9FAFB' }
                      }}
                    >
                      <ChevronRightIcon sx={{ fontSize: 18, color: '#0058E6', mr: 1 }} />
                      <ListItemText primary={item} primaryTypographyProps={{ fontSize: '14px', color: '#475569' }} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </ListItem>

            <Divider sx={{ my: 1 }} />

            {/* Company Mobile */}
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton 
                onClick={handleMobileCompanyToggle}
                sx={{ 
                  py: 1.5, 
                  px: 0,
                  '&:hover': { backgroundColor: 'transparent' } 
                }}
              >
                <ListItemText 
                  primary="Company" 
                  primaryTypographyProps={{ 
                    fontSize: '15px', 
                    fontWeight: 600, 
                    color: mobileCompanyOpen ? '#0058E6' : '#111827' 
                  }} 
                />
                {mobileCompanyOpen ? 
                  <ExpandLess sx={{ color: '#0058E6' }} /> : 
                  <ExpandMore sx={{ color: '#374151' }} />
                }
              </ListItemButton>
              <Collapse in={mobileCompanyOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {companyItems.map((item) => (
                    <ListItemButton 
                      key={item} 
                      sx={{ 
                        pl: 2, 
                        py: 1,
                        borderRadius: '8px',
                        mb: 0.5,
                        '&:hover': { backgroundColor: '#F9FAFB' }
                      }}
                    >
                      <ChevronRightIcon sx={{ fontSize: 18, color: '#0058E6', mr: 1 }} />
                      <ListItemText primary={item} primaryTypographyProps={{ fontSize: '14px', color: '#475569' }} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </ListItem>

            <ListItem disablePadding sx={{ py: 1.5 }}>
              <ListItemText primary="Blogs" primaryTypographyProps={{ fontSize: '15px', fontWeight: 600, color: '#111827' }} />
            </ListItem>

            <Divider sx={{ my: 1 }} />

            {/* Language Mobile */}
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton onClick={handleMobileLanguageToggle} sx={{ py: 1.5, px: 0 }}>
                <LanguageIcon sx={{ fontSize: 18, color: '#374151', mr: 1.5 }} />
                <ListItemText 
                  primary="Language" 
                  primaryTypographyProps={{ fontSize: '15px', fontWeight: 600, color: '#111827' }} 
                />
                {mobileLanguageOpen ? <ExpandLess sx={{ color: '#0058E6' }} /> : <ExpandMore sx={{ color: '#374151' }} />}
              </ListItemButton>
              <Collapse in={mobileLanguageOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {languagesList.map((lang) => (
                    <ListItemButton 
                      key={lang} 
                      onClick={() => { selectLanguage(lang); setMobileLanguageOpen(false); }}
                      sx={{ 
                        pl: 4, 
                        py: 1,
                        backgroundColor: lang === language ? '#EBF5FF' : 'transparent',
                        borderRadius: '8px',
                        mb: 0.5,
                        display: 'flex',
                        justifyContent: 'space-between'
                      }}
                    >
                      <ListItemText primary={lang} primaryTypographyProps={{ fontSize: '14px', color: lang === language ? '#0058E6' : '#475569', fontWeight: lang === language ? 600 : 400 }} />
                      {lang === language && <CheckIcon sx={{ fontSize: 16, color: '#0058E6' }} />}
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </ListItem>

            {/* Currency Mobile */}
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton onClick={handleMobileCurrencyToggle} sx={{ py: 1.5, px: 0 }}>
                <PaymentsOutlinedIcon sx={{ fontSize: 18, color: '#374151', mr: 1.5 }} />
                <ListItemText 
                  primary="Currency" 
                  primaryTypographyProps={{ fontSize: '15px', fontWeight: 600, color: '#111827' }} 
                />
                {mobileCurrencyOpen ? <ExpandLess sx={{ color: '#0058E6' }} /> : <ExpandMore sx={{ color: '#374151' }} />}
              </ListItemButton>
              <Collapse in={mobileCurrencyOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {currenciesList.map((curr) => (
                    <ListItemButton 
                      key={curr.code} 
                      onClick={() => { selectCurrency(curr.code); setMobileCurrencyOpen(false); }}
                      sx={{ 
                        pl: 4, 
                        py: 1,
                        backgroundColor: curr.code === currency ? '#ECFDF5' : 'transparent',
                        borderRadius: '8px',
                        mb: 0.5,
                        display: 'flex',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Box>
                        <Typography sx={{ fontSize: '14px', color: curr.code === currency ? '#10B981' : '#1F2937', fontWeight: 600 }}>{curr.code}</Typography>
                        <Typography sx={{ fontSize: '12px', color: '#6B7280' }}>{curr.name}</Typography>
                      </Box>
                      {curr.code === currency && <CheckIcon sx={{ fontSize: 16, color: '#10B981' }} />}
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </ListItem>
          </List>

          <Box sx={{ mt: 'auto', pt: 3, pb: 4 }}>
            <Button 
              fullWidth 
              component={Link}
              href="/login"
              variant="contained" 
              startIcon={<LoginIcon />}
              onClick={handleDrawerToggle}
              sx={{ 
                mb: 2, 
                backgroundColor: '#0058E6', 
                textTransform: 'none',
                borderRadius: '8px',
                py: 1.2
              }}
            >
              Login
            </Button>
            <Button 
              fullWidth 
              component={Link}
              href="/signup"
              variant="outlined" 
              startIcon={<PersonAddAltIcon />}
              onClick={handleDrawerToggle}
              sx={{ 
                mb: 2, 
                color: '#374151', 
                borderColor: '#E5E7EB', 
                textTransform: 'none',
                borderRadius: '8px',
                py: 1.2
              }}
            >
              Signup
            </Button>
            <Button 
              fullWidth 
              component={Link}
              href="/agent-signup"
              variant="outlined" 
              startIcon={<BusinessCenterOutlinedIcon />}
              onClick={handleDrawerToggle}
              sx={{ 
                color: '#374151', 
                backgroundColor: '#F9FAFB',
                borderColor: '#E5E7EB', 
                textTransform: 'none',
                borderRadius: '8px',
                py: 1.2
              }}
            >
              Agent Signup
            </Button>
          </Box>
        </Drawer>
      </Toolbar>
      </Container>
    </AppBar>
  );
}
