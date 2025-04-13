import {Card, CardContent, CardMedia, Grid, Typography} from '@mui/material';

export default function NamazImportanceCard({title, description, imgSrc}) {
  return (
    <Grid item xs={12} md={4}>
      <Card sx={{height: '100%'}}>
        <CardMedia component="img" height="200" image={imgSrc} alt={title} />
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2">{description}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
