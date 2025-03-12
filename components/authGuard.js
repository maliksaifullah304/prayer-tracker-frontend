'use client';
import {usePathname, useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const allowedRoutes = ['/dashboard', '/prayers'];

// Helper function to normalize paths
const normalizePath = (path) => {
  return path.endsWith('/') ? path.slice(0, -1) : path;
};

export default function AuthGuard({children}) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const normalizedPathname = normalizePath(pathname);
      const isAllowedRoute = allowedRoutes.includes(normalizedPathname);

      if (!user && isAllowedRoute) {
        router.push('/login');
      } else if (user) {
        const isAdmin = user.role === 'admin';

        // Redirect user if they try to access /dashboard
        if (!isAdmin && normalizedPathname === '/dashboard') {
          router.push('/prayers');
        }

        // Redirect admin if they try to access /prayers
        if (isAdmin && normalizedPathname === '/prayers') {
          router.push('/dashboard');
        }

        // Handle login page redirection
        if (normalizedPathname === '/login') {
          isAdmin ? router.push('/dashboard') : router.push('/prayers');
        }
      }
    }
  }, [user, pathname, isLoading]);

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return children;
}
