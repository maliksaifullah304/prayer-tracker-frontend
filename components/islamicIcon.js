import { Box, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";

export default function IslamicIcon() {
  return (
    <Stack>
      <Box>
        <Grid py={3.5} align="center">
          <Image src={"/islamic.png"} alt="" height={60} width={60} />
          <Typography fontWeight={700} variant="h4">
            Prayer Tracker
          </Typography>
        </Grid>
      </Box>
    </Stack>
  );
}
