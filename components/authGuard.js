'use client';
import {usePathname, useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function AuthGuard({children}) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    setUser(storedUser);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (!user && pathname.includes('/dashboard')) {
        router.push('/login');
      } else if (user && pathname.includes('/login')) {
        router.push('/dashboard');
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
