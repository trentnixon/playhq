import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Group } from '@mantine/core';
import { DetailsForm } from './DetailsForm';
import { BTN_ONCLICK } from '../../../Members/Common/utils/Buttons';
import { FixturaLoading } from '../../../Members/Common/Loading';
import { useAccountDetails } from '../../../../context/userContext';
import {
  useSetImage,
  useUpdateSetImage,
} from '../../../../Hooks/useGalleryImage';

import StrapiImageUploader from '../sponsors/Form/ImageUploader';
export function MediaGalleryFileUpload({ ITEMCOUNT }) {
  const MAX_UPLOADS = 25;
  const { account } = useAccountDetails();
  const router = useRouter();
  const [Image, setImage] = useState(null);
  const [ImagePath, setImagePath] = useState(null);
  const [setImageToAccount, loading, error, uploadedImage] = useSetImage();
  const [updateSetImage, updateLoading, updateError, updatedImage] =
    useUpdateSetImage();

  const [step, setStep] = useState('initial'); // 'initial', 'uploading', 'details'
  const [GalleryItemID, setGalleryItemID] = useState(null);

  const resetState = () => {
    setImage(null);
    setImagePath(null);
    setStep('initial');
    setGalleryItemID(null);
  };

  useEffect(() => {
    if (ImagePath) {
      setStep('uploading');
      saveImageToAccount();
    }
  }, [ImagePath]);

  useEffect(() => {
    if (uploadedImage) {
      setGalleryItemID(uploadedImage.id);
      setStep('details');
    }
  }, [uploadedImage]);

  const saveImageToAccount = () => {
    if (!Image || !account || !account.id) {
      // Handle this error. Maybe set an error state and display it
      return;
    }

    const OBJ = {
      data: { imageId: [Image], isActive: true, account: [account.id] },
    };
    const PATH = 'account-media-libraries';
    setImageToAccount(PATH, OBJ);
  };

  const saveDetails = (
    title,
    isActive,
    AgeGroup,
    AssetType,
    markerPosition
  ) => {
    if (!title || !GalleryItemID) {
      // Handle this error. Maybe set an error state and display it
      router.replace(router.asPath);
      return;
    }

    const updateData = {
      data: {
        title,
        isActive,
        AgeGroup, // Add ageGroup to the update data
        AssetType, // Add assetType to the update data
        markerPosition,
      },
    };

    if (GalleryItemID) {
      updateSetImage(GalleryItemID, updateData);
    }
  };

  useEffect(() => {
    if (updatedImage) {
      resetState();
      setStep('initial');
      router.replace(router.asPath);
    }
  }, [updatedImage]);

  // API Error Handling
  if (error) return <div>Error while uploading image: {error}</div>;
  if (updateError)
    return <div>Error while updating details: {updateError}</div>;
  // State Error Handling
  if (!account || !account.id) return <div>Please login to upload images.</div>;

  if (loading) return <FixturaLoading />;
  if (updateLoading) return <FixturaLoading />;
  if (ITEMCOUNT >= MAX_UPLOADS)
    return <Group position='right'>Limit Reached</Group>;
  return (
    <>
      <Group position='right' mb={10}>
        {step === 'initial' && (
          <BTN_ONCLICK
            HANDLE={() => setStep('uploading')}
            LABEL={`Add Image to Gallery Pool`}
          />
        )}

        {step === 'uploading' && (
          <BTN_ONCLICK HANDLE={resetState} LABEL={`Cancel`} THEME='error' />
        )}
      </Group>

      {step === 'uploading' && (
        <StrapiImageUploader
          setLogo={setImage}
          setLogoPath={setImagePath}
          SAVEDLOGO={false}
        />
      )}

      {step === 'details' && (
        <DetailsForm
          initialData={{}} // Fill this with initial data if needed
          onSubmit={saveDetails}
          resetForm={resetState}
          ImagePath={ImagePath}
        />
      )}
    </>
  );
}
