import Image from "next/image";
import { Inter } from "next/font/google";
import { Button, Typography } from "@mui/material";
import { useState } from "react";
import Footer from "../components/footer";

const inter = Inter({ subsets: ["latin"] });

export default function Home({}) {
  const [data, setData] = useState(0);

  return (
    <main>
      <h1>{data}</h1>
      <Button
        onClick={() => setData(data + 1)}
        sx={{
          textTransform: "none",
        }}
      >
        incrment
      </Button>
      <Button
        onClick={() => setData(data - 1)}
        sx={{
          textTransform: "none",
        }}
      >
        dec
      </Button>
      <Footer firstname={"saifullah"} lastname={"malik"} />
    </main>
  );
}
