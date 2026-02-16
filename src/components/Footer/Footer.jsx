'use client';

import * as React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Link,
  Divider,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CookieOutlinedIcon from '@mui/icons-material/CookieOutlined';
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
import SecurityIcon from '@mui/icons-material/Security';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Support',
      links: [
        { label: 'Affiliate Program', href: '#' },
        { label: 'Investor', href: '#' },
        { label: 'Career and Jobs', href: '#' },
        { label: 'How to Book', href: '#' },
        { label: 'File a Claim', href: '#' },
        { label: 'Refund Policy', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '#' },
        { label: 'Contact Us', href: '#' },
        { label: 'Blogs', href: '#' },
        { label: 'Become a Supplier', href: '#' },
      ],
    },
    {
      title: 'Explore',
      links: [
        { label: 'Best Travel Deals', href: '#' },
        { label: 'Travel Documents', href: '#' },
        { label: 'Disruption', href: '#' },
        { label: 'FAQ/Answers', href: '#' },
        { label: 'Accessibility', href: '#' },
      ],
    },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#fff',
        pt: 8,
        pb: 2,
        borderTop: '1px solid #e2e8f0',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3.9}>
          {/* Logo and Description */}
          <Grid item xs={12} sm={3} md={3}>
            <Box sx={{ mb: 3 }}>
              <Box
                component="img"
                src="/logo.png"
                alt="Booknow.co Logo"
                sx={{ height: 38, mb: 2 }}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: '#4B5563',
                  fontSize: '14px',
                  lineHeight: 1.8,
                  maxWidth: '300px',
                  mb: 2,
                }}
              >
              Your trusted travel partner for unforgettable journeys. Discover the world with our comprehensive booking services.
              </Typography>

              {/* 24/7 Support Section */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  bgcolor: '#F1F7FF',
                  p: 2,
                  borderRadius: '1px',
                  borderLeft: '4px solid #3B82F6',
                  maxWidth: '300px',
                }}
              >
                <SupportAgentIcon sx={{ color: '#3B82F6', fontSize: 24 }} />
                <Box>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      color: '#1e293b',
                      fontSize: '14px',
                      lineHeight: 1.2,
                    }}
                  >
                    24/7 Support
                  </Typography>
                  <Typography
                    sx={{
                      color: '#64748b',
                      fontSize: '14px',
                    }}
                  >
                    Always here to help
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Navigation Links */}
          {footerSections.map((section) => (
            <Grid item xs={6} sm={2} md={2} key={section.title}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  color: '#1e293b',
                  fontSize: '14px',
                }}
              >
                {section.title}
              </Typography>
              <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
                {section.links.map((link) => (
                  <Box component="li" key={link.label} sx={{ mb: 1.5 }}>
                    <Link
                      href={link.href}
                      underline="none"
                      sx={{
                        color: '#4B5563',
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        transition: 'all 0.2s',
                        '&:hover': {
                          color: '#0058E6',
                        },
                      }}
                    >
                      <ChevronRightIcon sx={{ fontSize: 16, color: '#0058E6' }} />
                      {link.label}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Grid>
          ))}

          {/* Contact Information */}
          <Grid item xs={12} sm={3} md={3} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
            <Box>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: '#1e293b',
                fontSize: '14px',
              }}
            >
             Get in Touch
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: '300px' }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                <Link
                  href="#"
                  underline="none"
                  sx={{ 
                    color: '#4B5563', 
                    fontSize: '14px', 
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 1.5,
                    '&:hover': { color: '#0058E6' } 
                  }}
                >
                  <LocationOnOutlinedIcon sx={{ color: '#2563EB', fontSize: 18, mt: 0.2 }} />
                  71 St, Suite 900 San Francisco, United States
                </Link>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <PhoneIcon sx={{ color: '#16A34A', fontSize: 18 }} />
                <Link
                  href="tel:+123456789"
                  underline="none"
                  sx={{
                    color: '#4B5563',
                    fontSize: '14px',
                    transition: 'color 0.2s',
                    '&:hover': { color: '#16A34A' }
                  }}
                >
                  +123456789
                </Link>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                <MailOutlineOutlinedIcon sx={{ color: '#DC2626', fontSize: 18, mt: 0.2 }} />
                <Link
                  href="mailto:email@agency.com"
                  underline="none"
                  sx={{
                    color: '#4B5563',
                    fontSize: '14px',
                    transition: 'color 0.2s',
                    '&:hover': { color: '#DC2626' }
                  }}
                >
                  email@agency.com
                </Link>
              </Box>
              <Box sx={{ display: 'flex', gap: 1, mt: 1, justifyContent: { xs: 'flex-start', md: 'flex-start' } }}>
                {[
                  { icon: <FacebookIcon />, href: '#', color: '#1877F2' },
                  { icon: <TwitterIcon />, href: '#', color: '#1DA1F2' },
                  { icon: <InstagramIcon />, href: '#', color: '#E4405F' },
                  { icon: <LinkedInIcon />, href: '#', color: '#0077B5' },
                ].map((social, index) => (
                  <IconButton
                    key={index}
                    href={social.href}
                    sx={{
                      color: '#374151',
                      backgroundColor: '#fff',
                      borderRadius: '20%',
                      border: '1px solid #e2e8f0',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: social.color,
                        color: '#fff',
                        borderColor: social.color,
                      },
                    }}
                    size="small"
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Box>
            </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Divider sx={{ my: 1, borderColor: '#e2e8f0' }} />

      <Container maxWidth="lg">
        {/* Bottom Bar */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 3,
            flexWrap: 'wrap',
          }}
        >
          {/* Copyright Section */}
          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography variant="body2" sx={{ color: '#111827', fontSize: '14px', mb: 0.5 , fontWeight: 500}}>
              © {currentYear} <strong>PHPTARVELS</strong>. <Box component="span" sx={{ color: '#4B5563' }}>All rights reserved.</Box>
            </Typography>
            <Typography variant="body2" sx={{ color: '#6B7280', fontSize: '14px' }}>
              Powered by <Link href="#" underline="none" sx={{ color: '#2563EB', fontWeight: 700, '&:hover': { textDecoration: 'underline' } }}>PHPTRAVELS</Link>
            </Typography>
          </Box>

          {/* Links Section */}
          <Box
            sx={{
              display: 'flex',
              gap: { xs: 2, sm: 3 },
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {[
              { label: 'Privacy', icon: <GppGoodOutlinedIcon sx={{ fontSize: 18 }} />, href: '#' },
              { label: 'Terms', icon: <DescriptionOutlinedIcon sx={{ fontSize: 18 }} />, href: '#' },
              { label: 'Cookies', icon: <CookieOutlinedIcon sx={{ fontSize: 18 }} />, href: '#' },
              { label: 'Refund', icon: <ChangeCircleOutlinedIcon sx={{ fontSize: 18 }} />, href: '#' },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                underline="none"
                sx={{
                  color: '#4B5563',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  transition: 'color 0.2s',
                  '&:hover': { color: '#2563EB' },
                }}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </Box>

          {/* Badges Section */}
          <Box
            sx={{
              display: 'flex',
              gap: 1.5,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {[
              { label: 'SSL Secure', icon: <SecurityIcon sx={{ fontSize: 18 }} />, color: '#15803D', bgcolor: '#F0FDF4' },
              { label: 'IATA', icon: <CheckCircleOutlinedIcon sx={{ fontSize: 18 }} />, color: '#1D4DE8', bgcolor: '#EFF6FF' },
              { label: 'PCI DSS', icon: <CreditCardOutlinedIcon sx={{ fontSize: 18 }} />, color: '#7E22CE', bgcolor: '#F5F3FF' },
            ].map((badge) => (
              <Box
                key={badge.label}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 1.5,
                  py: 0.5,
                  borderRadius: '8px',
                  border: `1px solid ${badge.color}40`,
                  bgcolor: badge.bgcolor,
                  color: badge.color,
                }}
              >
                {badge.icon}
                <Typography sx={{ fontSize: '13px', fontWeight: 700 }}>
                  {badge.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}