'use client';
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {toast} from 'react-toastify';
import * as yup from 'yup';
import apiInstance from '@/lib/http';

// Helper function to extract YouTube video ID from URL
const getYouTubeId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url?.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

const guidanceSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  youtubeLink: yup
    .string()
    .url('Must be a valid YouTube URL')
    .nullable()
    .notRequired(),
});

const GuidancePage = () => {
  const [guidances, setGuidances] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editingGuidance, setEditingGuidance] = useState(null);
  const [user, setUser] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [guidanceToDelete, setGuidanceToDelete] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(guidanceSchema),
  });

  const fetchGuidances = async () => {
    try {
      const res = await apiInstance.get('guidance');
      setGuidances(res.data.data);
    } catch (error) {}
  };

  const onSubmit = async (data) => {
    try {
      if (editingGuidance) {
        // Update
        await apiInstance.patch(`guidance/${editingGuidance._id}`, data);
        toast('Guidance updated successfully!', {
          type: 'success',
          autoClose: 2000,
        });
      } else {
        // Create
        await apiInstance.post('guidance', data);
        toast('Guidance added successfully!', {
          type: 'success',
          autoClose: 2000,
        });
      }
      setOpenModal(false);
      reset();
      setEditingGuidance(null);
      fetchGuidances();
    } catch (error) {
      toast(error?.response?.data?.message || 'Something went wrong', {
        type: 'error',
      });
    }
  };

  const handleEdit = (guidance) => {
    setEditingGuidance(guidance);
    setValue('title', guidance.title);
    setValue('description', guidance.description);
    setValue('youtubeLink', guidance.youtubeLink || '');
    setOpenModal(true);
  };

  const handleDeleteClick = (guidance) => {
    setGuidanceToDelete(guidance);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!guidanceToDelete) return;
    try {
      await apiInstance.delete(`guidance/${guidanceToDelete._id}`);
      toast('Guidance deleted successfully!', {type: 'success'});
      setDeleteDialogOpen(false);
      setGuidanceToDelete(null);
      fetchGuidances();
    } catch (error) {
      toast('Failed to delete guidance', {type: 'error'});
      setDeleteDialogOpen(false);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditingGuidance(null);
    reset();
  };

  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
    fetchGuidances();
  }, []);

  return (
    <Stack spacing={4} mt={5} px={2}>
      <Typography variant="h4" textAlign="center">
        Manage Prayer Guidance
      </Typography>

      {isAdmin && (
        <Box textAlign="center">
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenModal(true)}
          >
            Add New Guidance
          </Button>
        </Box>
      )}

      {/* Table to Show All Guidance */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>YouTube Video</TableCell>
              {isAdmin && <TableCell align="center">Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {guidances.map((item) => {
              const videoId = getYouTubeId(item.youtubeLink);
              return (
                <TableRow key={item._id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>
                    {videoId ? (
                      <Box
                        sx={{
                          width: '100%',
                          maxWidth: 300,
                          height: 169,
                          position: 'relative',
                          overflow: 'hidden',
                        }}
                      >
                        <iframe
                          width="100%"
                          height="100%"
                          src={`https://www.youtube.com/embed/${videoId}`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title={item.title}
                        />
                      </Box>
                    ) : (
                      'No Video Available'
                    )}
                  </TableCell>

                  {isAdmin && (
                    <TableCell align="center">
                      <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="center"
                      >
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleEdit(item)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          color="error"
                          onClick={() => handleDeleteClick(item)}
                        >
                          Delete
                        </Button>
                      </Stack>
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for Add / Edit */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: {xs: '90%', md: 500},
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography id="modal-title" variant="h6" mb={3}>
            {editingGuidance ? 'Update Guidance' : 'Add New Guidance'}
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <TextField
                label="Title"
                {...register('title')}
                error={!!errors.title}
                helperText={errors.title?.message}
                fullWidth
              />
              <TextField
                label="Description"
                {...register('description')}
                error={!!errors.description}
                helperText={errors.description?.message}
                multiline
                rows={3}
                fullWidth
              />
              <TextField
                label="YouTube Link (Optional)"
                {...register('youtubeLink')}
                error={!!errors.youtubeLink}
                helperText={errors.youtubeLink?.message}
                fullWidth
                placeholder="https://www.youtube.com/watch?v=..."
              />

              <Button type="submit" variant="contained" color="primary">
                {editingGuidance ? 'Update' : 'Create'}
              </Button>
            </Stack>
          </form>
        </Box>
      </Modal>

      {/* Confirm Delete Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Guidance</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete "{guidanceToDelete?.title}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button color="error" onClick={confirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default GuidancePage;
