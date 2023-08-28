import { useState } from 'react';
import { fetcher } from '../lib/api';
import { setToken } from '../lib/auth';

export const useLogUser = () => {
  const [LogUser, setLogUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Add this line

  const CreateLogUser = async (INFO) => {
    setLoading(true);
    setError(null); // Reset error before new request
    try {
      const response = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(INFO),
        } 
      );

      if (response.error) {
        setError(response.error); // Update this line
      } else {
        await setToken(response);   
        setLogUser(response.user);
      }
    } catch (err) {
      setError(err.message); // Update this line
    } finally {
      setLoading(false);
    }
  };

  return [LogUser, CreateLogUser, loading, error]; // Include error here
};
