import {Box, Container, Divider, Grid, Typography, Link} from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{bgcolor: 'primary.dark', color: 'white', py: 6, mt: 'auto'}}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2">
              We are dedicated to spreading knowledge about Islamic practices
              and helping Muslims strengthen their faith through education and
              resources.
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box component="ul" sx={{pl: 0, listStyle: 'none'}}>
              <Box component="li" sx={{mb: 1}}>
                <Link href="#" color="inherit" underline="hover">
                  Prayer Times
                </Link>
              </Box>
              <Box component="li" sx={{mb: 1}}>
                <Link href="#" color="inherit" underline="hover">
                  Qibla Direction
                </Link>
              </Box>
              <Box component="li" sx={{mb: 1}}>
                <Link href="#" color="inherit" underline="hover">
                  Islamic Calendar
                </Link>
              </Box>
              <Box component="li" sx={{mb: 1}}>
                <Link href="#" color="inherit" underline="hover">
                  Learn Quran
                </Link>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body2" paragraph>
              Email: maliksaifullah304@gmail.com
            </Typography>
            <Typography variant="body2">Phone: +92 307 1149035</Typography>
          </Grid>
        </Grid>

        <Divider sx={{my: 3, bgcolor: 'rgba(255,255,255,0.2)'}} />

        <Typography variant="body2" align="center">
          © {new Date().getFullYear()} Created by Saifullah. All rights
          reserved.
        </Typography>
      </Container>
    </Box>
  );
}
