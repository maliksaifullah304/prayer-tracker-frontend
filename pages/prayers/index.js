import React, {useState, useEffect} from 'react';
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
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  FormControlLabel,
} from '@mui/material';
import apiInstance from '@/lib/http';
import {toast} from 'react-toastify';

const PrayerTable = () => {
  const [prayerData, setPrayerData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [currentPrayer, setCurrentPrayer] = useState(null);
  const [showQazaOnly, setShowQazaOnly] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [lastDayReport, setLastDayReport] = useState(null);

  const getPrayers = async () => {
    setLoading(true);
    try {
      const {data} = await apiInstance.get('prayer');
      setPrayerData(data.prayers.prayers);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (prayerDate, prayerStatus) => {
    setCurrentPrayer({
      date: prayerDate,
      ...prayerStatus,
    });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentPrayer(null);
  };

  const updatePrayerStatus = async (newStatus) => {
    try {
      await apiInstance.patch('prayer/status', {
        date: new Date(currentPrayer.date).toISOString(),
        prayerName: currentPrayer.prayerName,
        status: newStatus,
      });
      await getPrayers();
      toast.success('Prayer status updated successfully!');
      handleCloseModal();
    } catch (error) {
      toast.error('Failed to update prayer status!');
    }
  };

  useEffect(() => {
    getPrayers();
  }, []);

  const getYesterday = () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    date.setHours(0, 0, 0, 0);
    return date;
  };

  const generateLastDayReport = () => {
    if (!prayerData) return;

    const yesterday = getYesterday();

    const yesterdayPrayers = prayerData.prayers.find((prayer) => {
      const prayerDate = new Date(prayer.date);
      return (
        prayerDate.getDate() === yesterday.getDate() &&
        prayerDate.getMonth() === yesterday.getMonth() &&
        prayerDate.getFullYear() === yesterday.getFullYear()
      );
    });

    if (yesterdayPrayers) {
      setLastDayReport({
        date: yesterday.toLocaleDateString(),
        prayers: yesterdayPrayers.prayerStatus,
      });
    } else {
      setLastDayReport({
        date: yesterday.toLocaleDateString(),
        prayers: [],
      });
    }

    setReportOpen(true);
  };

  const handleCloseReport = () => {
    setReportOpen(false);
    setLastDayReport(null);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{p: 2}}>
      <Typography variant="h4" gutterBottom>
        Prayer Status
      </Typography>

      {/* Filters and Report Button */}
      <Box display="flex" alignItems="center" mb={2} gap={2}>
        <FormControlLabel
          control={
            <Switch
              checked={showQazaOnly}
              onChange={(e) => setShowQazaOnly(e.target.checked)}
              color="primary"
            />
          }
          label="Show Qaza (Missed) Only"
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={generateLastDayReport}
        >
          View Last Day Report
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Prayer Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {prayerData ? (
              prayerData.prayers.map((prayer, index) => (
                <React.Fragment key={index}>
                  {prayer.prayerStatus
                    .filter((status) =>
                      showQazaOnly ? status.status === 'Missed' : true
                    )
                    .map((status, idx) => (
                      <TableRow key={`${index}-${idx}`}>
                        <TableCell>
                          {new Date(prayer.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{status.prayerName}</TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              color:
                                status.status === 'OFFERED' ? 'green' : 'red',
                              fontWeight: 'bold',
                            }}
                          >
                            {status.status}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            onClick={() => handleOpenModal(prayer.date, status)}
                          >
                            Update Status
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No prayer data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Last Day Report Dialog */}
      <Dialog open={reportOpen} onClose={handleCloseReport}>
        <DialogTitle>Last Day Report</DialogTitle>
        <DialogContent>
          {lastDayReport ? (
            <Box sx={{p: 2}}>
              <Typography variant="h6" gutterBottom>
                Date: {lastDayReport.date}
              </Typography>
              {lastDayReport.prayers.length > 0 ? (
                lastDayReport.prayers.map((prayer, index) => (
                  <Box
                    key={index}
                    display="flex"
                    justifyContent="space-between"
                    mb={1}
                  >
                    <Typography>{prayer.prayerName}</Typography>
                    <Typography
                      sx={{
                        color: prayer.status === 'OFFERED' ? 'green' : 'red',
                        fontWeight: 'bold',
                      }}
                    >
                      {prayer.status}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography>No prayers found for the last day.</Typography>
              )}
            </Box>
          ) : (
            <Typography>No prayers found for the last day.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReport}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Update Status Dialog */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Update Prayer Status</DialogTitle>
        <DialogContent>
          {currentPrayer && (
            <Box sx={{p: 2}}>
              <Typography variant="h6" gutterBottom>
                {currentPrayer.prayerName} -{' '}
                {new Date(currentPrayer.date).toLocaleDateString()}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Current Status: <strong>{currentPrayer.status}</strong>
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          {currentPrayer?.status === 'Offer' ? (
            <Button
              variant="contained"
              color="error"
              onClick={() => updatePrayerStatus('Missed')}
            >
              Mark as Missed
            </Button>
          ) : (
            <Button
              variant="contained"
              color="success"
              onClick={() => updatePrayerStatus('Offer')}
            >
              Mark as Offered
            </Button>
          )}
          <Button onClick={handleCloseModal}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PrayerTable;
