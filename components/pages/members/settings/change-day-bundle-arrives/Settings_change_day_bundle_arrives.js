import { Group, Paper, Progress, Text, ThemeIcon, rem } from "@mantine/core";
import { P } from "../../../../Members/Common/Type";
import { BTN_TOINTERALLINK } from "../../../../Members/Common/utils/Buttons";
import { useAccountDetails } from "../../../../../context/userContext";

import { RoundedSectionContainer } from "../../../../UI/Containers/SectionContainer";

export const Settings_change_day_bundle_arrives = () => {
  const { account } = useAccountDetails();

  if (!account?.attributes) return;

  return (
    <>
      <RoundedSectionContainer
        headerContent="Asset Delivery"
        topContent={<ContainerTopSection />}
        bottomContent={<ContainerBottomSection />}
      />
    </>
  );
};

const ContainerTopSection = () => {
  return (
    <Group position="apart">
      <P Weight={600} marginBottom={0}>
        Select a day you would like your bundles will arrive.
      </P>
      <BTN_TOINTERALLINK
        LABEL={"Select New Day"}
        URL={"/members/settings/change-day-bundle-arrives/"}
      />
    </Group>
  );
};

const ContainerBottomSection = () => {
  return (
    <>
      <P marginBottom={0}>
        Choose which day of the week you'd like your weekly digital assets
        delivered, ensuring they align with your club's schedule.
      </P>
    </>
  );
};
