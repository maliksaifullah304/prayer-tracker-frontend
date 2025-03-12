import { Box, dividerClasses, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";

export default function OfferPrayerImg() {
  return (
    <Stack
      sx={{ display: { xs: "none", md: "flex" } }}
      alignItems={"center"}
      width={"50%"}
      pb={9}
    >
      <Image alt="" width={600} height={700} src={"/Prayer3.jpg"} />
    </Stack>
  );
}
