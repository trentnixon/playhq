import { Group } from "@mantine/core";
import { P } from "../../../../Members/Common/Type";
import { BTN_TOINTERALLINK } from "../../../../Members/Common/utils/Buttons";
import { useAccountDetails } from "../../../../../lib/userContext";

import { RoundedSectionContainer } from "../../../../UI/Containers/SectionContainer";

export const Setting_change_brand_Colors = () => {
  const { account } = useAccountDetails();

  if (!account?.attributes) return;

  return (
    <RoundedSectionContainer
      headerContent="Update your Colors"
      topContent={<ContainerTopSection />}
      bottomContent={<ContainerBottomSection />}
    />
  );
};

const ContainerTopSection = () => {
  return (
    <Group position="apart">
      <P Weight={600} marginBottom={0}>
        Personalize Your Asset Colors
      </P>
      <BTN_TOINTERALLINK
        LABEL={"Update Colors"}
        URL={"/members/settings/change-brand-colors/"}
      />
    </Group>
  );
};

const ContainerBottomSection = () => {
  return (
    <>
      <P marginBottom={0}>
        Adjust your primary and secondary colors to ensure all digital assets
        consistently match your club or association's identity.
      </P>
    </>
  );
};
