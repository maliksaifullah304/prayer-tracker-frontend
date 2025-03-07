import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createTheme, ThemeProvider } from "@mui/material";
import SideBar from "../components/sidebar";
import Footer from "@/components/footer";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const theme = createTheme();
  return (
    <>
      <SideBar>
        <Component {...pageProps} />
      </SideBar>
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

      <Footer />
    </>
  );
}
