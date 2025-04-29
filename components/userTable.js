import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Button} from '@mui/material';
import apiInstance from '@/lib/http';
import {useEffect, useState} from 'react';
import {toast} from 'react-toastify';

export default function UserTable() {
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const {data} = await apiInstance.get('auth/users');
      setUsers(data.data.users);
    } catch (error) {
      toast(error?.response?.data?.message, {type: 'error'});
    }
  };

  const deActivateUser = async (user) => {
    try {
      await apiInstance.patch(`auth/deactivate/${user._id}`);
      getAllUsers();
    } catch (error) {
      toast(error?.response?.data?.message, {type: 'error'});
    }
  };

  const activateUser = async (user) => {
    try {
      await apiInstance.patch(`auth/activate/${user._id}`);
      getAllUsers();
    } catch (error) {
      toast(error?.response?.data?.message, {type: 'error'});
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <TableContainer component={Paper}>
      <Table sx={{minWidth: 650}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{width: '20%'}}>
              Name
            </TableCell>
            <TableCell align="center" sx={{width: '20%'}}>
              Email
            </TableCell>
            <TableCell align="center" sx={{width: '40%'}}>
              Address
            </TableCell>
            <TableCell align="center" sx={{width: '40%'}}>
              Total Prayers
            </TableCell>
            <TableCell align="center" sx={{width: '40%'}}>
              Missed Prayers
            </TableCell>
            <TableCell align="center" sx={{width: '20%'}}>
              Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user._id}
              sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >
              <TableCell component="th" scope="row" align="center">
                {user.name}
              </TableCell>
              <TableCell align="right">{user.email}</TableCell>
              <TableCell align="center">{user.address}</TableCell>
              <TableCell align="center">{user.totalOfferPrayers}</TableCell>
              <TableCell align="center">{user.totalMissedPrayers}</TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  color={user.isActive ? 'secondary' : 'primary'}
                  onClick={() =>
                    user.isActive ? deActivateUser(user) : activateUser(user)
                  }
                >
                  {user.isActive ? 'Deactivate' : 'Activate'}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
