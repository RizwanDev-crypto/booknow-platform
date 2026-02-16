'use client';
import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [captcha, setCaptcha] = useState({ q: '', a: 0 });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [strengthText, setStrengthText] = useState('Enter password');
  const [strengthColor, setStrengthColor] = useState('#4B5563');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    captchaAnswer: '',
    agreeToTerms: true,
  });

  // Generate simple math CAPTCHA
  useEffect(() => {
    const n1 = Math.floor(Math.random() * 10);
    const n2 = Math.floor(Math.random() * 10);
    setTimeout(() => setCaptcha({ q: `${n1} x ${n2}`, a: n1 * n2 }), 0);
  }, []);

  const handlePasswordChange = (password) => {
    let strength = 0;
    if (password.length > 0) {
      strength = 20;
      if (password.length >= 6) strength = 40;
      if (/[A-Z]/.test(password)) strength += 20;
      if (/[0-9]/.test(password)) strength += 20;
      if (/[^A-Za-z0-9]/.test(password)) strength += 20;
    }

    setPasswordStrength(strength);
    if (strength === 0) {
      setStrengthText('Enter password');
      setStrengthColor('#4B5563');
    } else if (strength <= 40) {
      setStrengthText('Weak');
      setStrengthColor('#ef4444');
    } else if (strength <= 80) {
      setStrengthText('Medium');
      setStrengthColor('#f59e0b');
    } else {
      setStrengthText('Strong');
      setStrengthColor('#10b981');
    }
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    const finalValue = type === 'checkbox' ? checked : value;
    setFormData({
      ...formData,
      [name]: finalValue,
    });

    if (name === 'password') {
      handlePasswordChange(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseInt(formData.captchaAnswer) !== captcha.a) {
      alert('Incorrect security check answer');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Local Storage Logic
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const isDuplicate = existingUsers.some(user => user.email === formData.email);

    if (isDuplicate) {
      alert('An account with this email already exists.');
      return;
    }

    const newUser = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password, // In a real app, this would be hashed
      type: 'user'
    };

    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));

    alert('Account created successfully! You can now login.');
    router.push('/login');
  };

  return (
    <Container maxWidth="sm">
      <Box 
        sx={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          py: 4,
        }}
      >
        <Paper 
          elevation={0}
          sx={{ 
            p: { xs: 3, md: 5 },
            width: '100%',
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
            position: 'relative',
            backgroundColor: '#ffffff',
          }}
        >
          {/* Top Green Icon */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Box 
              sx={{ 
                width: 56,
                height: 56,
                borderRadius: '50%',
                backgroundColor: '#dcfce7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <PersonAddAlt1OutlinedIcon sx={{ color: '#10b981', fontSize: 24 }} />
            </Box>
          </Box>

          {/* Page Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography 
              variant="h5" 
              component="h1" 
              sx={{ 
                fontWeight: 700,
                color: '#020817',
                mb: 0.5
              }}
            >
              Create Account
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748b' }}>
              Create your account to continue
            </Typography>
          </Box>

          {/* Signup Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* First Name */}
              <Grid item xs={12} sm={6} sx={{ width: {xs: '100%', sm: '48.2%'} }}>
                <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#020817', mb: 1 }}>
                  First Name *
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      backgroundColor: '#ffffff',
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#0058e6',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#0058e6',
                        borderWidth: '1.5px',
                      },
                      '& input::placeholder': {
                        fontSize: '0.875rem',
                      },
                    },
                  }}
                />
              </Grid>

              {/* Last Name */}
              <Grid item xs={12} sm={6} sx={{ width: {xs: '100%', sm: '48.2%'} }}>
                <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#020817', mb: 1 }}>
                  Last Name *
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      backgroundColor: '#ffffff',
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#0058e6',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#0058e6',
                        borderWidth: '1.5px',
                      },
                      '& input::placeholder': {
                        fontSize: '0.875rem',
                      },
                    },
                  }}
                />
              </Grid>

              {/* Email Address */}
              <Grid item xs={12} sx={{ width: '100%' }}>
                <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#020817', mb: 1 }}>
                  Email Address *
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlinedIcon sx={{ fontSize: 18, color: '#94a3b8' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      backgroundColor: '#ffffff',
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#0058e6',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#0058e6',
                        borderWidth: '1.5px',
                      },
                      '& input::placeholder': {
                        fontSize: '0.875rem',
                      },
                    },
                  }}
                />
              </Grid>

              {/* Password */}
              <Grid item xs={12} sx={{ width: '100%' }}>
                <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#020817', mb: 1 }}>
                  Password *
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon sx={{ fontSize: 18, color: '#94a3b8' }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} size="small" edge="end">
                          {showPassword ? <VisibilityOffOutlinedIcon sx={{ fontSize: 18 }} /> : <VisibilityOutlinedIcon sx={{ fontSize: 18 }} />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      backgroundColor: '#ffffff',
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#0058e6',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#0058e6',
                        borderWidth: '1.5px',
                      },
                      '& input::placeholder': {
                        fontSize: '0.875rem',
                      },
                    },
                  }}
                />
              </Grid>

              {/* Password Strength Indicator */}
              <Grid item xs={12} sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                  <Typography sx={{ fontSize: '12px', color: '#64748b' }}>Password Strength:</Typography>
                  <Typography sx={{ fontSize: '12px', fontWeight: 600, color: strengthColor }}>{strengthText}</Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={passwordStrength} 
                  sx={{ 
                    height: 6, 
                    borderRadius: 3, 
                    backgroundColor: '#e2e8f0',
                    '& .MuiLinearProgress-bar': { backgroundColor: strengthColor }
                  }} 
                />
                <Typography sx={{ fontSize: '11px', color: '#4B5563', mt: 1 }}>
                  Password must be at least 6 characters long
                </Typography>
              </Grid>

              {/* Confirm Password */}
              <Grid item xs={12} sx={{ width: '100%' }}>
                <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#020817', mb: 1 }}>
                  Confirm Password *
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon sx={{ fontSize: 18, color: '#94a3b8' }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} size="small" edge="end">
                          {showConfirmPassword ? <VisibilityOffOutlinedIcon sx={{ fontSize: 18 }} /> : <VisibilityOutlinedIcon sx={{ fontSize: 18 }} />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      backgroundColor: '#ffffff',
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#0058e6',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#0058e6',
                        borderWidth: '1.5px',
                      },
                      '& input::placeholder': {
                        fontSize: '0.875rem',
                      },
                    },
                  }}
                />
              </Grid>

              {/* Security Check */}
              <Grid item xs={12} sx={{ width: '100%' }}>
                <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#020817', mb: 1 }}>
                  Security Check: What is {captcha.q}? *
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  name="captchaAnswer"
                  placeholder="Enter the answer"
                  value={formData.captchaAnswer}
                  onChange={handleChange}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <QuizOutlinedIcon sx={{ fontSize: 18, color: '#94a3b8' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      backgroundColor: '#ffffff',
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#0058e6',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#0058e6',
                        borderWidth: '1.5px',
                      },
                      '& input::placeholder': {
                        fontSize: '0.875rem',
                      },
                    },
                  }}
                />
              </Grid>

              {/* Terms of Service */}
              <Grid item xs={12} sx={{ width: '100%' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      sx={{ color: '#2563eb', '&.Mui-checked': { color: '#2563eb' } }}
                    />
                  }
                  label={
                    <Typography sx={{ fontSize: '13px', color: '#475569' }}>
                      I agree to the <Link href="/terms" style={{ color: '#2563eb', textDecoration: 'none' }}>Terms of Service</Link> and <Link href="/privacy" style={{ color: '#2563eb', textDecoration: 'none' }}>Privacy Policy</Link>
                    </Typography>
                  }
                />
              </Grid>

              {/* Create Account Button */}
              <Grid item xs={12} sx={{ width: '100%' }} >
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  startIcon={<PersonAddAlt1OutlinedIcon />}
                  sx={{
                    mt: 1,
                    py: 1.25,
                    borderRadius: '8px',
                    backgroundColor: '#10b981',
                    textTransform: 'none',
                    fontSize: '14px',
                    fontWeight: 600,
                    boxShadow: 'none',
                    '&:hover': {
                      backgroundColor: '#059669',
                      boxShadow: 'none',
                    },
                  }}
                >
                  Create Account
                </Button>
              </Grid>
            </Grid>

            {/* Already have an account */}
            <Box sx={{ textAlign: 'center', mt: 3, pt: 2, borderTop: '1px solid #f1f5f9' }}>
              <Typography sx={{ fontSize: '13px', color: '#64748b' }}>
                Already have an account? <Link href="/login" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 600 }}>Login</Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
