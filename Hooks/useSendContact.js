import { useState } from 'react';
import { fetcher } from '../lib/api';

export const useContactForm = () => {
  const [contactStatus, setContactStatus] = useState({
    loading: false,
    error: null,
    success: null,
  });

  const handleContactForm = async contactDetails => {
    setContactStatus({ loading: true, error: null, success: null });
    try {
      const response = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/contact-forms`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            //Authorization: `Bearer ${process.env.CONTACTJWT}`, // You can create a specific JWT for contact form
          },
          body: JSON.stringify({ data: contactDetails }),
        }
      );

      if (response.data && response.data.attributes) {
        setContactStatus({ success: true, error: null });
        return { success: true };
      } else {
        throw new Error('Invalid response structure');
      }
    } catch (err) {
      setContactStatus({ success: false, error: error.message });
      return { success: false, error: error.message };
    }
  };

  return [contactStatus, handleContactForm];
};
