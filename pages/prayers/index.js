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
  Modal,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import apiInstance from '@/lib/http';
import {toast} from 'react-toastify';

const PrayerTable = () => {
  const [prayerData, setPrayerData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [currentPrayer, setCurrentPrayer] = useState(null);

  const getPrayers = async () => {
    setLoading(true);
    try {
      const {data} = await apiInstance.get('prayer');
      setPrayerData(data.prayers.prayers);
    } catch (error) {
      toast.error('Failed to fetch prayer data!');
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
                  {prayer.prayerStatus.map((status, idx) => (
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
