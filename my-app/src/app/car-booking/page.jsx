"use client";

import { Box, Typography, Paper, Grid, Divider, TextField, Checkbox, Button, FormControlLabel, Collapse, MenuItem, Select, InputAdornment, Dialog, DialogContent } from "@mui/material";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MeetingRoomOutlinedIcon from '@mui/icons-material/MeetingRoomOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import OpacityOutlinedIcon from '@mui/icons-material/OpacityOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CloseIcon from '@mui/icons-material/Close';
import AirlineSeatReclineExtraOutlinedIcon from '@mui/icons-material/AirlineSeatReclineExtraOutlined';
import { Radio, RadioGroup } from "@mui/material";


export default function CarBookingPage() {
  const router = useRouter();
  const [selectedCar, setSelectedCar] = useState(null);
  const [searchData, setSearchData] = useState(null);
  const [policiesOpen, setPoliciesOpen] = useState({
    privacy: true,
    terms: true
  });
  const [showReservationDetails, setShowReservationDetails] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("jazzcash");
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [showTimeoutModal, setShowTimeoutModal] = useState(false);

  useEffect(() => {
    if (showPayment && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (showPayment && timeLeft === 0 && !showTimeoutModal) {
      // Defer state update to avoid cascading render lint error
      setTimeout(() => setShowTimeoutModal(true), 0);
    }
  }, [showPayment, timeLeft, showTimeoutModal]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    // Load data from localStorage
    const carData = localStorage.getItem('selectedCarForBooking');
    const searchParams = localStorage.getItem('carSearchData');
    
    if (carData) {
      setTimeout(() => setSelectedCar(JSON.parse(carData)), 0);
    }
    if (searchParams) {
      setTimeout(() => setSearchData(JSON.parse(searchParams)), 0);
    }
  }, []);

  if (!selectedCar) {
    return <Box sx={{ p: 4, textAlign: "center" }}>Loading booking details...</Box>;
  }

  return (
    <Box sx={{ bgcolor: "#f3f4f6", minHeight: "100vh", pb: 8 }}>
      {/* Header Bar */}
      <Box sx={{ bgcolor: "#023669", color: "white", py: 2 }}>
        <Box sx={{ 
          maxWidth: "1200px", 
          mx: "auto", 
          px: 3, 
          display: "flex", 
          
          justifyContent: "space-between", 
          alignItems: "center" 
        }}>
          <Typography  sx={{ fontWeight: 500, fontSize: "20px" }}>{showPayment ? "PAYMENT" : "BOOKING DETAILS"}</Typography>
          <Typography sx={{ fontSize: "14px", color: "#fff" }}>
            <Box component="span" onClick={() => router.push('/')} sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline" } }}>Car</Box> &gt; <Box component="span" onClick={() => router.push('/car-results')} sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline" } }}>Listing</Box> &gt; <Box component="span" onClick={() => setShowPayment(false)} sx={{ cursor: showPayment ? "pointer" : "default", "&:hover": { textDecoration: showPayment ? "underline" : "none" } }}>Booking Details</Box> {showPayment && <>&gt; <span style={{ color: "#fb923c", fontWeight: 600 }}>Payment</span></>}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ maxWidth: "1200px", mx: "auto", px: 3, mt: 2 }}>
        
        {!showPayment ? (
          <>
        {/* Car Summary Card */}
        <Paper sx={{ p: 2, borderRadius: 2, mb: 2, display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2 }}>
          {/* Car Image */}
          <Box sx={{ width: { xs: "100%", md: "350px" }, flexShrink: 0 }}>
             <Box
                component="img"
                src={selectedCar.image}
                alt={selectedCar.model}
                sx={{ width: "100%", height: "auto", objectFit: "contain", maxHeight: "200px" }}
              />
          </Box>

          {/* Details */}
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 0 }}>
                <Box>
                    <Typography sx={{ fontWeight: 700, color: "#023669", fontSize: "20px" }}>{selectedCar.model}</Typography>
                    <Typography sx={{ color: "#6b7280", fontSize: "14px" }}>{selectedCar.variant}</Typography>
                </Box>
                <Box sx={{ textAlign: "right" }}>
                     <Box sx={{ 
                        display: "inline-block", 
                        bgcolor: "#497DCA", 
                        color: "white", 
                        px: 1.5, 
                        py: 0.5, 
                        borderRadius: 4, 
                        fontSize: "14px", 
                        fontWeight: 600,
                        mb: 1
                    }}>
                        {selectedCar.badge}
                    </Box>
                    <Typography sx={{ fontWeight: 700, color: "#023669", fontSize: "20px" }}>
                        RS {selectedCar.price.toLocaleString()}
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ mb: 2 }}>
                <Typography sx={{ color: "#B91C1C", fontWeight: 600, mb: 1, fontSize: "14px" }}>Facilities:</Typography>
                <Box sx={{ display: 'flex', gap: 2, mb: 1.5, color: "#000000" }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Box component="img" src="/cars/car icons.svg" alt="seats" sx={{ width: 18, height: 18 }} />
                        <Typography sx={{ fontSize: '14px' }}>{selectedCar.seats}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <AirlineSeatReclineExtraOutlinedIcon sx={{ fontSize: 18, color: '#f6941c' }} />
                        <Typography sx={{ fontSize: '14px' }}>{selectedCar.doors}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <SettingsOutlinedIcon sx={{ fontSize: 18, color: '#f6941c' }} />
                        <Typography sx={{ fontSize: '14px' }}>{selectedCar.transmission}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <OpacityOutlinedIcon sx={{ fontSize: 18, color: '#f6941c' }} />
                        <Typography sx={{ fontSize: '14px' }}>{selectedCar.fuelType}</Typography>
                    </Box>
                </Box>
            </Box>
            
            <Box sx={{ mb: 1 }}>
                <Typography sx={{ color: "#ef4444", fontWeight: 600, mb: 1, fontSize: "14px" }}>Not Included:</Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <CloseIcon sx={{ fontSize: 14, color: '#EF4444' }} />
                        <Typography sx={{ fontSize: '12px', color: '#4B5563' }}>Fuel</Typography>
                    </Box>
                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <CloseIcon sx={{ fontSize: 14, color: '#EF4444' }} />
                        <Typography sx={{ fontSize: '12px', color: '#4B5563' }}>chauffeur food</Typography>
                    </Box>
                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <CloseIcon sx={{ fontSize: 14, color: '#EF4444' }} />
                        <Typography sx={{ fontSize: '12px', color: '#4B5563' }}>toll tax</Typography>
                    </Box>
                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <CloseIcon sx={{ fontSize: 14, color: '#EF4444' }} />
                        <Typography sx={{ fontSize: '12px', color: '#4B5563' }}>overtime charges</Typography>
                    </Box>
                </Box>
            </Box>

            <Box>
                <Typography component="div" sx={{ fontSize: "14px", display: "flex", gap: 1, mb: 0.5 }}>
                    <Box component="span" sx={{ fontWeight: 600, color: "#023669" }}>• Pickup time:</Box> 
                    {searchData && searchData.pickupDate ? dayjs(searchData.pickupDate).format("DD/MM/YYYY, HH:mm:ss") : "14/02/2026, 08:00:00"}
                </Typography>
                 <Typography component="div" sx={{ fontSize: "14px", display: "flex", gap: 1 }}>
                    <Box component="span" sx={{ fontWeight: 600, color: "#023669" }}>• Service type:</Box> 
                    City to City Package
                </Typography>
            </Box>

          </Box>
        </Paper>

        {/* Contact Details Form */}
        <Paper sx={{ p: 3, borderRadius: 2, mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: "#023669", mb: 3 }}>Contact Details</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={3} width={{xs:"100%", sm:"48%", md:"23%"}}>
                    <Typography sx={{ fontSize: "14px", fontWeight: 600, color: "#023669", mb: 1 }}>Full Name <span style={{color: "red"}}>*</span></Typography>
                    <TextField fullWidth size="small" placeholder="" sx={{ "& .MuiOutlinedInput-root": { borderRadius: "6px" }, "& .MuiOutlinedInput-notchedOutline": { borderColor: "black" } }} />
                </Grid>
                <Grid item xs={12} md={3} width={{xs:"100%", sm:"48%", md:"27%", lg:"28%"}}>
                    <Typography sx={{ fontSize: "14px", fontWeight: 600, color: "#023669", mb: 1 }}>Phone Number <span style={{color: "red"}}>*</span></Typography>
                    <Box sx={{ display: "flex"}}>
                         <Select size="small" defaultValue="+92" sx={{ width: "80px", bgcolor: "white", "& .MuiOutlinedInput-notchedOutline": { display: "block", borderRadius: "6px 0 0 6px", borderColor: "black", borderRight: 0 } }}>
                            <MenuItem value="+92">🇵🇰</MenuItem>
                         </Select>
                        <TextField fullWidth size="small" placeholder="+92" sx={{ "& .MuiOutlinedInput-root": { borderRadius: "0 6px 6px 0" }, "& .MuiOutlinedInput-notchedOutline": { borderColor: "black" } }} />
                    </Box>
                </Grid>
                <Grid item xs={12} md={3} width={{xs:"100%", sm:"48%", md:"23%"}}>
                    <Typography sx={{ fontSize: "14px", fontWeight: 600, color: "#023669", mb: 1 }}>CNIC <span style={{color: "red"}}>*</span></Typography>
                    <TextField fullWidth size="small" placeholder="" sx={{ "& .MuiOutlinedInput-root": { borderRadius: "6px" }, "& .MuiOutlinedInput-notchedOutline": { borderColor: "black" } }} />
                </Grid>
                <Grid item xs={12} md={3} width={{xs:"100%", sm:"48%", md:"21%"}}>
                    <Typography sx={{ fontSize: "14px", fontWeight: 600, color: "#023669", mb: 1 }}>Pickup Address <span style={{color: "red"}}>*</span></Typography>
                    <TextField fullWidth size="small" placeholder="" sx={{ "& .MuiOutlinedInput-root": { borderRadius: "6px" }, "& .MuiOutlinedInput-notchedOutline": { borderColor: "black" } }} />
                </Grid>
            </Grid>
      

        {/* Privacy Policy */}
        <Box sx={{ my: 4 }}>
            <Box 
                onClick={() => setPoliciesOpen({...policiesOpen, privacy: !policiesOpen.privacy})}
                sx={{ 
                    bgcolor: policiesOpen.privacy ? "#0058E6" : "#023669", 
                    color: "white", 
                    p: 1.5, 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center",
                    borderTopLeftRadius: "8px",
                    borderTopRightRadius: "8px",
                    cursor: "pointer"
                }}
            >
                <Typography sx={{ fontWeight: 600,fontSize: "14px" }}>Privacy Policy</Typography>
                {policiesOpen.privacy ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Box>
            <Collapse in={policiesOpen.privacy}>
                <Box sx={{ p: 3, bgcolor: "white", borderTopLeftRadius: 0, borderTopRightRadius: 0, borderTop: "none" }}>
                    <Box sx={{ mb: 2 }}>
                        <Typography sx={{ fontWeight: 700, color: "#023669", mb: 1 }}>Cancellation Policy</Typography>
                        <Typography sx={{ fontSize: "14px", color: "#6b7280", mb: 2 }}>
                            At Bookkaru, we understand that plans can sometimes change unexpectedly. To provide you with a hassle-free experience, we&apos;ve crafted a cancellation policy that balances flexibility and fairness.
                        </Typography>
                        
                         <Typography sx={{ fontWeight: 700, color: "#023669", fontSize: "14px" }}>Cancellation Period:</Typography>
                        <Typography sx={{ fontSize: "14px", color: "#6b7280", mb: 2 }}>
                            Cancellations made 2 days or more before your scheduled pickup time will not incur any cancellation fees. Cancellations within 1 day of the scheduled pickup time will be subject to a cancellation fee of 10% of the total booking amount.
                        </Typography>

                         <Typography sx={{ fontWeight: 700, color: "#023669", fontSize: "14px" }}>How to Cancel:</Typography>
                        <Typography sx={{ fontSize: "14px", color: "#6b7280", mb: 2 }}>
                            For your convenience, cancellations must be made through our official channels, either on our website/app or by contacting our friendly customer support. Please note that cancellations made through unauthorized channels may not be considered valid.
                        </Typography>
                        
                        {/* More policy text placeholders */}
                        <Typography sx={{ fontWeight: 700, color: "#023669", fontSize: "14px" }}>Refunds:</Typography>
                        <Typography sx={{ fontSize: "14px", color: "#6b7280", mb: 2 }}>
                            Refunds for eligible cancellations will be processed promptly, typically within 14 working days. The refunded amount will be credited to the original payment method used during the booking or will be refunded in the Bookkaru wallet.
                        </Typography>
                    </Box>
                </Box>
            </Collapse>
        </Box>

        {/* Terms & Conditions */}
        <Box sx={{ mb: 2}}>
            <Box 
                onClick={() => setPoliciesOpen({...policiesOpen, terms: !policiesOpen.terms})}
                sx={{ 
                    bgcolor: policiesOpen.terms ? "#0058E6" : "#023669", 
                    color: "white", 
                    p: 1.5, 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center",
                    borderRadius: "8px",
                    cursor: "pointer",
                    borderBottomLeftRadius: policiesOpen.terms ? 0 : "8px",
                    borderBottomRightRadius: policiesOpen.terms ? 0 : "8px"
                }}
            >
                <Typography sx={{ fontWeight: 600 , fontSize: "14px"}}>Terms & Conditions</Typography>
                {policiesOpen.terms ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Box>
            <Collapse in={policiesOpen.terms}>
                <Box sx={{ p: 3, bgcolor: "white", borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
                    <Box >
                        <Typography sx={{ fontWeight: 700, color: "#023669", fontSize: "14px" }}>Fuel Policy</Typography>
                        <Typography sx={{ fontSize: "14px", color: "#6b7280", mb: 2 }}>
                            Customers are responsible for covering their own fuel expenses. Each vehicle is provided with a specific fuel level, and customers must return the vehicle with the same amount of fuel. Any difference will incur a charge, along with a PKR 500 Service Fee if the original fuel level is not maintained
                        </Typography>

                        <Typography sx={{ fontWeight: 700, color: "#023669", fontSize: "14px" }}>Chauffeur&apos;s Accommodation (Intercity Rides)</Typography>
                        <Typography sx={{ fontSize: "14px", color: "#6b7280", mb: 2 }}>
                            For intercity rides, customers are responsible for the chauffeur&apos;s food and accommodation. Alternatively, a daily allowance of PKR 2000 can be provided if the customer opts not to arrange for food and accommodation
                        </Typography>

                        <Typography sx={{ fontWeight: 700, color: "#023669", fontSize: "14px" }}>E-challan Responsibility</Typography>
                        <Typography sx={{ fontSize: "14px", color: "#6b7280", mb: 2 }}>
                            Chauffeurs will cover E-challan, but if the customer requests the driver to exceed speed limits, the E-challan expenses will be borne by the customer
                        </Typography>

                        <Typography sx={{ fontWeight: 700, color: "#023669", fontSize: "14px" }}>Rental Duration</Typography>
                        <Typography sx={{ fontSize: "14px", color: "#6b7280", mb: 2 }}>
                            The chauffeur-driven rental period, exclusively for intra-city rides, spans 12 hours per day, starting from the booked time. For example, if a customer reserves a ride at 9 AM to 9 PM or 7 AM to 7 PM, the rental will be available until 12 AM. Similarly, if a reservation is made at 4 PM, the rental will also extend until 12 AM. The rental fee covers a chauffeur-driven car but excludes fuel, parking charges, etc.
                        </Typography>

                        <Typography sx={{ fontWeight: 700, color: "#023669", fontSize: "14px" }}>Chauffeur Rest & Meal (Intra & Intercity Rides)</Typography>
                        <Typography sx={{ fontSize: "14px", color: "#6b7280", mb: 2 }}>
                            Chauffeurs require breaks for lunch, dinner, and a minimum consecutive eight-hour break within a 24-hour duty cycle for safety reasons. Please be advised: Customers are kindly requested to provide meals for the driver during intra-city rides. In the event of oversight, a convenient alternative is available - simply pay PKR 500. Your understanding is valued for a seamless and enjoyable journey
                        </Typography>

                        <Typography sx={{ fontWeight: 700, color: "#023669", fontSize: "14px" }}>Complaints and Conduct</Typography>
                        <Typography sx={{ fontSize: "14px", color: "#6b7280", mb: 2 }}>
                            Customers reserve the right to file complaints against the driver, service, or vehicle. However, direct reprimanding of the chauffeur or coercing the driver to violate company policies is strictly prohibited
                        </Typography>

                        <Typography sx={{ fontWeight: 700, color: "#023669", fontSize: "14px" }}>Geographical Restrictions</Typography>
                        <Typography sx={{ fontSize: "14px", color: "#6b7280", mb: 2 }}>
                            Vehicles are permitted for use only on the Pakistan mainland. FATA and Northern Areas are excluded
                        </Typography>

                        <Typography sx={{ fontWeight: 700, color: "#023669", fontSize: "14px" }}>Additional Charges</Typography>
                        <Typography sx={{ fontSize: "14px", color: "#6b7280", mb: 2 }}>
                            Toll taxes, parking fees, and any other incidental charges are the responsibility of the renting party.
                        </Typography>

                         <Typography sx={{ fontWeight: 700, color: "#023669", fontSize: "14px" }}>Intercity Drop-off</Typography>
                        <Typography sx={{ fontSize: "14px", color: "#6b7280", mb: 2 }}>
                            For intercity drop-offs, clients will be charged for the return fuel as well. By using our services, you agree to comply with these terms and conditions. If you have any questions, please contact us at care@bookkaru.com we appreciate your cooperation and hope you enjoy a safe and comfortable journey with us
                        </Typography>
                    </Box>
                </Box>
            </Collapse>
        </Box>

        <Box>
            <FormControlLabel 
                control={<Checkbox sx={{ color: "#00000094", '&.Mui-checked': { color: "#023669" } }} />} 
                label={<Typography sx={{ fontSize: "14px", fontWeight: 600, color: "#023669" }}>I understand and agree with the term & conditions</Typography>} 
            />
        </Box>

  </Paper>
        <Box sx={{ p: 3, borderRadius: 2 , border: "1px solid #e5e7eb", backgroundColor: "white", mb : 2}}>
            <FormControlLabel 
                control={
                    <Checkbox 
                        checked={showReservationDetails}
                        onChange={(e) => setShowReservationDetails(e.target.checked)}
                        sx={{ color: "#00000094", '&.Mui-checked': { color: "#023669" } }} 
                    />
                } 
                label={<Typography sx={{ fontSize: "16px", fontWeight: 500, color: "#023669" }}>I want to send reservation details to following number.</Typography>} 
            />

            {showReservationDetails && (
                <Grid container spacing={2} sx={{ mt: 1 }}>
                     <Grid item xs={12} md={6} width={{xs:"100%",sm:"48%", md:"49%"}}>
                        <Typography sx={{ fontSize: "14px", fontWeight: 600, color: "#023669", mb: 1 }}>Email <span style={{color: "red"}}>*</span></Typography>
                        <TextField fullWidth size="small" placeholder="email@example.com" sx={{ "& .MuiOutlinedInput-root": { borderRadius: "6px" }, "& .MuiOutlinedInput-notchedOutline": { borderColor: "black" } }} />
                    </Grid>
                    <Grid item xs={12} md={6} width={{xs:"100%", sm:"49%", md:"49%"}}>
                         <Typography sx={{ fontSize: "14px", fontWeight: 600, color: "#023669", mb: 1 }}>Phone Number <span style={{color: "red"}}>*</span></Typography>
                        <Box sx={{ display: "flex"}}>
                             <Select size="small" defaultValue="+92" sx={{ width: "80px", bgcolor: "white", "& .MuiOutlinedInput-notchedOutline": { display: "block", borderRadius: "6px 0 0 6px", borderColor: "black", borderRight: 0 } }}>
                                <MenuItem value="+92">🇵🇰</MenuItem>
                             </Select>
                            <TextField fullWidth size="small" placeholder="Phone Number" sx={{ "& .MuiOutlinedInput-root": { borderRadius: "0 6px 6px 0" }, "& .MuiOutlinedInput-notchedOutline": { borderColor: "black" } }} />
                        </Box>
                    </Grid>
                </Grid>
            )}
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 8 }}>
            <Button variant="contained" onClick={() => setShowPayment(true)} sx={{ bgcolor: "#023669", py: 1.5, px: 4, fontWeight: 700 }}>
                CONTINUE
            </Button>
        </Box>
        </>
        ) : (
          /* Payment Section */
          <Box >
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
              <Typography sx={{ fontSize: "14px", color: "#6b7280" }}>
                Finish Booking in <Box component="span" sx={{ color: "#023669", fontWeight: 700 }}>{formatTime(timeLeft)}</Box>
              </Typography>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} md={8} width={{xs:"100%", md:"65%"}}>
                <Paper sx={{ p: 3, borderRadius: 2, minHeight: "400px" }}>
                  <Typography sx={{ fontWeight: 700, color: "#023669", fontSize: "20px", mb: 3 }}>
                    Payment Option
                  </Typography>
                  <RadioGroup
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    {[
                      { 
                        value: "jazzcash", 
                        label: "JazzCash", 
                        icon: <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, width: 45, height: 35 }}>
                            <Box sx={{ width: 24, height: 24, bgcolor: "#E31D2D", borderRadius: "50%" }} />
                            <Box sx={{ width: 20, height: 20, bgcolor: "#FFD400", borderRadius: "50%", ml: -1.5 }} />
                          </Box>
                      },
                      { 
                        value: "easypaisa", 
                        label: "Easypaisa", 
                        icon: <Box sx={{ width: 45, height: 35, display: "flex", alignItems: "center" }}>
                            <Box component="img" src="/easypaisa_logo.png" sx={{ width: 35, height: 35, objectFit: "contain" }} />
                          </Box>
                      },
                      { 
                        value: "wallet", 
                        label: "Wallet (Rs. 0)", 
                        icon: <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, width: 45, height: 35 }}>
                            <Box sx={{ width: 35, height: 22, bgcolor: "#F58220", borderRadius: "4px", position: "relative" }}>
                              <Box sx={{ width: 8, height: 8, bgcolor: "white", borderRadius: "50%", position: "absolute", right: 4, top: 7 }} />
                            </Box>
                          </Box>
                      },
                      { 
                        value: "card", 
                        label: "Credit / Debit Card", 
                        icon: <Box sx={{ display: "flex", width: 45, height: 35, alignItems: "center" }}>
                            <Box sx={{ width: 40, height: 25, bgcolor: "#1A1918", borderRadius: "4px", p: 0.5, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                              <Box sx={{ display: "flex", gap: -1 }}>
                                <Box sx={{ width: 10, height: 10, bgcolor: "#EB001B", borderRadius: "50%" }} />
                                <Box sx={{ width: 10, height: 10, bgcolor: "#F79E1B", borderRadius: "50%", ml: -0.8, opacity: 0.8 }} />
                              </Box>
                            </Box>
                          </Box>
                      },
                    ].map((option) => (
                      <Box
                        key={option.value}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mb: 3,
                          cursor: "pointer",
                        }}
                        onClick={() => setPaymentMethod(option.value)}
                      >
                        <Radio
                          value={option.value}
                          sx={{
                            p: 0,
                            mr: 2,
                            color: "#023669",
                            "&.Mui-checked": { color: "#023669" },
                          }}
                        />
                        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                           {option.icon}
                           <Typography sx={{ fontWeight: 600, color: "#023669", fontSize: "16px" }}>
                            {option.label}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </RadioGroup>
                </Paper>
              </Grid>

              <Grid item xs={12} md={4} width={{xs:"100%", md:"33%"}}>
                <Paper sx={{ p: 3, borderRadius: 2 }}>
                  <Typography sx={{ fontWeight: 700, color: "#023669", fontSize: "20px", mb: 3 }}>
                    Price Summary
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                    <Typography sx={{ fontSize: "16px", color: "#023669", fontWeight: 500 }}>#PNR:</Typography>
                    <Typography sx={{ fontSize: "16px", color: "#023669", fontWeight: 500 }}>226021429758</Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
                    <Typography sx={{ fontSize: "16px", color: "#023669" }}>Price you Pay:</Typography>
                    <Typography sx={{ fontSize: "20px", fontWeight: 600, color: "#023669" }}>
                      RS. {selectedCar.price.toLocaleString()}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
            
            <Box sx={{ mt: 3 }} width={{xs:"100%", md:"100%", lg:"65%"}}>
                <Button 
                    fullWidth 
                    variant="contained" 
                    sx={{ 
                        bgcolor: "#023669", 
                        py: 1, 
                        fontWeight: 500, 
                        fontSize: "14px",
                        borderRadius: "8px",
                        "&:hover": { bgcolor: "#002b55" }
                    }}
                >
                    PAY NOW (RS. {selectedCar.price.toLocaleString()})
                </Button>
            </Box>
          </Box>
        )}
      </Box>

      {/* Booking Timeout Modal */}
      <Dialog 
        open={showTimeoutModal} 
        onClose={() => {}} 
        maxWidth="xs" 
        fullWidth
        PaperProps={{
          sx: { borderRadius: "12px", p: 2 }
        }}
      >
        <DialogContent sx={{ textAlign: "center", py: 4 }}>
          <Box sx={{ 
            width: 100, 
            height: 100, 
            borderRadius: "50%", 
            border: "4px solid #F87171", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            mx: "auto",
            mb: 3
          }}>
            <CloseIcon sx={{ fontSize: 60, color: "#F87171" }} />
          </Box>
          
          <Typography sx={{ fontSize: "32px", fontWeight: 600, color: "#4B5563", mb: 1 }}>
            Booking Timeout
          </Typography>
          
          <Typography sx={{ fontSize: "18px", color: "#6B7280", mb: 4 }}>
            Your booking has timed out. Please try again.
          </Typography>
          
          <Button 
            variant="contained" 
            onClick={() => router.push('/')}
            sx={{ 
              bgcolor: "#023669", 
              color: "white",
              py: 1.5, 
              px: 4,
              fontSize: "18px",
              fontWeight: 700,
              textTransform: "none",
              borderRadius: "8px",
              "&:hover": { bgcolor: "#002b55" }
            }}
          >
            Go to Home
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
