"use client";

import { useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  TextField,
} from "@mui/material";

const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

export default function Prayers() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [prayerStatus, setPrayerStatus] = useState(
    prayers.reduce((acc, prayer) => ({ ...acc, [prayer]: "offered" }), {})
  );

  const handleStatusChange = (prayer, status) => {
    setPrayerStatus((prev) => ({ ...prev, [prayer]: status }));
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom align="center">
        Prayer Tracker
      </Typography>
      <Box display="flex" justifyContent="center" mb={2}>
        <TextField
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          label="Select Date"
          InputLabelProps={{ shrink: true }}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Prayer</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {prayers.map((prayer) => (
              <TableRow key={prayer}>
                <TableCell>{prayer}</TableCell>
                <TableCell>
                  <Box display="flex" gap={1}>
                    <Button
                      variant={
                        prayerStatus[prayer] === "offered"
                          ? "contained"
                          : "outlined"
                      }
                      color="success"
                      onClick={() => handleStatusChange(prayer, "offered")}
                    >
                      Offered
                    </Button>
                    <Button
                      variant={
                        prayerStatus[prayer] === "missed"
                          ? "contained"
                          : "outlined"
                      }
                      color="error"
                      onClick={() => handleStatusChange(prayer, "missed")}
                    >
                      Missed
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
