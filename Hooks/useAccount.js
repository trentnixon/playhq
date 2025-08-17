import Cookies from 'js-cookie';
import { useState, useCallback } from 'react';
import { fetcher } from '../lib/api';
import {
  getUserFromLocalCookie,
  getAccountFromLocalCookie,
  getAccountIDFromServer,
  getTokenFromLocalCookie,
} from '../lib/auth';
const qs = require('qs');

export const useAccount = () => {
  const [data, setData] = useState(null);
  /*
"ai_publication",
        "ai_writting_tone",
        "ai_writting_style",
        "assets",
*/
  const query = qs.stringify(
    {
      populate: [
        'scheduler',
        'scheduler.days_of_the_week',
        'account_type',
        'associations',
        'associations.Logo',
        'associations.trial_instance',
        'clubs',
        'clubs.Logo',
        'clubs.trial_instance',
        'theme',
        'audio_option',
        'orders',
        'orders.subscription_tier',
        'sponsors',
        'sponsors.Logo',
        'sponsors.sponsorship_allocations',
        'subscription_tier',
        'account_media_libraries',
        'account_media_libraries.imageId',
        'data_collections',
        'template_option',
        'template_option.template_category',
        'template_option.template_category.bundle_audio',
        'template_option.template_category.bundle_audio.audio_options',
        'template_option.template_palette',
        'template_option.template_gradient',
        'template_option.template_image',
        'template_option.template_noise',
        'template_option.template_particle',
        'template_option.template_pattern',
        'template_option.template_video',
        'template_option.template_mode',
      ],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const fetchData = useCallback(async () => {
    try {
      const ID = await getAccountIDFromServer();
      const JWT = getTokenFromLocalCookie();

      // Check if ID and its nested properties exist
      if (ID && ID.account && ID.account.id) {
        try {
          const res = await fetcher(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/accounts/${ID.account.id}?${query}`,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${JWT}`,
              },
            }
          );
          setData(res.data);
        } catch (accountError) {
          // Handle case where account doesn't exist (404 error)
          if (accountError.status === 404) {
            setData(null);
          } else {
            console.error(
              '💥 useAccount fetchData - Error fetching account data:',
              accountError
            );
            setData(null);
          }
        }
      } else {
        setData(null);
      }
    } catch (error) {
      console.error(
        '💥 useAccount fetchData - An error occurred during fetchData:',
        error
      );
      setData(null);
    }
  }, [query]);

  return [data, fetchData];
};

export const useSetAccountTrue = ctx => {
  const [AccountTrue, SetAccountTrue] = useState(null);

  const CreateSetAccountTrue = async _ID => {
    SetAccountTrue(false);
    const ID = await getAccountIDFromServer();
    if (ID !== undefined) {
      const res = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/accounts/${_ID}`,
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('jwt')}`,
          },
          body: JSON.stringify({
            data: {
              hasCompletedStartSequence: true,
              isActive: true,
            },
          }),
        }
      );

      SetAccountTrue(res.data);
    }
  };

  return [AccountTrue, CreateSetAccountTrue];
};

export const useDeleteAccount = () => {
  const [deleting, setDeleting] = useState(false);

  const deleteAccount = async accountId => {
    setDeleting(true);
    try {
      const res = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/accounts/${accountId}`,
        {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('jwt')}`,
          },
        }
      );
      if (
        res.data &&
        res.data.attributes &&
        res.data.attributes.isActive === false
      ) {
        setDeleting(true); // Set it to true to trigger the refresh
      } else {
        setDeleting(false); // Handle deletion failure
      }
    } catch (error) {
      console.error('An error occurred while deleting the account:', error);
      setDeleting(false);
    }
  };

  return [deleting, deleteAccount];
};
