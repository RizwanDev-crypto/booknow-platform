import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { Box } from '@mui/material';
import "./globals.css";
import { GlobalProvider } from './context/GlobalContext';
import Providers from './Providers';

export const metadata = {
  title: "BookNow.co - Travel Tech Partner",
  description: "Your trusted travel partner for unforgettable journeys.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GlobalProvider>
          <Providers>
            <ThemeRegistry>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '100vh',
                }}
              >
                <Header />
                <Box component="main" sx={{ flexGrow: 1, pt: '64px' }}>
                  {children}
                </Box>
                <Footer />
              </Box>
            </ThemeRegistry>
          </Providers>
        </GlobalProvider>
      </body>
    </html>
  );
}
