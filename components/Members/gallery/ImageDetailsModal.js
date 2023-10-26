import { Modal, Badge, Group, Image } from "@mantine/core";
import { EditDetailsForm } from "./DetailsForm";
import { useUpdateSetImage } from "../../../Hooks/useGalleryImage";
import { useRouter } from "next/router";
import { FixturaLoading } from "../Common/Loading";

export const ImageDetailsModal = ({
  isOpen,
  onClose,
  imageDetails,
  itemId,
}) => {
  const { title, fullImageUrl, AgeGroup, AssetType } = imageDetails;
  const [updateSetImage, updateLoading, updateError, updatedImage] =
    useUpdateSetImage();
  const router = useRouter();

  const saveDetails = async (title, isActive, AgeGroup, AssetType) => {
    const updateData = {
      data: { title, isActive, AgeGroup, AssetType },
    };

    if (itemId) {
      await updateSetImage(itemId, updateData);
      if (!updateError) {
        // Refresh the route to get the updated items
        router.replace(router.asPath);
        // Close the modal
        onClose();
      }
    }
  };

  return (
    <Modal opened={isOpen} onClose={onClose} title="Image Details">
      {updateLoading ? (
        <FixturaLoading />
      ) : (
        <>
          <Image src={fullImageUrl} alt={title} />
          <EditDetailsForm
            initialData={{
              title: title,
              AgeGroup: AgeGroup,
              AssetType: AssetType,
            }} // Fill this with initial data if needed
            onSubmit={saveDetails}
            resetForm={() => {}}
            imageDetails={imageDetails}
          />
        </>
      )}
    </Modal>
  );
};
