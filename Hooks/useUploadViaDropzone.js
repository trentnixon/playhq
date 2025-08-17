import { useState } from 'react';
import Cookies from 'js-cookie';
import { fetcher } from '../lib/api';

export const useUploadImageViaDropzone = ctx => {
  const [DropZoneImage, setDropZoneImage] = useState(null);

  const UploadDropZoneImage = async _FILE => {
    const formData = new FormData();

    formData.append('files', _FILE[0]);

    const response = await fetcher(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/upload`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${Cookies.get('jwt')}`,
        },
        body: formData,
      }
    );

    setDropZoneImage(response);
  };
  return [DropZoneImage, UploadDropZoneImage];
};
