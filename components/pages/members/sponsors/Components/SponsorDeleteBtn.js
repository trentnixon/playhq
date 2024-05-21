import { Group } from "@mantine/core";
import { useState } from "react";

import { BTN_ONCLICK } from "../../../../Members/Common/utils/Buttons";
import { FixturaLoading } from "../../../../Members/Common/Loading";

export const SponsorDeleteBtn = ({ itemId, onDelete }) => {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    if (isConfirming) {
      setIsLoading(true);
      onDelete(itemId);
      //setIsLoading(false);
    } else {
      setIsConfirming(true);
    }
  };

  const handleBack = () => {
    setIsConfirming(false);
  };

  if (isLoading) {
    return <FixturaLoading />;
  }
  return (
    <>
      {isConfirming ? (
        <>
          <Group position="apart">
            <BTN_ONCLICK LABEL={"Back"} HANDLE={handleBack} THEME={`error`} />
            <BTN_ONCLICK
              LABEL={"Confirm"}
              HANDLE={handleDelete}
              THEME={`success`}
            />
          </Group>
        </>
      ) : (
        <BTN_ONCLICK LABEL={"Delete"} HANDLE={handleDelete} THEME={`error`} />
      )}
    </>
  );
};
