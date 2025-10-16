import { useState, useCallback, useEffect } from 'react';
import { fetcher } from '../lib/api';
import { getTokenFromLocalCookie } from '../lib/auth';

export const useUserDetails = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserDetails = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const jwt = getTokenFromLocalCookie();

      if (!jwt) {
        throw new Error('No authentication token found');
      }

      const data = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/users/me`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      setUser(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching user details:', err);
      setError(err.message);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  const refresh = useCallback(() => {
    console.log('[useUserDetails] Refreshing user data...');
    fetchUserDetails();
  }, [fetchUserDetails]);

  return { user, loading, error, refetch: fetchUserDetails, refresh };
};
