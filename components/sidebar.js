import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {useEffect, useState} from 'react';
import {usePathname} from 'next/navigation';
import {Button, Link} from '@mui/material';
import apiInstance from '@/lib/http';
import {toast} from 'react-toastify';

const drawerWidth = 240;

function SideBar({children}) {
  const [user, setUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  // Define allowed routes based on user role
  const allowedRoutes =
    user?.role === 'admin'
      ? [
          {name: 'Dashboard', path: '/dashboard'},
          {name: 'Guidance', path: '/guidance'},
        ]
      : user?.role === 'user'
      ? [
          {name: 'Prayers', path: '/prayers'},
          {name: 'Guidance', path: '/guidance'},
        ]
      : [];

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {allowedRoutes.map((route, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <Link href={route.path}>{route.name}</Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const logout = async () => {
    try {
      const {data} = await apiInstance.post('auth/logout');
      toast(data?.message, {type: 'success'});
      localStorage.removeItem('user');
      window.location.reload();
    } catch (error) {
      toast('Logout failed', {type: 'error'});
    }
  };

  const pathname = usePathname();
  const isDashBoardRoute =
    pathname === '/dashboard' || pathname === '/guidance';
  const isPrayersRoute = pathname === '/prayers' || pathname === '/guidance';
  return isDashBoardRoute || isPrayersRoute ? (
    <Box sx={{display: 'flex'}}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: {sm: `calc(100% - ${drawerWidth}px)`},
          ml: {sm: `${drawerWidth}px`},
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{mr: 2, display: {sm: 'none'}}}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Prayer Tracker
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}}}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          sx={{
            display: {xs: 'block', sm: 'none'},
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          slotProps={{
            root: {
              keepMounted: true,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: {xs: 'none', sm: 'block'},
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}

          <Button
            onClick={logout}
            variant="contained"
            sx={{
              backgroundColor: '#d32f2f', // Dark red
              '&:hover': {
                backgroundColor: '#b71c1c', // Darker red on hover
              },
            }}
          >
            Logout
          </Button>
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: {sm: `calc(100% - ${drawerWidth}px)`},
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  ) : (
    children
  );
}

export default SideBar;
