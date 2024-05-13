import { Modal, Group } from "@mantine/core";
import { BTN_ONCLICK } from "../../../Members/Common/utils/Buttons";
import { P } from "../../../Members/Common/Type";


export const ConfirmDeleteModal = ({
  isOpen,
  onClose,
  deletingItemId,
  handleDelete,
}) => {
  return (
    <Modal
      opened={isOpen}
      onClose={() => {
        onClose();
      }}
      title="Confirm Deletion"
    >
      <P textAlign={"center"}>Are you sure you want to delete this item?</P>
      <Group mt="xs" position="apart">
        <BTN_ONCLICK
          HANDLE={() => handleDelete(deletingItemId)}
          LABEL={" Yes, Delete"}
          THEME="error"
        />

        <BTN_ONCLICK
          HANDLE={() => {
            onClose();
          }}
          LABEL={"Cancel"}
          THEME="success"
        />
      </Group>
    </Modal>
  );
};
