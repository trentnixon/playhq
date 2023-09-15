import { Group } from "@mantine/core";
import StrapiImageUploader from "../Sponsors/Form/ImageUploader";
import { useEffect, useState } from "react";
import { useAccountDetails } from "../../../lib/userContext";
import { useSetImage, useUpdateSetImage } from "../../../Hooks/useGalleryImage";
import { DetailsForm } from "./DetailsForm";
import { BTN_ONCLICK } from "../Common/utils/Buttons";
import { FixturaLoading } from "../Common/Loading";
import { useRouter } from "next/router";

export function MediaGalleryFileUpload({ ITEMCOUNT }) {
  const MAX_UPLOADS = 15;
  const { account } = useAccountDetails();
  const router = useRouter();
  const [Image, setImage] = useState(null);
  const [ImagePath, setImagePath] = useState(null);
  const [setImageToAccount, loading, error, uploadedImage] = useSetImage();
  const [updateSetImage, updateLoading, updateError, updatedImage] =
    useUpdateSetImage();

  const [step, setStep] = useState("initial"); // 'initial', 'uploading', 'details'
  const [GalleryItemID, setGalleryItemID] = useState(null);

  // API Error Handling
  if (error) return <div>Error while uploading image: {error}</div>;
  if (updateError)
    return <div>Error while updating details: {updateError}</div>;
  // State Error Handling
  if (!account || !account.id) return <div>Please login to upload images.</div>;

  const resetState = () => {
    setImage(null);
    setImagePath(null);
    setStep("initial");
    setGalleryItemID(null);
  };

  useEffect(() => {
    if (ImagePath) {
      setStep("uploading");
      saveImageToAccount();
    }
  }, [ImagePath]);

  useEffect(() => {
    if (uploadedImage) {
      setGalleryItemID(uploadedImage.id);
      setStep("details");
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
    const PATH = "account-media-libraries";
    setImageToAccount(PATH, OBJ);
  };

  const saveDetails = (title, isActive, tags) => {
    if (!title || !tags || tags.length === 0 || !GalleryItemID) {
      // Handle this error. Maybe set an error state and display it
      return;
    }
    const updateData = {
      data: { title, isActive, tags },
    };

    if (GalleryItemID) {
      updateSetImage(GalleryItemID, updateData);
    }
  };

  useEffect(() => {
    if (updatedImage) {
      resetState();
      setStep("initial");
      router.replace(router.asPath);
    }
  }, [updatedImage]);

  if (loading) return <FixturaLoading />;
  if (updateLoading) return <FixturaLoading />;
  if (ITEMCOUNT >= MAX_UPLOADS)
    return <Group position="right">Limit Reached</Group>;
  return (
    <>
      <Group position="right">
        {step === "initial" && (
          <BTN_ONCLICK
            HANDLE={() => setStep("uploading")}
            LABEL={`Upload Item`}
          />
        )}

        {step === "uploading" && (
          <BTN_ONCLICK HANDLE={resetState} LABEL={`Cancel`} THEME="error" />
        )} 
      </Group>

      {step === "uploading" && (
        <StrapiImageUploader
          setLogo={setImage}
          setLogoPath={setImagePath}
          SAVEDLOGO={false}
        />
      )}

      {step === "details" && (
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
