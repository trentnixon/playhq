import React, { useMemo } from 'react';
import { FixturaCustomSelect } from '../../../../Members/Common/utils/Selects';
import { useAccountDetails } from '../../../../../context/userContext';

export const UserGalleryOptions = props => {
  const { setSelectedDesignOptions, selectedDesignOptions } = props;
  const { account } = useAccountDetails();

  // store users media in memo
  const userMediaGallery = useMemo(() => {
    const mediaGallery = account.attributes.account_media_libraries.data;
    /*
     const imageUrl = item.attributes.imageId.data.attributes.url;
    const imageWidth = item.attributes.imageId.data.attributes.width;
    const imageHeight = item.attributes.imageId.data.attributes.height;
    const imageRatio = imageWidth > imageHeight ? "landscape" : "portrait";
    */
    const imageRatio = (Height, Width) => {
      // if Height = Width then return "square"
      if (Height === Width) return 'square';
      return Width > Height ? 'landscape' : 'portrait';
    };
    return mediaGallery.map(item => {
      const imageWidth = item.attributes?.imageId?.data?.attributes?.width;
      const imageHeight = item.attributes?.imageId?.data?.attributes?.height;
      return {
        url: item.attributes.imageId.data.attributes.url,
        width: imageWidth,
        height: imageHeight,
        ratio: imageRatio(imageHeight, imageWidth),
        label: item.attributes.title || 'Image Has No Title',
        value: item.attributes.imageId.data.attributes.url, // Add value property for Select component
      };
    });
  }, [account]);

  const handleChange = value => {
    console.log('[handleChange value]', value);
    const getItem = userMediaGallery?.find(item => item.value === value);
    console.log('[handleChange getItem]', getItem);

    // Check if getItem exists before accessing its properties
    if (!getItem) {
      console.warn('No matching item found for value:', value);
      return;
    }

    setSelectedDesignOptions({
      ...selectedDesignOptions,
      user_media_gallery: {
        url: getItem.url,
        width: getItem.width,
        height: getItem.height,
        ratio: getItem.ratio,
        label: getItem.label,
      },
    });
    return;
  };

  if (selectedDesignOptions.selectedBackgroundOptions != 'Image') return null;
  return (
    <FixturaCustomSelect
      label='User Media Gallery'
      placeholder='Preview User Media Gallery'
      data={userMediaGallery}
      value={selectedDesignOptions.user_media_gallery?.url || null}
      onChange={handleChange}
      marginBottom={0}
    />
  );
};
