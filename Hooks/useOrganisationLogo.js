import Cookies from 'js-cookie';
import { useState } from 'react';
import { fetcher } from '../lib/api';
import { getAccountIDFromServer } from '../lib/auth';

export const useSetLogo = ctx => {
  const [Logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createSetLogo = async (_ID, OBJ, PATH) => {
    setLogo(null);
    setError(null);
    setLoading(true);

    try {
      const ID = await getAccountIDFromServer();

      if (ID !== undefined) {
        const res = await fetcher(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}${PATH}${_ID}`,
          {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${Cookies.get('jwt')}`,
            },
            body: JSON.stringify(OBJ),
          }
        );

        setLogo(res.data);
      }
    } catch (err) {
      // Handle any errors
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return [createSetLogo, loading, error, Logo];
};
