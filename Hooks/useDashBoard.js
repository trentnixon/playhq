//
import Cookies from 'js-cookie';
import { useState } from 'react';
import { fetcher } from '../lib/api';
import { getAccountFromLocalCookie } from '../lib/auth';
const qs = require('qs');

export const useGetSchedulerDetails = () => {
  const query = qs.stringify(
    {
      populate: ['days_of_the_week', 'renders'],
    },
    {
      encodeValuesOnly: true,
    }
  );
  const [schedulerDetails, setSchedulerDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSchedulerDetails = async schedulerId => {
    const user = await getAccountFromLocalCookie();

    if (user && schedulerId) {
      setIsLoading(true);
      try {
        const response = await fetcher(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/schedulers/${schedulerId}?${query}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${Cookies.get('jwt')}`,
            },
          }
        );
        setSchedulerDetails(response.data);
      } catch (error) {
        console.error('Failed to fetch scheduler details:', error);
        setSchedulerDetails(null);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return [schedulerDetails, isLoading, fetchSchedulerDetails];
};

export const useGetGalleryItems = () => {
  const query = qs.stringify(
    {
      populate: ['account_media_libraries'],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const [galleryItems, setGalleryItems] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchGalleryItems = async AccountId => {
    const user = await getAccountFromLocalCookie();

    if (user && AccountId) {
      setIsLoading(true);
      try {
        const response = await fetcher(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/accounts/${AccountId}?${query}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${Cookies.get('jwt')}`,
            },
          }
        );
        setGalleryItems(response.data);
        setError(null); // Reset error state if the request is successful
      } catch (fetchError) {
        console.error('Failed to fetch gallery items:', fetchError);
        setError(fetchError.message);
        setGalleryItems(null);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return [galleryItems, isLoading, error, fetchGalleryItems];
};
