import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
} from '@mui/material';
import {generateMockPrayers} from '@/lib/prayer';

const PrayerTable = () => {
  const mockPrayers = generateMockPrayers();

  return (
    <TableContainer component={Paper}>
      <Typography variant="h4" gutterBottom>
        Prayer Status
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Prayer Name</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mockPrayers.map((prayer, index) => (
            <React.Fragment key={index}>
              {prayer.prayerStatus.map((status, idx) => (
                <TableRow key={idx}>
                  <TableCell>{prayer.date.toLocaleDateString()}</TableCell>
                  <TableCell>{status.prayerName}</TableCell>
                  <TableCell>
                    <Box display="flex" gap={1}>
                      <Button
                        variant={
                          status.status === 'offered' ? 'contained' : 'outlined'
                        }
                        color="success"
                      >
                        Offered
                      </Button>
                      <Button
                        variant={
                          status.status === 'missed' ? 'contained' : 'outlined'
                        }
                        color="error"
                      >
                        Missed
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PrayerTable;
