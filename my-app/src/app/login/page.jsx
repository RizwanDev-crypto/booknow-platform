'use client';
import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  IconButton,
  InputAdornment,
} from '@mui/material';
import LockOutlineIcon from '@mui/icons-material/LockOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setError(''); // Clear error when user types
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Local Storage Validation Logic
    try {
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const user = existingUsers.find(u => 
        u.email.toLowerCase() === formData.email.toLowerCase() && 
        u.password === formData.password
      );

      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        // Optional: Keep the alert for success or just redirect
        // alert(`Welcome back, ${user.firstName}! Login successful.`);
        router.push('/dashboard');
      } else {
        setError('Invalid email or password. Please sign up if you haven\'t already.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login. Please try again.');
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
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
            p: 4,
            width: "80%",
            borderRadius: 2,
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            border: '1px solid #f0f0f0',
          }}
        >
          {/* Lock Icon */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <Box 
              sx={{ 
                width: 56,
                height: 56,
                borderRadius: '50%',
                backgroundColor: '#dbeafe',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <LockOutlineIcon sx={{ color: '#2563EB', fontSize: 22 }} />
            </Box>
          </Box>

          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <Typography 
              variant="h5" 
              component="h1" 
              sx={{ 
                fontWeight: 700,
                color: '#111827',
                mb: 0.4
              }}
            >
              Welcome Back
            </Typography>
            <Typography sx={{ fontSize: {xs: '12px', sm: '0.875rem'}, mb: 1, color: '#4B5563' }}>
              Sign in to your account to continue
            </Typography>
          </Box>

          {/* Login Form */}
          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            {/* Error Message */}
            {error && (
              <Box 
                sx={{ 
                  mb: 3, 
                  p: 1.5, 
                  borderRadius: 1.5, 
                  backgroundColor: '#fee2e2', 
                  border: '1px solid #fecaca',
                  textAlign: 'center'
                }}
              >
                <Typography sx={{ color: '#dc2626', fontSize: '13px', fontWeight: 500 }}>
                  {error}
                </Typography>
              </Box>
            )}
            {/* Email Field */}
            <Typography sx={{ fontSize: '14px', mb: 1,  color: '#020817' }}>
              Email Address
            </Typography>
            <TextField
              fullWidth
              size="small"
              id="email"
              name="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              sx={{ mb: 2.5 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon sx={{ color: '#9CA3AF', fontSize: 20 }} />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: 1.5,
                  backgroundColor: '#ffffff',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#E5E7EB',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#0058e6',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#0058e6',
                    borderWidth: '1.5px',
                  },
                  '& input::placeholder': {
                    fontSize: '0.875rem',
                    color: '#9CA3AF',
                  },
                },
              }}
            />

            {/* Password Field */}
            <Typography sx={{ fontSize: '14px', mb: 1, color: '#1F2937' }}>
              Password
            </Typography>
            <TextField
              fullWidth
              size="small"
              name="password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? (
                        <VisibilityOffIcon sx={{ fontSize: 20, color: '#9CA3AF' }} />
                      ) : (
                        <VisibilityIcon sx={{ fontSize: 20, color: '#9CA3AF' }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: 1.5,
                  backgroundColor: '#ffffff',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#E5E7EB',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#0058e6',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#0058e6',
                    borderWidth: '1.5px',
                  },
                  '& input::placeholder': {
                    fontSize: '0.875rem',
                    color: '#9CA3AF',
                  },
                },
              }}
            />

            {/* Remember Me & Forgot Password */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    sx={{
                      color: '#D1D5DB',
                      '&.Mui-checked': {
                        color: '#2563EB',
                      },
                    }}
                  />
                }
                label={
                  <Typography variant="body2" sx={{ fontSize: {xs: '12px', sm: '0.875rem'}, color: '#1F2937' }}>
                    Remember Me
                  </Typography>
                }
              />
              <Link 
                href="/forgot-password" 
                variant="body2" 
                sx={{ 
                  color: '#2563EB',
                  textDecoration: 'none',
                  fontSize: {xs: '12px', sm: '0.875rem'},
                  fontWeight: 500,
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Forgot Password?
              </Link>
            </Box>

            {/* Login Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              startIcon={<LockOutlineIcon />}
              sx={{
                mb: 2.5,
                py: 1.25,
                borderRadius: 1.5,
                backgroundColor: '#2563EB',
                textTransform: 'none',
                fontSize: '0.875rem',
                fontWeight: 600,
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: '#1D4ED8',
                  boxShadow: 'none',
                },
              }}
            >
              Sign in to your account
            </Button>

            {/* Sign Up Link */}
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" sx={{ fontSize: '0.875rem', color: '#6B7280' }}>
                No account yet?{' '}
                <Link 
                  href="/signup" 
                  sx={{ 
                    color: '#2563EB',
                    textDecoration: 'none',
                    fontWeight: 600,
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Signup
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
