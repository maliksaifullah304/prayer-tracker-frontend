import '@/styles/globals.css';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {createTheme, ThemeProvider} from '@mui/material';
import SideBar from '../components/sidebar';
import AuthGuard from '@/components/authGuard';

export default function App({Component, pageProps: {session, ...pageProps}}) {
  const theme = createTheme();
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
