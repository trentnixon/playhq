import { useState } from 'react';
import { fetcher } from '../lib/api';

export const useGetSubscriptionTiers = () => {
  const [SubscriptionTiers, setSubscriptionTiers] = useState(null);

  const GetsetSubscriptionTiers = async () => {
    try {
      const response = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/subscription-tiers`,
        {
          method: 'GET',
        }
      );
      setSubscriptionTiers(response.data);
    } catch (err) {
      setSubscriptionTiers(null);
    }
  };

  return [SubscriptionTiers, GetsetSubscriptionTiers];
};
