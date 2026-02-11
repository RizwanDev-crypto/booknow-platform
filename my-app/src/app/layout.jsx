import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import { Box } from '@mui/material';
import "./globals.css";
import { GlobalProvider } from './context/GlobalContext';
import Providers from './Providers';
import LayoutWrapper from '@/components/LayoutWrapper';

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
              <LayoutWrapper>
                {children}
              </LayoutWrapper>
            </ThemeRegistry>
          </Providers>
        </GlobalProvider>
      </body>
    </html>
  );
}
