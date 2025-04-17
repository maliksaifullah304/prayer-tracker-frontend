import Image from 'next/image';
import {Inter} from 'next/font/google';
import {Box, Card, Container, Grid, Paper, Typography} from '@mui/material';
import Footer from '../components/footer';
import NamazImportanceCard from '@/components/namazImportanceCard';
import {namazImportanceData} from '@/constants/namaz';
import Button from '@mui/material/Link';

const inter = Inter({subsets: ['latin']});

export default function Home() {
  return (
    <Box className={inter.className}>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h3" component="h1" gutterBottom>
            The Prayer Tracker
          </Typography>
          <Typography variant="h6">
            The Prayer Tracker App is a web-based platform designed to help
            users consistently track and manage their daily prayers. With
            features for logging prayer times, viewing prayer history, and
            monitoring progress, the app encourages spiritual discipline.
          </Typography>

          <Box sx={{mt: 4, textAlign: 'center'}}>
            <Button
              variant="contained"
              color="primary" // Changed to primary (or keep secondary if preferred)
              size="large"
              href="/register"
              sx={{
                px: 5, // Increased horizontal padding
                py: 2, // Increased vertical padding
                fontSize: '1.2rem', // Slightly larger font
                fontWeight: 'bold',
                borderRadius: '12px', // More rounded corners
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)', // Softer shadow
                textTransform: 'none', // Prevents uppercase transformation
                '&:hover': {
                  transform: 'translateY(-3px)', // More pronounced lift
                  boxShadow: '0 8px 16px rgba(0,0,0,0.3)', // Stronger shadow on hover
                  backgroundColor: 'primary.dark', // Darker shade on hover (adjust if using secondary)
                },
                color: 'white',
                transition: 'all 0.3s ease-in-out', // Smoother transition
              }}
            >
              Get Started
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{py: 6}}>
        {/* Introduction */}
        <Grid container spacing={4} alignItems="center" sx={{mb: 6}}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h2" gutterBottom>
              What is Prayer (Namaz)?
            </Typography>
            <Typography variant="body1" paragraph>
              Namaz, also known as Salah, is the obligatory Muslim prayer
              performed five times each day. It is the second of the five
              pillars of Islam and is a direct link between the worshipper and
              Allah.
            </Typography>
            <Typography variant="body1" paragraph>
              The five daily prayers are: Fajr (dawn), Dhuhr (noon), Asr
              (afternoon), Maghrib (sunset), and Isha (night). Each prayer has a
              specific time window in which it must be performed.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{overflow: 'hidden', borderRadius: 2}}>
              <Image
                src="/baJamatNamaz.png"
                alt="Muslims praying in congregation"
                width={600}
                height={400}
                style={{width: '100%', height: 'auto'}}
              />
            </Paper>
          </Grid>
        </Grid>

        {/* Importance of Namaz */}
        <Typography variant="h4" component="h2" gutterBottom sx={{mt: 6}}>
          The Importance of Namaz in Islam
        </Typography>

        <Grid container spacing={3} sx={{mb: 6}}>
          {namazImportanceData.map(({description, imgSrc, title}, index) => (
            <NamazImportanceCard
              key={index}
              description={description}
              imgSrc={imgSrc}
              title={title}
            />
          ))}
        </Grid>

        {/* Hadith Section */}
        <Paper
          sx={{
            p: 4,
            bgcolor: 'primary.light',
            color: 'primary.contrastText',
            mb: 6,
          }}
        >
          <Typography variant="h4" component="h2" gutterBottom>
            Hadith on Prayer
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card
                sx={{bgcolor: 'rgba(255,255,255,0.9)', p: 3, height: '100%'}}
              >
                <Typography variant="h6" gutterBottom color="primary.main">
                  Hadith 1
                </Typography>
                <Typography variant="body1">
                  "The first matter that the slave will be brought to account
                  for on the Day of Judgment is the prayer. If it is sound, then
                  the rest of his deeds will be sound. And if it is bad, then
                  the rest of his deeds will be bad."
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{mt: 2, fontStyle: 'italic'}}
                >
                  - Reported by Al-Tabarani
                </Typography>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card
                sx={{bgcolor: 'rgba(255,255,255,0.9)', p: 3, height: '100%'}}
              >
                <Typography variant="h6" gutterBottom color="primary.main">
                  Hadith 2
                </Typography>
                <Typography variant="body1">
                  "The key to Paradise is prayer; the key to prayer is wudu
                  (ablution)."
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{mt: 2, fontStyle: 'italic'}}
                >
                  - Reported by Ahmad
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Paper>

        {/* Video Section */}
        <Typography variant="h4" component="h2" gutterBottom sx={{mt: 6}}>
          Learn More About Namaz
        </Typography>

        <Box sx={{position: 'relative', width: '100%', pb: '56.25%', mb: 6}}>
          <Box
            component="iframe"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 0,
            }}
            src="https://www.youtube.com/embed/qaMz7eGmq-s?si=jbmwEmHN6pcbQLBN"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </Box>
      </Container>

      {/* Footer */}
      <Footer />
    </Box>
  );
}
