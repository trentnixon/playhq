import Cookies from 'js-cookie';
import { useState } from 'react';
import { fetcher } from '../lib/api';
import { getAccountIDFromServer } from '../lib/auth';

export const useSetGroupAssetsBySetting = () => {
  const [GroupAssetsBy, setGroupAssetsBy] = useState(null);

  const putGroupAssetsBy = async value => {
    const accountInfo = await getAccountIDFromServer();
    if (accountInfo?.account?.id) {
      const response = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/accounts/${accountInfo.account.id}`,
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('jwt')}`,
          },
          body: JSON.stringify({ data: { group_assets_by: value } }),
        }
      );
      setGroupAssetsBy(response.data);
    }
  };

  return [GroupAssetsBy, putGroupAssetsBy];
};

export const useSetIncludeJuniorSurnames = () => {
  const [GroupAssetsBy, setGroupAssetsBy] = useState(null);

  const putGroupAssetsBy = async value => {
    const accountInfo = await getAccountIDFromServer();
    if (accountInfo?.account?.id) {
      const response = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/accounts/${accountInfo.account.id}`,
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('jwt')}`,
          },
          body: JSON.stringify({ data: { include_junior_surnames: value } }),
        }
      );
      setGroupAssetsBy(response.data);
    }
  };

  return [GroupAssetsBy, putGroupAssetsBy];
};
