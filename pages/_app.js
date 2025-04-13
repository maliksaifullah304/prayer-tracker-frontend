import '@/styles/globals.css';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {createTheme, ThemeProvider} from '@mui/material';
import SideBar from '../components/sidebar';
import AuthGuard from '@/components/authGuard';
import {Inter} from 'next/font/google';

const inter = Inter({subsets: ['latin']});

const theme = createTheme({
  palette: {
    primary: {
      main: '#1E5631', // Islamic green
      light: '#4CAF50',
      dark: '#0A3D12',
    },
    secondary: {
      main: '#D4AF37', // Gold
    },
    background: {
      default: '#F8F8F8',
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

export default function App({Component, pageProps: {session, ...pageProps}}) {
  return (
    <>
      <AuthGuard>
        <SideBar>
          <Component {...pageProps} />
        </SideBar>
      </AuthGuard>
      <ThemeProvider theme={theme} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
